var Trumpet = require('trumpet')

var SCRIPT_OPEN_TAG = '<'+'script'+'>'
var SCRIPT_CLOSE_TAG = '</'+'script'+'>'

module.exports = transformHtml


function transformHtml(opts) {
  var origin = opts.origin
  var environment = opts.environment

  var trumpet = Trumpet()

  trumpet.selectAll('head', function (node) {
    var readStream = node.createReadStream()
    var writeStream = node.createWriteStream()
    // WRITE base tag
    if (origin) {
      var baseTag = '<base href="'+origin+'" target="_blank">'
      writeStream.write(baseTag)
    }
    // WRITE environment init script
    if (environment) {
      writeStream.write(SCRIPT_OPEN_TAG)
      writeStream.write(environment)
      writeStream.write(SCRIPT_CLOSE_TAG)
    }
    // insert original content of head
    readStream.pipe(writeStream)
  })

  return trumpet
}