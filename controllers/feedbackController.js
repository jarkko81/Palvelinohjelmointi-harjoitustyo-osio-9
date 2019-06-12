// PALAUTELOMAKE-SOVELLUKSEN CONTROLLER

// Haetaan scheman määritelmän models.js-tiedostosta
const Feedback = require('../models/models.js'); // Tikettien models-tiedosto
//const Bulletin = require('../models/modelsBulletin.js'); // Tiedotteiden models-tiedosto

/*
// read Date as String
var date = Date()
 
console.log("=======Date=======");
// print date
console.log(date);
*/

// Tehdään etusivu frontpage, joka on omassa pug-tiedostossaan frontpage
const getFrontPage = (req, res) => {
    res.render('frontpage');
}

// Lisätään uusi puhelin tietokantaan, jonka jälkeen ohjaus puhelimien listaussivulle
const sendNewFeedback = (req, res) => {
    const newFeedback = new Feedback(req.body);
    newFeedback.save().then(result =>{
        console.log(result.name +' on lähettänyt palautetta!');
        res.redirect('/palautteet');
    }).catch(err => console.log(err));
}

// Näytetään kaikki tallennetut puhelimet. Sivu on luotu omassa pug-tiedostossa products
const showAllFeedback = (req, res) => {
    Feedback.find((err, messages) =>{
        if (err){
            console.log(err);
        } else {
            res.render('feedback', {messages: messages});
        }
    }) .sort({status : 1 }); // Tiketit on järjestetty niiden työtilanteen mukaan ("Odottaa työmääräystä" ensimmäisenä)
}
/*
// Luodaan puhelimen tietojen muokkaussivu. Sivu modifyproduct on omassa pug-tiedostossaan
const getReplyPage = (req, res) => {
    req.params.feedbackId;
    Feedback.findById(req.params.feedbackId, (err, messages) => {
        if (err){
            console.log(err);
            res.redirect('/palautteet');
        } else {
            // Jotta tiedot voidaan päivittää, täytyy sovellukselle kertoa tietokannan key-elementit, jotka haetaan lomakkeelle,
            // kun tietoja päivitetään (jotta tiedetään, mitä päivitetään, eikä haeta tyhjää lomaketta).
            res.render('replyfeedback', {feedbackId: messages._id, name: messages.name, email: messages.email, title: messages.title, message: messages.message, comment: messages.comment, status: messages.status, staff: messages.staff, date_added: messages.date_added});
        }
    })
}

// Muokataan puhelimen tietoja. Ohjaus muokkauksen jälkeen puhelimien listaussivulle.
const replyToFeedback = (req, res) => {
    console.log('Palaute lähetetty: ' + req.params.email);
    //console.log(req.body);
    
    Feedback.findByIdAndUpdate(req.params.feedbackId, req.body, {new:true}, (err) => {
        if (err) {
            console.log(err);
        } res.redirect('/palautteet');
    });  
}*/

// Luodaan puhelimen tietojen muokkaussivu. Sivu modifyproduct on omassa pug-tiedostossaan
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

// Muokataan puhelimen tietoja. Ohjaus muokkauksen jälkeen puhelimien listaussivulle.
const commentToFeedback = (req, res) => {
    console.log('Kommentti lähetetty: ' + req.params.feedbackId);
    //console.log(req.body);
    
    Feedback.findByIdAndUpdate(req.params.feedbackId, req.body, {new:true}, (err) => {
        if (err) {
            console.log(err);
        } res.redirect('/palautteet');
    });  
}

// Poista puhelin tietokannasta. Ohjaus onnistuneen poiston jälkeen jälleen listaussivulle.
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



/* HAKUTESTAILUA
const makeTicketSearch = (req, res) => {
    Feedback.users.find(obj, function(err, docs){
        if (err) return err;
        console.log(docs);
        res.send(docs);
    });
}

const searchFromDatabase = (req, res) => {
    var db = req.db;
    console.log(req.body);
    var obj = {}
    if(req.body.title) {
        obj['message'] = req.body.title;
    }
    if(req.body.message) {
        obj['message'] = req.body.message;
    }

    
} */



// Määritellään funktiot, jotta ne toimivat.
module.exports = {getFrontPage, sendNewFeedback, showAllFeedback, getCommentPage, commentToFeedback, removeFeedbackItem}