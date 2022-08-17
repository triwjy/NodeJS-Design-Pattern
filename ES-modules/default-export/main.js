// import MyLogger from './logger.js';
import * as MyLogger from './logger.js';
console.log(MyLogger);

const logger = new MyLogger.default('INFO');
logger.log('this is default');
