Write-Host -------------------------------------- Publish -------------------------------

Set-Location $env:APPVEYOR_BUILD_FOLDER/$env:SrcPath
dotnet publish --output=$env:APPVEYOR_BUILD_FOLDER/publish

Write-Host -------------------------------------- Publish complete ----------------------