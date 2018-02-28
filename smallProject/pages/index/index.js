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
  }
})