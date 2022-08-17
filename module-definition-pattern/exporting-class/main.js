const Logger = require('./Logger');
const dbLogger = new Logger('DB');

dbLogger.info('this is informational message');
const accessLogger = new Logger('ACCESS');
accessLogger.verbose('this is verbose message');
