//app.js

//二维码链接内容会以参数q的形式带给页面，在onLoad事件中提取"q"参数并自行UrlDecode一次，即可获取原二维码的完整内容。
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    var global_this = this;
    //登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

       if(res.code){ //临时会话code
            wx.setStorageSync("code", res.code);
          // wx.request({
          //   url: 'https://weilaixiansen.com/login/wxappback',//存储用户信息，检查签约状态
          //   data: {
          //     code: res.code
          //   },
          //   success:function(rst){
          //     // 获取用户信息
          //     console.log(rst); //返回session_key ，未签约会返回签约需要的参数
          //     // rst.session_key存储，每次交互都返回
          //     if (rst.data.code == 1) { //未签约
          //       wx.navigateToMiniProgram({
          //         appId: 'wxbd687630cd02ce1d',
          //         path: 'pages/index/index',
          //         extraData: rst.data.data,
          //         success(res1) {
          //           // 成功跳转到签约小程序,异步通知到地址
          //         },
          //         fail(res1) {
          //           // 未成功跳转到签约小程序 
          //         }
          //       })
          //     }

          //     wx.setStorageSync('session_key', rst.data.session_key);
          //   //获取手机号，手机号
             
          //   }
          // });
          /////////////  获取用户信息  /////////////////
          //获取用户头像和手机号
          // wx.getUserInfo({
          //   withCredentials: true,
          //   lang: 'zh_CN',
          //   timeout: 5000,
          //   success: function (res) {
          //     var userInfo = res.userInfo; //用户信息
          //     // var nickName = userInfo.nickName; //用户昵称
          //     // var avatarUrl = userInfo.avatarUrl; //用户头像
          //     wx.setStorageSync('userInfo', userInfo); //登录后存储用户信息
          //   }
          // })
          wx.getSetting({    //检查授权，获取用户信息，发送给后端
            success: res => {
              if (res.authSetting['scope.userInfo']) {
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
                    wx.navigateTo({
                      url: '../getNumber/getNumber'
                    });
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
                        // 可以将 res 发送给后台解码出 unionId
                        // this.globalData.userInfo = res.userInfo
                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                        // 所以此处加入 callback 以防止这种情况

                        if (global_this.userInfoReadyCallback) {
                          global_this.userInfoReadyCallback(res)
                        }
                      },
                      fail: error => {
                        console.log('--------------');
                        console.log(error);
                      }
                    })
                  },
                  fail() {
                    console.log('ssksksksksksks');
                  }
                })
              }
            },
            fail: () => {
              console.log('--------------');
            }
          })
       } else {
         console.log('登录失败！' + res.errMsg);
       }
      },
      fail: () => {
        console.log('+++++++++++');
      }
    })

   
  },
  globalData: {
    userInfo: null
  }
})