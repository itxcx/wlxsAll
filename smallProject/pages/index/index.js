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
     alert(1);
     console.log(1);
    //  wx.scanCode({
    //    onlyFromCamera: true,
    //    success: (res) => {
    //      console.log(res)
    //    }
    //  })
   }
})
