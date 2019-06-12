// PALAUTELOMAKE-SOVELLUKSEN CONTROLLER

// Haetaan scheman määritelmän models.js-tiedostosta
//const Feedback = require('../models/models.js'); // Tikettien models-tiedosto
const Bulletin = require('../models/modelsBulletin.js'); // Tiedotteiden models-tiedosto

// Tehdään etusivu frontpage, joka on omassa pug-tiedostossaan frontpage
const getBulletinPage = (req, res) => {
    res.render('bulletinform');
}

// Lisätään uusi puhelin tietokantaan, jonka jälkeen ohjaus puhelimien listaussivulle
const createNewBulletin = (req, res) => {
    const newBulletin = new Bulletin(req.body);
    newBulletin.save().then(result =>{
        console.log(result.editor +' on lähettänyt artikkelin!');
        res.redirect('/tiedotteet');
    }).catch(err => console.log(err));
}

// Näytetään kaikki tallennetut puhelimet. Sivu on luotu omassa pug-tiedostossa products
const showAllBulletins = (req, res) => {
    Bulletin.find((err, bulletins) =>{
        if (err){
            console.log(err);
        } else {
            res.render('bulletins', {bulletins: bulletins});
        }
    }) //.sort({status : 1 }); // Tiketit on järjestetty niiden työtilanteen mukaan ("Odottaa työmääräystä" ensimmäisenä)
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
const getModifyPage = (req, res) => {
    req.params.bulletinId;
    Bulletin.findById(req.params.bulletinId, (err, bulletin) => {
        if (err){
            console.log(err);
            res.redirect('/tiedotteet');
        } else {
            // Jotta tiedot voidaan päivittää, täytyy sovellukselle kertoa tietokannan key-elementit, jotka haetaan lomakkeelle,
            // kun tietoja päivitetään (jotta tiedetään, mitä päivitetään, eikä haeta tyhjää lomaketta).
            res.render('bulletinupdate', {bulletinId: bulletin._id, editor: bulletin.editor, subject: bulletin.subject, article: bulletin.article});
        }
    })
}

// Muokataan puhelimen tietoja. Ohjaus muokkauksen jälkeen puhelimien listaussivulle.
const modifyToBulletin = (req, res) => {
    console.log('Muokkaus tehty: ' + req.params.bulletinId);
    //console.log(req.body);
    
    Bulletin.findByIdAndUpdate(req.params.bulletinId, req.body, {new:true}, (err) => {
        if (err) {
            console.log(err);
        } res.redirect('/tiedotteet');
    });  
}

// Poista puhelin tietokannasta. Ohjaus onnistuneen poiston jälkeen jälleen listaussivulle.
const removeBulletinItem = (req, res) => {
    Bulletin.findByIdAndRemove(req.params.bulletinId, (err, result) => { // resultilla tulostetaan, mitä tietokannassa on
        if(err){
            console.log(err);
        }else{
            console.log('Artikkeli poistettu');
            console.log('Poistettiin artikkeli: ' +result._id+ ' ' + result.name);
            res.redirect("/tiedotteet");
        }
    });
}

// Määritellään funktiot, jotta ne toimivat.
module.exports = {getBulletinPage, createNewBulletin, showAllBulletins, getModifyPage, modifyToBulletin, removeBulletinItem}