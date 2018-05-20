Write-Host "Build version : $env:APPVEYOR_BUILD_VERSION"
Write-Host "Author        : $env:APPVEYOR_REPO_COMMIT_AUTHOR"
Write-Host "Branch        : $env:APPVEYOR_REPO_BRANCH"
Write-Host "Repository    : $env:APPVEYOR_REPO_NAME"

$pullrequest = $env:APPVEYOR_PULL_REQUEST_NUMBER
$sonarkey = $env:SonarKey
$version = $env:APPVEYOR_BUILD_VERSION
$ghkey = $env:GitHubSonarKey
$repoName = $env:APPVEYOR_REPO_NAME
$sonar = "$env:APPVEYOR_BUILD_FOLDER"
$sonarbuild = "$sonar\sonar-scanner-msbuild"
$source = "https://github.com/SonarSource/sonar-scanner-msbuild/releases/download/4.2.0.1214/sonar-scanner-msbuild-4.2.0.1214-netcoreapp2.0.zip"
$destination = "$env:APPVEYOR_BUILD_FOLDER\sonar-scanner-msbuild-4.2.0.1214-netcoreapp2.0.zip"
Invoke-WebRequest $source -OutFile $destination
7z x $destination -o"$sonarbuild"


Set-Location bxbot
yarn install
Set-Location ..

dotnet restore

choco install codecov

$runSonar = FALSE

if ( ("master" -Eq $env:APPVEYOR_REPO_BRANCH) -And ( -Not $env:APPVEYOR_PULL_REQUEST_NUMBER ) )
{
    Write-Host "Building for branch"

    $runSonar = 1
    dotnet "$sonarbuild\SonarScanner.MSBuild.dll" `
        begin `
        /k:"bxbot" `
        /v:"$version"
        /d:sonar.organization="jscoobyced-github" `
        /d:sonar.host.url="https://sonarcloud.io" `
        /d:sonar.cs.opencover.reportsPaths="coverage.xml" `
        /d:sonar.login="$sonarkey" `
        /d:sonar.exclusions="coverage\**\*,**\*.xml,**\*.js"
}

if ( $env:APPVEYOR_PULL_REQUEST_NUMBER )
{
    Write-Host "Building for Pull Request"

    $runSonar = 1
    dotnet "$sonarbuild\SonarScanner.MSBuild.dll" `
        begin `
        /k:"bxbot" `
        /d:sonar.organization="jscoobyced-github" `
        /d:sonar.host.url="https://sonarcloud.io" `
        /d:sonar.cs.opencover.reportsPaths="coverage.xml" `
        /d:sonar.login="$sonarkey" `
        /d:sonar.exclusions="coverage\**\*,**\*.xml,**\*.js,**\*.ico" `
        /d:sonar.analysis.mode=issues `
        /d:sonar.github.pullRequest=$pullrequest `
        /d:sonar.github.repository="$repoName" `
        /d:sonar.github.oauth=$ghkey
}

dotnet build

& "$env:USERPROFILE\.nuget\packages\opencover\4.6.519\tools\OpenCover.Console.exe" `
    -register:user `
    -oldStyle `
    -target:"c:\Program Files\dotnet\dotnet.exe" `
    -targetargs:"test --no-build bxbot-tests\bxbot-tests.csproj" `
    -filter:"+[bxbot]* +[bxbot-tests]* -[bxbot*]*Program -[bxbot*]*Startup" `
    -output:"coverage.xml"

codecov -f coverage.xml

if ( $runSonar )
{
    dotnet "$sonarbuild\SonarScanner.MSBuild.dll" `
    end `
    /d:sonar.login="$sonarkey"
}