// SOVELLUKSEN ROUTER: TIKETIT JA TIEDOTTEET

// Määritellään express, body-parser, path, express-session, mongoose ja luodaan yhteys controller-tiedostoihin
const express = require('express');
const router = express.Router();
const session = require('express-session');
const path = require('path');
const feedbackController = require('../controllers/feedbackController.js'); // Tikettien controller-tiedosto
const bulletinController = require('../controllers/bulletinController.js'); // Tiedotteiden controller-tiedosto

/* Sovelluksen routet */

// Luo uusi HTTP GET route / eli vie kotisivulle
router.get('/', (req, res) => {
    feedbackController.getFrontPage(req, res);
    console.log(req.url);
});

// Lomakkeen tietojen lähetys tikettien lisäyssivulta
router.post('/', (req, res) =>{ 
    feedbackController.sendNewFeedback(req, res);
    console.log(req.url);
});

// Tehdään route nettisivun css-tiedostolle
router.get('/static/css', function (req, res) {
    res.sendFile(path.join(__dirname, '../static/css', 'styles.css'));
    console.log(req.url);
    })

// Luo uusi HTTP GET route /images -kansioon, jotta kuvat näkyvät
router.get('/static/images', (req, res) => {
    feedbackController.getShowImage(req, res);
    console.log(req.url);
});

// Tehdään route nettisivun yhteystietosivu index.html
// Jostain syystä CSS ei asetu sivulle oikein (navigaatio ei näy oikein)
router.get('/yhteystiedot', function (req, res) {
    res.sendFile(path.join(__dirname, '../static', 'index.html'));
    console.log(req.url);
    })

// Sivu, jolla näytetään tietokantaan tallennetut tiketit
router.get('/palautteet', (req, res) =>{
    feedbackController.showAllFeedback(req, res);
    console.log(req.url);
});

// Muokkauslomake, jolla voidaan muokata tiketin tietoja yksilöllisen id:n avulla
router.get('/kommentoi/:feedbackId', (req, res) => {
    feedbackController.getCommentPage(req, res);
});

// Yksittäisen tiketin muokkauksen lähetys lomakkeelta yksilöllisen id:n avulla
router.post('/kommentoi/:feedbackId', (req,res) => {
   feedbackController.commentToFeedback(req,res);
});

// Poistetaan tiketti tietokannasta yksilöllisen id:n avulla
router.get('/poista/:feedbackId', (req, res) =>{  // Kun linkin kautta tehdään pyyntö, se tehdään aina get-metodin avulla.
    feedbackController.removeFeedbackItem(req, res);
});

// Get-metodilla luodaan sivu tiedotteiden luomissivulle
router.get('/luotiedote', (req, res) => {
    bulletinController.getBulletinPage(req, res);
    console.log(req.url);
});

// Luodaan uusi tiedote tietokantaan
router.post('/luotiedote', (req, res) =>{
    bulletinController.createNewBulletin(req, res);
    console.log(req.url);
});

// Sivu, jolla näytetään tietokantaan tallennetut tiedotteet
router.get('/tiedotteet', (req, res) =>{
    bulletinController.showAllBulletins(req, res);
    console.log(req.url);
});

// Muokkauslomake, jolla voidaan muokata tiedotteen tietoja yksilöllisen id:n avulla
router.get('/muokkaa/:bulletinId', (req, res) => {
    bulletinController.getModifyPage(req, res);
});

// Yksittäisen tiedotteen muokkauksen lähetys lomakkeelta yksilöllisen id:n avulla
router.post('/muokkaa/:bulletinId', (req,res) => {
   bulletinController.modifyToBulletin(req,res);
});

// Poistetaan tiedote tietokannasta yksilöllisen id:n avulla
router.get('/poisto/:bulletinId', (req, res) =>{  // Kun linkin kautta tehdään pyyntö, se tehdään aina get-metodin avulla.
    bulletinController.removeBulletinItem(req, res);
});

module.exports = router; // Exportataan router