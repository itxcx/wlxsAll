App({
  onLaunch: function () {
    var global_this = this;
    //登录
    wx.login({
      success: resLogin => {
        console.log('login');
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (resLogin.code) { //临时会话code
          console.log('临时会话code' + resLogin.code);
          wx.setStorageSync("code", resLogin.code); //临时会话code
          var device_number = wx.getStorageSync('device_number'); //扫码获取的设备id
          //获取session_key
          wx.request({
            url: 'https://weilaixiansen.com/login/wxappshop',
            method: 'GET',
            data: {
              'code': resLogin.code,
              'device_number': device_number
            },
            success: function (resSession) {
              console.log(resSession);
              //存储session_key
              var session_key = resSession.data.data.session_key;
              wx.setStorageSync('session_key', resSession.data.data.session_key);
              //逻辑判断说明
              if (resSession.data.code == 0) {
                /********** 
               * code=0 所有信息获取成功，直接开门，返回userinfo + session_key + order_id
               */
                //存储用户手机号码
                var userPhone = resSession.data.data.phone;
                wx.setStorageSync('userPhone', userPhone);//存储用户手机号
                var order_id = resSession.data.data.order_id;
                wx.setStorageSync('order_id', order_id);//存储orderid
                //获取用户信息
                wx.getSetting({    //检查授权，获取用户信息
                  success: resGetSetting => {
                    if (resGetSetting.authSetting['scope.userInfo']) {
                      console.log('userInfo is true');
                      wx.setStorageSync('scope_userInfo', 'true');
                      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                      wx.getUserInfo({
                        withCredentials: true, //返回用户的基本信息
                        success: resGetUserInfo => {
                          var userInfo = {
                            'userInfo': resGetUserInfo.userInfo,
                            'user_iv': resGetUserInfo.iv,
                            'user_encryptedData': resGetUserInfo.encryptedData,
                          }
                          console.log('获取到的用户信息：' + userInfo);
                          wx.setStorageSync('userInfo', userInfo); //存储用户信息
                          console.log('存储的用户信息：' + wx.getStorageSync('userInfo'));
                          //直接跳到开门页面
                          wx.navigateTo({
                            //url: '../openDoor/openDoor?optStatus=openDoorSuccess',
                            url: '../test/test?optStatus=openDoorSuccess',
                          })
                          if (global_this.userInfoReadyCallback) {
                            global_this.userInfoReadyCallback(resGetUserInfo);
                          }
                        },
                      })
                    } else if (!resGetSetting.authSetting['scope.userInfo']) {
                      //没有授权,主动调用授权
                      wx.authorize({  //提示授权
                        scope: 'scope.userInfo',
                        success() {
                          //成功后调用
                          wx.setStorageSync('scope_userInfo', 'true');
                          wx.getUserInfo({
                            withCredentials: true, //返回用户的基本信息
                            success: resAuthorize => {
                              var userInfo = {
                                'userInfo': resAuthorize.userInfo,
                                'user_iv': resAuthorize.iv,
                                'user_encryptedData': resAuthorize.encryptedData,
                              }
                              console.log(userInfo);
                              wx.setStorageSync('userInfo', userInfo);
                              //直接跳到开门页面
                              wx.navigateTo({
                                //url: '../openDoor/openDoor?optStatus=openDoorSuccess',
                                url: '../test/test?optStatus=openDoorSuccess',
                              })
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
                    console.log('this is getSetting fail');
                  }
                })
                //////////////////////////////////////
              } else if (resSession.data.code == 1) {
                /***********
                 * 各种失败情况，返回session_key，页面留在首页，用户点击重新获取信息
                */
                
              } else if (resSession.data.code == 3) {
                /***********
                * 新用户注册，返回session_key，提示用户去获取用户信息
                */
                wx.authorize({  //提示授权
                  scope: 'scope.userInfo',
                  success() {
                    wx.setStorageSync('scope_userInfo', 'true');
                    wx.getUserInfo({
                      withCredentials: true, //返回用户的基本信息
                      success: resUserInfo => {
                        var userInfo = {
                          'userInfo': resUserInfo.userInfo,
                          'user_iv': resUserInfo.iv,
                          'user_encryptedData': resUserInfo.encryptedData
                        }
                        console.log(userInfo);
                        wx.setStorageSync('userInfo', userInfo);//存储用户信息
                        console.log(wx.getStorageSync('userInfo'));
                        wx.navigateTo({
                          url: '../getNumber/getNumber'
                        });
                        if (global_this.userInfoReadyCallback) {
                          global_this.userInfoReadyCallback(res)
                        }
                      },
                    })
                  },
                  fail() { //用户点击取消处理方法
                    console.log('fail');
                  }
                })
              } else if (resSession.data.code == 10010) {
                /***********
                * 有未支付订单
                */
                var userPhone = resSession.data.data.phone;
                wx.setStorageSync('userPhone', userPhone);
                //获取用户信息
                wx.getSetting({    //检查授权，获取用户信息
                  success: resGetSetting => {
                    if (resGetSetting.authSetting['scope.userInfo']) {
                      console.log('userInfo is true');
                      wx.setStorageSync('scope_userInfo', 'true');
                      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                      wx.getUserInfo({
                        withCredentials: true, //返回用户的基本信息
                        success: resGetUserInfo => {
                          var userInfo = {
                            'userInfo': resGetUserInfo.userInfo,
                            'user_iv': resGetUserInfo.iv,
                            'user_encryptedData': resGetUserInfo.encryptedData,
                          }
                          console.log('获取到的用户信息：' + userInfo);
                          wx.setStorageSync('userInfo', userInfo); //存储用户信息
                          console.log('存储的用户信息：' + wx.getStorageSync('userInfo'));
                          //直接跳到开门页面
                          wx.navigateTo({
                            //url: '../openDoor/openDoor?optStatus=nopay',
                            url: '../test/test?optStatus=nopay',
                          })
                          if (global_this.userInfoReadyCallback) {
                            global_this.userInfoReadyCallback(resGetUserInfo);
                          }
                        },
                      })
                    } else if (!resGetSetting.authSetting['scope.userInfo']) {
                      //没有授权,主动调用授权
                      wx.authorize({  //提示授权
                        scope: 'scope.userInfo',
                        success() {
                          //成功后调用
                          wx.setStorageSync('scope_userInfo', 'true');
                          wx.getUserInfo({
                            withCredentials: true, //返回用户的基本信息
                            success: resAuthorize => {
                              var userInfo = {
                                'userInfo': resAuthorize.userInfo,
                                'user_iv': resAuthorize.iv,
                                'user_encryptedData': resAuthorize.encryptedData,
                              }
                              console.log(userInfo);
                              wx.setStorageSync('userInfo', userInfo);
                              //直接跳到开门页面
                              wx.navigateTo({
                                //url: '../openDoor/openDoor?optStatus=nopay',
                                url: '../test/test?optStatus=nopay',
                              })
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
                    console.log('this is getSetting fail');
                  }
                })
                //////////////////////////////////////
              } else if (resSession.data.code == 10086) {
                /***********
                * 开门超时
                */
                var userPhone = resSession.data.data.phone;
                wx.setStorageSync('userPhone', userPhone);
                //获取用户信息
                wx.getSetting({    //检查授权，获取用户信息
                  success: resGetSetting => {
                    if (resGetSetting.authSetting['scope.userInfo']) {
                      wx.setStorageSync('scope_userInfo', 'true');
                      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                      wx.getUserInfo({
                        withCredentials: true, //返回用户的基本信息
                        success: resGetUserInfo => {
                          var userInfo = {
                            'userInfo': resGetUserInfo.userInfo,
                            'user_iv': resGetUserInfo.iv,
                            'user_encryptedData': resGetUserInfo.encryptedData,
                          }
                          console.log('获取到的用户信息：' + userInfo);
                          wx.setStorageSync('userInfo', userInfo); //存储用户信息
                          console.log('存储的用户信息：' + wx.getStorageSync('userInfo'));
                          //直接跳到开门页面
                          wx.navigateTo({
                            //url: '../openDoor/openDoor?optStatus=openDoorTimeOut',
                            url: '../test/test?optStatus=openDoorTimeOut',
                          })
                          if (global_this.userInfoReadyCallback) {
                            global_this.userInfoReadyCallback(resGetUserInfo);
                          }
                        },
                      })
                    } else if (!resGetSetting.authSetting['scope.userInfo']) {
                      //没有授权,主动调用授权
                      wx.authorize({  //提示授权
                        scope: 'scope.userInfo',
                        success() {
                          //成功后调用
                          wx.setStorageSync('scope_userInfo', 'true');
                          wx.getUserInfo({
                            withCredentials: true, //返回用户的基本信息
                            success: resAuthorize => {
                              var userInfo = {
                                'userInfo': resAuthorize.userInfo,
                                'user_iv': resAuthorize.iv,
                                'user_encryptedData': resAuthorize.encryptedData,
                              }
                              console.log(userInfo);
                              wx.setStorageSync('userInfo', userInfo);
                              //直接跳到开门页面
                              wx.navigateTo({
                                //url: '../openDoor/openDoor?optStatus=openDoorTimeOut',
                                url: '../test/test?optStatus=openDoorTimeOut',
                              })
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
                    console.log('this is getSetting fail');
                  }
                })
                //////////////////////////////////////
              } else if (resSession.data.code == 2) {
                /************
                 * 有用户信息，没有签约信息
                 * */
                //存储接口返回的用户手机号
                var userPhone = resSession.data.data.phone;
                wx.setStorageSync('userPhone', userPhone);//存储用户手机号
                wx.getSetting({    //检查授权，获取用户信息
                  success: resGetSetting => {
                    if (resGetSetting.authSetting['scope.userInfo']) {
                      console.log('userInfo is true');
                      wx.setStorageSync('scope_userInfo', 'true');
                      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                      wx.getUserInfo({
                        withCredentials: true, //返回用户的基本信息
                        success: resGetUserInfo => {
                          var userInfo = {
                            'userInfo': resGetUserInfo.userInfo,
                            'user_iv': resGetUserInfo.iv,
                            'user_encryptedData': resGetUserInfo.encryptedData,
                          }
                          console.log('获取到的用户信息：' + userInfo);
                          wx.setStorageSync('userInfo', userInfo); //存储用户信息
                          console.log('存储的用户信息：' + wx.getStorageSync('userInfo'));
                          //检查签约状态
                          wx.request({
                            url: 'https://weilaixiansen.com/login/wxappback',
                            data: {
                              session_key: session_key
                            },
                            success: function (rst) {
                              console.log('检查签约状态返回数据：' + rst);
                              if (rst.data.code == 1) { //未签约
                                wx.navigateToMiniProgram({
                                  appId: 'wxbd687630cd02ce1d',
                                  path: 'pages/index/index',
                                  extraData: rst.data.data,
                                  success(res) {
                                    // 成功跳转到签约小程序,异步通知到地址
                                    console.log('未签约返回的数据：' + res);
                                    console.log(' return miniprogram');
                                    //签约成功，直接去开门
                                    wx.navigateTo({
                                      // url: '../openDoor/openDoor?optStatus=openDoorSuccess',
                                      url: '../test/test?optStatus=openDoorSuccess',
                                    })
                                  },
                                  fail(error) {
                                    // 未成功跳转到签约小程序 
                                    console.log('not return miniprogram');
                                    wx.navigateBack({
                                      delta: 10
                                    })
                                  }
                                })
                              }
                            }
                          })
                          if (global_this.userInfoReadyCallback) {
                            global_this.userInfoReadyCallback(resGetUserInfo);
                          }
                        },
                      })
                    } else if (!resGetSetting.authSetting['scope.userInfo']) {
                      //没有授权,主动调用授权
                      wx.authorize({  //提示授权
                        scope: 'scope.userInfo',
                        success() {
                          //成功后调用
                          wx.setStorageSync('scope_userInfo', 'true');
                          wx.getUserInfo({
                            withCredentials: true, //返回用户的基本信息
                            success: resAuthorize => {
                              var userInfo = {
                                'userInfo': resAuthorize.userInfo,
                                'user_iv': resAuthorize.iv,
                                'user_encryptedData': resAuthorize.encryptedData,
                              }
                              console.log(userInfo);
                              wx.setStorageSync('userInfo', userInfo);
                              //检查签约状态
                              wx.request({
                                url: 'https://weilaixiansen.com/login/wxappback',
                                data: {
                                  session_key: session_key
                                },
                                success: function (rst) {
                                  console.log('检查签约状态返回数据：' + rst);
                                  if (rst.data.code == 1) { //未签约
                                    wx.navigateToMiniProgram({
                                      appId: 'wxbd687630cd02ce1d',
                                      path: 'pages/index/index',
                                      extraData: rst.data.data,
                                      success(res) {
                                        // 成功跳转到签约小程序,异步通知到地址
                                        console.log('未签约返回的数据：' + res);
                                        console.log(' return miniprogram');
                                        //签约成功，直接去开门
                                        wx.navigateTo({
                                          //url: '../openDoor/openDoor?optStatus=openDoorSuccess',
                                          url: '../test/test?optStatus=openDoorSuccess',
                                        })
                                      },
                                      fail(error) {
                                        // 未成功跳转到签约小程序 
                                        console.log('not return miniprogram');
                                        wx.navigateBack({
                                          delta: 10
                                        })
                                      }
                                    })
                                  }
                                }
                              })
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
                    console.log('this is getSetting fail');
                  }
                })
              } else if (resSession.data.code == 4) {
                /*****
                 * 购物上限，提示使用支付宝 
                 */
                var userPhone = resSession.data.data.phone;
                wx.setStorageSync('userPhone', userPhone);
                //获取用户信息
                wx.getSetting({    //检查授权，获取用户信息
                  success: resGetSetting => {
                    if (resGetSetting.authSetting['scope.userInfo']) {
                      wx.setStorageSync('scope_userInfo', 'true');
                      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                      wx.getUserInfo({
                        withCredentials: true, //返回用户的基本信息
                        success: resGetUserInfo => {
                          var userInfo = {
                            'userInfo': resGetUserInfo.userInfo,
                            'user_iv': resGetUserInfo.iv,
                            'user_encryptedData': resGetUserInfo.encryptedData,
                          }
                          console.log('获取到的用户信息：' + userInfo);
                          wx.setStorageSync('userInfo', userInfo); //存储用户信息
                          console.log('存储的用户信息：' + wx.getStorageSync('userInfo'));
                          //直接跳到开门页面
                          wx.navigateTo({
                            //url: '../openDoor/openDoor?optStatus=alipay',
                            url: '../test/test?optStatus=alipay',
                          })
                          if (global_this.userInfoReadyCallback) {
                            global_this.userInfoReadyCallback(resGetUserInfo);
                          }
                        },
                      })
                    } else if (!resGetSetting.authSetting['scope.userInfo']) {
                      //没有授权,主动调用授权
                      wx.authorize({  //提示授权
                        scope: 'scope.userInfo',
                        success() {
                          //成功后调用
                          wx.setStorageSync('scope_userInfo', 'true');
                          wx.getUserInfo({
                            withCredentials: true, //返回用户的基本信息
                            success: resAuthorize => {
                              var userInfo = {
                                'userInfo': resAuthorize.userInfo,
                                'user_iv': resAuthorize.iv,
                                'user_encryptedData': resAuthorize.encryptedData,
                              }
                              console.log(userInfo);
                              wx.setStorageSync('userInfo', userInfo);
                              //直接跳到开门页面
                              wx.navigateTo({
                                //url: '../openDoor/openDoor?optStatus=alipay',
                                url: '../test/test?optStatus=alipay',
                              })
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
                    console.log('this is getSetting fail');
                  }
                })
                //////////////////////////////////////
              }
            }
          })
        } else {
          console.log('登录失败！' + resLogin.errMsg);
        }
        //主动支付方法
        //  wx.requestPayment({
        //   "appId": "wx651389f810901b2d", 
        //   "timeStamp": "1524549579", 
        //   "nonceStr": "25c801f83373161c6a13f424af3c2791", 
        //   "package": "prepay_id=wx2413593944399745acbaf0b11327818816", 
        //   "signType": "MD5",
        //    "paySign": "4760D6291D22853B860924FA5256B804",
        //    success: function (res) {
        //       console.log(res);
        //    },
        //    fail: function() {
        //      console.log(1);
        //    }
        //  })

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