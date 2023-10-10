# Altinn-authentication-frontend repo
Dette er Authentication React frontend med BFF (backend-for-frontend)

### Hvordan sette opp bff app og frontend app så de kjører sammen

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


### nytt bidrag 10 10 2023
The AuthenticationFrontend BFF needs a set of configurations to integrate and run.
During Development it is through local.altinn.cloud

1: See https://github.com/Altinn/app-localtest/tree/AuthFrontLokalTest for changes needed in local-test to run the BFF locally.
: Need to edit the config file in the loadbalancer to forward the correct route, should be part of the above branch already
: Run the loadbalancer in Docker, (docker compose up -d --build .) (then close the local-test, since we run that locally)
: Run the BFF in the local folder (where program.cs is) with dotnet run
: Run the local-test in the local src folder (where program.cs is) with dotnet run
: Run the vite server for the Frontend in it's local folder with yarn start

