#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 5001

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["src/Keyshoot.Api/Keyshoot.Api.csproj", "src/Keyshoot.Api/"]
COPY ["src/Keyshoot.Infrastructure/Keyshoot.Infrastructure.csproj", "src/Keyshoot.Infrastructure/"]
COPY ["src/Keyshoot.Core/Keyshoot.Core.csproj", "src/Keyshoot.Core/"]
RUN dotnet restore "src/Keyshoot.Api/Keyshoot.Api.csproj"
COPY . .
WORKDIR "/src/src/Keyshoot.Api"
RUN dotnet build "Keyshoot.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Keyshoot.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Keyshoot.Api.dll"]