I detta repository har jag skapat en enkel REST API med Express
Jag har använt Mongodb som databas. 
Funktionalitet för CRUD finns

Apiet använder port 3000

Länk till webbsida
https://studenter.miun.se/~mifr2204/backend/project/index.html

länk till git webbtjänst
https://github.com/mifr2204/backend-proj-webbtj.git

länk till git webbsida
https://github.com/mifr2204/backend-proj-sida.git

Installation och databas
Mongodb används som databas av APIet. 
Klona ner källkodsfilerna, kör kommandona: npm install sedan node server.js (npm start)

Användning
Hur man nå APIet:

Metod	Ändpunkt	    Beskrivning
GET	    /api/menu	    Hämtar alla tillgängliga produkt.
POST	/api/menu	    Lagrar en ny produkt.
PUT	    /api/menu/:ID	Uppdaterar en produkt. 
DELETE	/api/menu/:ID	Raderar en produkt.


Ett meny-objekt returneras/skickas som JSON med följande struktur:

{
   "name": "Margerita",
   "type": "pizza",
   "description": "beskrivning",
   "prize": "50",
 
}