/**
 * Palvelinohjelmointi 9.6.2019
 * Jarkko Nieminen
 * 
 * 
 * Harjoitustyön tehtävänanto:
 * 
 *      Toteuta harjoitustyönä oma web-palvelin, joka käyttää MongoDB-tietokantaa. 

        Harjoitustyöllä ei sinällään ole muuta vaatimusta, mutta tässä on hyvä näytön ja referenssin paikka luoda sovellus, jonka voit viedä Githubiin omaan "portfolioosi".

        Palauta harjoitustyö Moodlen palautuslaatikkoon viimeistään sunnuntaina 16.6. ja mikäli sovellus löytyy myös Githubista, sisällytä linkki Github-repositorioon.

        Muista, että voit tehdä sovelluksen, jota voit jatkokehittää esimerkiksi kesän aikana ja muutenkin tulevaisuudessa omaan tahtiisi. Github on hyvä paikka näyttää referenssejä mitä on tehnyt potentiaalisille tuleville työnantajille. Mikään muu ei kerro paremmin koodausosaamisestasi kuin itse toteutetut sovellukset 

        Huomioi seuraavat asiat: 

        - Koodin rakenne on jaettu oikein, eikä koko sovellus ole app.js-tiedostossa.
            * Esim. kansiot /controllers /models /routes ja /views ja niissä toiminnallisuus
        - Koodi on kommentoitu
        - Palvelimella on logitus console.logilla
        - Koodi on siististi sisennettyä, ctrl+k ja ctrl+f
 * 
 * 
 */


 // HARJOITUSTYÖN SOVELLUS: TIKETTISOVELLUS

// Määritellään express, body-parser, mongoose ja luodaan yhteys routeriin
const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes.js');
const path = require('path'); // Otetaan path-moduuli käyttöön

// Yhdistetään mongo-tietokantaan
mongoose.connect('mongodb://localhost:27017/tiketit', { useNewUrlParser: true });

// Otetaanbody-parser käyttöön
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Asetetaan pug käyttöön
app.set('view engine', 'pug');

// Otetaan router käyttöön
app.use('/', routes);
app.use(express.static(path.join(__dirname, '/static/css')));
// Kuvat löytyvät /images -polusta
app.use("/static/images", express.static(path.join(__dirname, '/static/images')));

// Kuunnellaan porttia 3000
app.listen(3000);







 /**
  * OSIO 9: HARJOITUSTYÖ - OPPIMISPÄIVÄKIRJA
  * 
  * 
  * Tähän tekstiä...
  * 
  * 
  */