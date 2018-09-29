Write-Host -------------------------------------- Run test ------------------------------

Write-Host -------------------------------------- ClientApp -----------------------------
Set-Location $env:APPVEYOR_BUILD_FOLDER/$env:ClientApp
yarn --silent run test:coverage
codecov -f $env:TsCoverage

dir $env:MsBuildScanner\$env:SonarScanner

if ( $env:APPVEYOR_PULL_REQUEST_NUMBER )
{
    Write-Host Scanning for PR
    & "$env:MsBuildScanner\$env:SonarScanner\sonar-scanner.bat" `
    -Dsonar.projectKey=$env:SonarProjectKey `
    -Dsonar.projectVersion=$env:APPVEYOR_BUILD_VERSION `
    -Dsonar.sources=. `
    -Dsonar.projectBaseDir=$env:APPVEYOR_BUILD_FOLDER/$env:SrcPath `
    -Dsonar.organization=$env:SonarOrg `
    -Dsonar.host.url=$env:SonarUrl `
    -Dsonar.typescript.lcov.reportPaths=$env:LcovInfo `
    -Dsonar.testExecutionReportPaths=$env:APPVEYOR_BUILD_FOLDER/$env:ClientApp/$env:TsReportPath `
    -Dsonar.typescript.tsconfigPath=$env:TsConfig `
    -Dsonar.login=$env:SonarKey `
    -Dsonar.exclusions="$env:SonarExclusions" `
    -Dsonar.analysis.mode=preview `
    -Dsonar.github.pullRequest=$env:APPVEYOR_PULL_REQUEST_NUMBER `
    -Dsonar.github.repository=$env:APPVEYOR_REPO_NAME `
    -Dsonar.github.oauth=$env:SonarGithubKey
}
elseif ( $env:APPVEYOR_REPO_BRANCH -Eq "master" )
{
    & "$env:MsBuildScanner\$env:SonarScanner\sonar-scanner.bat"  `
    -Dsonar.projectKey=$env:SonarProjectKey `
    -Dsonar.projectVersion=$env:APPVEYOR_BUILD_VERSION `
    -Dsonar.sources=. `
    -Dsonar.projectBaseDir=$env:APPVEYOR_BUILD_FOLDER/$env:SrcPath `
    -Dsonar.organization=$env:SonarOrg `
    -Dsonar.host.url=$env:SonarUrl `
    -Dsonar.typescript.lcov.reportPaths=$env:LcovInfo `
    -Dsonar.testExecutionReportPaths=$env:APPVEYOR_BUILD_FOLDER/$env:ClientApp/$env:TsReportPath `
    -Dsonar.typescript.tsconfigPath=$env:TsConfig `
    -Dsonar.login=$env:SonarKey `
    -Dsonar.exclusions="$env:SonarExclusions"
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

if ( ( $env:APPVEYOR_REPO_BRANCH -Eq "master" ) -Or $env:APPVEYOR_PULL_REQUEST_NUMBER )
{
    Write-Host -------------------------------------- SQ Analysis start ---------------------

    dotnet "C:\ProgramData\chocolatey\lib\sonarscanner-msbuild-netcoreapp2.0\tools\SonarScanner.MSBuild.dll" end /d:sonar.login=$env:SonarKey

    Write-Host -------------------------------------- SQ Analysis done- ---------------------
}

Set-Location $env:APPVEYOR_BUILD_FOLDER

Write-Host -------------------------------------- Netcore done --------------------------
Write-Host -------------------------------------- Run test complete ---------------------