# Setting up variables
## Appveyor specific
$pullRequestNumber = $env:APPVEYOR_PULL_REQUEST_NUMBER
$repoName = $env:APPVEYOR_REPO_NAME
$buildFolder = "$env:APPVEYOR_BUILD_FOLDER"
$repoBranch = $env:APPVEYOR_REPO_BRANCH
$buildVersion = $env:APPVEYOR_BUILD_VERSION
$sonarkey = $env:SonarKey
$ghkey = $env:GitHubSonarKey
$userDirectory = "$env:USERPROFILE"
## Project specific names
$organization = "jscoobyced-github"
$sonarProjectKey = "bxbot"
$sonarexclusion = "coverage\**\*,**\*.xml,**\*.js,tscoverage\**\*,**\jestsetup.ts,**\*.ico,**\Program.cs,**\Startup.cs,**\*.spec.ts,**\*.spec.tsx"
$openCoverTarget = "bxbot-tests\bxbot-tests.csproj"
$openCoverFilter = "+[bxbot]* +[bxbot-tests]* -[bxbot*]*Program -[bxbot*]*Startup"
$clientAppPath = "bxbot"
## When above is set, everything below is not dependent on any system
$nugetPackagesFolder = "$userDirectory\.nuget\packages"
$openCoverVersion = "4.6.519"
$sonarBuild = "$buildFolder\sonar-scanner-msbuild"
$source = "https://github.com/SonarSource/sonar-scanner-msbuild/releases/download/4.2.0.1214/sonar-scanner-msbuild-4.2.0.1214-netcoreapp2.0.zip"
$destination = "$buildFolder\sonar-scanner-msbuild-4.2.0.1214-netcoreapp2.0.zip"

# Installing pre-requisites
Invoke-WebRequest $source -OutFile $destination
7z x $destination -o"$sonarBuild"
Set-Location $clientAppPath
yarn install
Set-Location ..
dotnet restore
choco install codecov

# Preparing build
$runSonar = FALSE

if ( ("master" -Eq $repoBranch) -And ( -Not $pullRequestNumber ) )
{
    Write-Host "Building for branch"

    $runSonar = 1
    dotnet "$sonarBuild\SonarScanner.MSBuild.dll" `
        begin `
        /k:"$sonarProjectKey" `
        /v:"$buildVersion" `
        /d:sonar.organization="$organization" `
        /d:sonar.host.url="https://sonarcloud.io" `
        /d:sonar.cs.opencover.reportsPaths="coverage.xml" `
        /d:sonar.typescript.lcov.reportPaths="tscoverage/lcov.info" `
        /d:sonar.login="$sonarkey" `
        /d:sonar.exclusions="$sonarexclusion"
}

if ( $pullRequestNumber )
{
    Write-Host "Building for Pull Request"

    $runSonar = 1
    dotnet "$sonarBuild\SonarScanner.MSBuild.dll" `
        begin `
        /k:"$sonarProjectKey" `
        /d:sonar.organization="$organization" `
        /d:sonar.host.url="https://sonarcloud.io" `
        /d:sonar.cs.opencover.reportsPaths="coverage.xml" `
        /d:sonar.login="$sonarkey" `
        /d:sonar.exclusions="$sonarexclusion" `
        /d:sonar.analysis.mode=issues `
        /d:sonar.github.pullRequest=$pullrequest `
        /d:sonar.github.repository="$repoName" `
        /d:sonar.github.oauth=$ghkey
}

# Building
dotnet build

# Code Coverage and Analysis
& "$nugetPackagesFolder\opencover\$openCoverVersion\tools\OpenCover.Console.exe" `
    -register:user `
    -oldStyle `
    -target:"dotnet.exe" `
    -targetargs:"test --no-build $openCoverTarget" `
    -filter:"$openCoverFilter" `
    -output:"coverage.xml"

codecov -f coverage.xml

Set-Location $clientAppPath
yarn test:coverage
Set-Location ..

if ( $runSonar )
{
    dotnet "$sonarBuild\SonarScanner.MSBuild.dll" `
    end `
    /d:sonar.login="$sonarkey"
}