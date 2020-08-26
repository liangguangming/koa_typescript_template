import * as Koa from 'koa';

import Logger from '../libs/logger';

const logger = new Logger('middleware');

export default async function log(ctx: Koa.ParameterizedContext, next: Koa.Next) {
  logger.info(`${ctx.method}  ${ctx.path}`);
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  const logMessage = {
    time: `${ms} ms`,
    method: ctx.method,
    path: ctx.path,
    req: {
      query: ctx.request.query,
      params: ctx.params,
      body: ctx.request.body,
    },
    res: {
      statusCode: ctx.status,
      body: ctx.body,
    },
  };
  logger.debug(logMessage);
}
