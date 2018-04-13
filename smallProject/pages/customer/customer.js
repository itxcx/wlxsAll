Page({
  data: {
    customerList:[
      {
        title: '关闭柜门后，没有扣款?',
        subTitle:'关闭柜门后，没有扣款?',
        content:''
      },
      {
        title: '多次扣款或扣款与实际扣款金额不符?',
        subTitle: '多次扣款或扣款与实际扣款金额不符?',
        content: ''
      },
      {
        title: '需要退/换购买商品?',
        subTitle: '需要退/换购买商品?',
        content: ''
      },
      {
        title: '退款一直未到账?',
        subTitle: '退款一直未到账?',
        content: ''
      },
      {
        title: '忘记关门，被多扣了款?',
        subTitle: '忘记关门，被多扣了款?',
        content: ''
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
  //联系客服
  contactService: function() {
    wx.makePhoneCall({
        phoneNumber: '4007707768'
    })
  },
  //常见问题
  goItemContent: function(event) {
      var index = event.currentTarget.id;
      var data = this.data.customerList[index];
      wx.setStorageSync('customer', data);
      wx.navigateTo({
        url: '../cmnProblem/cmnProblem'
      })
  }
})