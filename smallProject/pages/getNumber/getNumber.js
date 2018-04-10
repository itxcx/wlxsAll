Page({
  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg);
    console.log(e.detail.iv);
    console.log(e.detail.encryptedData);
    if (e.detail.iv && e.detail.encryptedData) {
      var userInfo = wx.getStorageSync('userInfo');
      var code = wx.getStorageSync('code');
      wx.request({
        url: 'https://weilaixiansen.com/login/getUserInfo',
        method: 'GET',
        data: { 
          'user_iv': userInfo.user_iv,
          'user_encryptedData': userInfo.user_encryptedData,
          'phone_iv':  e.detail.iv ,
          'phone_encryptedData': e.detail.encryptedData,
          'code': code
          },
          success: function(res) {
            if(res.data.code == 0) {
             wx.setStorageSync('userPhone', res.data.data.phone);
             wx.setStorageSync('session_key', res.data.data.session_key);
            }else{
              
            }
            
          }
      })
    }else{

    }
  }
})