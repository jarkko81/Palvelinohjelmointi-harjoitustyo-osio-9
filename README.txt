Palvelinohjelmointi 12.6.2019
Jarkko Nieminen


OSIO 9: HARJOITUSTYÖ - TIKETTI- JA TIEDOTESOVELLUS

Sovellus käynnistetään sovelluksen juuritiedostosta löytyvästä app.js-tiedostosta.
Sovellus löytyy myös Githubista: https://github.com/jarkko81/Palvelinohjelmointi-harjoitustyo-osio-9
Lisätietoa sovelluksesta löytyy alla olevasta oppimispäiväkirjasta.


OPPIMISPÄIVÄKIRJA


Harjoitustyön tavoitteena oli luoda Palvelinohjelmoinnin kurssilla opituilla tekniikoilla ja taidoilla
Express.js ja tietokantasovellus. Harjoitustyöni aihe on tikettijärjestelmä ja tiedotussivu ylläpidolle, jolla
käyttäjät voivat raportoida ylläpidolle it-järjestelmien ongelmista ja näin it-osasto voi vastata ongelmaan ja
pitää seurantaa sen etenemisestä. Lisäksi sivustolla tiedotteet-osio, jonne ylläpito voi julkaista ajankohtaisia
tiedotteita, joka liittyvät it-asioihin.
  
Sovelluksessa on luotu tietokanta tiketit, jossa on kaksi taulua: messages ja bulletins.
Messagesista löytyy kaikki tiketit, jotka sinne on talletettu.
Bulletinsissta löytyy kaikki tiedotteet.
  
Sekä tiketteihin että tiedotteisiin voidaan luoda, muokata ja poistaa uusia tiedotteita/tikettejä.
Tikettijärjestelmässä ei voida muokata käyttäjän lähettämiä tietoja, mutta tikettijärjestelmän viestejä
vastaanottava voi kommentoida tikettiä, nimetä sille tekijän ja kertoa, missä vaiheessa työ on.
Tiedotteissa olemassa olevia tiedotteita voi muokata kaikilta osin tai poistaa.
  
Sovellusta varten tarvitsin express.js:ää, body-parseria, moogoose ja path:ia. Tehtävänannon mukaisesti routerit,
controllerit, modelsit, viewsit on jaettu omiin kansioihinsa ja tiketeillä ja tiedotteilla on omat controllerit ja modelsit.
  
Sovelluksessa on useita pug-templateja ja pääsin harjoittelemaan html:n käyttöä näissä. Se tuntui haastavalta, koska asettelu
oli niin tarkkaa, mutta harjoituksen edetessä se alkoi jo sujua. Laitoin templateihin myös omaa css:ää ja onnistui css-tiedostolle
luomaan oman pathin ja routen static/css -kansioon. Käytin pathia myös index.html:n käytössä sivulla, mutta se ei oikein toiminut
ainakaan oman css:n kanssa (ei asettunut kunnolla). Ei vaikuta hyvältä ratkaisulta.
  
Käytin myös pathia "logon" asettamiseksi joka sivulle vasempaan yläkulmaan navigaatioon. Hyödynsin omaa css:ää mm. navigaation
ulkoasun luonnissa.
  
Opin harjoituksen tekemisessä yhä enemmän nodejs:stä, miten ohjelmointi toimii, vaikka yhä edelleen tein paljon mallista,
joita oli ollut lähipäivinä, oppimateriaaleissa tai muualla netissä. Sain toimivan sovelluksen, jossa vähän uutta, mutta
yritin saada erilaisia elementtejä yhdistettyä, mitä aiemmin olemme opiskelleet.
  
Sovellusta voisi jatkokehittää esimerkiksi kehittämällä tikettijärjestelmään, että se lähettäisi sähköpostia, kun tiketti lähetetään 
ja siihen kommentoidaan. Myöskin kirjautumissysteemi olisi varmaan tällaiseen hyvä. Olin ajatellut, että tämä olisi jonkin
yrityksen sisäinen järjestelmä, niinpä se voisi olla yrityksen ip-osoitteen takana, jolloin sinne pääsyn voisi sallia vain 
yrityksen ip-osoitteista. Tuo ei kuitenkaan poista kirjautumissysteemin tarpeellisuutta. Sisäisen järjestelmän takia ei välttämättä
kirjautumista tarvitsisi erikseen kuitenkin katsomaan tikettejä, jotta näkisi sen oman tiketin edistymistä (toki voisi rajoittaa
pelkästään oman tiketin näkymiseen, jos kirjautminen rakennetaan).