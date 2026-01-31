process.noDeprecation = true;

import 'dotenv/config';
import cluster from 'cluster';
import os from 'os';
import app from './app';
import { logger } from './utils/logger';

// 1. Validate Environment Variables
if (!process.env.TYPHOON_API_KEY) {
    logger.error("❌ FATAL ERROR: TYPHOON_API_KEY is not defined.");
    process.exit(1);
}

const port = process.env.PORT || 3000;

// 2. Cluster Management
if (cluster.isPrimary) {
    const numCPUs = os.cpus().length;
    logger.info(`🚀 Primary Process ${process.pid} is running on ${numCPUs} CPUs`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        logger.warn(`❌ Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });
} else {
    // 3. Start Server (Worker Process)
    const server = app.listen(port, () => {
        logger.info(`✅ Worker ${process.pid} started on port ${port}`);
    });

    // 4. Graceful Shutdown Logic
    const shutdown = (signal: string) => {
        logger.info(`\n👋 ${signal} received. Shutting down gracefully...`);
        server.close(() => {
            logger.info('Process terminated.');
            process.exit(0);
        });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
}

// 5. Global Process Error Handling
process.on('unhandledRejection', (reason, promise) => {
    logger.error('❌ Unhandled Rejection at:', { promise, reason });
});

process.on('uncaughtException', (error) => {
    logger.error('❌ Uncaught Exception:', error);
    process.exit(1);
});