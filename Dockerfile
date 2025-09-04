#Building the Authentication Frontend
FROM node:alpine@sha256:be4d5e92ac68483ec71440bf5934865b4b7fcb93588f17a24d411d15f0204e4f AS generate-authentication-frontend
WORKDIR /build
COPY frontend .
RUN corepack enable
RUN yarn --immutable
RUN yarn build

#Building the Authentication BFF Backend

FROM mcr.microsoft.com/dotnet/sdk:9.0-alpine@sha256:430bd56f4348f9dd400331f0d71403554ec83ae1700a7dcfe1e1519c9fd12174 AS generate-authentication-backend

COPY bff/src .
RUN dotnet publish Altinn.Authentication.UI/Altinn.Authentication.UI/Altinn.Authentication.UI.csproj -c Release -r linux-x64 -o /app_output --no-self-contained 

#Building the final image

FROM mcr.microsoft.com/dotnet/aspnet:9.0-alpine@sha256:d4bf3d8c8f0236341ddd93d15208152e26bc6dcc9d34c635351a3402c284137f AS final

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

