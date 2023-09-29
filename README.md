# Altinn-authentication-frontend repo
Dette er Authentication React frontend med BFF (backend-for-frontend)

# Hvordan sette opp bff app og frontend app så de kjører sammen
Det er nå fungerende kontakt mellom kjørende React frontend og BFF apper, <br>
som var et viktig først delmål for utvikling av løsningen.

Om en kjører opp React frontend med Vite server <br>
(se README i /frontend/ sub-repo), <br>

og kjører opp BFF med Kestrel server
(se README i /bff/ sub-repo, men kort sagt, kjør 
> dotnet run <br>
der .csproj filen er)

så er SWAGGER oversikt over API tilgjengelig i browser på 
http://localhost:5191/swagger/index.html

og vår frontend Overview side tilgjengelig på 
http://localhost:5191/authfront/ui/auth/overview

Dette fungerer nå både på Mac og på PC.