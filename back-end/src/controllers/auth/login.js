import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import User from '../../models/user.model.js'
import Session from '../../models/session.model.js'
import dotenv from 'dotenv'

dotenv.config()

export const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    // 1. check if email and password are provided
    if (!username || !password) {
        return res.status(400).json({ status: "fail", message: "Please provide username and password" })
    }

    // 2. find account by email
    const user = await User
        .findOne({ username }).sort({ createdAt: -1 }).select("+password")

    // 3. check if account exists
    if (!user) {
        return res.status(401).json({ status: "fail", message: "This username doesn't belong to any account" })
    }

    // 4. check account status
    if (["Banned", "Deleted"].includes(user.status)) {
        return res.status(403).json({ status: "fail", message: `This account has been ${user.status}.` })
    }

    // 5. compare password
    const isPasswordMatch = await user.checkPassword(password)
    if (!isPasswordMatch) {
        return res.status(401).json({ status: "fail", message: "password is incorrect" })
    }

    // 6. generate JWT token
    const token = jwt.sign(
        { _id: user._id, role: user.role, username: user.username},
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    )

    // 7. create session
    await Session.create({
        user: user._id,
        token: token,
        ip: req.ip,
        agent: req.get("user-agent"),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    })

    // 8. set cookie
    const isProduction = process.env.NODE_ENV === "production"
    res.cookie("TP-Code-Auth", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    })

    // 9. return response
    res.status(200).json({
        status: "success",
        message: "Logged in successfully",
        data: {
            _id: user._id,
            username: user.username,
            role: user.role,
            fullName: user.fullName,
            profilePicture: user.profilePicture?.url
        }
    })
})