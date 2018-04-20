Page({
 data: {},
 onLoad: function() {
  
 },
 //socket
 socketTest: function() {
  var that = this;
  wx.connectSocket({
    url: 'wss://wss.weilaixiansen.com?sid_182ab19d97a3b32aea7c24e7e41a82cd',
    header: {
      'content-type': 'application/json'
    },
    method: "GET",
           success: function (res1) {
             console.log(res1);
             console.log('socket连接成功！');
             //连接打开
             wx.onSocketOpen(function (res2) {
               console.log(res2);
               console.log('WebSocket连接已打开！');
               console.log('---------------------');
             })
             //服务器数据
             wx.onSocketMessage(function (res3) {
               console.log('=================');
               console.log(res3);
               res3.data = JSON.parse(res3.data);
               console.log(typeof res3.data + '类型');
               console.log('收到服务器内容：' + res3.data);
             })
           },
           fail: function () {
             console.log('socket连接成功！');
             //连接打开失败
             wx.onSocketError(function (res) {
               console.log('WebSocket连接打开失败，请检查！');
             })
           }
         })
        //socket关闭
        wx.onSocketClose(function (res) {
          console.log('WebSocket 已关闭！');
        })
 }
})