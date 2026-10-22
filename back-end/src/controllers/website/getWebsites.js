import asyncHandler from 'express-async-handler';
import Website from '../../models/website.model.js';

/**
 * @route   GET /api/v1/websites
 * @desc    Get user's websites separated into pinned and regular websites
 * @access  Private
 */
export const getWebsites = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    // Fetch user's websites ordered by custom user order, then newest first
    const websitesList = await Website.find({ user: userId })
        .sort({ order: 1, createdAt: -1 })
        .select('_id name url domain photo.url isPinned isFavourite order')
        .lean();

    // Map website to only fields needed by front-end website component
    // Omits internal/sensitive data: user ObjectId, photo.public_id, __v, timestamps
    const sanitizeWebsite = (item) => ({
        _id: item._id,
        name: item.name || '',
        url: item.url || '',
        domain: item.domain || '',
        photo: {
            url: item.photo?.url || '',
        },
        isPinned: Boolean(item.isPinned ?? item.isFavourite ?? false),
        order: item.order ?? 0,
    });

    const pinWebsites = [];
    const regularWebsites = [];

    for (const site of websitesList) {
        const cleanSite = sanitizeWebsite(site);
        if (cleanSite.isPinned) {
            pinWebsites.push(cleanSite);
        } else {
            regularWebsites.push(cleanSite);
        }
    }

    return res.status(200).json({
        status: 'success',
        message: 'Websites sent successfully',
        data: {
            pinnedWebsites: pinWebsites,
            websites: regularWebsites,
        },
    });
});
