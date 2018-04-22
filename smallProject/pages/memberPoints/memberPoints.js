Page({
  data: {
      memberPoints: '',
      bg: false,
      getPointsList: [],
      animationData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var count = wx.getStorageSync('pointCount');
   var list = wx.getStorageSync('pointList');
   console.log(list);
   for (var i = 0; i < list.length; i++) {
     list[i].real_amount = Math.ceil(Number(list[i].real_amount));
   }
   this.setData({
     memberPoints: count,
     getPointsList: list
   })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  //动画方法
  //查看积分规则
  showPointRule: function() {
    this.setData({
      bg: true
    })
    var animation = wx.createAnimation({
      duration: 700,
      timingFunction: 'ease-in-out',
    })
    this.animation = animation;
    animation.translateY(0).step();
    this.setData({
      animationData: animation.export()
    })
  },

  hidePointRule: function () {
    var animation = wx.createAnimation({
      duration: 700,
      timingFunction: 'ease-in-out',
    })
    this.animation = animation;
    animation.translateY(-100 + 'vh').step();
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(() => {
      this.setData({
        bg: false
      })
    },700)
  }
})