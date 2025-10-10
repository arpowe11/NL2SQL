FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["NL2SQL.Api/NL2SQL.Api.csproj", "NL2SQL.Api/"]
RUN dotnet restore "NL2SQL.Api/NL2SQL.Api.csproj"
COPY . .
WORKDIR "/src/NL2SQL.Api"
RUN dotnet build "./NL2SQL.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./NL2SQL.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NL2SQL.Api.dll"]
