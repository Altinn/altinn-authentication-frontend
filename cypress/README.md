# The Cypress tests for altinn-authentication-frontend
This is the working folder for Cypress tests for the React frontend part of the new altinn-authentication-frontend.<br>


## How-to-use Cypress tests per 30.10.23 (this is a work in progress):

The React app should be up and running, along with the other 3 processes
(BFF dotnet app, app-localtest dotnet app, app-localtest Docker loadbalancer/NginX etc, see README or Repo Wiki).


<b>30.10.23:</b> The first Cypress End-to-end (E2E) test is ready at root in /cypress/

Running Cypress tests requires that Docker and the 3 apps are running (see other README).

The Cypress version v13.3.3 should be installed. Briefly, start the Cypress Runneer by entering the /cypress/ folder and running the npx cypres open command: 

> cd cypress <br>
> npx cypress open

A Cypress window should open. You should click E2E Testing.<br>
Then choose Electron browser, and run first test by clicking<br>
test1.cy.js

Then Cypress should log in via http://local.altinn.cloud/, <br>
and go to http://local.altinn.cloud/authfront/ui/auth/overview

If it is not working, the control test-file <br>
spec.cy.js <br>
should run as a control for the Cypress runner (goes to https://example.cypress.io )

