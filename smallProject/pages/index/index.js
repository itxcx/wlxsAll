//index.js
//获取应用实例
const app = getApp()
Page({
   data: {
     imgUrls: [
      //  {
      //    link: '/pages/index/index',
      //    url: '/images/index/banner3.jpg'
      //    }
      //  }, {
      //    link: '',
      //    url: '/images/index/banner2.png'
      //  }, {
      //    link: '',
      //    url: '/images/index/banner1.jpg'
      //  }
     ],
     indicatorDots: true,
     indicatorColor: 'rgba(0, 0, 0, 1)',
     indicatorActiveColor: '#ffffff',
     autoplay: true,
     circular: true,
     previous: '15px',
     next: '25px',
     interval: 8000, //自动切换时间间隔
     duration: 1000, //滑动动画时长
     contentImg: '/images/index/content.png',
     fail: false //是否授权信息
   },
   // 页面初始化 options为页面跳转所带来的参数
   onLoad: function (options) {
     console.log(options);
     //获取扫码后的设备id
     if (options.q != undefined) {
       var path = decodeURIComponent(options.q);
       var device_number = path.split('?')[1].split('=')[1];
       wx.setStorageSync('device_number', device_number);//设备id
       console.log(device_number);
     }

     var scope_userInfo = wx.getStorageSync('scope_userInfo');
     var userMessage = wx.getStorageSync('userInfo'); //用户信息
     var getPhone = wx.getStorageSync('userPhone'); //手机号
     var session_key = wx.getStorageSync('session_key');
     console.log('用户授权：' + scope_userInfo);
     console.log(userMessage);
     console.log('手机号' + getPhone);
     console.log('session_key：' + session_key);
     if (scope_userInfo == 'true' && userMessage && getPhone && session_key) {
       console.log('用户信息和手机号已经获得!');
       this.setData({
         fail: true
       }) 
     }
   },
   //转发
   onShareAppMessage: function (res) {
    //  wx.showShareMenu({
    //    withShareTicket: true
    //  })
   },
   //扫码开门
   openDoorScan: function() {
     wx.scanCode({
       onlyFromCamera: true,
       success: (res) => {
         if(res) {
          var path = res.result;
          var device_number = path.split('?')[1].split('=')[1]; //设备id
          var session_key = wx.getStorageSync('session_key');
          //扫码成功后请求接口， 发送session_key,
           wx.request({
             url: 'https://weilaixiansen.com/login/checkagree',
             method: 'GET',
             data: {'session_key': session_key},
             success: function(sessionRes) {
               console.log(sessionRes);
               console.log('-----')
                      if (sessionRes.data.code == 0) { //如果已经签约
                          var contract_id = sessionRes.data.contract_id;
                          wx.setStorageSync('contract_id', contract_id);
                          wx.setStorageSync('device_number', device_number); //device_number
                          wx.navigateTo({
                            url: '../openDoor/openDoor',
                          })
                      }else{ //没签约
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
   //联系客服
   callService: function() {
     wx.navigateTo({
       url: '../customer/customer'
     })
   },
   //个人中心
   goUserInfo: function() {
        wx.navigateTo({
         url: '../userInfo/userInfo'
        })
   },
   //设置主动调用用户信息方法
   userInfoHandler: function(res) {
       var userMsg = res.detail;
       console.log(res.detail);
       if (userMsg.userInfo && userMsg.userInfo.nickName) { //获取授权成功
         //设置storage
         var userInfo = {
           'userInfo': userMsg.userInfo,
           'user_iv': userMsg.iv,
           'user_encryptedData': userMsg.encryptedData,
         }
         wx.setStorageSync('userInfo', userInfo);
         wx.setStorageSync('scope_userInfo', 'true');
         console.log('用户信息已经获取');
         wx.navigateTo({
           url: '../getNumber/getNumber'
         })
       }
     
   }
})
