Page({
  data: {},
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
})