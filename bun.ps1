& bun alchemy dev 2>&1 | ForEach-Object { 
    $line = $_.ToString()
    if ($line -notmatch "is not in the project directory and will not be watched") { 
        Write-Host $line
    }
}