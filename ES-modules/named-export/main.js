import * as loggerModule from './logger.js';
console.log(loggerModule);

const logger = new loggerModule.Logger('DEFAULT');
logger.log('this is default');
