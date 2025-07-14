import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
// import dotenv from 'dotenv';
import recommendationRoutes from './routes/recommendationRoutes';
import { testConnection, syncDatabase } from './config/database';
import { swaggerUi, specs } from './config/swagger';

// dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Security middleware
app.use(helmet());

// CORS: Allow all origins
app.use(cors({
  origin: '*',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Life Insurance Recommendation API Documentation'
}));

// Routes
app.use('/api', recommendationRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Life Insurance Recommendation API',
    version: '1.0.0',
    documentation: 'http://localhost:8000/api-docs',
    endpoints: {
      health: 'GET /api/health',
      recommendation: 'POST /api/recommendation',
      recommendations: 'GET /api/recommendations',
      stats: 'GET /api/recommendations/stats'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Global error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error handler:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// Initialize database and start server
async function startServer() {
  try {
    // Test database connection
    await testConnection();
    
    // Sync database tables
    await syncDatabase();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start the server
startServer(); 