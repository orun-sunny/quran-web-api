const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'quran.json');

let quranData = [];

try {
    const rawData = fs.readFileSync(dataPath, 'utf8');
    quranData = JSON.parse(rawData);
} catch (error) {
    console.error('Error loading Quran dataset:', error);
}

module.exports = quranData;
