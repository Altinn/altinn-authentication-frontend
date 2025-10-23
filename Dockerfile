#Building the Authentication Frontend
FROM node:alpine@sha256:bce79c648e05d584ad9ae2b45ed663ae6f07ebfa9e5fe6f5b7f0165aca06e792 AS generate-authentication-frontend
WORKDIR /build
COPY frontend .
RUN corepack enable
RUN yarn --immutable
RUN yarn build

#Building the Authentication BFF Backend

FROM mcr.microsoft.com/dotnet/sdk:9.0-alpine@sha256:f271ed7d0fd9c5a7ed0acafed8a2bc978bb65c19dcd2eeea0415adef142ffc87 AS generate-authentication-backend

COPY bff/src .
RUN dotnet publish Altinn.Authentication.UI/Altinn.Authentication.UI/Altinn.Authentication.UI.csproj -c Release -r linux-x64 -o /app_output --no-self-contained 

#Building the final image

FROM mcr.microsoft.com/dotnet/aspnet:9.0-alpine@sha256:5e8dca92553951e42caed00f2568771b0620679f419a28b1335da366477d7f98 AS final

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

