# The Cypress tests for altinn-authentication-frontend
This is the working folder for Cypress tests for the React frontend part of the new altinn-authentication-frontend.<br>

Cypress Documentation and Guides are available here:<br>
https://docs.cypress.io/guides/references/configuration

The cypress.config.js is partly based on Altinn Studio cypress.config.js,
and partly on the Cypress Docs linked above.

## How-to-use Cypress tests, per 02.11.23, using yarn scripts
The React app should be up and running, along with the other 3 processes
(BFF dotnet app, app-localtest dotnet app, app-localtest Docker loadbalancer/NginX etc, see README or Repo Wiki).

For the initial run, one should navigate into the root cypress folder,
install yarn dependencies (yarn command), and then run a script listed
in package.json (e.g. yarn cy_open)

> cd cypress <br>
> yarn <br>
> yarn cy_open

A Cypress window should open. You should click E2E Testing.<br>
Then choose Electron browser (Chrome did not work well initially),<br> 
and run the first test by clicking the spec file<br>
test1.cy.js

Then Cypress should log in via http://local.altinn.cloud/, <br>
and go to http://local.altinn.cloud/authfront/ui/auth/overview

If it is not working, the control test-file <br>
spec.cy.js <br>
should be run as a control for the Cypress runner <br> 
(goes to https://example.cypress.io )



## How-to-use Cypress tests per 30.10.23 using npx:
The React app should be up and running, along with the other 3 processes
(BFF dotnet app, app-localtest dotnet app, app-localtest Docker loadbalancer/NginX etc, see README or Repo Wiki).


<b>30.10.23:</b> The first Cypress End-to-end (E2E) test is ready at root in /cypress/

Running Cypress tests requires that Docker and the 3 apps are running (see other README).

The Cypress version v13.3.3 should be installed. Version 13.4.0 now also works.

Briefly, start the Cypress Runner by entering the /cypress/ folder <br>
and running the npx cypres open command: 

> cd cypress <br>
> npx cypress open

A Cypress window should open. You should click E2E Testing.<br>
Then choose Electron browser (Chrome did not work well initially),<br> 
and run the first test by clicking the spec file<br>
test1.cy.js

Then Cypress should log in via http://local.altinn.cloud/, <br>
and go to http://local.altinn.cloud/authfront/ui/auth/overview

If it is not working, the control test-file <br>
spec.cy.js <br>
should run as a control for the Cypress runner (goes to https://example.cypress.io )

