// MONGOOSEN MÄÄRITTELYT TIEDOTESOVELLUKSESSA

// Otetaan mongoose käyttöön ja luodaan schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Määritellään schama ja tietokantaobjektit
const bulletinSchema = new Schema({
    editor: String,
    subject: String,
    article: String
    });

// Luodaan tietokanta News
const News = mongoose.model('bulletin', bulletinSchema);

module.exports = News; // Exportataan News