/**
 * Palvelinohjelmointi 12.6.2019
 * Jarkko Nieminen
 * 
 * 
 * Harjoitustyön tehtävänanto:
 * 
 *      Toteuta harjoitustyönä oma web-palvelin, joka käyttää MongoDB-tietokantaa. 

        Harjoitustyöllä ei sinällään ole muuta vaatimusta, mutta tässä on hyvä näytön ja referenssin paikka luoda sovellus, 
        jonka voit viedä Githubiin omaan "portfolioosi".

        Palauta harjoitustyö Moodlen palautuslaatikkoon viimeistään sunnuntaina 16.6. ja mikäli sovellus löytyy myös Githubista, 
        sisällytä linkki Github-repositorioon.

        Muista, että voit tehdä sovelluksen, jota voit jatkokehittää esimerkiksi kesän aikana ja muutenkin tulevaisuudessa omaan tahtiisi. 
        Github on hyvä paikka näyttää referenssejä mitä on tehnyt potentiaalisille tuleville työnantajille. 
        Mikään muu ei kerro paremmin koodausosaamisestasi kuin itse toteutetut sovellukset 

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

// Määritellään express, body-parser, path, express-session, mongoose ja luodaan yhteys routeriin
const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/routes.js');

// Yhdistetään mongo-tietokantaan
mongoose.connect('mongodb://localhost:27017/tiketit', { useNewUrlParser: true });

// Otetaan body-parser käyttöön
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Asetetaan pug käyttöön
app.set('view engine', 'pug');

// Otetaan router käyttöön
app.use('/', routes);

// Otetaan käyttöön CSS:ää varten polku /static/css
app.use(express.static(path.join(__dirname, '/static/css')));
// Otetaan käyttöön kuvia varten polku /static/images
app.use("/static/images", express.static(path.join(__dirname, '/static/images')));

// Kuunnellaan porttia 3000
app.listen(3000);


 /**
  * OSIO 9: HARJOITUSTYÖ - OPPIMISPÄIVÄKIRJA
  * 
  * 
  * Harjoitustyön tavoitteena oli luoda Palvelinohjelmoinnin kurssilla opituilla tekniikoilla ja taidoilla
  * Express.js ja tietokantasovellus. Harjoitustyöni aihe on tikettijärjestelmä ja tiedotussivu ylläpidolle, jolla
  * käyttäjät voivat raportoida ylläpidolle it-järjestelmien ongelmista ja näin it-osasto voi vastata ongelmaan ja
  * pitää seurantaa sen etenemisestä. Lisäksi sivustolla tiedotteet-osio, jonne ylläpito voi julkaista ajankohtaisia
  * tiedotteita, joka liittyvät it-asioihin.
  * 
  * Sovelluksessa on luotu tietokanta tiketit, jossa on kaksi taulua: messages ja bulletins.
  * Messagesista löytyy kaikki tiketit, jotka sinne on talletettu.
  * Bulletinsissta löytyy kaikki tiedotteet.
  * 
  * Sekä tiketteihin että tiedotteisiin voidaan luoda, muokata ja poistaa uusia tiedotteita/tikettejä.
  * Tikettijärjestelmässä ei voida muokata käyttäjän lähettämiä tietoja, mutta tikettijärjestelmän viestejä
  * vastaanottava voi kommentoida tikettiä, nimetä sille tekijän ja kertoa, missä vaiheessa työ on.
  * Tiedotteissa olemassa olevia tiedotteita voi muokata kaikilta osin tai poistaa.
  * 
  * Sovellusta varten tarvitsin express.js:ää, body-parseria, moogoose ja path:ia. Tehtävänannon mukaisesti routerit,
  * controllerit, modelsit, viewsit on jaettu omiin kansioihinsa ja tiketeillä ja tiedotteilla on omat controllerit ja modelsit.
  * 
  * Sovelluksessa on useita pug-templateja ja pääsin harjoittelemaan html:n käyttöä näissä. Se tuntui haastavalta, koska asettelu
  * oli niin tarkkaa, mutta harjoituksen edetessä se alkoi jo sujua. Laitoin templateihin myös omaa css:ää ja onnistui css-tiedostolle
  * luomaan oman pathin ja routen static/css -kansioon. Käytin pathia myös index.html:n käytössä sivulla, mutta se ei oikein toiminut
  * ainakaan oman css:n kanssa (ei asettunut kunnolla). Ei vaikuta hyvältä ratkaisulta.
  * 
  * Käytin myös pathia "logon" asettamiseksi joka sivulle vasempaan yläkulmaan navigaatioon. Hyödynsin omaa css:ää mm. navigaation
  * ulkoasun luonnissa.
  * 
  * Opin harjoituksen tekemisessä yhä enemmän nodejs:stä, miten ohjelmointi toimii, vaikka yhä edelleen tein paljon mallista,
  * joita oli ollut lähipäivinä, oppimateriaaleissa tai muualla netissä. Sain toimivan sovelluksen, jossa vähän uutta, mutta
  * yritin saada erilaisia elementtejä yhdistettyä, mitä aiemmin olemme opiskelleet.
  * 
  * Sovellusta voisi jatkokehittää esimerkiksi kehittämällä tikettijärjestelmään, että se lähettäisi sähköpostia, kun tiketti lähetetään 
  * ja siihen kommentoidaan. Myöskin kirjautumissysteemi olisi varmaan tällaiseen hyvä. Olin ajatellut, että tämä olisi jonkin
  * yrityksen sisäinen järjestelmä, niinpä se voisi olla yrityksen ip-osoitteen takana, jolloin sinne pääsyn voisi sallia vain 
  * yrityksen ip-osoitteista. Tuo ei kuitenkaan poista kirjautumissysteemin tarpeellisuutta. Sisäisen järjestelmän takia ei välttämättä
  * kirjautumista tarvitsisi erikseen kuitenkin katsomaan tikettejä, jotta näkisi sen oman tiketin edistymistä (toki voisi rajoittaa
  * pelkästään oman tiketin näkymiseen, jos kirjautminen rakennetaan).
  * 
  * 
  */