//index.js
//获取应用实例
const app = getApp()

Page({
   data: {
     imgUrls: [
       {
         link: '/pages/index/index',
         url: '/images/index/banner1.png'
       }, {
         link: '',
         url: '/images/index/banner2.png'
       }, {
         link: '',
         url: '/images/index/banner3.png'
       }
     ],
     indicatorDots: true,
     indicatorColor: 'rgba(0, 0, 0, 1)',
     indicatorActiveColor: '#ffffff',
     autoplay: true,
     interval: 8000, //自动切换时间间隔
     duration: 1000, //滑动动画时长
    contentImg: '/images/index/content.png',
   },
  //  // 页面初始化 options为页面跳转所带来的参数
  //  onLoad: function (options) {
     
  //  },
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
   //扫码开门
   openDoorScan: function() {
     wx.scanCode({
       onlyFromCamera: true,
       success: (res) => {
         if(res) {
          var path = res.result;
          var device_number = path.split('?')[1].split('=')[1]; //设备id
          var session_key = wx.getStorageSync('session_key'); 
          //扫码成功后请求接口， 发送session_key
           wx.request({
             url: 'https://weilaixiansen.com/login/checkagree',
             method: 'GET',
             data: {'session_key': session_key},
             success: function(sessionRes) {
                      if (sessionRes.data.code == 0) { //如果已经签约
                                var contract_id = sessionRes.data.contract_id;
                                wx.request({
                                  url: 'https://weilaixiansen.com/login/shop',
                                  method: 'GET',
                                  data: { 'session_key': session_key, 'device_number': device_number, 'contract_id': contract_id},
                                  success: function(openRes) {//开门

                                  }
                                })
                      }else{ //没签约
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



           //1.扫码成功后  GET https://weilaixiansen.com/login/checkagree    + session_key
           //     
           //2.   GET  https://weilaixiansen.com/login/shop  +session_key+ 设备id + contract_id
           //
           //判断是否签约
           //设备number + session_key
           wx.navigateTo({
             url: '../openDoor/openDoor'
           })
         }
       }
     })
   },
   //联系客服
   callService: function() {
     wx.makePhoneCall({
       phoneNumber: '4007707768'
     })
   },
   //个人中心
   goUserInfo: function() {
     wx.navigateTo({
      //  url: '../userInfo/userInfo'
       url: '../orderDetail/orderDetail'
     })
   }
})
