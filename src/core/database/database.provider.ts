import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as pg from 'pg';
import { EnvVariables } from '../config/config.validation';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

export type DatabaseConnection = pg.Pool;

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<pg.Pool> => {
      const logger = new Logger(DATABASE_CONNECTION);

      const pgPool = new pg.Pool({
        connectionString: configService.get(
          EnvVariables.DATABASE_URL as string,
        ),
        ssl: {
          rejectUnauthorized: false,
        },
      });
      try {
        await pgPool.connect();
      } catch (err) {
        logger.error('Failed to connect to PostgreSQL:', err);
        process.exit(1);
      }

      return pgPool;
    },
  },
];
