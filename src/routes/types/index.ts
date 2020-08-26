import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as session from 'koa-session';

// eslint-disable-next-line max-len
export default interface Context extends Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>> {
  session: session.Session;
}
