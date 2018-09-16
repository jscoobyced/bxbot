Get-Location
Write-Host -------------------------------------- Publish

Set-Location src
msbuild bxbot.sln /t:Package /p:PackageLocation=../publish/bxbot.zip
Set-Location ..

Write-Host -------------------------------------- Publish complete
Get-ChildItem -Path '.'