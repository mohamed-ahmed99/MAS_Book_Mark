import mongoose from 'mongoose';

const websiteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required'],
            index: true,
        },
        name: {
            type: String,
            trim: true,
        },
        url: {
            type: String,
            trim: true,
            default: '',
        },
        domain: {
            type: String,
            trim: true,
            default: '',
        },
        photo: {
            url: { type: String, default: '' },
            public_id: { type: String, default: '' },
        },
        isFavourite: {
            type: Boolean,
            default: false,
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for faster lookups and ordering
websiteSchema.index({ user: 1, order: 1 });
websiteSchema.index({ user: 1, domain: 1 });
websiteSchema.index({ user: 1, createdAt: -1 });

const Website = mongoose.model('Website', websiteSchema);

export default Website;
