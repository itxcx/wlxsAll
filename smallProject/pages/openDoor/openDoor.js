Page({
  data: {
    openning: true, //开门中
    openSuccess: false, //开门成功
    account: false, //结算
  },

  //监听页面加载
  onLoad: function () {
  //创建websocket连接
    wx.connectSocket({
      url: '',
      header: {
        'content-type': 'application/json'
      },
      protocols: ['protocol1'],
      method: "GET"
    })
    //连接打开
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！');
    })
    //连接打开失败
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！');
    })
    //服务器数据
    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容：' + res.data);
    })
  },
  //客服电话
  callService: function () {
    wx.makePhoneCall({
      phoneNumber: '4007707768'
    })
  }
})