Write-Host -------------------------------------- Build start ---------------------------
Write-Host -------------------------------------- ClientApp -----------------------------

Set-Location $env:APPVEYOR_BUILD_FOLDER/$env:ClientApp
yarn install --silent --no-progress
yarn webpack --silent --no-progress
Set-Location $env:APPVEYOR_BUILD_FOLDER/$env:SrcPath

Write-Host -------------------------------------- ClientApp done ------------------------
Write-Host -------------------------------------- Netcore -------------------------------

dotnet restore

if ( $env:APPVEYOR_PULL_REQUEST_NUMBER )
{
    dotnet "C:\ProgramData\chocolatey\lib\sonarscanner-msbuild-netcoreapp2.0\tools\SonarScanner.MSBuild.dll" begin `
    /k:$env:SonarProjectKey `
    /v:$env:APPVEYOR_BUILD_VERSION `
    /d:sonar.projectBaseDir=$env:APPVEYOR_BUILD_FOLDER/$env:SrcPath `
    /d:sonar.organization=$env:SonarOrg `
    /d:sonar.host.url=$env:SonarUrl `
    /d:sonar.cs.opencover.reportsPaths=$env:CsCoverage `
    /d:sonar.typescript.lcov.reportPaths=$env:LcovInfo `
    /d:sonar.testExecutionReportPaths=$env:APPVEYOR_BUILD_FOLDER/$env:ClientApp/$env:TsReportPath `
    /d:sonar.typescript.tsconfigPath=$env:TsConfig `
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
    /d:sonar.projectBaseDir=$env:APPVEYOR_BUILD_FOLDER/$env:SrcPath `
    /d:sonar.organization=$env:SonarOrg `
    /d:sonar.host.url=$env:SonarUrl `
    /d:sonar.cs.opencover.reportsPaths=$env:CsCoverage `
    /d:sonar.typescript.lcov.reportPaths=$env:LcovInfo `
    /d:sonar.testExecutionReportPaths=$env:APPVEYOR_BUILD_FOLDER/$env:ClientApp/$env:TsReportPath `
    /d:sonar.typescript.tsconfigPath=$env:TsConfig `
    /d:sonar.login=$env:SonarKey `
    /d:sonar.exclusions="$env:SonarExclusions"
}

dotnet build
Set-Location $env:APPVEYOR_BUILD_FOLDER
Write-Host -------------------------------------- Netcore done --------------------------
Write-Host -------------------------------------- Build complete ------------------------