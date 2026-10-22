import asyncHandler from 'express-async-handler';
import Website from '../../models/website.model.js';
import { cloudinaryUploader } from '../../utils/cloudaniryUploader.js';
import { extractDomain } from '../../utils/extractDomain.js';

export const requestedFields = [
    { name: 'photo', maxCount: 1 }
];

export const addWebsite = asyncHandler(async (req, res) => {
    const { name, url, link } = req.body;
    const websiteUrl = (url || link || '').trim();

    // Extract domain from url
    const domain = extractDomain(websiteUrl);

    // Check uploaded photo file (optional if user sends one)
    const photoFile = req.files?.photo ? req.files.photo[0] : (req.file || null);

    let photoData = {
        url: '',
        public_id: ''
    };

    if (photoFile) {
        // 1. User uploaded an image: upload directly to Cloudinary
        const uploadedPhoto = await cloudinaryUploader(photoFile.buffer, 'websites');
        photoData = {
            url: uploadedPhoto.secure_url,
            public_id: uploadedPhoto.public_id
        };
    } else if (domain) {
        // 2. User didn't send any photo: fetch logo from URL/domain and save to Cloudinary
        const logoUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
        try {
            const logoRes = await fetch(logoUrl);
            if (logoRes.ok) {
                const logoArrayBuffer = await logoRes.arrayBuffer();
                const logoBuffer = Buffer.from(logoArrayBuffer);
                const uploadedLogo = await cloudinaryUploader(logoBuffer, 'websites');
                photoData = {
                    url: uploadedLogo.secure_url,
                    public_id: uploadedLogo.public_id
                };
            } else {
                photoData = { url: logoUrl, public_id: '' };
            }
        } catch (err) {
            console.error('Failed to fetch or upload website logo:', err.message);
            photoData = { url: logoUrl, public_id: '' };
        }
    }

    // Parse boolean for isFavourite
    const isFavourite = req.body.isFavourite === true || req.body.isFavourite === 'true';

    // Calculate order (append to the end of user's list)
    const lastWebsite = await Website
        .findOne({ user: req.user._id }).sort({ order: -1 });

    const order = lastWebsite ? lastWebsite.order + 1 : 0;

    // Create new website
    const newWebsite = await Website.create({
        user: req.user._id,
        name: name.trim(),
        url: websiteUrl,
        domain,
        photo: photoData,
        isFavourite,
        order
    });

    return res.status(201).json({
        status: 'success',
        message: 'Website added successfully',
        data: { website: newWebsite }
    });
});
