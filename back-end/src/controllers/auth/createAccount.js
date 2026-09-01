import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import asyncHandler from "express-async-handler";


import Users from "../../models/user.model.js"
import Sessions from "../../models/session.model.js";

import { cloudinaryUploader } from '../../utils/cloudaniryUploader.js'

dotenv.config()

export const requestedFields = [
    { name: "profilePicture", maxCount: 1 }
]


export const createAccount = asyncHandler(async (req, res) => {

    // check if user has an acound or not 
    const user = await Users
        .findOne({ "username": req.body.username }).sort({ createdAt: -1 })

    if (user) {
        if (user.status === "Blocked") {
            return res.status(400).json({ status: "fail", message: "This account is blocked" })
        }
        else if (user.status === "Active") {
            return res.status(400).json({ status: "fail", message: "This username is already connected with an account" })
        }
    }


    // check required files
    const profileImage = req.files?.profilePicture ? req.files.profilePicture[0] : null
    
    // upload profile and cover images
    const uploadedProfileImage = profileImage ?
        await cloudinaryUploader(profileImage.buffer, "profileImages") : null

    // hash password & create user
    req.body.password = await bcrypt.hash(req.body.password, 10)
    const newUser = await Users.create({
        ...req.body, 
        profilePicture: uploadedProfileImage ? 
            {url: uploadedProfileImage.secure_url, public_id: uploadedProfileImage.public_id} : null,
    })

    // create token
    const token = jwt.sign({ _id: newUser._id, username: newUser.username },
        process.env.JWT_SECRET, { expiresIn: "30d" })

    // cookie for 
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("MASproAuth", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    });

    // create session
    await Sessions.create({
        user: newUser._id,
        token: token,
        ip: req.ip,
        agent: req.headers["user-agent"],
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    })

    // response
    res.status(201).json({ 
        status: "success",
        message: "successful registration",
        data:{newUser}
    })
})
