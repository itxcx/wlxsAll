Page({
  data: {
      inputLength: 0,
      allowInput: 200,
      imgPath: [],
      deletIcon: false, //删除图标
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
      count: 5, // 默认9
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
  },
  //删除图片
  deleteImg: function() {
    console.log('delete');
    this.setData({
      deletIcon: true
    })
  },
  //确认删除
  confirmDel: function(e) {
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    //改变后的图像数据
    var changeImg = this.data.imgPath.slice(0, index).concat(this.data.imgPath.slice(index+1)); 
    console.log(changeImg);
    this.setData({
      imgPath: changeImg
    })
    if (this.data.imgPath.length == 0 ) {
      this.setData({
        deletIcon: false
      })
    }
  }
})