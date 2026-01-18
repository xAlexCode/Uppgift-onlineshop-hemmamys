# Lägg upp en plan för arbetet här!
Skriv så mycket kommentarer som möjligt för att förstå allt för uppgiften
- Börja med wireframe och psuedokod. 

Började rita wireframe på papper och började rita ett flöde i miro, kommer infoga senare.

## Listan med namn, pris, betyg och kategori:
- Skapa en lista med 10 produkter till online shopen. Listan ska innehålla namn, pris, betyg, bild, kategori.
- För att göra det behövs en array med objekt som innehållet flera värden, sedan bygger man upp en template literal (htmlstruktur) och tar produkt värderna för varje ex produkt.name

Först hämta lista med produkter
Töm produktlistan i DOM
Loopa igenom arrayen för varje produkt i listan:
- Skapa en artikel
- Lägg till bild, namn, pris, kategori och rating
- Lägg till artikeln i produktlistan ()

## Filter funktion
- Skapa en kopia av produkterna i arrayen så inte orginalet ändras, hämta knapparna först och lägg till eventlistener.

När man trycker på sött kategorin:
- Filtrera produkterna och behåll endast de produkter som ligger i kategorin sött
- Spara resultatet i filteredProducts
- Skriv ut produkterna igen

## Sorteringsfunktion
- En button för sött, surt, choklad och rating. Hämta knapparna först och lägg till eventListener. 

När användaren klickar på button ex sött:
- Sortera listan filteredProducts i stigande ordning baserat på pris
- Skriv ut produkterna igen

## Toggle - och + för antal i kundvagn.
- Till att börja med gissningsvis behövs en button för -, ett input fält för antal och ytterligare en button till +. 
- Inputfältet ska visa/kunna ändras genom att skriva manuellt i fältet.
- När man trycker på -/+ ska antalet i inputfältet minska eller öka.

## Button för lägg till i kundvagn.
- En button för att lägga till i kundvagnen efter du valt antal godisar, antar att man ska koppla ett event med antalet godisar så att dem vid click läggs till i kundvagnsiconen överst på sidan. 
- Enligt uppgift får man inte acceptera negativt antal skapa if sats att om antalet är mindre än 1 ska det registreras som 1? 

## Sammanställning av kundvagn
- Du ska kunna klicka på kundvagnen och se en sammanställning av artiklar och kunna klicka sig vidare till beställningsformuläret. Beskriv senare


## Beställningsformuläret
- Beställningsformulärt ska innehålla ett forumlär med alla uppgifter för leverans. 