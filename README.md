# Jsramverk - Min Editor - Backend

Hur man installerar modulerna, startar mitt API samt hur mina routes är strukturerade.

## Installera modulerna

Modulerna som används är: Express, Cors och Morgan. Även body-parser och MongoDB används. 

### Installera Express, Cors, Morgan och body-parser

npm install express cors morgan --save
npm install body-parser

### Installera MongoDB

brew tap mongodb/brew
brew install mongodb-community@4.4

NOTE: Senaste versionen av mongodb-community är 5.0. 
Jag använder mig av version 4.4 då mitt OS inte stödjer 5.0. 

## Starta API:t

### Starta mongodb

mongo
use editor
node src/setup.js

### Express

npm run start

NOTE: detta kör scriptet "start", som inkluderar "node app.js".

## Routes strukturen

Strukturen är väldigt grundläggande nu och inte så DRY som den skulle kunna vara. Detta ska uppdateras framöver. 
src/setup.js och src/setup.json är till för att skapa de första exempel-dokumenten. 
I routes har jag två vägar: 
doclist.js samt index.js. 
doclist.js är routen som har hand om vår GET-request när vi vill hämta alla dokumenten. 
Resten av våra requests handhålls via index (POST ett nytt dokument och PUT ett befintligt dokument).
Där finns även en route för en GET-request på index, där vi visar "hello world", om man snabbt vill se så att det funkar. 

Framöver kan en smidigare route-struktur implementeras, tillsammans med en database.js fil som handhåller databas-hanteringen (som visas i kursexemplet). 
