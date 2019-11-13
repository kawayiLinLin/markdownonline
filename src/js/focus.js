import $ from 'jquery'
;(function(window, $, document, undefined) {
  const mark = $('#mark')
  const mark0 = mark[0]
  let count = 0
  $.fn.ctrlkeydownfun = function(keyCodeFirst, fun) {
    const $this = $(this)
    $this.on('keydown', function(e) {
      // console.log(1, e)
      const keyCode = e.keyCode
      if (keyCode === keyCodeFirst) {
        if (e.ctrlKey) {
          e.preventDefault()
          eval(fun)
        }
      }
    })
    return $this
  }
  $.fn.shiftkeydownfun = function(keyCodeFirst, fun) {
    const $this = $(this)
    $this.on('keydown', function(e) {
      // console.log('shift', e)
      const keyCode = e.keyCode
      if (keyCode === keyCodeFirst) {
        if (e.shiftKey) {
          // console.log('shift')
          e.preventDefault()
          eval(fun)
        }
      }
    })
    return $this
  }
  $.fn.keydownfun = function(keyCodeFirst, fun) {
    const $this = $(this)
    $this.on('keydown', function(e) {
      const keyCode = e.keyCode
      if (keyCode === keyCodeFirst) {
        if (!(e.shiftKey || e.ctrlKey || e.altKey)) {
          e.preventDefault()
          eval(fun)
        }
      }
    })
    return $this
  }
  function space() {
    let tabstr = ' '
    mark0.focus()
    let start = window.markStart
    let end = window.markEnd
    if (start === end) {
      // 没有选择文本，直接插入
      document.execCommand('insertText', false, tabstr)
    }
  }
  function level() {
    clearTimeout(window.leveltimeout)
    let tabstr = '#'
    mark0.focus()
    let start = window.markStart
    let end = window.markEnd
    if (start === end) {
      // 没有选择文本，直接插入
      document.execCommand('insertText', false, tabstr)
      window.leveltimeout = setTimeout(space, 1000)
      mark.on('input mousedown change keydown', () => {
        clearTimeout(window.leveltimeout)
      })
    }
  }
  function unlist() {
    let tabstr = `
+ message
+ message
+ message
    - message
`
    mark0.focus()
    let start = mark0.selectionStart
    let end = mark0.selectionEnd
    if (start === end) {
      // 没有选择文本，直接插入
      document.execCommand('insertText', false, tabstr)
      mark0.setSelectionRange(
        mark0.selectionStart - 42,
        mark0.selectionStart - 35
      )
    } else {
      tabstr = '- '
      let text = mark.val()

      let tablen = tabstr.length

      let insertstr = tabstr

      let newend = end + tablen

      insertstr += text.slice(start, end).replace(/\n/g, function() {
        newend += tablen
        return '\n' + tabstr
      })

      document.execCommand('insertText', false, insertstr)

      mark0.setSelectionRange(start, newend)
    }
  }
  function olist() {
    let tabstr = `
1. message
2. 
3. 
`
    mark0.focus()
    let start = mark0.selectionStart
    let end = mark0.selectionEnd
    if (start === end) {
      // 没有选择文本，直接插入
      document.execCommand('insertText', false, tabstr)
      mark0.setSelectionRange(
        mark0.selectionStart - 16,
        mark0.selectionStart - 9
      )
    } else {
      let num = 1

      let text = mark.val()

      let tablen = tabstr.length

      let insertstr = ''

      let newend = end + tablen

      insertstr += text.slice(start, end).replace(/\n/g, function() {
        newend += tablen
        // console.log(num, insertstr)
        return `\n${num++}. `
      })
      // console.log(num, insertstr)
      document.execCommand('insertText', false, `1. ${insertstr}`)

      mark0.setSelectionRange(start, newend)
    }
  }
  function quote() {
    let tabstr = '> '
    mark0.focus()
    let start = window.markStart
    let end = window.markEnd
    if (start === end) {
      // 没有选择文本，直接插入
      document.execCommand('insertText', false, tabstr)
    }
  }
  function link() {
    let tabstr = '[]()'
    mark0.focus()
    let start = window.markStart
    let end = window.markEnd
    if (start === end) {
      // 没有选择文本，直接插入
      document.execCommand('insertText', false, tabstr)
      mark0.selectionEnd = mark0.selectionStart = mark0.selectionStart - 3
    }
  }
  function pic() {
    let tabstr = '![]()'
    mark0.focus()
    let start = window.markStart
    let end = window.markEnd
    if (start === end) {
      // 没有选择文本，直接插入
      document.execCommand('insertText', false, tabstr)
      mark0.selectionEnd = mark0.selectionStart = mark0.selectionStart - 1
    }
  }
  function marked(e) {
    let tabstr = '``'
    mark0.focus()
    let start = mark0.selectionStart
    let end = mark0.selectionEnd
    if (start === end) {
      // console.log(tabstr)
      // 没有选择文本，直接插入
      document.execCommand('insertText', false, tabstr)
      mark0.selectionEnd = mark0.selectionStart = mark0.selectionStart - 1
    } else {
      let text = mark.val()

      let insertstr = tabstr
      text.slice(start, end).indexOf('`') != -1
        ? (insertstr = `\`\`${text.slice(start, end)}\`\``)
        : (insertstr = `\`${text.slice(start, end)}\``)

      document.execCommand('insertText', false, insertstr)
    }
  }

  function stress() {
    let tabstr = '****'
    mark0.focus()
    let start = mark0.selectionStart
    let end = mark0.selectionEnd
    if (start === end) {
      // 没有选择文本，直接插入
      document.execCommand('insertText', false, tabstr)
      mark0.selectionEnd = mark0.selectionStart = mark0.selectionStart - 2
    } else {
      let text = mark.val()

      let insertstr = tabstr

      insertstr = `**${text.slice(start, end)}**`

      document.execCommand('insertText', false, insertstr)
    }
  }
  function italics() {
    let tabstr = '**'
    mark0.focus()
    let start = mark0.selectionStart
    let end = mark0.selectionEnd
    if (start === end) {
      document.execCommand('insertText', false, tabstr)
      mark0.selectionEnd = mark0.selectionStart = mark0.selectionStart - 1
    } else {
      let text = mark.val()

      let insertstr = tabstr

      insertstr = `*${text.slice(start, end)}*`

      document.execCommand('insertText', false, insertstr)
    }
  }
  function del() {
    let tabstr = '~~'
    mark0.focus()
    let start = mark0.selectionStart
    let end = mark0.selectionEnd
    if (start === end) {
      document.execCommand('insertText', false, tabstr)
      mark0.selectionEnd = mark0.selectionStart = mark0.selectionStart - 1
    } else {
      let text = mark.val()

      let insertstr = tabstr

      insertstr = `~${text.slice(start, end)}~`

      document.execCommand('insertText', false, insertstr)
    }
  }
  function table() {
    let tabstr = `

  |    |    |    |
  | -- | -- | -- |
  |    |    |    |

`
    mark0.focus()
    let start = window.markStart
    let end = window.markEnd
    if (start === end) {
      // 没有选择文本，直接插入
      document.execCommand('insertText', false, tabstr)
      mark0.selectionEnd = mark0.selectionStart = mark0.selectionStart - 52
    }
  }
  function code() {
    let tabstr = `
\`\`\`type

\`\`\`
`
    mark0.focus()
    let start = window.markStart
    let end = window.markEnd
    if (start === end) {
      // 没有选择文本，直接插入
      document.execCommand('insertText', false, tabstr)
      mark0.setSelectionRange(
        mark0.selectionStart - 10,
        mark0.selectionStart - 6
      )
    }
  }
  function selectone() {
    mark0.focus()
    const val = mark.val()
    let start = mark0.selectionStart
    let end = mark0.selectionEnd
    let left = 0,
      right = 0
    for (let i = 1; i < 1000; i++) {
      let n = val.slice(start - i, end).indexOf('\n')
      if (n > 0) {
        left = i
        break
      }
    }
    for (let j = 1; j < 1000; j++) {
      let n = val.slice(start, end + j).indexOf('\n')
      if (n > 0) {
        right = j

        break
      }
    }
    if (left == 2) {
      right -= 1
    }
    if (!(left == 2 || right == 0)) {
      right -= 1
    }
    mark0.setSelectionRange(start - left + 2, end + right)

    if (start == 0) {
      // console.log(end, right)
      mark0.setSelectionRange(0, end + right)
    }
    start = mark0.selectionStart
    end = mark0.selectionEnd
    if (start == end) {
      if (val.slice(start - 1, end).indexOf('\n'))
        mark0.setSelectionRange(start + 1, val.length)
      if (!val.slice(start - 1, end).indexOf('\n')) {
        mark0.setSelectionRange(0, end)
      }
    }
  }
  function selectall() {
    mark0.focus()
    mark0.setSelectionRange(0, mark.val().length)
  }
  function z() {
    if (count % 2 == 0) {
      $('#ul')
        .find('li:not(#z)')
        .slideToggle(300, 'linear')
        .parent()
        .css({ 'margin-left': '-20px' })
      mark.parents('.container-fluid').addClass('new-fluid')
      $('#z')
        .css({
          transform: 'rotate(0deg)  scale(1, 1.5)',
          'box-shadow': '0 0 0 0'
        })
        .attr('title', '展开')
    } else {
      $('#ul')
        .find('li:not(#z)')
        .slideToggle(300, 'swing')
        .parent()
        .removeAttr('style')
      mark.parents('.container-fluid').removeClass('new-fluid')
      $('#z')
        .css({ transform: 'rotate(180deg)  scale(1, 1.5)' })
        .stop()
        .removeAttr('style')
        .attr('title', '折叠')
    }
    count++
  }
  function onekeydownmarked(tabstrleft, tabstrright) {
    mark0.focus()
    let start = mark0.selectionStart
    let end = mark0.selectionEnd
    if (start !== end) {
      let text = mark.val()
      let insertstr = tabstrleft
      text.slice(start, end).indexOf('`') != -1 && tabstrleft == '`'
        ? (insertstr = `\`\`${text.slice(start, end)}\`\``)
        : (insertstr = `${tabstrleft}${text.slice(start, end)}${
            tabstrright == undefined ? tabstrleft : tabstrright
          }`)

      document.execCommand('insertText', false, insertstr)
    } else {
      document.execCommand('insertText', false, tabstrleft)
    }
  }
  function stylebiggerOrsmaller(target, method) {
    let fontSize = parseInt(target.css('font-size'))
    let lineHeight = parseInt(target.css('line-height'))
    if (method === 'big') {
      target.css({
        'font-size': (fontSize + 1 > 25 ? 25 : fontSize + 1) + 'px',
        'line-height': (lineHeight + 1 > 30 ? 30 : lineHeight + 1) + 'px'
      })
      if (target.css('font-size') == '25px')
        window.boxAlert('最大字号', 'alert-warning')
    } else if (method === 'small') {
      target.css({
        'font-size': (fontSize - 1 < 10 ? 10 : fontSize - 1) + 'px',
        'line-height': (fontSize - 1 < 15 ? 15 : fontSize - 1) + 'px'
      })
      if (target.css('font-size') == '10px')
        window.boxAlert('最小字号', 'alert-warning')
    } else {
      target.css({
        'font-size': '14px',
        'line-height': '19.3px'
      })
    }
  }
  function init() {
    window.markStart = window.markEnd = 0
    $('#level').on('click', level)
    $('#unlist').on('click', unlist)
    $('#olist').on('click', olist)
    $('#quote').on('click', quote)
    $('#link').on('click', link)
    $('#pic').on('click', pic)
    $('#marked').on('click', marked)
    $('#stress').bind('click', stress)
    $('#Italics').on('click', italics)
    $('#del').on('click', del)
    $('#table').on('click', table)
    $('#code').on('click', code)
    $('#selectone').on('click', selectone)
    $('#selectall').on('click', selectall)
    $('#z').on('click', z)
    if (window.chrome) {
      mark
        .keydownfun(192, 'onekeydownmarked("`")') //`192
        .keydownfun(222, `onekeydownmarked("'")`) //'222
        .keydownfun(219, `onekeydownmarked("[","]")`) //[219
        .shiftkeydownfun(219, `onekeydownmarked("{","}")`) //{219
        .shiftkeydownfun(57, `onekeydownmarked("(",")")`) //(57
        .shiftkeydownfun(188, `onekeydownmarked("<",">")`) //188<
        .shiftkeydownfun(222, `onekeydownmarked('"')`) //"222"
        .shiftkeydownfun(192, `onekeydownmarked('~')`) //~
        .ctrlkeydownfun(48, `stylebiggerOrsmaller(mark, '')`) //ctrl+0
        .ctrlkeydownfun(187, `stylebiggerOrsmaller(mark, 'big')`) //ctrl+  +
        .ctrlkeydownfun(189, `stylebiggerOrsmaller(mark, 'small')`) //ctrl+  -
        .ctrlkeydownfun(66, "$('#stress').click()") //ctrl+b
        .ctrlkeydownfun(73, "$('#Italics').click()") //ctrl+i
        .ctrlkeydownfun(68, "$('#del').click()") //ctrl+d
        .ctrlkeydownfun(85, "onekeydownmarked('<u>','</u>')")
    }

    if (mark.val() != '') {
      $('#refresh').click()
    } else if (mark.val() == '' && window.setObj.DescriptionDocument == 1) {
      // console.log(window.setObj.DescriptionDocument)
      $.get('/markdownonline/doc', function(data) {
        mark.val(data)
        $('#refresh').click()
      })
    }
    mark0.addEventListener('keydown', function(event) {
      if (event.keyCode === 9 && window.chrome) {
        event.preventDefault()

        let tabstr = '    '

        let start = this.selectionStart
        let end = this.selectionEnd
        // console.log(start, end, this.cursorStart)
        if (start === end) {
          // 没有选择文本，直接插入
          document.execCommand('insertText', false, tabstr)
        } else {
          let text = this.value

          // tab 字符串长度，用来计算选择结束位置
          let tablen = tabstr.length

          // 默认就插入一个 tab
          let insertstr = tabstr

          // 默认就加一个 tab 长度
          let newend = end + tablen

          // （如有换行）每一行前面都要插入一个 tablen
          // 同时也要加一个 tab 长度
          insertstr += text.slice(start, end).replace(/\n/g, function() {
            newend += tablen
            return '\n' + tabstr
          })

          // 插入加上 tab 的新字符串，这操作同时删除选中，相当于替换
          // 其实 Firefox 也有这个方法，但是表现怪异，几乎不能用
          document.execCommand('insertText', false, insertstr)

          // 选中加上 tab 的新字符串全部
          this.setSelectionRange(start, newend)
        }
      }
    })
  }

  init()
})(window, $, document)
