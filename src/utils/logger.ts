import pino from 'pino';
import { envs } from "../configs/env";
import { loggerConfig } from "../configs/logger";

export const logger = pino(loggerConfig[envs.NODE_ENV]);