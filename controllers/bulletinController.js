// TIEDOTESOVELLUKSEN CONTROLLER

// Haetaan scheman määritelmän models.js-tiedostosta
const Bulletin = require('../models/modelsBulletin.js'); // Tiedotteiden models-tiedosto

// Tehdään tiedotteiden etusivu, joka on omassa pug-tiedostossaan bulletinform
const getBulletinPage = (req, res) => {
    res.render('bulletinform');
}

// Lisätään uusi tiedote tietokantaan, jonka jälkeen ohjaus tiedotteiden listaussivulle
const createNewBulletin = (req, res) => {
    const newBulletin = new Bulletin(req.body);
    newBulletin.save().then(result =>{
        console.log(result.editor +' on lähettänyt artikkelin!');
        res.redirect('/tiedotteet');
    }).catch(err => console.log(err));
}

// Näytetään kaikki tallennetut tiedotteet. Sivu on luotu omassa pug-tiedostossa bulletins
const showAllBulletins = (req, res) => {
    Bulletin.find((err, bulletins) =>{
        if (err){
            console.log(err);
        } else {
            res.render('bulletins', {bulletins: bulletins});
        }
    })
}

// Luodaan tiedotteen muokkaussivu. Sivu bulletinupdate on omassa pug-tiedostossaan
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

// Muokataan tiedotteen tietoja. Ohjaus muokkauksen jälkeen tiedotteiden listaussivulle.
const modifyToBulletin = (req, res) => {
    console.log('Muokkaus tehty: ' + req.params.bulletinId);
    
    Bulletin.findByIdAndUpdate(req.params.bulletinId, req.body, {new:true}, (err) => {
        if (err) {
            console.log(err);
        } res.redirect('/tiedotteet');
    });  
}

// Poista tiedotteen tietokannasta. Ohjaus onnistuneen poiston jälkeen jälleen listaussivulle.
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