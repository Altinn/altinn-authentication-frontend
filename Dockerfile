#Building the Authentication Frontend
FROM node:alpine@sha256:7e467cc5aa91c87e94f93c4608cf234ca24aac3ec941f7f3db207367ccccdd11 AS generate-authentication-frontend
WORKDIR /build
COPY frontend .
RUN corepack enable
RUN yarn --immutable
RUN yarn build

#Building the Authentication BFF Backend

FROM mcr.microsoft.com/dotnet/sdk:9.0-alpine@sha256:512f8347b0d2f9848f099a8c31be07286955ceea337cadb1114057ed0b15862f AS generate-authentication-backend

COPY bff/src .
RUN dotnet publish Altinn.Authentication.UI/Altinn.Authentication.UI/Altinn.Authentication.UI.csproj -c Release -r linux-x64 -o /app_output --no-self-contained 

#Building the final image

FROM mcr.microsoft.com/dotnet/aspnet:9.0-alpine@sha256:07c48612ac44393b15e741734761cf1f30cdb8f7e645e66e25b4563681ceef99 AS final

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

