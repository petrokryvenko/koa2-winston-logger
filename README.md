# koa2-winston-logger
Winston middleware for Koa application.

## Installation

`
$ npm install --save koa2-winston-logger
`

## Usage
#### Basic
```
    const Koa = require('koa');
    const winstonLogger = require('./logger'); // Your winston logger instance
    const winstonKoa = require('koa2-winston-logger');

    const app = new Koa();
    app
      .use(winstonKoa(winstonLogger))
      .use(async ctx => {
          ctx.body = 'Hello Koa '
      });
    
    app.listen(3000);
```

#### Custom logging levels
By default next levels will be used:
        error (for 5xx response)
        warn (for 4xx response)
        info (for 1xx, 2xx, 3xx response)

You can use custom levels for logging as well:


```
    const params = {
        errorLevelName: 'custom_error_level', // your custom level to log errors (5xx response)
        warnLevelName: 'custom_warn_level',   // your custom level to log warnings (4xx response)
        infoLevelName: 'custom_info_level'    // your custom level to log info (1xx, 2xx, 3xx response)
    }
    app.use(winstonKoa(winstonLogger, params));
```
