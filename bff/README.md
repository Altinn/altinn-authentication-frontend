# BFF for Authentication-Frontend
This is the sourcecode repository for the Backend for Frontend (BFF) for the Authentication-Frontend React SPA with public URL: authfront/ui

The DOCKERFILE on the root of this Repo builds the docker image for the combined React SPA with BFF.
The BFF's purpose is isolating Altinn APIs from external facing API to enable greater flexibility.

Usually the Altinn APIs have larger models, which are re-mapped to smaller frontend facing DTOs for the React SPA.
The BFF has a MVC HomeController on the public facing URL, which expects a LoggedIn User via ID-porten. https://eid.difi.no/nb/id-porten 
New gets are redirected to ID-porten and returns with valid cookies. Also the HomeController handles other needed authentication concerns,
such as cors, xsrf, user-profile, Altinn-respondee type, etc...

The BFF exposes as set of APIs for the React SPA, with the customized (re-mapped) DTO models it needs to enable it's capabilities,
on the routes: /authfront/api/* These APIs are all re-mapped (proxied) from the "real" Altinn APIs deeper into Altinn.



