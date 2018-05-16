[![Build status](https://ci.appveyor.com/api/projects/status/ciposawo503g60ej/branch/master?svg=true)](https://ci.appveyor.com/project/jscoobyced/bxbot/branch/master)
[![codecov](https://codecov.io/gh/jscoobyced/bxbot/branch/master/graph/badge.svg)](https://codecov.io/gh/jscoobyced/bxbot)

# BX BOT
Application that help tracing current currency values using [bx.co.th](http://bx.co.th) ticker data.

# Setup

## Application

In a CMD or TERMINAL window, follow those steps:
- To prepare the client-side assets:
```
cd bxbot
yarn install
```

- To build the dotnet core application
```
dotnet restore
dotnet build
dotnet run
```

Then you can open your browser on http://localhost:5000 to browse the application.

## Tests

- To run the unit tests
```
cd ../bxbot-tests
dotnet restore
dotnet build
dotnet test
```
