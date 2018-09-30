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
    & "$env:MsBuildScanner\$env:SonarScanner\sonar-scanner.bat" `
    -D sonar.projectKey=$env:SonarProjectKey `
    -D sonar.projectVersion=$env:APPVEYOR_BUILD_VERSION `
    -D sonar.sources=. `
    -D sonar.projectBaseDir=$env:APPVEYOR_BUILD_FOLDER/$env:ClientApp `
    -D sonar.organization=$env:SonarOrg `
    -D sonar.host.url=$env:SonarUrl `
    -D sonar.login=$env:SonarKey `
    -D sonar.cs.opencover.reportsPaths=$env:CsCoverage `
    -D sonar.typescript.lcov.reportPaths=$env:LcovInfo `
    -D sonar.testExecutionReportPaths=$env:APPVEYOR_BUILD_FOLDER/$env:ClientApp/$env:TsReportPath `
    -D sonar.typescript.tsconfigPath=$env:TsConfig `
    -D sonar.exclusions="$env:SonarExclusions" `
    -D sonar.analysis.mode=preview `
    -D sonar.github.pullRequest=$env:APPVEYOR_PULL_REQUEST_NUMBER `
    -D sonar.github.repository=$env:APPVEYOR_REPO_NAME `
    -D sonar.github.oauth=$env:SonarGithubKey
}
elseif ( $env:APPVEYOR_REPO_BRANCH -Eq "master" )
{
    & "$env:MsBuildScanner\$env:SonarScanner\sonar-scanner.bat" `
    -D sonar.projectKey=$env:SonarProjectKey `
    -D sonar.projectVersion=$env:APPVEYOR_BUILD_VERSION `
    -D sonar.sources=. `
    -D sonar.projectBaseDir=$env:APPVEYOR_BUILD_FOLDER/$env:ClientApp `
    -D sonar.organization=$env:SonarOrg `
    -D sonar.host.url=$env:SonarUrl `
    -D sonar.login=$env:SonarKey `
    -D sonar.cs.opencover.reportsPaths=$env:CsCoverage `
    -D sonar.typescript.lcov.reportPaths=$env:LcovInfo `
    -D sonar.testExecutionReportPaths=$env:APPVEYOR_BUILD_FOLDER/$env:ClientApp/$env:TsReportPath `
    -D sonar.typescript.tsconfigPath=$env:TsConfig `
    -D sonar.exclusions="$env:SonarExclusions"
}

Write-Host -------------------------------------- SQ Analysis done- ---------------------

Set-Location $env:APPVEYOR_BUILD_FOLDER

Write-Host -------------------------------------- Netcore done --------------------------
Write-Host -------------------------------------- Run test complete ---------------------