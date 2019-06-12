// MONGOOSEN MÄÄRITTELYT TIKETTISOVELLUKSESSA

// Otetaan mongoose käyttöön ja luodaan schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Määritellään schama ja tietokantaobjektit
const feedbackSchema = new Schema({
    name: String,
    email: String,
    title: String,
    message: String,
    comment: String,
    status: String,
    staff: String
    });

// Luodaan tietokanta Feedback
const Feedback = mongoose.model('messages', feedbackSchema);

module.exports = Feedback; // Exportataan Feedback