Page({
  data: {
    orderDetail: {},
    statusCommon: '',
    statusUnpay: '',
    loading: false,
  },
  // 页面初始化 
   onLoad: function () {
     var data = wx.getStorageSync('detailData');
     console.log('订单详情查看数据如下');
     console.log(data);
     if (data.purType == '待支付') {
        this.setData({
          statusCommon: false,
          statusUnpay: true
        })
     }else {
       this.setData({
         statusCommon: true,
         statusUnpay: false
       })
     }
     this.setData({
       orderDetail: data
     })
   },
  //客服热线
  callService: function() {
    wx.makePhoneCall({
      phoneNumber: '4007707768'
    })
  },
  goPay:function (e) {
    var that = this;
    console.log(this.data.orderDetail);
    var order_id = this.data.orderDetail.order_id;
    var session_key = wx.getStorageSync('session_key');
    console.log(order_id);
    console.log(session_key);
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
        }
        else {
          
          that.setData({
            loading: true
          })
          setTimeout(function () {
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
                      that.setData({
                        loading: false
                      })
                      wx.navigateTo({
                        url: '../paid/paid',
                      })
                    },
                    fail: function () {
                      that.setData({
                        loading: false
                      })
                      wx.setStorageSync('success', 'error');
                      wx.navigateTo({
                        url: '../paid/paid',
                      })
                    }
                  })
                } else {
                  that.setData({
                    loading: false
                  })
                  wx.setStorageSync('success', 'error');
                  wx.navigateTo({
                    url: '../paid/paid',
                  })
                }
              }
            })
          }, 3000)
        }
      }
    })
  }
})
