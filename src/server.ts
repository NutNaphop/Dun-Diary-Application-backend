process.noDeprecation = true;

import 'dotenv/config';
import app from './app';
import { logger } from './utils/logger';

// 1. Validate Environment Variables
if (!process.env.TYPHOON_API_KEY) {
    logger.error("❌ FATAL ERROR: TYPHOON_API_KEY is not defined.");
    process.exit(1);
}

const port = parseInt(process.env.PORT || "3000", 10);
const host = process.env.HOST || "0.0.0.0";

// 2. Start Server (PM2 handles clustering)
const server = app.listen(port,host, () => {
    logger.info(`✅ Worker ${process.pid} started on port ${port}`);
});

// 3. Graceful Shutdown Logic
const shutdown = (signal: string) => {
    logger.info(`\n👋 ${signal} received. Shutting down gracefully...`);
    server.close(() => {
        logger.info('Process terminated.');
        process.exit(0);
    });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// 4. Global Process Error Handling
process.on('unhandledRejection', (reason, promise) => {
    logger.error('❌ Unhandled Rejection at:', { promise, reason });
});

process.on('uncaughtException', (error) => {
    logger.error('❌ Uncaught Exception:', error);
    process.exit(1);
});