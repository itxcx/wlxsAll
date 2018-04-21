Page({
  data: {
    openning: true, //开门中
    openSuccess: false, //开门成功
    close: false, //关门结算
    account: false, //结算成功
    accountFail: false, //结算失败
    openError: false,//开门失败
    unpaid: false, //未支付订单
    noPay: false, //没有购买
    tipContent: true, //提示内容
    bottomBanner: true, //底部图片

    isRequest: true, //轮询
    detailAmount: '', //订单金额
    detailDiscount: ''//折扣金额
  },

  //监听页面加载
  onLoad: function () {
    var session_key = wx.getStorageSync('session_key');
    var device_number = wx.getStorageSync('device_number');
    var contract_id = wx.getStorageSync('contract_id');
    var that = this;
    console.log('socket start!');
    console.log('session_key:' + session_key);
    console.log('socket end!');
    //返回订单id
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
           close: false, //关门结算
           account: false, //结算成功
           accountFail: false, //结算失败
           openError: true,//开门失败
           unpaid: false, //未支付订单
           noPay: false, //没有购买
           tipContent: false, //提示内容
           bottomBanner: false, //底部图片
         })
        } else if (openRes.data.code == 10010) {//有未支付订单
         that.setData({
           openning: false, //开门中
           openSuccess: false, //开门成功
           close: false, //关门结算
           account: false, //结算成功
           accountFail: false, //结算失败
           openError: false,//开门失败
           unpaid: true, //未支付订单
           noPay: false, //没有购买
           tipContent: false, //提示内容
           bottomBanner: false, //底部图片
         })
        } else if (openRes.data.code == 0) {//开门成功
          var order_id = openRes.data.data.order_id;
          console.log(order_id);
          that.setData({
            openning: false, //开门中
            openSuccess: true, //开门成功
            close: false, //关门结算
            account: false, //结算成功
            accountFail: false, //结算失败
            openError: false,//开门失败
            unpaid: false, //未支付订单
            noPay: false, //没有购买
            tipContent: true, //提示内容
            bottomBanner: true, //底部图片
            isRequest: true, //轮询
          })
          var timer = setInterval(function() {
            that.getCode(order_id, that);
            if (!that.data.isRequest) {
              clearInterval(timer);
            }
          }, 1000)
        }
      }
    })
  },
  //轮询方法
  getCode: function(order_id, that) {
    console.log(order_id);
    var isRequest = that.data.isRequest;
    console.log(isRequest);
      if(isRequest) {
          wx.request({
            url: 'https://weilaixiansen.com/login/getOrderTagsDetail',
            method: 'GET',
            data: {
             order_id: order_id
            },
            success: function(res) {//请求成功
                console.log(res);
                if(res.data.data.status == 3) {//关门结算
                    that.setData({
                      openning: false, //开门中
                      openSuccess: false, //开门成功
                      close: true, //关门结算
                      account: false, //结算成功
                      accountFail: false, //结算失败
                      openError: false,//开门失败
                      unpaid: false, //未支付订单
                      noPay: false, //没有购买
                      tipContent: true, //提示内容
                      bottomBanner: true, //底部图片
                    })
                } else if (res.data.data.status == 4) {//支付成功
                  that.setData({
                    openning: false, //开门中
                    openSuccess: false, //开门成功
                    close: false, //关门结算
                    account: true, //结算成功
                    accountFail: false, //结算失败
                    openError: false,//开门失败
                    unpaid: false, //未支付订单
                    tipContent: true, //提示内容
                    noPay: false, //没有购买
                    bottomBanner: true, //底部图片
                    detailAmount: res.data.data.amount, //订单金额
                    detailDiscount: res.data.data.discount//折扣金额
                  })
                  that.data.isRequest = false;
                } else if (res.data.data.status== 7) {//支付失败
                  that.setData({
                    openning: false, //开门中
                    openSuccess: false, //开门成功
                    close: false, //关门结算
                    account: false, //结算成功
                    accountFail: true, //结算失败
                    openError: false,//开门失败
                    unpaid: false, //未支付订单
                    noPay: false, //没有购买
                    tipContent: true, //提示内容
                    bottomBanner: true, //底部图片
                    detailAmount: res.data.data.amount, //订单金额
                    detailDiscount: res.data.data.discount//折扣金额
                  })
                  that.data.isRequest = false;
                }else if(res.data.data.status == 10) {//开门没有购买
                  that.setData({
                    openning: false, //开门中
                    openSuccess: false, //开门成功
                    close: false, //关门结算
                    account: false, //结算成功
                    accountFail: true, //结算失败
                    openError: false,//开门失败
                    unpaid: false, //未支付订单
                    noPay: true, //没有购买
                    tipContent: true, //提示内容
                    bottomBanner: true, //底部图片
                    detailAmount: 0, //订单金额
                    detailDiscount: 0//折扣金额
                  })
                  that.data.isRequest = false;
                }
            },
            fail: function(error) {
                console.log(error);
            }
          })
      }
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
  //去支付
  goPay: function() {
    var order_id = wx.getStorageSync('order_id');
    wx.request({
      url: 'https://weilaixiansen.com/login/pay',
      method: 'GET',
      data: {
       order_id: order_id
      },
      success: function(res) {
          if(res.data.code == 0) {
            wx.setStorageSync('success', 'success');
            wx.navigateTo({
              url: '../paid/paid',
            })
          }else{
            wx.setStorageSync('success', 'error');
            wx.navigateTo({
              url: '../paid/paid',
            })
            
          }
      }
    })
  },
  //扫码开门
  openDoorScan: function () {
    var that = this;
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
                //返回订单id
                wx.request({
                  url: 'https://weilaixiansen.com/login/shop',
                  method: 'GET',
                  data: {
                    'session_key': session_key,
                    'device_number': device_number,
                    'contract_id': contract_id
                  },
                  success: function (openRes) {//开门
                    console.log(openRes);
                    console.log('open success');
                    if (openRes.data.code == 1) {//开门失败
                      that.setData({
                        openning: false, //开门中
                        openSuccess: false, //开门成功
                        close: false, //关门结算
                        account: false, //结算成功
                        accountFail: false, //结算失败
                        openError: true,//开门失败
                        unpaid: false, //未支付订单
                        noPay: false, //没有购买
                        tipContent: false, //提示内容
                        bottomBanner: false, //底部图片
                      })
                    } else if (openRes.data.code == 10010) {//有未支付订单
                      that.setData({
                        openning: false, //开门中
                        openSuccess: false, //开门成功
                        close: false, //关门结算
                        account: false, //结算成功
                        accountFail: false, //结算失败
                        openError: false,//开门失败
                        unpaid: true, //未支付订单
                        noPay: false, //没有购买
                        tipContent: false, //提示内容
                        bottomBanner: false, //底部图片
                      })
                    } else if (openRes.data.code == 0) {//开门成功
                      var order_id = openRes.data.data.order_id;
                      console.log(order_id);
                      that.setData({
                        openning: false, //开门中
                        openSuccess: true, //开门成功
                        close: false, //关门结算
                        account: false, //结算成功
                        accountFail: false, //结算失败
                        openError: false,//开门失败
                        unpaid: false, //未支付订单
                        noPay: false, //没有购买
                        tipContent: true, //提示内容
                        bottomBanner: true, //底部图片
                        isRequest: true, //轮询
                      })
                      var timer = setInterval(function () {
                        that.getCode(order_id, that);
                        if (!that.data.isRequest) {
                          clearInterval(timer);
                        }
                      }, 1000)
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
  //未支付去查看订单
  checkDetail: function() {
    wx.navigateTo({
      url: '../purchases/purchases',
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
  }
})