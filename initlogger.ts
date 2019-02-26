import log from 'loglevel'
import chalk from 'chalk'
import * as prefix from 'loglevel-plugin-prefix'
import moment from 'moment'
import config from 'config'

function init(logger:log.Logger, debug:boolean):log.Logger {
  prefix.reg(logger)
  prefix.apply(logger, {
    template: config.get('log.format') as string,

    levelFormatter(level) {
      level = level.toUpperCase()
      switch (level) {
        case "INFO":
          return chalk.cyanBright("INFO ")
        case "DEBUG":
          return chalk.greenBright("DEBUG")
        case "WARN":
          return chalk.yellowBright("WARN ")
        case "ERROR":
          return chalk.redBright("ERROR")
        default:
          return chalk.red(level)
      }
    },

    nameFormatter(name) {
      return name || 'global'
    },

    timestampFormatter(date) {
      return moment(date).toLocaleString()
    },
  })

  setLevel(logger, debug)

  return logger
}

function setLevel(logger:log.Logger, debug:boolean) {
  var levelstr = debug? "TRACE" : config.get("log.level") as string
  switch(levelstr.toUpperCase()){
    case "DEBUG":
      logger.setLevel(log.levels.DEBUG)
      break
    case "INFO":
    case "INFORMATION":
      logger.setLevel(log.levels.INFO)
      break
    case "WARN":
    case "WARNING":
      logger.setLevel(log.levels.WARN)
      break
    case "ERROR":
      logger.setLevel(log.levels.ERROR)
      break
    case "SILENT":
      logger.setLevel(log.levels.SILENT)
      break
    default:
      logger.setLevel(log.levels.TRACE)
  }
}

export default init