Write-Host -------------------------------------- Run test ------------------------------

Write-Host -------------------------------------- ClientApp -----------------------------
Set-Location $env:APPVEYOR_BUILD_FOLDER/$env:ClientApp
yarn --silent run test:coverage
codecov -f $env:TsCoverage
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