Page({
  data: {
    selectPlace: true,
    firstPlace: '西安',
    selectArea: false,
  },
  //点击选择类型
  clickPlace: function () {
    var selectPlace = this.data.selectPlace;
    if (selectPlace == true) {
      this.setData({
        selectArea: true,
        selectPlace: false,
      })
    } else {
      this.setData({
        selectArea: false,
        selectPlace: true,
      })
    }
  },
  //点击切换
  mySelect: function (e) {
    this.setData({
      firstPlace: e.target.dataset.me,
      selectPlace: true,
      selectArea: false,
    })
    //发送ajax，请求数据
    this.requestData(this.data.firstPlace);
  },

  //ajax方法
  requestData: function(options) {
    var place = options;
    wx.request({
      url: '', 
      data: {},
      success: function (res) {
          console.log(res.data);
      }
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  //选择 区 方法
  selectDistrict: function(district) {
    console.log(district);
  },
  goIssue: function () {
    wx.navigateTo({
      url: '../issue/issue'
    })
  },
  goDevice: function (e) {
    var longitude = Number(e.target.dataset.longitude);
    var latitude = Number(e.target.dataset.latitude);
    var address = e.target.dataset.addr;
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      address: address,
      name: '未来鲜森',
      scale: 28
    })
  }
})