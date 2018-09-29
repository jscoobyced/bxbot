Write-Host -------------------------------------- Run test ------------------------------

Write-Host -------------------------------------- ClientApp -----------------------------
Set-Location $env:APPVEYOR_BUILD_FOLDER/$env:ClientApp
yarn --silent run test:coverage
codecov -f $env:TsCoverage

if ( $env:APPVEYOR_PULL_REQUEST_NUMBER )
{
    & "$env:MsBuildScanner\$env:SonarScanner\sonar-scanner.bat" `
    -D sonar.projectKey=$env:SonarProjectKey `
    -D sonar.projectVersion=$env:APPVEYOR_BUILD_VERSION `
    -D sonar.sources=. `
    -D sonar.projectBaseDir=$env:APPVEYOR_BUILD_FOLDER/$env:ClientApp `
    -D sonar.organization=$env:SonarOrg `
    -D sonar.host.url=$env:SonarUrl `
    -D sonar.typescript.lcov.reportPaths=$env:LcovInfo `
    -D sonar.testExecutionReportPaths=$env:APPVEYOR_BUILD_FOLDER/$env:ClientApp/$env:TsReportPath `
    -D sonar.typescript.tsconfigPath=$env:TsConfig `
    -D sonar.login=$env:SonarKey `
    -D sonar.exclusions="$env:SonarExclusions" `
    -D sonar.exclusions="$env:SonarExclusions" `
    -D sonar.analysis.mode=preview `
    -D sonar.github.pullRequest=$env:APPVEYOR_PULL_REQUEST_NUMBER `
    -D sonar.github.repository=$env:APPVEYOR_REPO_NAME `
    -D sonar.github.oauth=$env:SonarGithubKey
}
elseif ( $env:APPVEYOR_REPO_BRANCH -Eq "master" )
{
    & "$env:MsBuildScanner\$env:SonarScanner\sonar-scanner.bat"  `
    -D sonar.projectKey=$env:SonarProjectKey `
    -D sonar.projectVersion=$env:APPVEYOR_BUILD_VERSION `
    -D sonar.sources=. `
    -D sonar.projectBaseDir=$env:APPVEYOR_BUILD_FOLDER/$env:ClientApp `
    -D sonar.organization=$env:SonarOrg `
    -D sonar.host.url=$env:SonarUrl `
    -D sonar.typescript.lcov.reportPaths=$env:LcovInfo `
    -D sonar.testExecutionReportPaths=$env:APPVEYOR_BUILD_FOLDER/$env:ClientApp/$env:TsReportPath `
    -D sonar.typescript.tsconfigPath=$env:TsConfig `
    -D sonar.login=$env:SonarKey `
    -D sonar.exclusions="$env:SonarExclusions"
}

Set-Location $env:APPVEYOR_BUILD_FOLDER/$env:SrcPath

Write-Host -------------------------------------- ClientApp done ------------------------
Write-Host -------------------------------------- Netcore -------------------------------

& $env:USERPROFILE\.nuget\packages\opencover\4.6.519\tools\OpenCover.Console.exe `
-register:user `
-oldStyle `
-target:"dotnet.exe" `
-targetargs:"$env:CsTarget" `
-filter:"$env:CsFilter" `
-output:"$env:CsCoverage"

codecov -f $env:CsCoverage

if ( $env:APPVEYOR_PULL_REQUEST_NUMBER )
{
    dotnet "$env:MsBuildScanner\SonarScanner.MSBuild.dll" begin `
    /k:$env:SonarProjectKey `
    /v:$env:APPVEYOR_BUILD_VERSION `
    /d:sonar.projectBaseDir=$env:APPVEYOR_BUILD_FOLDER/$env:SrcPath `
    /d:sonar.organization=$env:SonarOrg `
    /d:sonar.host.url=$env:SonarUrl `
    /d:sonar.cs.opencover.reportsPaths=$env:CsCoverage `
    /d:sonar.login=$env:SonarKey `
    /d:sonar.exclusions="$env:SonarExclusions" `
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
    /d:sonar.cs.opencover.reportsPaths=$env:CsCoverage `
    /d:sonar.login=$env:SonarKey `
    /d:sonar.exclusions="$env:SonarExclusions"
}

dotnet build

if ( ( $env:APPVEYOR_REPO_BRANCH -Eq "master" ) -Or $env:APPVEYOR_PULL_REQUEST_NUMBER )
{
    Write-Host -------------------------------------- SQ Analysis start ---------------------

    dotnet "C:\ProgramData\chocolatey\lib\sonarscanner-msbuild-netcoreapp2.0\tools\SonarScanner.MSBuild.dll" end /d:sonar.login=$env:SonarKey

    Write-Host -------------------------------------- SQ Analysis done- ---------------------
}

Set-Location $env:APPVEYOR_BUILD_FOLDER

Write-Host -------------------------------------- Netcore done --------------------------
Write-Host -------------------------------------- Run test complete ---------------------