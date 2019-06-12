// PALAUTELOMAKE-SOVELLUKSEN ROUTER

const express = require('express');
const router = express.Router();
const session = require('express-session');
const path = require('path'); // Otetaan path-moduuli käyttöön
const feedbackController = require('../controllers/feedbackController.js'); // Tikettien controller-tiedosto
const bulletinController = require('../controllers/bulletinController.js'); // Tiedotteiden controller-tiedosto
//const login1Controller = require('../controllers/login1.js'); // Controller-tiedosto

/* Sovelluksen routet */

// Luo uusi HTTP GET route / eli vie kotisivulle
router.get('/', (req, res) => {
    feedbackController.getFrontPage(req, res);
    console.log(req.url);
});

// Lomakkeen tietojen lähetys tuotteiden lisäyssivulta
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

// Sivu, jolla näytetään tietokantaan tallennetut puhelimet
router.get('/palautteet', (req, res) =>{
    feedbackController.showAllFeedback(req, res);
    console.log(req.url);
});

/*
// Muokkauslomake, jolla voidaan muokata puhelimen tietoja yksilöllisen id:n avulla
router.get('/vastaa/:feedbackId', (req, res) => {
    feedbackController.getReplyPage(req, res);
});

// Yksittäisen puhelimen muokkauksen lähetys lomakkeelta yksilöllisen id:n avulla
router.post('/vastaa/:feedbackId', (req,res) => {
   feedbackController.replyToFeedback(req,res);
}); */

// Muokkauslomake, jolla voidaan muokata puhelimen tietoja yksilöllisen id:n avulla
router.get('/kommentoi/:feedbackId', (req, res) => {
    feedbackController.getCommentPage(req, res);
});

// Yksittäisen puhelimen muokkauksen lähetys lomakkeelta yksilöllisen id:n avulla
router.post('/kommentoi/:feedbackId', (req,res) => {
   feedbackController.commentToFeedback(req,res);
});

// Poistetaan lomake tietokannasta yksilöllisen id:n avulla
router.get('/poista/:feedbackId', (req, res) =>{  // Kun linkin kautta tehdään pyyntö, se tehdään aina get-metodin avulla.
    feedbackController.removeFeedbackItem(req, res);
});

router.get('/luotiedote', (req, res) => {
    bulletinController.getBulletinPage(req, res);
    console.log(req.url);
});

// Sivu, jolla näytetään tietokantaan tallennetut puhelimet
router.post('/luotiedote', (req, res) =>{
    bulletinController.createNewBulletin(req, res);
    console.log(req.url);
});

// Sivu, jolla näytetään tietokantaan tallennetut puhelimet
router.get('/tiedotteet', (req, res) =>{
    bulletinController.showAllBulletins(req, res);
    console.log(req.url);
});

// Muokkauslomake, jolla voidaan muokata puhelimen tietoja yksilöllisen id:n avulla
router.get('/muokkaa/:bulletinId', (req, res) => {
    bulletinController.getModifyPage(req, res);
});

// Yksittäisen puhelimen muokkauksen lähetys lomakkeelta yksilöllisen id:n avulla
router.post('/muokkaa/:bulletinId', (req,res) => {
   bulletinController.modifyToBulletin(req,res);
});

// Poistetaan lomake tietokannasta yksilöllisen id:n avulla
router.get('/poisto/:bulletinId', (req, res) =>{  // Kun linkin kautta tehdään pyyntö, se tehdään aina get-metodin avulla.
    bulletinController.removeBulletinItem(req, res);
});


/*
// Poistetaan lomake tietokannasta yksilöllisen id:n avulla
router.get('/haku/tiketit', (req, res) =>{  // Kun linkin kautta tehdään pyyntö, se tehdään aina get-metodin avulla.
    feedbackController.makeTicketSearch(req, res);
});

router.post('/auth/search', function(req,res){
    feedbackController.searchFromDatabase(req, res);
}); */


/*
// Sivu, jolla näytetään tietokantaan tallennetut puhelimet
router.get('/kirjaudu', (req, res) =>{
    //res.sendFile(path.join(__dirname, '../static', 'index.html'));
    loginController.getLoginPage(req,res);
    console.log(req.url);
});

// Lomakkeen tietojen lähetys tuotteiden lisäyssivulta
router.post('/kirjaudu', (req, res) =>{ 
    loginController.sendLoginInformation(req, res);
    console.log(req.url);
});*/





// Sivu, jolla näytetään tietokantaan tallennetut puhelimet
/*router.get('/loginfailed', (req, res) =>{
    //res.sendFile(path.join(__dirname, '../static', 'index.html'));
    loginController.loginToAdmin(req,res);
    console.log(req.url);
});*/



module.exports = router; // Exportataan router