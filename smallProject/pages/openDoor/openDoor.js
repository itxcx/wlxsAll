Page({
  data: {
    openning: true, //开门中
    openSuccess: false, //开门成功
    account: false, //结算成功
    accountFail: false, //结算失败
    openError: false,//开门失败
    unpaid: false, //未支付订单
    tipContent: false, //提示内容
    bottomBanner: false, //底部图片
    detailInfo: {
      amount: 20,
      discount: 10
    }
  },

  //监听页面加载
  onLoad: function () {
    var session_key = wx.getStorageSync('session_key');
    var device_number = wx.getStorageSync('device_number');
    var contract_id = wx.getStorageSync('contract_id');
    var that = this;
    // wx.request({
    //   url: 'https://weilaixiansen.com/login/socketRegist',
    //   data: { session_key: session_key },
    //   success: (res) => {
    //     console.log('--------------------------');
    //     console.log(res);
    //     if (res.data.code == 0) {

    //       var sid = res.data.data.session_id;
    //       this.socketBack(that, sid);
    //     }
    //   }
    // })
    wx.request({
      url: 'https://weilaixiansen.com/login/shop',
      method: 'GET',
      data: { 'session_key': session_key, 
                 'device_number': device_number, 
                 'contract_id': contract_id
      },
      success: function (openRes) {//开门
        //websocket
        console.log(openRes);
        console.log('--')
        console.log('open success');
        if (openRes.data.code == 1) {//开门失败
         that.setData({
           openning: false, //开门中
           openSuccess: false, //开门成功
           account: false, //结算成功
           accountFail: false, //结算失败
           openError: true,//开门失败
           unpaid: false, //未支付订单
           tipContent: false, //提示内容
           bottomBanner: false, //底部图片
         })
        } else if (openRes.data.code == 10010) {//有未支付订单
         that.setData({
           openning: false, //开门中
           openSuccess: false, //开门成功
           account: false, //结算成功
           accountFail: false, //结算失败
           openError: false,//开门失败
           unpaid: true, //未支付订单
           tipContent: false, //提示内容
           bottomBanner: false, //底部图片
         })
        } else if (openRes.data.code == 0) {//开门成功
          that.setData({
            openning: false, //开门中
            openSuccess: true, //开门成功
            account: false, //结算成功
            accountFail: false, //结算失败
            openError: false,//开门失败
            unpaid: false, //未支付订单
            tipContent: true, //提示内容
            bottomBanner: true, //底部图片
          })

          wx.request({
            url: 'https://weilaixiansen.com/login/socketRegist',
            data: { session_key: session_key },
            success: (res) => {
              //console.log(res);
              if (res.data.code == 0) {
                var sid = res.data.data.session_id
                this.socketBack(that, sid);
              }
            }
          })

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
    })
    //连接打开失败
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！');
    })
    //服务器数据
    wx.onSocketMessage(function (res) {
      console.log(res);
      console.log('收到服务器内容：' + res.data);
      if(res.data && res.data.length > 0) {
        //请求数据订单信息
        wx.setStorageSync('order_id', res.data);
        that.setData({
          openning: false, //开门中
          openSuccess: false, //开门成功
          account: true, //结算成功
          accountFail: false, //结算失败
          openError: false,//开门失败
          unpaid: false, //未支付订单
          tipContent: true, //提示内容
          bottomBanner: true, //底部图片
        })
      } 
    })
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！');
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
    this.openDoorScan();
  },
  //扫码开门
  openDoorScan: function () {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        if (res) {
          var path = res.result;
          var device_number = path.split('?')[1].split('=')[1]; //设备id
          var session_key = wx.getStorageSync('session_key');
          //扫码成功后请求接口， 发送session_key
          wx.request({
            url: 'https://weilaixiansen.com/login/checkagree',
            method: 'GET',
            data: { 'session_key': session_key },
            success: function (sessionRes) {
              if (sessionRes.data.code == 0) { //如果已经签约
                var contract_id = sessionRes.data.contract_id;
                wx.request({
                  url: 'https://weilaixiansen.com/login/shop',
                  method: 'GET',
                  data: { 'session_key': session_key, 'device_number': device_number, 'contract_id': contract_id },
                  success: function (openRes) {//开门
                    //websocket
                    console.log('open success');
                    //code = 1 --- 不存在，未启用，开门失败
                    //code = 10010 --- 支付失败  调到待支付订单页面
                    //code = 0，开门成功
                    if (openRes.code == 1) {//开门失败，留在本页面，不做处理

                    } else if (oponRes.code == 10010) {//有未支付订单
                      wx.navigateTo({
                        url: '../unpaid/unpaid'
                      })
                    } else if (openRes.code == 0) {//开门成功
                      wx.navigateTo({
                        url: '../openDoor/openDoor'
                      })
                    }
                  }
                })
              } else { //没签约
                // sessionRes.data.data
                wx.navigateToMiniProgram({
                  appId: 'wxbd687630cd02ce1d',
                  path: 'pages/index/index',
                  extraData: sessionRes.data.data,
                  success(res1) {
                    // 成功跳转到签约小程序,异步通知到地址
                    console.log('success')
                    wx.navigateBack({
                      delta: 5
                    })
                  },
                  fail(res1) {
                    // 未成功跳转到签约小程序
                    console.log(res1);
                  }
                })
              }
            }
          })
        }
      }
    })
  },
  //查看订单
  checkOrder: function() {
    var order_id = wx.getStorageSync('order_id');
    console.log(order_id);
    wx.request({
      url: 'https://weilaixiansen.com/login/getOrderTagsDetail',
      data: { order_id: order_id },
      success: function (res) {
        console.log(res);
        if (res.data.code == 0) {
          var detailData = res.data.data;
          wx.setStorageSync('detailData', detailData);
          wx.navigateTo({
            url: '../orderDetail/orderDetail'
          });
        }
      }
    })
  },
  //去付款
  goPay: function() {

  }
})