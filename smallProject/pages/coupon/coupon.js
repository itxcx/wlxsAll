Page({
  data: {
    couponList: [],
    modal: false
  },
   // 页面初始化 options为页面跳转所带来的参数
  onLoad: function (options) {
  
  },
  //扫码开门
  openDoorScan: function () {
    var that = this;
    
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        //显示模态框
        that.setData({
          modal: true
        })
        if (res) {
          var path = res.result;
          var device_number = path.split('?')[1].split('=')[1]; //设备id
          var session_key = wx.getStorageSync('session_key');
          //扫码成功后请求接口， 发送session_key,
          wx.request({
            url: 'https://weilaixiansen.com/login/checkagree',
            method: 'GET',
            data: { 'session_key': session_key },
            success: function (sessionRes) {
              console.log(sessionRes);
              console.log('-----')
              if (sessionRes.data.code == 0) { //如果已经签约
                var contract_id = sessionRes.data.contract_id;
                wx.setStorageSync('contract_id', contract_id);
                wx.setStorageSync('device_number', device_number); //device_number
                //开门命令
                wx.request({
                  url: 'https://weilaixiansen.com/login/shop',
                  method: 'GET',
                  data: {
                    'session_key': session_key,
                    'device_number': device_number,
                    'contract_id': contract_id
                  },
                  success: function (openRes) {//开门
                    wx.setStorageSync('device_number', '');
                    if (openRes.data.code == 1) {//开门失败
                      wx.navigateTo({
                        url: '../openDoor/openDoor?optStatus=openDoorTimeOut',
                        success: function () {
                          //隐藏模态框
                          that.setData({
                            modal: false
                          })
                        }
                      })
                    } else if (openRes.data.code == 10010) {//有未支付
                      wx.navigateTo({
                        url: '../openDoor/openDoor?optStatus=unpaid',
                        success: function () {
                          //隐藏模态框
                          that.setData({
                            modal: false
                          })
                        }
                      })
                    } else if (openRes.data.code == 0) {//开门成功
                      var order_id = openRes.data.data.order_id;
                      wx.setStorageSync('order_id', order_id);
                      console.log('开门成功orderid' + order_id);
                      wx.navigateTo({
                        url: '../openDoor/openDoor?optStatus=openDoorSuccess',
                        success: function () {
                          //隐藏模态框
                          that.setData({
                            modal: false
                          })
                        }
                      })
                    }
                  }
                })
              } else { //没签约
                wx.navigateToMiniProgram({
                  appId: 'wxbd687630cd02ce1d',
                  path: 'pages/index/index',
                  extraData: sessionRes.data.data,
                  success(res1) {
                    // 成功跳转到签约小程序,异步通知到地址
                    console.log('success')
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
})