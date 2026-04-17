const quranService = require('../services/quranService');

exports.getAllSurahs = async (req, res, next) => {
    try {
        const surahs = quranService.getAllSurahs();
        res.json(surahs);
    } catch (error) {
        next(error);
    }
};

exports.getSurahAyahs = async (req, res, next) => {
    try {
        const { id } = req.params;
        const surahId = parseInt(id);

        if (isNaN(surahId) || surahId < 1 || surahId > 114) {
            return res.status(400).json({ error: 'Invalid Surah ID. Must be between 1 and 114.' });
        }

        const surah = quranService.getSurahById(surahId);
        if (!surah) {
            return res.status(404).json({ error: 'Surah not found' });
        }

        const response = {
            surah_info: {
                id: surah.id,
                name_arabic: surah.name_arabic,
                name_english: surah.name_english,
                total_ayah: surah.total_ayah
            },
            ayahs: surah.ayahs
        };

        res.json(response);
    } catch (error) {
        next(error);
    }
};
