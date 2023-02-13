import winston from 'winston';

const controllerLogger = winston.createLogger({
    level: 'debug',
    transports: [
        new winston.transports.Console(),
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(info => `${info.timestamp} ${info.level} ${info.message}`),
    ),
});

export function ControllerLogger() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function decorator(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
        const originalMethod = descriptor.value;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        descriptor.value = async (...args: any): Promise<void> => {
            try {
                const start  = Date.now();
                await originalMethod.apply(this, args);
                const resolveTime  = Date.now() - start;
                controllerLogger.debug(`[${propertyKey}] It took ${resolveTime.toFixed(2)}ms to execute`);
            } catch (error) {
                controllerLogger.error(`[${propertyKey}] An error occured: ${error.message}`);
                throw new Error(error);
            }
        };
    };
}

