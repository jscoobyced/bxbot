Write-Host -------------------------------------- Publish -------------------------------

if ( -Not $env:APPVEYOR_PULL_REQUEST_NUMBER )
{
    Set-Location $env:APPVEYOR_BUILD_FOLDER/$env:SrcPath
    dotnet publish --output=$env:APPVEYOR_BUILD_FOLDER/publish
}
Write-Host -------------------------------------- Publish complete ----------------------