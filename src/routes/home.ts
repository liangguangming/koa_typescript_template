import * as Router from 'koa-router';
import Context from './types';

const home = new Router();

home.get('/', (ctx: Context) => {
  ctx.session.maxAge = 1000 * 60 * 60 * 24 * 7;
  ctx.session.hello = 'name';
});

export default home.routes();
