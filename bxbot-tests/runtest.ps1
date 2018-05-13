New-Variable -Name "PackagePath" -Visibility Public -Value $Env:USERPROFILE\.nuget\packages
New-Variable -Name "OpenCoverVersion" -Visibility Public -Value 4.6.519
New-Variable -Name "ReportGeneratorVersion" -Visibility Public -Value 3.1.2

& "$PackagePath\opencover\$OpenCoverVersion\tools\OpenCover.Console.exe" `
    -target:"c:\Program Files\dotnet\dotnet.exe" `
    -targetargs:"test bxbot-tests.csproj" `
    -output:coverage.xml `
    -oldStyle `
    -filter:"+[bxbot]* +[bxbot-tests]* -[bxbot-tests]*Program" `
    -register:user

& "$PackagePath\reportgenerator\$ReportGeneratorVersion\tools\ReportGenerator.exe" `
    -reports:coverage.xml `
    -targetdir:coverage