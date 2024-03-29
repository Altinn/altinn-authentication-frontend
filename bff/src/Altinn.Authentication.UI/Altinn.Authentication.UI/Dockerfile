#Building the Authentication Frontend
FROM node:alpine AS generate-authentication-frontend
WORKDIR /build
COPY frontend .
RUN corepack enable
RUN yarn --immutable
RUN yarn build

#Building the Authentication BFF Backend
FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS generate-authentication-bff
WORKDIR /build
COPY bff .
RUN dotnet build src/Altinn.Authentication.UI/Altinn.Authentication.UI/Altinn.Authentication.UI.csproj -c Release -o /app_output
RUN dotnet publish src/Altinn.Authentication.UI/Altinn.Authentication.UI/Altinn.Authentication.UI.csproj -c Release -o /app_output

#Building the final image
FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS final
EXPOSE 80
#EXPOSE 443
WORKDIR /app
ENV ASPNETCORE_ENVIRONMENT=Development
RUN apk add --no-cache icu-libs krb5-libs libgcc libintl libssl1.1 libstdc++ zlib

COPY --from=generate-authentication-bff /app_output .
COPY --from=generate-authentication-frontend /build/dist/assets ./wwwroot/authentication/assets
COPY --from=generate-authentication-frontend /build/src/localizations ./wwwroot/authentication/localizations
COPY --from=generate-authentication-frontend /build/dist/manifest.json ./wwwroot/authentication

ENTRYPOINT ["dotnet", "Altinn.Authentication.UI.dll"]

