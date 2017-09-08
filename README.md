### html-base-tagger

[![Greenkeeper badge](https://badges.greenkeeper.io/kumavis/html-base-tagger.svg)](https://greenkeeper.io/)

Transform stream to insert a base tag into html

```js
var baseTagger = require('html-base-tagger')

incommingHtmlStream
  .pipe(baseTagger({ origin: 'http://coolwebsite.com/' }))
  .pipe(outgoingHtmlStream)
```

#### config options

```js
{
  origin: url,
  environment: jsString,
}
```

If an `origin` is specified, a base tag will be injected.

If an `environment` is specified, a script tag will be injected at the head with the contents provided.

#### example

```js
var baseTagger = require('html-base-tagger')
var request = require('request')
var fs = require('fs')

var url = 'http://reddit.com/r/ethereum'

var transform = baseTagger({
  origin: url,
  environment: 'console.log("base tag inserted by html-base-tagger")',
})

request(url)
  .pipe(transform)
  .pipe(fs.createWriteStream(__dirname+'/reddit-ethereum.html'))
```