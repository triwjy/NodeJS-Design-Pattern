const logger = require('./logger');
logger.log('this is informartional message');

const customlogger = new logger.constructor('CUSTOM');
customlogger.log('this is informational message');
