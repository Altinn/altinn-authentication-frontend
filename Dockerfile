#Building the Authentication Frontend
FROM node:alpine@sha256:91aa1bb6b5f57ec5109155332f4af2aa5d73ff7b4512c8e5dfce5dc88dbbae0e AS generate-authentication-frontend
WORKDIR /build
COPY frontend .
RUN corepack enable
RUN yarn --immutable
RUN yarn build

#Building the Authentication BFF Backend

FROM mcr.microsoft.com/dotnet/sdk:9.0-alpine@sha256:2244f80ac7179b0feaf83ffca8fe82d31fbced5b7e353755bf9515a420eba711 AS generate-authentication-backend

COPY bff/src .
RUN dotnet publish Altinn.Authentication.UI/Altinn.Authentication.UI/Altinn.Authentication.UI.csproj -c Release -r linux-x64 -o /app_output --no-self-contained 

#Building the final image

FROM mcr.microsoft.com/dotnet/aspnet:9.0-alpine@sha256:ea72850bd81ba5c95ba88641a4fa315471bef9e3d1cd7e26c2594faff56e3a36 AS final

EXPOSE 8080/tcp
#EXPOSE 443
WORKDIR /app
#ENV ASPNETCORE_ENVIRONMENT=Development
RUN apk add --no-cache icu-libs krb5-libs libgcc libintl libssl3 libstdc++ zlib

COPY --from=generate-authentication-backend /app_output .
COPY --from=generate-authentication-frontend /build/dist/assets ./wwwroot/authentication/assets
COPY --from=generate-authentication-frontend /build/src/localizations ./wwwroot/authentication/localizations
COPY --from=generate-authentication-frontend /build/dist/manifest.json ./wwwroot/authentication

RUN mkdir /tmp/logtelemetry
ENTRYPOINT ["dotnet", "Altinn.Authentication.UI.dll"]

