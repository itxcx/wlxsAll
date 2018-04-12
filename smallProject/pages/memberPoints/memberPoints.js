// pages/memberPoints/memberPoints.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      flag: true,
      memberPoints: '556',
      getPointsList: [
        {
          getType: '购物获得',
          pointNum:  '+1',
          getDate: '2018-04-10 12:12:12'
        },
        {
          getType: '购物获得',
          pointNum: '+2',
          getDate: '2018-04-10 12:12:12'
        },
        {
          getType: '购物获得',
          pointNum: '+3',
          getDate: '2018-04-10 12:12:12'
        }, {
          getType: '购物获得',
          pointNum: '+52',
          getDate: '2018-04-10 12:12:12'
        },
        {
          getType: '购物获得',
          pointNum: '+53',
          getDate: '2018-04-10 12:12:12'
        },
        {
          getType: '购物获得',
          pointNum: '+45',
          getDate: '2018-04-10 12:12:12'
        },
        {
          getType: '购物获得',
          pointNum: '+55',
          getDate: '2018-04-10 12:12:12'
        },
        {
          getType: '购物获得',
          pointNum: '+15',
          getDate: '2018-04-10 12:12:12'
        },
        {
          getType: '购物获得',
          pointNum: '+53',
          getDate: '2018-04-10 12:12:12'
        },
        {
          getType: '购物获得',
          pointNum: '+55',
          getDate: '2018-04-10 12:12:12'
        },
        {
          getType: '购物获得',
          pointNum: '+58',
          getDate: '2018-04-10 12:12:12'
        },
        {
          getType: '购物获得',
          pointNum: '+51',
          getDate: '2018-04-10 12:12:12'
        },
        {
          getType: '购物获得',
          pointNum: '+50',
          getDate: '2018-04-10 12:12:12'
        },
        {
          getType: '购物获得',
          pointNum: '+56',
          getDate: '2018-04-10 12:12:12'
        },
        {
          getType: '购物获得',
          pointNum: '+52',
          getDate: '2018-04-10 12:12:12'
        },
        {
          getType: '购物获得',
          pointNum: '+51',
          getDate: '2018-04-10 12:12:12'
        },
        {
          getType: '购物获得',
          pointNum: '+52',
          getDate: '2018-04-10 12:12:12'
        },
        {
          getType: '购物获得',
          pointNum: '+51',
          getDate: '2018-04-10 12:12:12'
        },
        {
          getType: '购物获得',
          pointNum: '+51',
          getDate: '2018-04-10 12:12:12'
        }
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //查看积分规则
  showPointRule: function() {
      this.setData({
        flag: false
      })
  },
  hidePointRule: function () {
    this.setData({
      flag: true
    })
  },
})