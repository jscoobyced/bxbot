Write-Host -------------------------------------- Run test ------------------------------

Write-Host -------------------------------------- ClientApp -----------------------------
Set-Location $env:APPVEYOR_BUILD_FOLDER/$env:ClientApp


Set-Location $env:APPVEYOR_BUILD_FOLDER/$env:SrcPath

Write-Host -------------------------------------- ClientApp done ------------------------
Write-Host -------------------------------------- Netcore -------------------------------


Set-Location $env:APPVEYOR_BUILD_FOLDER

Write-Host -------------------------------------- Netcore done --------------------------
Write-Host -------------------------------------- Run test complete ---------------------