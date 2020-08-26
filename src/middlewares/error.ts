import * as Koa from 'koa';
import Logger from '../libs/logger';

const logger = new Logger('middleware');

export default async function errorHandlers(ctx: Koa.ParameterizedContext, next: Koa.Next) {
  await next().catch((error) => {
    const errorObj = {
      error,
      ctx,
    };
    logger.error(errorObj);
  });
}
