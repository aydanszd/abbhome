// routers/words.js
const express = require('express');
const router = express.Router();
const Word = require('../models/Word');

// Get all words
router.get('/', async (req, res) => {
    try {
        const { locale } = req.query;
        const filter = { isActive: true };

        const words = await Word.find(filter).sort({ createdAt: -1 });

        // If locale is specified, return only that language
        if (locale && ['az', 'en', 'ru'].includes(locale)) {
            const localized = words.reduce((acc, word) => {
                acc[word.wordId] = word.translations[locale];
                return acc;
            }, {});
            return res.json({ success: true, data: localized });
        }

        res.json({ success: true, data: words });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get single word by wordId
router.get('/by-id/:wordId', async (req, res) => {
    try {
        const { locale } = req.query;
        const word = await Word.findOne({ wordId: req.params.wordId, isActive: true });

        if (!word) {
            return res.status(404).json({ success: false, message: 'Word not found' });
        }

        if (locale && ['az', 'en', 'ru'].includes(locale)) {
            return res.json({
                success: true,
                data: {
                    wordId: word.wordId,
                    text: word.translations[locale]
                }
            });
        }

        res.json({ success: true, data: word });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Create word (3 dilli)
router.post('/', async (req, res) => {
    try {
        const { wordId, translations, description } = req.body;

        // Validate
        if (!wordId) {
            return res.status(400).json({
                success: false,
                message: 'Word ID is required'
            });
        }

        if (!translations || !translations.az || !translations.en || !translations.ru) {
            return res.status(400).json({
                success: false,
                message: 'All three translations (az, en, ru) are required'
            });
        }

        // Check if wordId already exists
        const existing = await Word.findOne({ wordId });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: 'Word ID already exists'
            });
        }

        const word = new Word({
            wordId,
            translations,
            description: description || ''
        });

        await word.save();
        res.status(201).json({ success: true, data: word });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Update word
router.put('/:id', async (req, res) => {
    try {
        const word = await Word.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!word) {
            return res.status(404).json({ success: false, message: 'Word not found' });
        }

        res.json({ success: true, data: word });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Delete word
router.delete('/:id', async (req, res) => {
    try {
        const word = await Word.findByIdAndDelete(req.params.id);

        if (!word) {
            return res.status(404).json({ success: false, message: 'Word not found' });
        }

        res.json({ success: true, message: 'Word deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Toggle active status
router.patch('/:id/toggle', async (req, res) => {
    try {
        const word = await Word.findById(req.params.id);
        if (!word) {
            return res.status(404).json({ success: false, message: 'Word not found' });
        }

        word.isActive = !word.isActive;
        await word.save();

        res.json({ success: true, data: word });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

module.exports = router;