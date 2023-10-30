# The Cypress tests for altinn-authentication-frontend
This is the working folder for Cypress tests for the React frontend part of the new altinn-authentication-frontend.<br>

// Branch er cypress1, som jeg skal sette opp ting på,
// men lite av dette kommer inn i ferdig versjon vil jeg tro:
// Noatater og kode på tidligere Cypress arbeid finnes:
1) /repos/Cypress/
2) /0_0_1_Programmering/Cypress_070823/
3) /0_0_1_Programmering/DigDir_prosjekter/PluralSight...

Jeg baserer meg først på gammel Cypress9 kode i 
/repos/Cypress/Cypress-Fundamentals/
der man har 3 kataloger, side-om-side,
/api/, /app/ og /cypress/
der api og app kjører sammen, 
og så blir /cypress/ startet på utsiden, med 
> npx et-eller-annet

Tror jeg har noen notater på dette etter "npx" søk i /Cypress_070823/,
ja notater av 03.08.23 er relevante for helt basale start-kommandoer.




## How-to-use these Cypress tests 26.10.23 (this is a work in progress):

The React app should be up and running, along with the other 3 processes
(BFF dotnet app, app-localtest dotnet app, app-localtest Docker loadbalancer/NginX etc, see README or Repo Wiki).



### Links to new pages and paths in the new app

The app should now be running in the Vite webserver,<br>
and is pseudo-available at http://localhost:5173 
(showing just a blue screen), <br>

(just yet the base-path to website is a bit unclear...)

