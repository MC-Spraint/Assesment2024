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

      console.log(EnvVariables.DATABASE_URL as string);
      const pgPool = new pg.Pool({
        connectionString: configService.get(
          EnvVariables.DATABASE_URL as string,
        ),
        ssl: {
          rejectUnauthorized: false,
        },
      });
      // const pgPool = new pg.Pool({
      //   host: configService.get(EnvVariables.PGHOST as string),
      //   database: configService.get(EnvVariables.POSTGRES_DB as string),
      //   user: configService.get(EnvVariables.PGUSER as string),
      //   password: configService.get(EnvVariables.PGPASSWORD as string),
      //   port: parseInt(configService.get(EnvVariables.PGPORT), 10),
      // });

      try {
        await pgPool.connect();
      } catch (err) {
        logger.error('Failed to connect to PostgreSQL:', err.message);
        process.exit(1);
      }

      return pgPool;
    },
  },
];
