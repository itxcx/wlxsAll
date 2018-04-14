Page({
  data: {
    nickName: '',
    avatarUrl: ''
  },
  onLoad: function() {
    var userInfo = wx.getStorageSync('userInfo').userInfo;
    this.setData({
      nickName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl
    })
  },
  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg);
    console.log(e.detail.iv);
    console.log(e.detail.encryptedData);
    if (e.detail.iv && e.detail.encryptedData) {
      var userInfo = wx.getStorageSync('userInfo');
      var code = wx.getStorageSync('code');
      wx.request({
        url: 'https://weilaixiansen.com/login/getUserInfo',
        method: 'GET',
        data: { 
          'user_iv': userInfo.user_iv,
          'user_encryptedData': userInfo.user_encryptedData,
          'phone_iv':  e.detail.iv ,
          'phone_encryptedData': e.detail.encryptedData,
          'code': code
          },
          success: res => {
            console.log(res);
            if(res.data.code == 0) {
              console.log(res);
              console.log(res.data);
             wx.setStorageSync('session_key', res.data.session_key);
            }
            //存储用户手机号
            wx.setStorageSync('userPhone', res.data.data.phone);
            console.log('start');
            var pages = getCurrentPages();
            var currPage = pages[pages.length - 1];   //当前页面
            var prevPage = pages[pages.length - 2];  //上一个页面
            prevPage.setData({
              fail: true
            })
            console.log('end');
            var sessCode = wx.getStorageSync('session_key');
            console.log(sessCode);
////////////////////////////////////////////////////////////////////////////////////
         wx.request({
            url: 'https://weilaixiansen.com/login/wxappback',//存储用户信息，检查签约状态
            data: {
              session_key: sessCode
            },
            success:function(rst){
              // 获取用户信息
              console.log(rst); //返回session_key ，未签约会返回签约需要的参数
              // rst.session_key存储，每次交互都返回
              if (rst.data.code == 1) { //未签约
                wx.navigateToMiniProgram({
                  appId: 'wxbd687630cd02ce1d',
                  path: 'pages/index/index',
                  extraData: rst.data.data,
                  success(res1) {
                    // 成功跳转到签约小程序,异步通知到地址
                    wx.navigateBack({
                      delta: 5
                    })
                  },
                  fail(res1) {
                    // 未成功跳转到签约小程序  
                  }
                })
              }else{
                wx.navigateBack({
                  delta: 5
                })
              }
            }
          });
          }
      })
    }
  }
})