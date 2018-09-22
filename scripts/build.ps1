Write-Host -------------------------------------- Build start -----------------
Write-Host -------------------------------------- ClientApp -------------------

Set-Location src/ClientApp
yarn --silent --no-progress install
yarn --silent --no-progress webpack
Set-Location ..

Write-Host -------------------------------------- ClientApp done --------------
Write-Host -------------------------------------- Netcore ---------------------

if ( $env:APPVEYOR_PULL_REQUEST_NUMBER )
{
    dotnet "C:\ProgramData\chocolatey\lib\sonarscanner-msbuild-netcoreapp2.0\tools\SonarScanner.MSBuild.dll" begin `
    /k:$env:SonarProjectKey `
    /v:$env:APPVEYOR_BUILD_VERSION `
    /d:sonar.organization=$env:SonarOrg `
    /d:sonar.host.url=$env:SonarUrl `
    /d:sonar.cs.opencover.reportsPaths=coverage.xml `
    /d:sonar.typescript.lcov.reportPaths=ClientApp/tscoverage/lcov.info `
    /d:sonar.typescript.tsconfigPath=ClientApp/tsconfig.json `
    /d:sonar.login=$env:SonarKey `
    /d:sonar.exclusions="$env:SonarExclusions" `
    /d:sonar.analysis.mode=preview `
    /d:sonar.github.pullRequest=$env:APPVEYOR_PULL_REQUEST_NUMBER `
    /d:sonar.github.repository=$env:APPVEYOR_REPO_NAME `
    /d:sonar.github.oauth=$env:SonarGithubKey
}
elseif ( $env:APPVEYOR_REPO_BRANCH -Eq "master" )
{
    dotnet "C:\ProgramData\chocolatey\lib\sonarscanner-msbuild-netcoreapp2.0\tools\SonarScanner.MSBuild.dll" begin `
    /k:$env:SonarProjectKey `
    /v:$env:APPVEYOR_BUILD_VERSION `
    /d:sonar.organization=$env:SonarOrg `
    /d:sonar.host.url=$env:SonarUrl `
    /d:sonar.cs.opencover.reportsPaths=coverage.xml `
    /d:sonar.typescript.lcov.reportPaths=ClientApp/tscoverage/lcov.info `
    /d:sonar.typescript.tsconfigPath=ClientApp/tsconfig.json `
    /d:sonar.login=$env:SonarKey `
    /d:sonar.exclusions="$env:SonarExclusions"
}

dotnet restore
dotnet build
Set-Location ..

Write-Host -------------------------------------- Netcore done ----------------
Write-Host -------------------------------------- Build complete --------------