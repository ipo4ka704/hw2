import winston from 'winston';
import { Request, Response, NextFunction } from 'express';

const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console(),
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(info => `${info.timestamp} ${info.level} ${info.message}`),
    ),
});

export function loggingMiddleware(req: Request, res: Response, next: NextFunction): void {
    const { method, path, params, query, body } = req;
    const message = `[${method}] ${path} - params: ${JSON.stringify(params)}, query: ${JSON.stringify(query)}, body: ${JSON.stringify(body)}`;
    logger.info(message);
    next();
}

export const uncaughtLogger = winston.createLogger({
    level: 'error',
    transports: [
        new winston.transports.Console(),
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(info => `${info.timestamp} ${info.level} ${info.message}`),
    ),
});

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction): void {
    if (err) {
        res.status(500).json({ error: `Failed to process request: ${err.name} ${err.message}` });
    }
    next();
}