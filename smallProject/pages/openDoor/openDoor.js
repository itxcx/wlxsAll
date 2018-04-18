Page({
  data: {
    openning: false, //开门中
    openSuccess: false, //开门成功
    account: false, //结算成功
    accountFail: false, //结算失败
    detailInfo: {
      amount: 20,
      discount: 10
    }
  },

  //监听页面加载
  onLoad: function () {
    var that = this;
    //this.socketBack(that);
    var session_key = wx.getStorageSync('session_key');
    console.log(session_key);
  wx.request({
    url: 'https://weilaixiansen.com/login/socketRegist',
    data: {session_key: session_key},
    success: (res) => {
      //console.log(res);
      if(res.data.code == 0) {
       var sid = res.data.data.session_id
       this.socketBack(that, sid);
      }
    }
  })
  },
  //socket方法
  socketBack: function (that,sid) {
    //创建websocket连接
    wx.connectSocket({
      //url: 'wss://wss.weilaixiansen.com/' + session_id
      url: 'wss://wss.weilaixiansen.com?' + sid
    })
    //连接打开
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！');
      that.setData({
        openning: true
      })
    })
    //连接打开失败
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
    })
    //服务器数据
    wx.onSocketMessage(function (res) {
      console.log(res);
      console.log('收到服务器内容：' + res.data);
     
    })
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
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
    wx.navigateBack({
      delta: 10,
    })
  },
  //查看订单
  checkOrder: function() {

  },
  //去付款
  goPay: function() {

  }
})