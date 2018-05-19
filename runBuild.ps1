Write-Host "Build version : $env:APPVEYOR_BUILD_VERSION"
Write-Host "Author        : $env:APPVEYOR_REPO_COMMIT_AUTHOR"
Write-Host "Branch        : $env:APPVEYOR_REPO_BRANCH"

Set-Location bxbot
yarn install
Set-Location ..

dotnet restore

choco install codecov

$sonar = "C:\ProgramData\bxbot\sonar-msbuild"
$source = "https://github.com/SonarSource/sonar-scanner-msbuild/releases/download/4.2.0.1214/sonar-scanner-msbuild-4.2.0.1214-netcoreapp2.0.zip"
$destination = "C:\ProgramData\bxbot\sonar-scanner-msbuild-4.2.0.1214-netcoreapp2.0.zip"
Invoke-WebRequest $source -OutFile $destination
7z x $destination -o$sonar

if ( -Not $env:APPVEYOR_PULL_REQUEST_NUMBER )
{
    dotnet "$sonar\SonarScanner.MSBuild.dll" `
        begin `
        /k:"bxbot" `
        /d:sonar.organization="jscoobyced-github" `
        /d:sonar.host.url="https://sonarcloud.io" `
        /d:sonar.cs.opencover.reportsPaths="coverage.xml"
        /d:sonar.login="$env:SonarKey" `
        /d:sonar.exclusions="coverage\**\*,**\*.xml,**\*.js"
}

dotnet build

if ( -Not $env:APPVEYOR_PULL_REQUEST_NUMBER )
{
    dotnet "$sonar\SonarScanner.MSBuild.dll" `
        end `
        /d:sonar.login="$env:SonarKey" `
}

& "$env:USERPROFILE\.nuget\packages\opencover\4.6.519\tools\OpenCover.Console.exe" `
    -register:user `
    -oldStyle `
    -target:"c:\Program Files\dotnet\dotnet.exe" `
    -targetargs:"test --no-build bxbot-tests\bxbot-tests.csproj" `
    -filter:"+[bxbot]* +[bxbot-tests]* -[bxbot*]*Program -[bxbot*]*Startup" `
    -output:"coverage.xml"

codecov -f coverage.xml