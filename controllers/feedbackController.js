// TIKETTISOVELLUKSEN CONTROLLER

// Haetaan scheman määritelmän models.js-tiedostosta
const Feedback = require('../models/models.js'); // Tikettien models-tiedosto

// Tehdään etusivu, joka on omassa pug-tiedostossaan frontpage
const getFrontPage = (req, res) => {
    res.render('frontpage');
}

// Lisätään uusi tiketti tietokantaan, jonka jälkeen ohjaus tikettien listaussivulle
const sendNewFeedback = (req, res) => {
    const newFeedback = new Feedback(req.body);
    newFeedback.save().then(result =>{
        console.log(result.name +' on lähettänyt uuden tiketin!');
        res.redirect('/palautteet');
    }).catch(err => console.log(err));
}

// Näytetään kaikki tallennetut tiketit. Sivu on luotu omassa pug-tiedostossa feedback
const showAllFeedback = (req, res) => {
    Feedback.find((err, messages) =>{
        if (err){
            console.log(err);
        } else {
            res.render('feedback', {messages: messages});
        }
    }) .sort({status : 1 }); // Tiketit on järjestetty niiden työtilanteen mukaan ("Odottaa työmääräystä" ensimmäisenä)
}

// Luodaan tikettien tietojen muokkaussivu. Sivu commentfeedback on omassa pug-tiedostossaan
const getCommentPage = (req, res) => {
    req.params.feedbackId;
    Feedback.findById(req.params.feedbackId, (err, messages) => {
        if (err){
            console.log(err);
            res.redirect('/palautteet');
        } else {
            // Jotta tiedot voidaan päivittää, täytyy sovellukselle kertoa tietokannan key-elementit, jotka haetaan lomakkeelle,
            // kun tietoja päivitetään (jotta tiedetään, mitä päivitetään, eikä haeta tyhjää lomaketta).
            res.render('commentfeedback', {feedbackId: messages._id, name: messages.name, email: messages.email, title: messages.title, message: messages.message, comment: messages.comment, status: messages.status, staff: messages.staff, date_added: messages.date_added});
        }
    })
}

// Muokataan tikettien tietoja. Ohjaus muokkauksen jälkeen tikettien listaussivulle.
const commentToFeedback = (req, res) => {
    console.log('Kommentti lähetetty: ' + req.params.feedbackId);

    Feedback.findByIdAndUpdate(req.params.feedbackId, req.body, {new:true}, (err) => {
        if (err) {
            console.log(err);
        } res.redirect('/palautteet');
    });  
}

// Poista tiketti tietokannasta. Ohjaus onnistuneen poiston jälkeen jälleen listaussivulle.
const removeFeedbackItem = (req, res) => {
    Feedback.findByIdAndRemove(req.params.feedbackId, (err, result) => { // resultilla tulostetaan, mitä tietokannassa on
        if(err){
            console.log(err);
        }else{
            console.log('Viestin tiedot poistettu');
            console.log('Poistettiin viesti: ' +result._id+ ' ' + result.name);
            res.redirect("/palautteet");
        }
    });
}

// Määritellään funktiot, jotta ne toimivat.
module.exports = {getFrontPage, sendNewFeedback, showAllFeedback, getCommentPage, commentToFeedback, removeFeedbackItem}