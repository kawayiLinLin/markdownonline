import $ from 'jquery'
import model from '../../node_modules/bootstrap/js/dist/modal.js'
;(function(window, $, model, undefined) {
  const mark = $('#mark')
  const mark0 = mark[0]
  const article = $('article.article')
  window.setObj = {
    theme: 'github',
    DescriptionDocument: 1,
    use_editor: 'textarea',
    editor_able: 2,
    background: '#2d2d2d',
    color: '#aad0f3',
    'font-family': 'Consolas',
    autoHeight: 0,
    scrollMultiple: 0,
    use_code: {
      code: 1,
      1: {
        level: '#',
        unlist: `
        + message
        + message
        + message
            - message
        `,
        olist: `
        1. message
        2. 
        3. 
        `,
        quote: '> ',
        link: '[]()',
        pic: '![]()',
        marked: '``',
        stress: '****',
        italics: '**',
        del: '~~',
        table: `

        |    |    |    |
        | -- | -- | -- |
        |    |    |    |
      
      `,
        code: `
      \`\`\`type
      
      \`\`\`
      `
      },
      2: {
        level: '#',
        unlist: `
        * message
        * message
        * message
            * message
        `,
        olist: `
        1. message
        2. 
        3. 
        `,
        quote: '> ',
        link: '[message]: http:// ""',
        pic: '[id]: url/to/image  "Optional title attribute"',
        marked: '``',
        stress: '____',
        italics: '__',
        del: '~~',
        table: `

        |    |    |    |
        | -- | -- | -- |
        |    |    |    |
      
      `,
        code: `
      \`\`\`type
      
      \`\`\`
      `
      },
      3: {
        level: '#',
        unlist: `
        * message
        * message
        * message
            * message
        `,
        olist: `
        1. message
        2. 
        3. 
        `,
        quote: '> ',
        link: '[message]: http:// ""',
        pic: '[id]: url/to/image  "Optional title attribute"',
        marked: '``',
        stress: '____',
        italics: '__',
        del: '~~',
        table: `

        |    |    |    |
        | -- | -- | -- |
        |    |    |    |
      
      `,
        code: `
      \`\`\`type
      
      \`\`\`
      `
      }
    }
  }

  function scrollSync1() {
    let whichone = $(this)
    let anotherone = whichone
      .parents('.col-md-6')
      .siblings()
      .find('.anotherone')
    let scrollMultiple = Number(window.setObj.scrollMultiple)
    let whichoneScrollTop = whichone.scrollTop()
    // console.log(scrollMultiple, whichoneScrollTop)
    anotherone.scrollTop(whichoneScrollTop * scrollMultiple)
    // console.log(anotherone.scrollTop())
  }

  function showRangebox(event) {
    const target = event.target
    if (target.value == 2) {
      $('#rangebox,#rangebox+br').show()
    } else {
      $('#rangebox,#rangebox+br').hide()
    }
  }
  String.prototype.clearNoNum = function() {
    let item = this.toString()
    if (item != null && item != undefined) {
      //先把非数字的都替换掉，除了数字和.
      item = item.replace(/[^\d.]/g, '')
      //必须保证第一个为数字而不是.
      item = item.replace(/^\./g, '')
      //保证只有出现一个.而没有多个.
      item = item.replace(/\.{2,}/g, '')
      //保证.只出现一次，而不能出现两次以上
      item = item
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
      //最多保留小数点后一位
      var arr = item.split('.')
      if (arr.length > 1)
        item = arr[0] + '.' + (arr[1].length > 1 ? arr[1].substr(0, 1) : arr[1])
    }
    return Number(item)
  }
  function scrollAuto() {
    // console.log(mark0.selectionStart)
    if (mark0.selectionStart == 0) {
      article[0].scrollTo(0, 0)
    } else if (mark0.selectionStart == mark.val().length) {
      article[0].scrollTo(article[0].scrollHeight, article[0].scrollHeight)
    }
  }
  function lineHeightAuto() {
    if (mark.height() <= 500) return
    let lineHeight = mark.css('line-height').clearNoNum()
    let lineheightAfter = `${(lineHeight + 0.5).toString().clearNoNum()}px`
    let lineheightBefore = `${(lineHeight - 1).toString().clearNoNum()}px`
    if (mark0.clientHeight == mark0.scrollHeight) {
      mark.css('line-height', lineheightAfter)
    }
    if (mark0.selectionStart == mark.val().length) {
      mark0.scrollTo(mark0.scrollHeight, mark0.scrollHeight)
    }
  }
  function dosetting(obj) {
    if (obj.theme && obj.theme != 'bootstrap') {
      $('head .theme').remove()
      var head = document.getElementsByTagName('head')[0]
      var link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = `../dist/${obj.theme}.css`
      link.classList.add('theme')
      head.appendChild(link)
    } else {
      $('head .theme').remove()
    }
    if (obj.use_editor) {
    }
    if (obj.editor_able != 4) {
      // console.log(mark.parents('.col-md-6').css('max-width'))
      mark
        .css({ 'min-height': '453px' })
        .parents('.col-md-6')
        .removeAttr('style')
        .css({ float: 'left' })
        .removeClass('auto')
        .siblings('.col-md-6')
        .show()

      // console.log(mark.parents('.col-md-6').css('max-width'))
    }
    if (obj.editor_able == 1) {
      mark
        .attr('readonly', 'readonly')
        .parent()
        .show()
        .parent()
        .siblings('.col-md-6')
        .removeClass('auto')
    } else if (obj.editor_able == 2) {
      mark
        .removeAttr('readonly')
        .parent()
        .show()
        .parent()
        .siblings('.col-md-6')
        .removeClass('auto')
    } else if (obj.editor_able == 3) {
      mark
        .parent()
        .hide()
        .parent()
        .siblings('.col-md-6')
        .addClass('auto')
    } else if (obj.editor_able == 4) {
      mark
        .css({ 'min-height': '600px' })
        .parents('.col-md-6')
        .css({ 'max-width': '100%' })
        .addClass('auto')
        .siblings('.col-md-6')
        .hide()
    }
    if (obj.autoHeight == 1) {
      mark.bind('keydown keyup', lineHeightAuto)
      // lineHeightAuto()
    } else {
      lineHeightAuto()
      mark.unbind('keydown keyup', lineHeightAuto)
    }
    if (obj.autoHeight == 2) {
      article.css({ height: '524px', 'overflow-y': 'auto' })
      mark.bind('click keydown keyup focus blur', scrollAuto)
      $('#rangebox,#rangebox+br').show()
      if (obj.scrollMultiple != 0) {
        mark.bind('scroll', scrollSync1)
      } else {
        mark.unbind('scroll', scrollSync1)
      }
    } else {
      article.css({ height: 'auto', 'overflow-y': 'visible' })
      mark.unbind('click keydown keyup focus blur', scrollAuto)
      $('#rangebox,#rangebox+br').hide()
      mark.unbind('scroll', scrollSync1)
    }
    if (obj.background) {
      mark.css('background', obj.background)
    }
    if (obj.color) {
      mark.css('color', obj.color)
    }
    if (obj['font-family']) {
      mark.css('font-family', obj['font-family'])
    }
  }
  function submitvalue() {
    window.setObj.theme = $('#theme').val()
    window.setObj.use_editor = 'textarea'
    window.setObj.editor_able = $("input[name='isunable']:checked").val()
    window.setObj.autoHeight = $("input[name='autoheight']:checked").val()
    window.setObj.scrollMultiple = $('#rangebox input').val()
    window.setObj.DescriptionDocument = $(
      "input[name='descriptiondocument']:checked"
    ).val()
    window.setObj.background = $('#inputcolor1').val()
    window.setObj.color = $('#inputcolor2').val()
    window.setObj['font-family'] = $('#fontFamily').val()
    window.setObj.use_code.code = $('#codevalue').val()
    localStorage.setItem(
      'markdown_online_setting',
      JSON.stringify(window.setObj)
    )
    // console.log(window.setObj)
    dosetting(window.setObj)
    valuesetting()
    try {
      window.boxAlert('配置更新成功', 'alert-success')
    } catch (e) {}
  }
  function valuesetting() {
    $('#theme')
      .find(`option[value=${window.setObj.theme}]`)
      .attr('selected', 'selected')
      .siblings()
      .removeAttr('selected')
    $(
      `input[name='descriptiondocument'][value=${
        window.setObj.DescriptionDocument
      }]`
    ).attr('checked', 'checked')
    $(`input[name='isunable'][value=${window.setObj.editor_able}]`).attr(
      'checked',
      'checked'
    )
    $(`input[name='autoheight'][value=${window.setObj.autoHeight}]`).attr(
      'checked',
      'checked'
    )
    $('#rangebox input')
      .val(window.setObj.scrollMultiple)
      .next('label')
      .text(window.setObj.scrollMultiple)
    $('#inputcolor1').val(window.setObj.background)
    $('#colorval1').val(window.setObj.background)
    $('#inputcolor2').val(window.setObj.color)
    $('#colorval2').val(window.setObj.color)
    $('#fontFamily')
      .find(`option[value=${window.setObj['font-family']}]`)
      .attr('selected', 'selected')
      .siblings()
      .removeAttr('selected')
    $('#codevalue').val(window.setObj.use_code.code)
    $('#myModal .close').click()
  }
  function setttingClick() {
    valuesetting()
  }
  function delsetting() {
    localStorage.removeItem('markdown_online_setting')
    window.boxAlert('删除成功', 'alert-success')
  }
  function init() {
    $('#delsetting').on('click', delsetting)
    $('#setting').on('click', setttingClick)
    $('#submitsetting').on('click', submitvalue)
    $('input[type=radio][name=autoheight]').on('click', event => {
      showRangebox(event)
    })
    if (localStorage.getItem('markdown_online_setting')) {
      window.setObj = JSON.parse(
        localStorage.getItem('markdown_online_setting')
      )
      valuesetting()

      setTimeout(() => {
        $('#submitsetting').click()
      }, 500)
    }
  }
  init()
})(window, $, model)
