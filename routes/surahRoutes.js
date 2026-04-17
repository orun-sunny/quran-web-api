const express = require('express');
const router = express.Router();
const surahController = require('../controllers/surahController');

router.get('/', surahController.getAllSurahs);
router.get('/:id', surahController.getSurahAyahs);

module.exports = router;
