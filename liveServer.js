const liveServer = require('live-server')

const params = {
  port: 9000,
  host: '127.0.0.1',
  open: true,
  root: 'public/'
}

liveServer.start(params)
