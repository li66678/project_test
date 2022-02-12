$(function () {
  // 初始化右侧滚动条
  // 这个方法定义在scroll.js中
  resetui()

  // 为发送按钮绑定点击事件
  $('#btnSend').on('click', function () {
    var text = $('#ipt').val().trim()
    if (text.length <= 0) {
      return $('#ipt').val('')
    }

    // 如果输入内容不为空，则将聊天内容追加到页面上显示
    $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li>')
    $('#ipt').val('')
    resetui()
    // 调用getMsg，获得回复
    getMsg(text)
  })

  // 获取聊天机器人发送回来的消息
  function getMsg(text) {
    $.ajax({
      method: 'GET',
      url: 'http://ajax.frontend.itheima.net:3006/api/robot',
      data: {
        spoken: text
      },
      success: function (res) {
        if (res.massage === 'success') {
          var msg = res.data.info.text
          $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>' + msg + '</span></li>')
          resetui()
          // 调用getVoice函数
          getVoice(msg)
        }
      }
    })
  }

  // 语音播放
  function getVoice(text) {
    $.ajax({
      method: 'GET',
      url: 'http://ajax.frontend.itheima.net:3006/api/synthesize',
      data: {
        text: text
      },
      success: function (res) {
        if (res.status === 200) {
          $('#voice').attr('src', res.voiceUrl)
        }
      }
    })
  }

  // 回车发送
  $('#ipt').on('keyup', function (e) {
    if (e.keyCode === 13) {
      $('#btnSend').click()
    }
  })
}) 