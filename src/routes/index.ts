import * as Router from 'koa-router';
import home from './home';
import user from './user';

const router = new Router();

router.use('', home);
router.use('/users', user);

export default router;
