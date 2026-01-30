// Import Lib
import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { apiLimiter } from './config/limiter';

// Routes
import pressureRoutes from './routes/pressureRoutes';
import healthRoutes from './routes/healthRoutes';

// Handeler
import { notFound, errorHandler } from './middlewares/errorHandler';
import { verifyFirebaseToken } from './middlewares/auth';

const app = express();
const port = process.env.PORT || 3000;

// Check Environment Variables
if (!process.env.TYPHOON_API_KEY) {
    console.error("❌ FATAL ERROR: TYPHOON_API_KEY is not defined.");
    process.exit(1);
}

// Config
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/api/', apiLimiter);

// Config Routes
app.use('/api/', healthRoutes);
app.use('/api/pressure', verifyFirebaseToken, pressureRoutes);

// Error Handler 
app.use(notFound);
app.use(errorHandler);

// Listen
const server = app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
    console.log(`📡 Try POST request at http://localhost:${port}/api/pressure/analyze`);
});

// Graceful Shutdown
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('Process terminated.');
        process.exit(0);
    });
});