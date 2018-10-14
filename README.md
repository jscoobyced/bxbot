AppVeyor build: [![Build status](https://ci.appveyor.com/api/projects/status/ciposawo503g60ej/branch/master?svg=true)](https://ci.appveyor.com/project/jscoobyced/bxbot/branch/master)  
Codecov C# code coverage: [![codecov](https://codecov.io/gh/jscoobyced/bxbot/branch/master/graph/badge.svg)](https://codecov.io/gh/jscoobyced/bxbot)  
SonarCloud statuses: [![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=bxbot&metric=alert_status&v=11)](https://sonarcloud.io/dashboard?id=bxbot)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=bxbot&metric=bugs&v=11)](https://sonarcloud.io/dashboard?id=bxbot)
[![Code Smell](https://sonarcloud.io/api/project_badges/measure?project=bxbot&metric=code_smells&v=11)](https://sonarcloud.io/dashboard?id=bxbot)
[![Code Coverage](https://sonarcloud.io/api/project_badges/measure?project=bxbot&metric=coverage&v=11)](https://sonarcloud.io/dashboard?id=bxbot)

# BX BOT
Application that help tracing current currency values using [bx.co.th](http://bx.co.th) ticker data.

# Setup

## Application

In a CMD or TERMINAL window, follow those steps:
- To prepare the client-side assets:
```
pushd src/ClientApp
yarn install
yarn webpack
popd
```

- To run a mock version (and hot-reload)
```
pushd src/ClientApp
yarn dev-server
```

Then you can open a browser on http://localhost:9000 to browse the mocked application.

- To build the dotnet core application
```
pushd src
dotnet restore
dotnet build
dotnet run --project bxbot
popd
```

Then you can open your browser on http://localhost:5000 to browse the application.

## Tests

- To run the unit tests
```
cd src/bxbot-tests
dotnet test
popd
```
