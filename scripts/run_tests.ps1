Write-Host -------------------------------------- Run test ------------------------------

Write-Host --------------------------------- ClientApp Tests-----------------------------
Set-Location $env:APPVEYOR_BUILD_FOLDER/$env:ClientApp
yarn --silent run test:coverage
codecov -f $env:TsCoverage
Set-Location $env:APPVEYOR_BUILD_FOLDER/$env:SrcPath

Write-Host -------------------------------- ClientApp Tests done ------------------------
Write-Host -------------------------------- Netcore Tests -------------------------------

& $env:USERPROFILE\.nuget\packages\opencover\4.6.519\tools\OpenCover.Console.exe `
-register:user `
-oldStyle `
-target:"dotnet.exe" `
-targetargs:"$env:CsTarget" `
-filter:"$env:CsFilter" `
-output:"$env:CsCoverage"

codecov -f $env:CsCoverage

Write-Host -------------------------------------- SQ Analysis start ---------------------

if ( $env:APPVEYOR_PULL_REQUEST_NUMBER )
{
    dotnet "$env:MsBuildScanner\SonarScanner.MSBuild.dll" begin `
    /k:$env:SonarProjectKey `
    /v:$env:APPVEYOR_BUILD_VERSION `
    /d:sonar.projectBaseDir=$env:APPVEYOR_BUILD_FOLDER/$env:SrcPath `
    /d:sonar.organization=$env:SonarOrg `
    /d:sonar.host.url=$env:SonarUrl `
    /d:sonar.login=$env:SonarKey `
    /d:sonar.cs.opencover.reportsPaths=$env:CsCoverage `
    /d:sonar.typescript.lcov.reportPaths=$env:LcovInfo `
    /d:sonar.testExecutionReportPaths=$env:APPVEYOR_BUILD_FOLDER/$env:ClientApp/$env:TsReportPath `
    /d:sonar.typescript.tsconfigPath=$env:TsConfig `
    /d:sonar.exclusions="$env:SonarExclusions" `
    /d:sonar.coverage.exclusions="$env:SonarCoverageExclusions" `
    /d:sonar.analysis.mode=preview `
    /d:sonar.github.pullRequest=$env:APPVEYOR_PULL_REQUEST_NUMBER `
    /d:sonar.github.repository=$env:APPVEYOR_REPO_NAME `
    /d:sonar.github.oauth=$env:SonarGithubKey
}
elseif ( $env:APPVEYOR_REPO_BRANCH -Eq "master" )
{
    dotnet "$env:MsBuildScanner\SonarScanner.MSBuild.dll" begin `
    /k:$env:SonarProjectKey `
    /v:$env:APPVEYOR_BUILD_VERSION `
    /d:sonar.projectBaseDir=$env:APPVEYOR_BUILD_FOLDER/$env:SrcPath `
    /d:sonar.organization=$env:SonarOrg `
    /d:sonar.host.url=$env:SonarUrl `
    /d:sonar.login=$env:SonarKey `
    /d:sonar.cs.opencover.reportsPaths=$env:CsCoverage `
    /d:sonar.typescript.lcov.reportPaths=$env:LcovInfo `
    /d:sonar.testExecutionReportPaths=$env:APPVEYOR_BUILD_FOLDER/$env:ClientApp/$env:TsReportPath `
    /d:sonar.typescript.tsconfigPath=$env:TsConfig `
    /d:sonar.exclusions="$env:SonarExclusions" `
    /d:sonar.coverage.exclusions="$env:SonarCoverageExclusions"
}

dotnet build

if ( ( $env:APPVEYOR_REPO_BRANCH -Eq "master" ) -Or $env:APPVEYOR_PULL_REQUEST_NUMBER )
{
    dotnet "C:\ProgramData\chocolatey\lib\sonarscanner-msbuild-netcoreapp2.0\tools\SonarScanner.MSBuild.dll" end /d:sonar.login=$env:SonarKey
}

Write-Host -------------------------------------- SQ Analysis done- ---------------------

Set-Location $env:APPVEYOR_BUILD_FOLDER

Write-Host -------------------------------------- Netcore done --------------------------
Write-Host -------------------------------------- Run test complete ---------------------