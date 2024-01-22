# Individuell uppgift - Dashboard

Alex Hansen

## Required API keys

Skapa en "api-keys.json" fil i roten av projektet för api nycklar

### Unsplash | https://unsplash.com/developers

{  
"UNSPLASH_ACCESS_KEY": "..."  
}

## VG-fråga

#### Styrkor

- Jag valde att bygga ut de 7 delarna på ett modulärt sätt i deras js filer. Så alla delar har sin egna js filer som bara innehåller det som hör till just den modulen. Detta hjälper mycket med projektets organisation, enklare förståelse samt läsbarhet då man inte behöver leta igenom irrelevant kod.
- Jag tycker att min struktur i själva js filerna är rätt så bra, vissa är lite röriga men jag skriver nästan all kod i funktioner och bryter ut till mindre funktioner där det blir för mycket eller är logiskt att göra så, som till exempel "loadSingleQuickLink()" i "quickLinks.js"
- Jag såg till att försöka använda mig utav semantisk htlm samt tillämpa tillgänglighets attribut och tänk både i min "index.html" fil samt html element som skapades dynamiskt i js flödet.
- För att försöka få så bra läsbarhet och tydlighet som möjligt i koden försöker jag alltid att skapa väldigt deskriptiva och tydliga namn på js variabler, funktioner, html element samt css klasser. Jag tycker det gör det enkelt att navigera sig runt i kodbasen samt att man i samarbeten får en snabbare förståelse vad allt är till för.

#### Brister

- Det finns en känd bug i "backgroundTheme.js" "updatePlaceholder()" funktionen för att byta ut placeholder rekommendationer. Det är bara en kosmetisk bug och jag vet vad den beror på samt hur jag löser den, men det är inte en prioritet för mig i nuläget.
- Jag kunde ha strukturerat min css på samma sätt som jag gjorde med min js, alltså med modulär struktur. Min "style.css" fil blev över 500 rader och när jag skrev de sista delarna slösades en del tid med att hoppa runt i filen om jag till exempel ville se hur jag styleade en knapp på en annan modul.
- Det finns inte en homogen error hantering i de olika modulera i projektet, samt att i något fall loggas det bara ut i konsolen. Detta kan vara otydligt och förvirrande för en användare men jag känner inte att jag har tillräckligt bra UX kunskaper för att lösa det på ett bra sätt.
