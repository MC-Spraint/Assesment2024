import * as Joi from 'joi';

export const configValidations = Joi.object().keys({
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().required(),
});

export enum EnvVariables {
  PORT = 'PORT',
  DATABASE_URL = 'DATABASE_URL',
}
