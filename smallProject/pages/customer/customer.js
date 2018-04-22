Page({
  data: {
    customerList:[
      {
        title: '关闭柜门后，没有扣款?',
        subTitle:'关闭柜门后，没有扣款?',
        content:'系统可能会稍微延迟5-10秒，请您耐心等待。'
      },
      {
        title: '多次扣款或扣款与实际扣款金额不符?',
        subTitle: '多次扣款或扣款与实际扣款金额不符?',
        content: '们的零售柜是在关闭柜门后自动进行金额结算的。请您核实是否存在以下问题： (1)扫码开门后被他人取走商品(2)在取出商品并关闭柜门后，又重新扫码打开将其放回；(3)在打开一个柜门后忘记关闭，又打开另一个柜门，导致被他人取走商品。'
      },
      {
        title: '需要退/换购买商品?',
        subTitle: '需要退/换购买商品?',
        content: '非常抱歉，正常情况下商品一经出售，是不予退换的。如存在质量问题，请联系客服进行说明，我们会尽快为您解决。（PS：若客户认为商品存在质量问题要求退款，仅限于产品超过保质期的情况。）'
      },
      {
        title: '退款一直未到账?',
        subTitle: '退款一直未到账?',
        content: '我们的退款是按照原支付路径返还的，包括余额、银行卡、信用卡等。若您在进行核实后，确定退款未到账，请及时联系客服，我们会尽快为您查明原因并进行解决。'
      },
      {
        title: '忘记关门，被多扣了款?',
        subTitle: '忘记关门，被多扣了款?',
        content: '很抱歉，我们的零售柜是在关闭柜门后自动进行金额结算的，这种情况我们无法弥补您的损失哦，建议您根据提示正确进行操作。'
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
  //转发
  onShareAppMessage: function (res) {
    //  wx.showShareMenu({
    //    withShareTicket: true
    //  })
  },
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
  },
  //意见反馈
  goFeedback: function () {
    // wx.navigateTo({
    //   url: '../feedback/feedback'
    // })
  }
})