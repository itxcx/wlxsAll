Page({
  data: {
    // openning: true, //开门中
    openSuccess: false, //开门成功
    close: false, //关门结算
    account: false, //结算成功
    accountFail: false, //结算失败
    openError: false,//开门失败
    unpaid: false, //未支付订单
    noPay: false, //没有购买
    alipay: false,//提示使用支付宝
    tipContent: true, //提示内容
    bottomBanner: true, //底部图片
    indexModal: false,
    isRequest: true, //轮询
    detailAmount: '', //订单金额
    detailDiscount: '',//折扣金额
    real_amount:'',//实付金额
    loading: false,
  },

  //监听页面加载
  onLoad: function (options) {
    var status = options.optStatus;
    console.log(status);
    var that = this;
    var order_id = wx.getStorageSync('order_id');
   
    if (status == 'openDoorSuccess') {  //开门成功
     that.setData({
      //  openning: false, //开门中
       openSuccess: true, //开门成功
       close: false, //关门结算
       account: false, //结算成功
       accountFail: false, //结算失败
       openError: false,//开门失败
       unpaid: false, //未支付订单
       noPay: false, //没有购买
       alipay: false,//提示使用支付宝
       tipContent: true, //提示内容
       bottomBanner: true, //底部图片
       isRequest: true, //轮询
     })
     var pages = getCurrentPages();
     var currPage = pages[pages.length - 1];   //当前页面
     var prevPage = pages[pages.length - 2];  //上一个页面
     prevPage.setData({
       fail: true
     })
     var timer = setInterval(function () {
       that.getCode(order_id, that);
       if (!that.data.isRequest) {
         clearInterval(timer);
       }
     }, 1000)
    } else if (status == 'openDoorTimeOut') {//开门超时
      that.setData({
        // openning: false, //开门中
        openSuccess: false, //开门成功
        close: false, //关门结算
        account: false, //结算成功
        accountFail: false, //结算失败
        openError: true,//开门失败
        unpaid: false, //未支付订单
        noPay: false, //没有购买
        alipay: false,//提示使用支付宝
        tipContent: false, //提示内容
        bottomBanner: false, //底部图片
        isRequest: true, //轮询
      })
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2];  //上一个页面
      prevPage.setData({
        fail: true
      })
    } else if (status == 'unpaid' ) {//有未支付订单
      that.setData({
        // openning: false, //开门中
        openSuccess: false, //开门成功
        close: false, //关门结算
        account: false, //结算成功
        accountFail: false, //结算失败
        openError: false,//开门失败
        unpaid: true, //未支付订单
        noPay: false, //没有购买
        alipay: false,//提示使用支付宝
        tipContent: false, //提示内容
        bottomBanner: false, //底部图片
        isRequest: true, //轮询
      })
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2];  //上一个页面
      prevPage.setData({
        fail: true
      })
   } else if(status == 'alipay') {//提示使用支付宝
      that.setData({
        // openning: false, //开门中
        openSuccess: false, //开门成功
        close: false, //关门结算
        account: false, //结算成功
        accountFail: false, //结算失败
        openError: false,//开门失败
        unpaid: false, //未支付订单
        noPay: false, //没有购买
        alipay: true,//提示使用支付宝
        tipContent: true, //提示内容
        bottomBanner: true, //底部图片
        isRequest: true, //轮询
      })
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2];  //上一个页面
      prevPage.setData({
        fail: true
      })
   }else if(status == 'openDoorError') {//各种错误，返回首页后还需要授权
      that.setData({
        // openning: false, //开门中
        openSuccess: false, //开门成功
        close: false, //关门结算
        account: false, //结算成功
        accountFail: false, //结算失败
        openError: true,//开门失败
        unpaid: false, //未支付订单
        noPay: false, //没有购买
        alipay: false,//提示使用支付宝
        tipContent: false, //提示内容
        bottomBanner: false, //底部图片
        isRequest: true, //轮询
      })
   }
  },
  //轮询方法
  getCode: function(order_id, that) {
    console.log('轮询方法里orderId:'+order_id);
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
                      // openning: false, //开门中
                      openSuccess: false, //开门成功
                      close: true, //关门结算
                      account: false, //结算成功
                      accountFail: false, //结算失败
                      openError: false,//开门失败
                      unpaid: false, //未支付订单
                      noPay: false, //没有购买
                      alipay: false,//提示使用支付宝
                      tipContent: true, //提示内容
                      bottomBanner: true, //底部图片
                    })
                } else if (res.data.data.status == 4) {//支付成功
                  that.setData({
                    // openning: false, //开门中
                    openSuccess: false, //开门成功
                    close: false, //关门结算
                    account: true, //结算成功
                    accountFail: false, //结算失败
                    openError: false,//开门失败
                    unpaid: false, //未支付订单
                    tipContent: true, //提示内容
                    noPay: false, //没有购买
                    alipay: false,//提示使用支付宝
                    bottomBanner: true, //底部图片
                    detailAmount: res.data.data.amount, //订单金额
                    detailDiscount: res.data.data.discount,//折扣金额
                    real_amount: res.data.data.real_amount,//实付金额
                  })
                  that.data.isRequest = false;
                } else if (res.data.data.status== 7) {//支付失败
                  that.setData({
                    // openning: false, //开门中
                    openSuccess: false, //开门成功
                    close: false, //关门结算
                    account: false, //结算成功
                    accountFail: true, //结算失败
                    openError: false,//开门失败
                    unpaid: false, //未支付订单
                    noPay: false, //没有购买
                    alipay: false,//提示使用支付宝
                    tipContent: true, //提示内容
                    bottomBanner: true, //底部图片
                    detailAmount: res.data.data.amount, //订单金额
                    detailDiscount: res.data.data.discount,//折扣金额
                    real_amount: res.data.data.real_amount,//实付金额
                  })
                  that.data.isRequest = false;
                }else if(res.data.data.status == 10) {//开门没有购买
                  that.setData({
                    // openning: false, //开门中
                    openSuccess: false, //开门成功
                    close: false, //关门结算
                    account: false, //结算成功
                    accountFail: false, //结算失败
                    openError: false,//开门失败
                    unpaid: false, //未支付订单
                    noPay: true, //没有购买
                    alipay: false,//提示使用支付宝
                    tipContent: true, //提示内容
                    bottomBanner: true, //底部图片
                    detailAmount: 0, //订单金额
                    detailDiscount: 0,//折扣金额
                    real_amount: 0,//实付金额
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
  //返回首页
  againScan: function() {
    wx.navigateBack({
      delta: 10
    })
  },
  //去支付
  goPay: function (e) {
    var that = this;
    var order_id = wx.getStorageSync('order_id');
    var session_key = wx.getStorageSync('session_key');
    wx.request({
      url: 'https://weilaixiansen.com/login/wxappback',//存储用户信息，检查签约状态
      data: {
        session_key: session_key
      },
      success: function (rst) {
        // 获取用户信息
        console.log(rst); //返回session_key ，未签约会返回签约需要的参数
        // rst.session_key存储，每次交互都返回
        if (rst.data.code == 1) { //未签约
          console.log('weiqianyue,quqianyue');
          wx.navigateToMiniProgram({
            appId: 'wxbd687630cd02ce1d',
            path: 'pages/index/index',
            extraData: rst.data.data,
            success(res1) {
            },
            fail(res1) {
              // 未成功跳转到签约小程序  
              console.log('not return miniprogram')
            }
          })
        } else {
          that.setData({
            loading: true
          })
          setTimeout(function() {
            wx.request({
              url: 'https://weilaixiansen.com/login/payonline',
              method: 'GET',
              data: {
                order_id: order_id,
                session_key: session_key
              },
              success: function (res) {
                console.log(res);
                if (res.data.code == 0) {
                  wx.setStorageSync('success', 'success');
                  that.setData({
                    loading: false
                  })
                  wx.navigateTo({
                    url: '../paid/paid',
                  })
                } else if (res.data.code == 2) {//线上支付,主动支付方法
                  that.setData({
                    loading: false
                  })
                  wx.requestPayment({
                    "appId": res.data.data.appId,
                    "timeStamp": res.data.data.timeStamp,
                    "nonceStr": res.data.data.nonceStr,
                    "package": res.data.data.package,
                    "signType": res.data.data.signType,
                    "paySign": res.data.data.paySign,
                    success: function (res) {
                      console.log(res);
                      wx.setStorageSync('success', 'success');
                      wx.navigateTo({
                        url: '../paid/paid',
                      })
                    },
                    fail: function () {
                      wx.setStorageSync('success', 'error');
                      wx.navigateTo({
                        url: '../paid/paid',
                      })
                    }
                  })
                } else {
                  wx.setStorageSync('success', 'error');
                  that.setData({
                    loading: false
                  })
                  wx.navigateTo({
                    url: '../paid/paid',
                  })
                }
              }
            })
          }, 2000)
         
        }
      }
    })
    /////
  },
  //扫码开门
  openDoorScan: function () {
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        if (res) {
          that.setData({
            indexModal: true
          })
          var path = res.result;
          var device_number = path.split('?')[1].split('=')[1]; //设备id
          var session_key = wx.getStorageSync('session_key');
          //扫码成功后请求接口， 发送session_key
          wx.request({
            url: 'https://weilaixiansen.com/login/checkagree',
            method: 'GET',
            data: { 'session_key': session_key },
            success: function (sessionRes) {
              that.setData({
                indexModal: false
              })
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
                    console.log(openRes.data.code);
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
                      wx.setStorageSync('order_id', order_id);
                      console.log('开门成功orderid：'+order_id);
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
                that.setData({
                  indexModal: true
                })
                wx.navigateToMiniProgram({
                  appId: 'wxbd687630cd02ce1d',
                  path: 'pages/index/index',
                  extraData: sessionRes.data.data,
                  success(res1) {
                    // 成功跳转到签约小程序,异步通知到地址
                    console.log('success')
                    wx.navigateBack({
                      delta: 10
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
  //查看订单
  checkOrder: function() {
    var order_id = wx.getStorageSync('order_id');
    console.log('查看订单点击orderid: '+order_id);
    wx.request({
      url: 'https://weilaixiansen.com/login/getOrderTagsDetail',
      data: { order_id: order_id },
      success: function (res) {
        console.log(res);
        if (res.data.code == 0) {
          var detailData = res.data.data;
          wx.setStorageSync('detailData', detailData);
        }
        wx.navigateTo({
          url: '../orderDetail/orderDetail'
        });
      }
    })
  },
  //没有购物，返回首页
  noPay: function() {
    wx.navigateBack({
      delta: 10
    })
  }
})