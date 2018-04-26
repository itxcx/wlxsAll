Page({
  data: {
    orderDetail: {},
    statusCommon: '',
    statusUnpay: ''
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
  //去支付
  goPay: function (e) {
    var order_id = this.data.orderDetail.order_id;
    var session_key = wx.getStorageSync('session_key');
    console.log(order_id);
    console.log(session_key);
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
              wx.navigateTo({
                url: '../paid/paid',
              })
              var timer = setTimeout(function () {
                wx.navigateBack({
                  delta: 5
                })
                clearTimeout(timer);
              }, 1500)
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
          wx.navigateTo({
            url: '../paid/paid',
          })
        }
      }
    })
  },
})
