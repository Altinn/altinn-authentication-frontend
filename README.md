# Altinn-authentication-frontend repo

Dette er et monorepo for Authentication React Frontend sub-repo, med tilhørende BFF (backend-for-frontend) sub-repo.

Prosjektet er nystartet og informasjon i README i sub-repo kan være midlertidig eller ufullstendig. Det er også opprettet et Repo Wiki: https://github.com/Altinn/altinn-authentication-frontend/wiki

### Hvordan sette opp diverse prosesser for lokal utvikling

<b>03.11.23</b>
Lokal utvikling med API kall fra React app til BFF dotnet app, og mock av innlogging mot app-localtest dotnet app og Docker, fire prosesser kjørende samtidig. Dette er beskrevet i Repo Wiki (og kort nedunder).

SWAGGER oversikt over API tilgjengelig i browser på
http://localhost:5191/swagger/index.html

### How-to-run BFF integration against app-localtest for mock of login

The Authentication Frontend BFF needs a set of configurations to integrate and run.

During Development it is through local.altinn.cloud

See the branch named "AuthFrontLocalTest" in the Altinn repo app-localtest ( https://github.com/Altinn/app-localtest/tree/AuthFrontLokalTest ), for the changes needed in local-test to run the BFF locally.

For example, one needs to edit the config file in the loadbalancer to forward the correct route. This should be part of the "AuthFrontLocalTest" branch already.

Run the "loadbalancer" (really NginX reverse proxy) in Docker:

> docker compose up -d --build

However, the Docker container "local-test" should be stopped (since we run that locally)

Run the BFF in the local folder (where program.cs is):

> dotnet run

Run the local-test in the local src folder (where program.cs is):

> dotnet run

Install the dependencies for the Frontend in its local folder if you are running the frontend for the first time:

> yarn install

Run the Vite server for the Frontend in its local folder:

> yarn start
