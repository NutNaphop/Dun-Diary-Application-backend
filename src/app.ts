import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import { apiLimiter } from './config/limiter';

// Routes
import pressureRoutes from './routes/pressureRoutes';
import healthRoutes from './routes/healthRoutes';

// Handler
import { notFound, errorHandler } from './middlewares/errorHandler';
import { verifyFirebaseToken } from './middlewares/auth';

const app = express();

// Global Middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use('/api/', apiLimiter);

// Routes
app.use('/api/', healthRoutes);
app.use('/api/pressure', verifyFirebaseToken, pressureRoutes);
// app.use('/api/pressure', pressureRoutes);

app.get('/', (req, res) => {
    res.status(200).send('Dun Diary Backend is running');
});
app.get('/api', (req, res) => {
    res.status(200).send('Dun Diary API Server');
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;