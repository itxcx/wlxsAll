Page({
  data: {
    openning: false, //开门中
    openSuccess: false, //开门成功
    account: true, //结算成功
    accountFail: false, //结算失败
    detailInfo: {
      amount: 20,
      discount: 10
    }
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
  },
  //再次购买
  againScan: function() {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  //查看订单
  checkOrder: function() {

  },
  //去付款
  goPay: function() {

  }
})