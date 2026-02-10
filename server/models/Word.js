const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    wordId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }, 
    translations: {
        az: { type: String, required: true },
        en: { type: String, required: true },
        ru: { type: String, required: true }
    },
    description: {
        type: String,
        default: '' 
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Word', wordSchema);