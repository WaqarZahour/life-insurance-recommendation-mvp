# Life Insurance Recommendation Backend - Local Development Setup (Windows)
Write-Host "🚀 Setting up Life Insurance Recommendation Backend for local development..." -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    Write-Host "   You can download it from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check if PostgreSQL is installed
try {
    $psqlVersion = psql --version
    Write-Host "✅ PostgreSQL is installed: $psqlVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ PostgreSQL is not installed. Please install PostgreSQL first." -ForegroundColor Red
    Write-Host "   You can download it from: https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Create .env file if it doesn't exist
if (-not (Test-Path ".env")) {
    Write-Host "🔧 Creating .env file..." -ForegroundColor Yellow
    Copy-Item "env.example" ".env"
    Write-Host "✅ .env file created. Please update it with your database credentials." -ForegroundColor Green
} else {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
}

# Check if database exists
Write-Host "🗄️  Checking database connection..." -ForegroundColor Yellow
try {
    $result = psql -h localhost -U postgres -d life_insurance -c "SELECT 1;" 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Database 'life_insurance' exists and is accessible" -ForegroundColor Green
    } else {
        throw "Database not accessible"
    }
} catch {
    Write-Host "⚠️  Database 'life_insurance' not found or not accessible" -ForegroundColor Yellow
    Write-Host "   Please create the database and run the setup script:" -ForegroundColor Yellow
    Write-Host "   1. Create database: CREATE DATABASE life_insurance;" -ForegroundColor Cyan
    Write-Host "   2. Run setup script: psql -h localhost -U postgres -d life_insurance -f scripts/setup-local-db.sql" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Update .env file with your database credentials" -ForegroundColor White
Write-Host "2. Start the development server: npm run dev" -ForegroundColor White
Write-Host "3. Access the API at: http://localhost:3000" -ForegroundColor White
Write-Host "4. Access Swagger docs at: http://localhost:3000/api-docs" -ForegroundColor White
Write-Host ""
Write-Host "Happy coding! 🚀" -ForegroundColor Green 