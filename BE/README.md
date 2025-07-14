# Life Insurance Recommendation Backend

A Node.js backend API for generating life insurance recommendations based on user demographics and preferences. Built with TypeScript, Express, PostgreSQL, and Docker.

## 🚀 Features

- **RESTful API** with comprehensive endpoints
- **Rules-based recommendation engine** (easily extensible for ML)
- **PostgreSQL database** with Sequelize ORM
- **Input validation** using Zod
- **Swagger API documentation** with interactive testing
- **Docker support** with PostgreSQL service
- **TypeScript** for type safety
- **Security middleware** (Helmet, CORS)
- **Error handling** and logging

## 📋 Requirements

- Node.js 18+
- Docker & Docker Compose
- PostgreSQL (if running locally)

## 🛠️ Setup

### Option 1: Using Docker (Recommended)

> **Note**: Docker setup includes PostgreSQL automatically. For local development without Docker, see Option 2.

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd life-insurance-backend
   ```

2. **Create environment file**
   ```bash
   cp env.example .env
   ```

3. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

   This will start both the PostgreSQL database and the backend API.

### Option 2: Local Development

#### Quick Setup (Windows)
```powershell
# Run the setup script
.\scripts\setup-local.ps1
```

#### Quick Setup (Linux/Mac)
```bash
# Run the setup script
chmod +x scripts/setup-local.sh
./scripts/setup-local.sh
```

#### Manual Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your local database credentials
   ```

3. **Set up PostgreSQL database**
   ```bash
   # Create database
   createdb life_insurance
   
   # Run setup script
   psql -h localhost -U postgres -d life_insurance -f scripts/setup-local-db.sql
   ```

4. **Run the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm run build
   npm start
   ```

5. **Access the API**
   - API Base URL: http://localhost:8000/api
   - Swagger Documentation: http://localhost:8000/api-docs
   - Health Check: http://localhost:8000/api/health

## 🔧 Environment Variables

Create a `.env` file based on `env.example`:

```env
# Server Configuration
NODE_ENV=development
PORT=8000

# Database Configuration (Neon PostgreSQL)
DB_HOST=ep-patient-dawn-ad5r454d-pooler.c-2.us-east-1.aws.neon.tech
DB_PORT=5432
DB_NAME=neondb
DB_USER=neondb_owner
DB_PASSWORD=npg_5LOJyxr8IlRA
DATABASE_URL=postgresql://neondb_owner:npg_5LOJyxr8IlRA@ep-patient-dawn-ad5r454d-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# Security
CORS_ORIGIN=http://localhost:8000
```

## 📊 Database Schema

### Recommendations Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | INTEGER | Primary key, auto-increment |
| `age` | INTEGER | User's age (18-100) |
| `income` | DECIMAL(12,2) | Annual income |
| `dependents` | INTEGER | Number of dependents (0-10) |
| `riskTolerance` | ENUM | Risk tolerance level (low/medium/high) |
| `recommendation` | TEXT | Generated recommendation |
| `explanation` | TEXT | Explanation for recommendation |
| `createdAt` | TIMESTAMP | Record creation time |
| `updatedAt` | TIMESTAMP | Record last update time |

## 🚀 API Endpoints

### Base URL: `http://localhost:8000/api`
### Swagger Documentation: `http://localhost:8000/api-docs`

> 💡 **Tip**: Use the Swagger UI to interactively test all endpoints with sample data!

#### 1. Health Check
```http
GET /health
```
**Response:**
```json
{
  "success": true,
  "message": "Life Insurance Recommendation API is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

#### 2. Create Recommendation
```http
POST /recommendation
```

**Request Body:**
```json
{
  "age": 35,
  "income": 75000,
  "dependents": 2,
  "riskTolerance": "medium"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "recommendation": "Term Life – $750,000 for 25 years",
    "explanation": "Medium risk tolerance with moderate income suggests a balanced term life approach."
  }
}
```

#### 3. Get All Recommendations
```http
GET /recommendations
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "count": 10
}
```

#### 4. Get Statistics
```http
GET /recommendations/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalRecommendations": 100,
    "averageAge": 42.5,
    "averageIncome": 85000,
    "riskToleranceDistribution": {
      "low": 30,
      "medium": 45,
      "high": 25
    }
  }
}
```

## 🧠 Recommendation Rules

The system uses rules-based logic that can be easily extended:

1. **Age < 40 & High Risk** → Term Life – $500k for 20 years
2. **Age > 50 & Low Risk** → Whole Life – $250k
3. **Income > $100k & Dependents > 2** → Term Life – $1M for 30 years
4. **Medium Risk & Income $50k-$100k** → Term Life – $750k for 25 years
5. **Low Income & Dependents > 0** → Term Life – $300k for 15 years
6. **High Income & Low Risk** → Universal Life – $2M
7. **Default** → Term Life – $400k for 20 years

## 🐳 Docker Commands

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up --build -d

# Access PostgreSQL
docker exec -it life_insurance_db psql -U postgres -d life_insurance
```

## 📁 Project Structure

```
src/
├── config/
│   └── database.ts          # Database configuration
├── controllers/
│   └── recommendationController.ts  # HTTP request handlers
├── models/
│   └── Recommendation.ts    # Sequelize model
├── routes/
│   └── recommendationRoutes.ts      # Express routes
├── services/
│   └── recommendationService.ts     # Business logic
├── validations/
│   └── recommendationSchema.ts      # Zod validation schemas
└── index.ts                 # Application entry point
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 🔒 Security Features

- **Helmet.js** for security headers
- **CORS** configuration
- **Input validation** with Zod
- **SQL injection protection** via Sequelize
- **Error handling** without exposing sensitive data

## 🚀 Deployment

### Production Docker
```bash
# Build production image
docker build -t life-insurance-backend:prod .

# Run with production environment
docker run -p 3000:3000 --env-file .env.prod life-insurance-backend:prod
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=3000
DB_HOST=your-production-db-host
DB_PORT=5432
DB_NAME=life_insurance
DB_USER=your-db-user
DB_PASSWORD=your-secure-password
CORS_ORIGIN=https://your-frontend-domain.com
```

## 🔮 Future Enhancements

- **Machine Learning Integration**: Replace rules with ML models
- **User Authentication**: Add JWT-based auth
- **Rate Limiting**: Implement API rate limiting
- **Caching**: Add Redis for performance
- **Monitoring**: Add health checks and metrics
- **API Documentation**: Swagger/OpenAPI docs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details. 