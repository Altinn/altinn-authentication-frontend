# The new altinn-authentication-frontend
This is the React frontend part of the new altinn-authentication-frontend.<br>
A more detailed description of the project is available at this repo wiki.


## How-to-use this app per. 27.09.23 (this is a work in progress):

Corepack should be installed and enabled, 
https://nodejs.org/api/corepack.html <br>
thus yarn commands will be "intercepted"<br> 
and should work normally.

The web app should be runnable locally, if corepack is installed,<br>
by the following steps using a command line window, <br>
such as VSC Terminal, bash window, ZSH Terminal window or similar:

1. Download the repo using Git
> git clone git@github.com:Altinn/altinn-authentication-frontend.git

Note this assumes that you use SSH keys, but Git documentation will not
be given here.

2. Install Corepack (this depends on your computer setup). 
Check version by
> corepack --version

Version 0.18.0 was sufficient in test for our use.

3. Activate corepack and install the yarn 3.6.3 version used
elsewhere in Altinn.

> corepack enable

> corepack prepare yarn@3.6.3 --activate

Should state: Preparing yarn@3.6.3 for immediate activation...

> corepack yarn

This should install the dependencies listed in package.json

4. Run the Vite webserver script in package.json by
> yarn start

### Links to new pages and paths in the new app

The app should now be running in the Vite webserver,<br>
and is pseudo-available at http://localhost:5173 
(showing just a blue screen), <br>
or http://localhost:5173/authfront/ui/xxx 
(showing an Error Page with a nice seagull).

The new Authentication OverviewPage on the new path is here: <br>
http://localhost:5173/authfront/ui/auth/overview

The new Authentication CreationPage is here: <br>
http://localhost:5173/authfront/ui/auth/creation

The new Authentication DirectConsentPage is here: <br>
http://localhost:5173/authfront/ui/auth/directconsent
