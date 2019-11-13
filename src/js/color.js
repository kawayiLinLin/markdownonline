import $ from 'jquery'
;(function(window, $, document, undefined) {
  const mark = $('#mark')
  const color = $('#color')
  function colorchange(e) {
    const val = color.val()
    let d
    mark.css({ background: val })
    const r = colorRgb(val, 1).value[0]
    const g = colorRgb(val, 1).value[1]
    const b = colorRgb(val, 1).value[2]
    if (r + g + b <= 382.5) {
      mark.css({
        color: 'white'
      })
    } else {
      mark.css({
        color: 'black'
      })
    }
  }
  function curlocation(e) {
    const end = mark[0].selectionEnd
    $('.cursorlocation').html(end)
    window.markstart = mark[0].selectionStart
    window.markend = mark[0].selectionEnd
  }
  function colorRgb(str, opacity) {
    var sColor = str.toLowerCase()
    if (sColor) {
      if (sColor.length === 4) {
        var sColorNew = '#'
        for (var i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
        }
        sColor = sColorNew
      }
      //处理六位的颜色值
      var sColorChange = []
      for (var i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
      }
      return {
        rgba: 'rgba(' + sColorChange.join(',') + ',' + opacity + ')',
        value: sColorChange
      }
    } else {
      return sColor
    }
  }

  function init() {
    // $('#submitsetting').click()
    color.on('change', colorchange)
    mark.on('input keydown mousedown mousemove', curlocation)
  }

  init()
})(window, $, document)
