var express = require('express')
var bodyParser = require('body-parser')
var marked = require('marked')
var fs = require('fs')
var path = require('path')
var app = express()
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*') //自定义中间件，设置跨域需要的响应头。
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
}

app.use(allowCrossDomain)
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

// 同步使用 highlight.js 转换代码
marked.setOptions({
  highlight: function(code) {
    return require('highlight.js').highlightAuto(code).value
  }
})

app.use('/dist/', express.static('../dist'))
app.use('/css/', express.static(path.join(__dirname, './css')))

app.get('/markdownonline', function(req, res) {
  fs.readFile('./index.html', 'utf-8', function(err, data) {
    if (err) throw err
    res.end(data)
  })
})

app.get('/markdownonline/doc', function(req, res) {
  fs.readFile('../dist/README.md', 'utf-8', function(err, data) {
    if (err) throw err
    res.end(data)
  })
})

app.post('/markdownonline', function(req, res) {
  var markdownString = req.body.txt
  var HTMLString = marked(markdownString)
  res.end(JSON.stringify({ html: HTMLString }))
  markdownString = HTMLString = ''
})
app.listen(226, function(err) {
  if (err) {
    return console.log(err)
  }
  console.log('server is running...')
})
