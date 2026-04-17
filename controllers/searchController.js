const quranService = require('../services/quranService');

exports.search = async (req, res, next) => {
    try {
        const { q, page = 1, limit = 10 } = req.query;

        if (!q || q.trim() === '') {
            return res.status(400).json({ error: 'Search keyword is required (e.g., ?q=keyword)' });
        }

        const pageNum = parseInt(page) > 0 ? parseInt(page) : 1;
        const limitNum = parseInt(limit) > 0 ? parseInt(limit) : 10;

        const results = quranService.searchAyahs(q, pageNum, limitNum);

        res.json(results);
    } catch (error) {
        next(error);
    }
};
