/**
 * @param {object} winstonInstance Winson logger instance
 * @param {object} levelsToLog Optional patameter.
 * @param {string} levelsToLog.errorLevelName Level name you want log errors to
 * @param {string} levelsToLog.warnLevelName  Level name you want log warnings to
 * @param {string} levelsToLog.infoLevelName  Level name you want log info to
 */

function logger(winstonInstance, params = {}) {
    const [errorLevelName, warnLevelName, infoLevelName] = [
        params.errorLevelName || 'error',
        params.warnLevelName || 'warn',
        params.infoLevelName || 'info'
    ];
  
    return async (ctx, next) => {
      const start = new Date();
      await next();
      const ms = new Date() - start;
  
      let logLevel;
      if (ctx.status >= 500) {
        logLevel = errorLevelName;
      } else if (ctx.status >= 400) {
        logLevel = warnLevelName;
      } else if (ctx.status >= 100) {
        logLevel = infoLevelName;
      }
  
      const msg = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`;
  
      winstonInstance.log(logLevel, msg);
    };
  }
  module.exports = logger;
  