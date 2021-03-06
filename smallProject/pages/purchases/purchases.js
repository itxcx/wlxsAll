Page({
  data: {
    // tab切换  
    currentTab: 0,
    currentPage: 0,
    allTipTitle: '',
    unpaidTipTitle: '',
    refundedTipTitle: '',
    canGetAllPage: 0, //page
    canGetUnpaidPage: 0, //page
    canGetRefundedPage: 0, //page
    loading: false,
      //全部列表数据
      allList: [],
      //待支付
      unpaid: [],
      //已退款
      refunded: []
  },
  //获取数据方法封装
  //0 全部   4 是支付成功   7 支付失败      9 退款
  getOrderList: function(status, page) {
    console.log(status);
    console.log(page);
    var session_key = wx.getStorageSync('session_key');
    wx.request({
      url: 'https://weilaixiansen.com/login/getorderdetail',
      method: 'GET',
      data: {
        'session_key': session_key,
        'status': status,
        'page': page
      },
      success: res => {
        console.log(res);
       var Data = [];
        if (res.data.data != null) {
          Data = res.data.data.data;
        }
        if (res.data.code == 0) { //返回数据
          if (Data.length > 0 && Data.length == 5) { //订单数大于0等于5
            if (status == 0) {//全部
              this.setData({
                allList: Data,
                allTipTitle: '上滑获取更多数据',
                canGetAllPage: page +1
              })
              console.log(this.data.allList);
            } else if (status == 7) {//未支付
              this.setData({
                unpaid: Data,
                unpaidTipTitle: '上滑获取更多数据',
                canGetUnpaidPage: page + 1
              })
            } else {//已退款
              this.setData({
                refunded: Data,
                refundedTipTitle: '上滑获取更多数据',
                canGetRefundedPage: page + 1
              })
            }
          } else if (Data.length > 0 && Data.length < 5) { //订单数大于0且小于5
            if (status == 0) {//全部
              this.setData({
                allList: Data,
                allTipTitle: '这是底线了~'
              })
            } else if (status == 7) {//未支付
              this.setData({
                unpaid: Data,
                unpaidTipTitle: '这是底线了~'
              })
            } else {//已退款
              this.setData({
                refunded: Data,
                refundedTipTitle: '这是底线了~'
              })
            }
          } else if (Data.length == 0) {
            if (status == 0) {//全部
              this.setData({
                allTipTitle: '暂时没有订单数据'
              })
            } else if (status == 7) {//未支付
              this.setData({
                unpaidTipTitle: '暂时没有订单数据'
              })
            } else {//已退款
              this.setData({
                refundedTipTitle: '暂时没有订单数据'
              })
            }
          }
        }
      },
      fail: error => {
        console.log(error);
      }
    })
  },
  onLoad: function() {
    //默认请求全部数据
    wx.setStorageSync('currentPage', '0');
    console.log('get');
    var page = this.data.canGetAllPage;
    this.getOrderList(0, page);
  },

  //查看订单详情
  showDetailMsg: function(e) {
    var currentPage = wx.getStorageSync('currentPage'); //当前分类
    var index = e.currentTarget.dataset.index;
    //获取当前点击对象,请求接口数据
    var detailData = null;
    if (currentPage == 0) {
      detailData = this.data.allList[index];
    } else if (currentPage == 1) {
      detailData = this.data.unpaid[index];
    } else {
      detailData = this.data.refunded[index];
    }
    console.log(detailData);
    wx.setStorageSync('detailData', detailData);
    wx.navigateTo({
      url: '../orderDetail/orderDetail'
    });
  },
  // 滑动切换tab 
  bindChange: function (e) {
    this.setData({ currentTab: e.detail.current });
    var listType = this.data.currentTab; //请求数据时的分类
    wx.setStorageSync('currentPage', listType);
    if (listType == 1) {//切换到未付款列表，如果数据为空，并且提示内容不为  '暂时没有订单数据' 时才请求数据
      if (this.data.unpaid.length == 0 && this.data.unpaidTipTitle != '暂时没有订单数据') {
        var page = this.data.canGetUnpaidPage;
        this.getOrderList(7, page);
      }
    } else if (listType == 2) {//切换到退款列表，数据为空，提示内容不为  '暂时没有订单数据' 时才请求数据
      if (this.data.refunded.length == 0 && this.data.refundedTipTitle != '暂时没有订单数据') {
        var page = this.data.canGetRefundedPage;
        this.getOrderList(9, page);
      }
    }
  },

  //点击tab切换 
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
      var listType = that.data.currentTab; //请求数据时的分类
      wx.setStorageSync('currentPage', listType);
    }
  },
  //去支付
  goPay: function (e) {
    var that = this;
    var order_id = this.data.unpaid[0].order_id;
    var session_key = wx.getStorageSync('session_key');
    console.log(order_id);
    console.log(session_key);
    wx.request({
      url: 'https://weilaixiansen.com/login/wxappback',//存储用户信息，检查签约状态
      data: {
        session_key: session_key
      },
      success: function (rst) {
        // 获取用户信息
        console.log(rst); //返回session_key ，未签约会返回签约需要的参数
        // rst.session_key存储，每次交互都返回
        if (rst.data.code == 1) { //未签约
          console.log('weiqianyue,quqianyue');
          wx.navigateToMiniProgram({
            appId: 'wxbd687630cd02ce1d',
            path: 'pages/index/index',
            extraData: rst.data.data,
            success(res1) {
              console.log('签约成功');
            },
            fail(res1) {
              // 未成功跳转到签约小程序  
              console.log('not return miniprogram')
            }
          })
        } else {
         
          that.setData({
            loading: true
          })
          setTimeout(function () {
            wx.request({
              url: 'https://weilaixiansen.com/login/payonline',
              method: 'GET',
              data: {
                order_id: order_id,
                session_key: session_key
              },
              success: function (res) {
                console.log(res);
                if (res.data.code == 0) {
                  wx.setStorageSync('success', 'success');
                  that.setData({
                    loading: false
                  })
                  wx.navigateTo({
                    url: '../paid/paid',
                  })
                } else if (res.data.code == 2) {//线上支付,主动支付方法
                  that.setData({
                    loading: false
                  })
                  wx.requestPayment({
                    "appId": res.data.data.appId,
                    "timeStamp": res.data.data.timeStamp,
                    "nonceStr": res.data.data.nonceStr,
                    "package": res.data.data.package,
                    "signType": res.data.data.signType,
                    "paySign": res.data.data.paySign,
                    success: function (res) {
                      console.log(res);
                      wx.setStorageSync('success', 'success');
                      wx.navigateTo({
                        url: '../paid/paid',
                      })
                    },
                    fail: function () {
                      wx.setStorageSync('success', 'error');
                      wx.navigateTo({
                        url: '../paid/paid',
                      })
                    }
                  })
                } else {
                  that.setData({
                    loading: false
                  })
                  wx.setStorageSync('success', 'error');
                  wx.navigateTo({
                    url: '../paid/paid',
                  })
                }
              }
            })
          }, 2000)
          
        }
      }
    })
  },
  //加载更多方法
  searchScrollLower: function() {
    /*****
     * 思路： 设置canGet = true，page = 0，页面拉到最底部时， canGet = false, 将菊花图显示，
     *            此时触发获取数据的方法，
     *            等到success时, 将获取到的数据进行处理，将菊花图隐藏，canGet = true, page++
     *            然后渲染页面
     * ps: 每次请求数据前先判断 canGet 的值，避免多次发送请求，最后一次请求需要做处理
     * *****/ 
     //0 全部   4 是支付成功   7 支付失败      9 退款
   console.log('scroll');
   var currentPage = wx.getStorageSync('currentPage'); //判断当前是哪个分类
   if (currentPage == 0) {
        if (this.data.allTipTitle == '上滑获取更多数据') {     
          this.data.allTipTitle = '加载中';
          var page = this.data.canGetAllPage;
          console.log(page);
        //发送请求获取数据
          this.getMoreData(0, page);
        }
   } else if (currentPage == 1) {
          if (this.data.unpaidTipTitle == '上滑获取更多数据') {
            this.data.unpaidTipTitle = '加载中';
            var page = this.data.canGetUnpaidPage;
            //发送请求获取数据
            this.getMoreData(7, page);
          }
   } else {
     if (this.data.refundedTipTitle == '上滑获取更多数据') {
       this.data.refundedTipTitle = '加载中';
       var page = this.data.canGetRefundedPage;
       //发送请求获取数据
       this.getMoreData(9, page);
     }
   }

  },
  //获取更多数据方法封装
  getMoreData: function(status, page) {
    var session_key = wx.getStorageSync('session_key');
    wx.request({
       url: 'https://weilaixiansen.com/login/getorderdetail',
      method: 'GET',
      data: {
        'session_key': session_key,
        'status': status,
        'page': page
      },
      success: res => {
        /***
         *  根据分类和页数获取数据成功后，判断数据
         *  如果数据长度为5，还可以再一次请求数据，如果返回数据长度小于5，
         *  不能再次请求数据
         * ***/ 
        if (res.data.code == 0) { //返回数据
          var getData = [];
          if (res.data.data != null) {
            getData = res.data.data.data;
          }
            if(status == 0) { //全部数据
              if (getData.length == 5) {
                var newPage = page + 1;
                    var da = this.data.allList.concat(getData);
                    this.setData({
                      allList: da,
                      canGetAllPage: newPage,
                      allTipTitle: '上滑获取更多数据'
                    })
              } else {
                var da = this.data.allList.concat(getData);
                this.setData({
                  allList: da,
                  allTipTitle: '这是底线了'
                })
              }
            }else if(status == 7) {//未支付
              if (getData.length == 5) {
                var newPage = page + 1;
                var da = this.data.unpaid.concat(getData);
                this.setData({
                  unpaid: da,
                  canGetUnpaidPage: newPage,
                  unpaidTipTitle: '上滑获取更多数据'
                })
              } else {
                var da = this.data.unpaid.concat(getData);
                this.setData({
                  unpaid: da,
                  unpaidTipTitle: '这是底线了'
                })
              }
            }else{//已退款
              if (getData.length == 5) {
                var newPage = page + 1;
                var da = this.data.refunded.concat(getData);
                this.setData({
                  refunded: da,
                  canGetRefundedPage: newPage,
                  refundedTipTitle: '上滑获取更多数据'
                })
              } else {
                var da = this.data.refunded.concat(getData);
                this.setData({
                  refunded: da,
                  refundedTipTitle: '这是底线了'
                })
              }
            }
        }
      },
      fail: error => {
        console.log(error);
      }
    })
  }
})
