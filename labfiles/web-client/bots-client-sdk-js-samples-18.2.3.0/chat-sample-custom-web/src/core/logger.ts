/**
 * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
 * @ignore
 */

export interface ILogger{
  debug(...params): void;
  error(...params): void;
  info(...params): void;
  warn(...params): void;
}

export class Logger implements ILogger{

  static LOG_LEVEL = {
    NONE: 0,
    ERROR: 1,
    WARN: 2,
    INFO: 3,
    DEBUG: 4
  };

  static logLevel = Logger.LOG_LEVEL.ERROR;
  static appName: string;
  static appVersion: string;

  static historyEnabled: boolean = false;
  static historySize: number = 100;
  static history: any[] = [];

  constructor(private module: string){
  }

  debug(...params) {
    this.log(Logger.LOG_LEVEL.DEBUG, params);
  }

  error(...params) {
    this.log(Logger.LOG_LEVEL.ERROR, params);
  }

  info(...params) {
    this.log(Logger.LOG_LEVEL.INFO, params);
  }

  warn(...params) {
    this.log(Logger.LOG_LEVEL.WARN, params);
  }

  private log(level:any, params) {
    if (Logger.logLevel >= level) {
      params.unshift('[' + Logger.appName + '.' + Logger.appVersion + '.' + this.module + ']');
      let method;
      switch(Logger.logLevel){
        case Logger.LOG_LEVEL.ERROR:
          method = console.error;
          break;
        case Logger.LOG_LEVEL.WARN:
          method = console.warn;
          break;
        case Logger.LOG_LEVEL.INFO:
          method = console.info;
          break;
        case Logger.LOG_LEVEL.DEBUG:
          method = console.debug;
          break;
      }
      if(Logger.historyEnabled){
        Logger.history.push(Object.assign({}, params, {level}));
        if(Logger.historySize <= Logger.history.length){
          Logger.history.shift();
        }
      }
      method.apply(console, params);
    }
  }
}

