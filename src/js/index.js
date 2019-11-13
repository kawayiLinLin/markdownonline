import $ from 'jquery'
import Clipboard from 'clipboard'
;(function(window, $) {
  const mark = $('#mark')
  const article = $('article.article')
  String.prototype.byteLength = function() {
    var count = 0
    for (var i = 0, l = this.length; i < l; i++) {
      count += this.charCodeAt(i) <= 128 ? 1 : 2
    }
    return count
  }
  function recommandMultiple() {
    const markScrollHeight = mark[0].scrollHeight
    const articleScrollHeight = article[0].scrollHeight
    let value = articleScrollHeight / markScrollHeight
    if (!value) return
    $('#recommand').html(`推荐倍数:${value.toFixed(2)}`)
  }
  function byteCount(count) {
    const byte = $('#byte .value')

    if (count >= 1024 && count < 1048576) {
      byte
        .html(`文档大小:${(count / 1024).toFixed(2)}`)
        .siblings()
        .html('KB')
    } else if (count >= 1048576) {
      byte
        .html(`文档大小:${(count / 1024 / 1024).toFixed(2)}`)
        .siblings()
        .html('MB')
    } else {
      byte
        .html(`文档大小:${count}`)
        .siblings()
        .html('B')
    }
  }
  function post() {
    const val = mark.val()

    if (
      mark
        .val()
        .trim()
        .indexOf('<html') == 0 ||
      mark
        .val()
        .trim()
        .indexOf('<!DOCTYPE html>') == 0
    ) {
      boxAlert('在输入框中输入一个html页面代码可能导致错误', 'alert-danger')
    }
    $('#length .value').html(val.length)
    byteCount(val.byteLength())

    clearInterval(window.interval)
    // console.log($('textarea').val())
    window.interval = null
    let count = 0
    window.interval = setInterval(function() {
      count++
      count % 2 === 0
        ? $('#loading').html('Loading.')
        : $('#loading').html('Loading...')
    }, 200)
    $.ajax({
      type: 'post',
      url: 'http://yzl.xyz:226/markdownonline',
      data: {
        txt: val
      },
      success: function(data) {
        data = JSON.parse(data)
        // console.log(data)
        $('article.article').html(data.html)
        copyHtml_data(data.html)
        heightSetting()
        clearInterval(window.interval)
        $('#loading').html('')

        recommandMultiple()
      },
      error: function(err, data, error) {
        // console.log(err, data, error)
        if (error == 'Payload Too Large') {
          boxAlert('文档过大', 'alert-danger')
        } else {
          boxAlert('cannot get response', 'alert-danger')
        }

        clearInterval(window.interval)
        $('#loading').html('')
        throw err
      }
    })
    $('#getposition').click()
    try {
      sessionStorage.setItem('_markdown', val)
    } catch (e) {
      boxAlert('存储错误', 'alert-danger')
      throw e
    }
  }
  window.boxAlert = function(str, color) {
    $('#alert')
      .removeClass('alert-danger', 'alert-success', 'alert-warning')
      .addClass(color)
      .stop()
      .fadeIn()
      .css('top', '10%')
      .html(str)
    setTimeout(function() {
      $('#alert')
        .css('top', '5%')
        .stop()
        .fadeOut()
    }, 3000)
  }
  function heightSetting() {
    const articleheight = $('article.article').height()
    if (articleheight >= 345.2) {
      mark.height(articleheight)
    } else if (articleheight < 345.2) {
      mark.height(345.2)
    }
  }
  function copyHtml_data(html) {
    $('#Textbox').val(`<article class="article">${html}</article>`)
  }
  function openmd() {
    let ie = navigator.appName == 'Microsoft Internet Explorer' ? true : false
    if (ie) {
      document.getElementById('file').click()
    } else {
      var a = document.createEvent('MouseEvents') //FF的处理
      a.initEvent('click', true, true)
      document.getElementById('file').dispatchEvent(a)
    }
  }
  function filereader() {
    let file = document.getElementById('file').files[0]
    console.log(file)
    if (!/(\.md)$/.test(file.name)) {
      //判断获取的是否为图片文件
      // alert('请确保文件为图像文件')
      window.boxAlert('请打开.md文件', 'alert-danger')
      return false
    }
    if (file.size / 1024 > 2048) {
      window.boxAlert('文件大于2MB', 'alert-danger')
      return false
    }
    var reader = new FileReader()
    reader.readAsText(file, 'UTF-8')
    reader.onload = () => {
      $('#mark').val(reader.result)
      post()
    }
    reader.onerror = function(error) {
      console.log('Error: ', error)
    }
  }
  function init() {
    $('#box').fadeIn()
    try {
      if (sessionStorage.getItem('_markdown'))
        mark.val(sessionStorage.getItem('_markdown'))
    } catch (e) {
      boxAlert('读取存储失败', 'alert-danger')
    }
    var copymarkdown = new Clipboard('#copymarkdown')
    var copyAPartOfHtml = new Clipboard('#copyAPartOfHtml')
    var copyAllHtml = new Clipboard('#copyAllHtml')

    copymarkdown.on('success', function(e) {
      // console.log(e)
      if (e.text == '') {
        boxAlert('你还没有输入任何字符', 'alert-danger')
      } else {
        boxAlert('已复制', 'alert-success')
      }
      post()
    })

    copymarkdown.on('error', function(e) {
      // console.log(e)
      boxAlert('复制失败', 'alert-danger')
      post()
    })

    copyAPartOfHtml.on('success', function(e) {
      // console.log(e)
      if (e.text.trim().indexOf('<article') != 0) {
        boxAlert('复制错误，请再次尝试', 'alert-danger')
      } else {
        boxAlert('已复制', 'alert-success')
      }
      post()
    })

    copyAPartOfHtml.on('error', function(e) {
      boxAlert('复制失败', 'alert-danger')
    })
    copyAllHtml.on('success', function(e) {
      // console.log(e.text.trim().indexOf('<!'))
      if (e.text.trim().indexOf('<!') != 0) {
        boxAlert('复制错误，请再次尝试', 'alert-danger')
      } else {
        boxAlert('已复制', 'alert-success')
      }

      post()
    })

    copyAllHtml.on('error', function(e) {
      // console.log(e)
      boxAlert('复制失败', 'alert-danger')
      post()
    })

    $('#copymarkdown').attr({
      'data-clipboard-action': 'copy',
      'data-clipboard-target': '#mark'
    })
    $('#copyAPartOfHtml')
      .attr({
        'data-clipboard-action': 'copy',
        'data-clipboard-target': '#Textbox'
      })
      .on('mousedown', function() {
        $('#Textbox').val($('#Textbox').val())
      })
    $('#copyAllHtml')
      .attr({
        'data-clipboard-action': 'copy',
        'data-clipboard-target': '#Textbox'
      })
      .on('mousedown', function() {
        $('#Textbox').val(`
        <!DOCTYPE html>
        <html>
        <head>
        <title>html</title>
        <link href="https://cdn.bootcss.com/github-markdown-css/2.8.0/github-markdown.min.css" rel="stylesheet">
        <link href="https://cdn.bootcss.com/highlight.js/9.12.0/styles/github-gist.min.css" rel="stylesheet">
        <style type="text/css">
        article.article{
          padding: 20px;
        }
        article h1{
          font-size: 2em;
        }
        table {
          margin: 20px 0px;
          width: 100%;
        }
        table,
        table * {
          border: 1px solid #cccccc;
          border-collapse: collapse;
          padding: 6px;
          text-align: center;
          text-align-last: left;
          -moz-text-align-last: left;
        }
        table thead {
          font-weight: bold;
        }
        table tbody tr:nth-child(odd) {
          background: #f8f8f8;
        }
        img {
          width: 100%;
        }
        blockquote {
          margin-block-start: 1em;
          margin-block-end: 1em;
          margin-inline-start: 0px;
          margin-inline-end: 40px;
        }
        blockquote > p {
          margin-left: 0;
          border-left: 4px solid greenyellow;
          padding-left: 10px;
        }
        pre:not([class]) {
          padding: 10px;
          background: rgb(248, 248, 248);
          border: 0.5px solid rgb(221, 221, 221);
          border-radius: 5px;
      
          overflow-x: auto;
        }
        code:not([class]) {
          background: rgb(248, 248, 248);
          border: 0.5px solid rgb(221, 221, 221);
          border-radius: 3px;
          color: black;
          padding: 2px;
          margin: 0 4px 0 4px;
        }
        code {
          font-family: 'Consolas';
          font-size: 13.5px;
        }
        h2 {
          font-weight: 600;
        }
        p > a {
          text-decoration: none;
          color: skyblue;
        }
        @font-face {
          font-family: Consolas;
          src: url('../fonts/consola.ttf');
        }
        </style>
        </head>
        <body>
            ${$('#Textbox').val()}
        </body>
        </html>
        <!-- "dependencies": {
          "bootstrap": "^4.3.1",
          "clipboard": "^2.0.4",
          "express": "^4.17.1",
          "highlight.js": "^9.15.8",
          "jquery": "^3.4.1",
          "marked": "^0.7.0"
        }  笔芯 -->`)
      })
    $('#ul').removeClass('usedclass')
    $('#slowload').remove()
    mark.on('change input', post).on('focus  blur', heightSetting)
    $('#refresh').on('click', post)
    $(document).on('click', heightSetting)
    $('#openmarkdown').on('click', openmd)
    $('#file').on('change', filereader)
  }

  init()
})(window, $)
