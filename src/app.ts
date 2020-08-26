import * as Koa from 'koa';
import * as koaBody from 'koa-body';

import route from './routes';
import Logger from './libs/logger';
import registerCustomMiddlewares from './middlewares';
import MongoDB from './libs/mongo';

MongoDB.init();

const logger = new Logger('app');

const app = new Koa();

app.use(koaBody());

registerCustomMiddlewares(app);

app.use(route.routes());
app.use(route.allowedMethods());

app.listen(3000, () => {
  logger.info('launch successful listen to 3000');
});
