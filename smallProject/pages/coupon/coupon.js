Page({
  data: {
    couponList: [
      {
        amount: '5', //优惠券金额
        itemName: '乐虎专享优惠券', //优惠券名称
        limitType: '乐虎',//限制条件
        condition: '满20元可用',//使用条件
        startDate: '2018-05-01',//开始时间
        endDate: '2018-10-31' //结束时间
      },
      {
        amount: '10', //优惠券金额
        itemName: '好心情专享优惠券', //优惠券名称
        limitType: '好心情',//限制条件
        condition: '满50元可用',//使用条件
        startDate: '2018-05-01',//开始时间
        endDate: '2018-10-31' //结束时间
      },
      {
        amount: '20', //优惠券金额
        itemName: '新用户专享优惠券', //优惠券名称
        limitType: '全场',//限制条件
        condition: '满200元可用',//使用条件
        startDate: '2018-05-01',//开始时间
        endDate: '2018-10-31' //结束时间
      }
    ] 
  },
  //  // 页面初始化 options为页面跳转所带来的参数
  // onLoad: function (options) {
    
  // },
  //  // 页面渲染完成
  //  onReady: function () {

  //  },
  //  // 页面显示
  //  onShow: function () {

  //  },
  //   // 页面隐藏
  //  onHide: function () {

  //  },
  //    // 页面关闭
  //  onUnload: function () {

  //  },
  //去使用按钮方法
  goUsed: function () {
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
                  },
                  fail(res1) {
                    // 未成功跳转到签约小程序 
                  }
                })

              }
            }
          })
        }
      }
    })
  }
})