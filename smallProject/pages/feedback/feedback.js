Page({
  data: {
      inputLength: 0,
      allowInput: 200,
      imgPath: []
  },
  //计算输入长度
  showInputLength: function(e) {
    this.setData({
      inputLength: e.detail.value.length
    })
  },
  //添加文件
  addFile: function() {
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success:  res => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        this.setData({
          imgPath: tempFilePaths
        })
      }
    })
  }
})