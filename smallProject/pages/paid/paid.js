Page({
  data: {
      success: false,
      error: false
  },
  onLoad: function () {
      var getData = wx.getStorageSync('success');
      if(getData == 'success') {
        this.setData({
          success: true,
          error: false
        })
      }else{
        this.setData({
          success: false,
          error: true
        })
      }
  },
  //支付完成按钮
  complateIndex: function() {
    wx.navigateBack({
      delta: 9
    })
  }
})