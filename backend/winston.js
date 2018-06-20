var winston = require('winston');
require('winston-daily-rotate-file');
// define the custom settings for each transport (file, console)
var infoTransport = new (winston.transports.DailyRotateFile)({
    filename: `${CONFIG.logRoot}/info-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    prepend: true,
    level: 'info'
});

var errorTransport = new (winston.transports.DailyRotateFile)({
    filename: `${CONFIG.logRoot}/error-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    prepend: true,
    level: 'error'
});

// instantiate a new Winston Logger with the settings defined above
var logger =  winston.createLogger({
  transports: [
    errorTransport,
    infoTransport
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;