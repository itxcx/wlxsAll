App({
  onLaunch: function () {
    const updateManager = wx.getUpdateManager();
    console.log('updateManager')
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate);
      console.log('ssssss')

    })
    updateManager.onUpdateReady(function () {
      updateManager.applyUpdate();
    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      })
    })

  },
 
  globalData: {
    userInfoMsg: false
  }
})