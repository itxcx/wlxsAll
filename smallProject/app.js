//二维码链接内容会以参数q的形式带给页面，在onLoad事件中提取"q"参数并自行UrlDecode一次，即可获取原二维码的完整内容。
App({
  onLaunch: function () {
    var global_this = this;
    //登录
    wx.login({
      success: res => {
        console.log('login');
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
       if(res.code){ //临时会话code
            wx.setStorageSync("code", res.code);
            wx.getSetting({    //检查授权，获取用户信息
            success: res => {
              console.log(res.code);
              if (res.authSetting['scope.userInfo']) {
                console.log('userInfo is true');
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                  withCredentials: true, //返回用户的基本信息
                  success: res1 => {
                    var userInfo = {
                      'userInfo': res1.userInfo,
                      'user_iv': res1.iv,
                      'user_encryptedData' : res1.encryptedData,
                    }
                    console.log(userInfo);
                    wx.setStorageSync('userInfo', userInfo); 
                    console.log(1);
                    console.log(wx.getStorageSync('userInfo'));
                    //验证手机号是否存在，如果不存在，跳转到获取手机号页面
                    var getUserPhone = wx.getStorageSync('userPhone');
                    console.log(getUserPhone);
                    if (!getUserPhone) {
                      wx.navigateTo({
                        url: '../getNumber/getNumber'
                      });
                    }
                    // 可以将 res 发送给后台解码出 unionId
                    //this.globalData.userInfo = res1.userInfo
                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    // 所以此处加入 callback 以防止这种情况
                    if (global_this.userInfoReadyCallback) {
                      global_this.userInfoReadyCallback(res1);
                    }
                  },
                })
              } else {
                console.log('userInfo is false');
                //没有授权
                wx.authorize({  //提示授权
                  scope: 'scope.userInfo',
                  success() {
                    //成功后调用
                    wx.getUserInfo({
                      withCredentials: true, //返回用户的基本信息
                      success: res => {
                        var userInfo = {
                          'userInfo': res.userInfo,
                          'user_iv': res.iv,
                          'user_encryptedData': res.encryptedData,
                        }
                        console.log(userInfo);
                        wx.setStorageSync('userInfo', userInfo);
                        console.log(2);
                        console.log(wx.getStorageSync('userInfo'));
                        wx.navigateTo({
                          url: '../getNumber/getNumber'
                        });
                        //验证手机号是否存在，如果不存在，跳转到获取手机号页面
                        var getUserPhone = wx.getStorageSync('userPhone');
                        console.log(getUserPhone);
                        if (!getUserPhone) {
                          wx.navigateTo({
                            url: '../getNumber/getNumber'
                          });
                        }
                        // 可以将 res 发送给后台解码出 unionId
                        // this.globalData.userInfo = res.userInfo
                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                        // 所以此处加入 callback 以防止这种情况

                        if (global_this.userInfoReadyCallback) {
                          global_this.userInfoReadyCallback(res)
                        }
                      },
                    })
                  },
                  fail() { //用户点击取消处理方法
                  console.log('fail');
                    //wx.setStorageSync('fail', 'true');
                  }
                })
              }
            },
            fail: (error) => {
              console.log(error);
              console.log('this is getSetting fail');
            }
          })
       } else {
         console.log('登录失败！' + res.errMsg);
       }
      },
      fail: (error) => {
        console.log(error);
        console.log('this is login fail');
      }
    })

   
  },
  globalData: {
    userInfo: null
  }
})