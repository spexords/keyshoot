#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 7001

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["src/Keyshoot.Identity/Keyshoot.Identity.csproj", "src/Keyshoot.Identity/"]
COPY ["src/Keyshoot.Core/Keyshoot.Core.csproj", "src/Keyshoot.Core/"]
RUN dotnet restore "src/Keyshoot.Identity/Keyshoot.Identity.csproj"
COPY . .
WORKDIR "/src/src/Keyshoot.Identity"
RUN dotnet build "Keyshoot.Identity.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Keyshoot.Identity.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Keyshoot.Identity.dll"]