Write-Host -------------------------------------- Publish

Set-Location src
dotnet publish --output=../../published
Set-Location ../published
New-Item -ItemType directory -Path ../publish
7z a ../publish/bxbot.zip *
Set-Location ../publish
Get-ChildItem -Path '.'

Write-Host -------------------------------------- Publish complete
