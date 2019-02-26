import log from 'loglevel'
import moment from 'moment'
import config from 'config'
import args from 'commander'
import APP from './source/app'
import initLogger from './initlogger'

// parse args
args
  .version('0.1.0')
  .option('-d --debug', 'Debug Mode')
  .parse(process.argv)

// init main APP class
var app = new APP()
app.debug = args.debug

// init time zone
moment.locale(config.get('timezone') as string)

// init logger
initLogger(log, app.debug)

// run main App
app.run()