Write-Host -------------------------------------- Build start ---------------------------
Write-Host -------------------------------------- ClientApp -----------------------------

Set-Location $env:APPVEYOR_BUILD_FOLDER/$env:ClientApp
yarn install --silent --no-progress
yarn webpack --silent --no-progress
yarn --silent run test:coverage

cat C:\ProgramData\chocolatey\lib\sonarscanner-msbuild-netcoreapp2.0\tools\sonar-scanner-3.2.0.1227\conf\sonar-scanner.properties
if ( $env:APPVEYOR_PULL_REQUEST_NUMBER )
{
    Write-Host Scanning for PR
    & "$env:MsBuildScanner\$env:SonarScanner\sonar-scanner.bat" `
    -D sonar.projectKey=$env:SonarProjectKey `
    -D sonar.projectVersion=$env:APPVEYOR_BUILD_VERSION `
    -D sonar.sources=. `
    -D sonar.projectBaseDir=$env:APPVEYOR_BUILD_FOLDER/$env:SrcPath `
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
    -D sonar.projectBaseDir=$env:APPVEYOR_BUILD_FOLDER/$env:SrcPath `
    -D sonar.organization=$env:SonarOrg `
    -D sonar.host.url=$env:SonarUrl `
    -D sonar.typescript.lcov.reportPaths=$env:LcovInfo `
    -D sonar.testExecutionReportPaths=$env:APPVEYOR_BUILD_FOLDER/$env:ClientApp/$env:TsReportPath `
    -D sonar.typescript.tsconfigPath=$env:TsConfig `
    -D sonar.login=$env:SonarKey `
    -D sonar.exclusions="$env:SonarExclusions"
}

Set-Location $env:APPVEYOR_BUILD_FOLDER
Write-Host -------------------------------------- Build complete ------------------------