const quranData = require('../data/db');

class QuranService {
    getAllSurahs() {
        return quranData.map(surah => ({
            id: surah.id,
            name_arabic: surah.name_arabic,
            name_english: surah.name_english,
            total_ayah: surah.total_ayah
        }));
    }

    getSurahById(id) {
        return quranData.find(surah => surah.id === parseInt(id));
    }

    searchAyahs(keyword, page = 1, limit = 10) {
        if (!keyword) return { results: [], total: 0 };
        
        const lowercaseKeyword = keyword.toLowerCase();
        const results = [];

        for (const surah of quranData) {
            for (const ayah of surah.ayahs) {
                if (ayah.translation.toLowerCase().includes(lowercaseKeyword)) {
                    results.push({
                        surah_id: surah.id,
                        ayah_number: ayah.ayah_number,
                        arabic_text: ayah.arabic_text,
                        translation: ayah.translation
                    });
                }
            }
        }

        const total = results.length;
        const startIndex = (page - 1) * limit;
        const paginatedResults = results.slice(startIndex, startIndex + limit);

        return {
            results: paginatedResults,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        };
    }
}

module.exports = new QuranService();
