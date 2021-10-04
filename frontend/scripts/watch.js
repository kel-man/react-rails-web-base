process.env.NODE_ENV = 'development'

const fs = require('fs-extra')
const paths = require('../config/paths')
const webpack = require('webpack')
// const config = require('../config/webpack.config.js')('production');
const config = require('../config/webpack.config.js')('development')

// // removes react-dev-utils/webpackHotDevClient.js at first in the array
// config.entry.shift();
config.output.path = paths.appBuild
paths.publicUrl = paths.appBuild + '/'

var entry = config.entry
var plugins = config.plugins

entry = entry.filter(fileName => !fileName.match(/webpackHotDevClient/))
plugins = plugins.filter(plugin => !(plugin instanceof webpack.HotModuleReplacementPlugin))

config.entry = entry
config.plugins = plugins

webpack(config).watch({}, (err, stats) => {
  if (err) {
    console.error(err)
  } else {
    copyPublicFolder()
  }
  var statsMessage = stats || ''
  console.error(
    statsMessage.toString({
      chunks: false,
      colors: true,
    })
  )
})

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  })
}
