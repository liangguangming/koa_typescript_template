import * as mongoose from 'mongoose';
import Logger from './logger';

const dbLogger = new Logger('db');

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  server: {
    socketOptions: {
      keepAlive: 1,
      connectTimeoutMS: 30000,
    },
    reconnectTries: 30,
    reconnectInterval: 3000,
  },
};

class MongoDB {
  static connect() {
    mongoose.connect(MONGO_URI, options);
  }

  static initEvent() {
    mongoose.connection.on('connected', async () => {
      dbLogger.info('MoogoDB connect success');
    });
    mongoose.connection.on('error', () => {
      dbLogger.error('MoogoDB connect fail');
    });
    mongoose.connection.on('disconnected', () => {
      dbLogger.error('MoogoDB connect disconnected');
    });
  }

  static init() {
    MongoDB.connect();
    MongoDB.initEvent();
  }
}

export default MongoDB;
