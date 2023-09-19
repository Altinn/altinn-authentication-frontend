# altinn-authentication-frontend
This is the React frontend part of altinn-authentication-frontend

How-to-use this app per. 14.09.23 (this is a work in progress):

Corepack should be installed and enabled, 
https://nodejs.org/api/corepack.html
thus yarn commands will be "intercepted" 
and should work as normal.

The web app should be runnable locally, if corepack is installed,
by the following steps using a command line window, such as VSC Terminal, bash window, ZSH Terminal window or similar:

1. Download the repo using Git
> git clone git@github.com:Altinn/altinn-authentication-frontend.git
Note this assumes that you use SSH keys, but Git documentation will not
be given here.

2. Install Corepack (this depends on your computer setup). 
Check version by
> corepack -h
Tested version 0.18.0 was sufficient for our use.

3. Activate corepack and install the yarn 3.6.3 version used
elsewhere in Altinn.
> corepack enable

> corepack prepare yarn@3.6.3 --activate
Should state: Preparing yarn@3.6.3 for immediate activation...

> corepack yarn
This should install the dependencies listed in package.json

4. Run the Vite webserver script in package.json by
> yarn start

The app should now be running in the Vite webserver,
and is pseudo-available at http://localhost:5173
(showing just a blue screen)

and at http://localhost:5173/accessmanagement/ui/overview/
where a pretty Error Page is available, 

or the reachable URL
http://localhost:5173/accessmanagement/ui/offered-api-delegations/overview
where you can see the old Access Management Overview page.

Please enjoy the seagull while we rebuild the app.