Write-Host -------------------------------------- Run test ------------------------------

Set-Location src/bxbot/ClientApp
yarn --silent run test:coverage
Set-Location ..

& $env:USERPROFILE\.nuget\packages\opencover\4.6.519\tools\OpenCover.Console.exe `
-register:user `
-oldStyle `
-target:"dotnet.exe" `
-targetargs:"test bxbot-tests\bxbot-tests.csproj" `
-filter:"+[bxbot*]* -[bxbot*]*Program -[bxbot*]*Startup +[tests*]*" `
-output:"coverage.xml"

codecov -f coverage.xml

if ( ( $env:APPVEYOR_REPO_BRANCH -Eq "master" ) -Or $env:APPVEYOR_PULL_REQUEST_NUMBER )
{
    dotnet "C:\ProgramData\chocolatey\lib\sonarscanner-msbuild-netcoreapp2.0\tools\SonarScanner.MSBuild.dll" end /d:sonar.login="$env:SonarKey"
}

Set-Location ..

Write-Host -------------------------------------- Run test complete ---------------------