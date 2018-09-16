Set-Location src
msbuild bxbot.sln /t:Package /p:PackageLocation=../publish/bxbot.zip
Set-Location ..
Get-ChildItem -Path '.' -Recurse