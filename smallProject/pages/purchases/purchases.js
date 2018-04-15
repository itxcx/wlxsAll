Page({
  data: {
    // tab切换  
    currentTab: 0,
    currentPage: 0,
    tipTitle: '上滑加载数据',
      //全部列表数据
      allList: [
        {
          addr: '招商银行大厦',
          purType: '已完成',
          purTime: '2018-04-08 12:00:00',
          countNum: 6,
          countAmount: 10.00,
          purItemList: [
            {name: '乐虎', itemNum:2},
            {name: '巧克力牛奶', itemNum: 2},
            {name: '进口水果-蔓越莓', itemNum: 2 }
          ]
        },
        {
          addr: '瞪羚谷创业园E座',
          purType: '已完成',
          purTime: '2018-04-10 12:22:22',
          countNum: 6,
          countAmount: 10.00,
          purItemList: [
            {name: '乐虎', itemNum: 2},
            {name: '巧克力牛奶', itemNum: 2},
            {name: '进口水果-蔓越莓', itemNum: 2}
          ]
        },
        {
          addr: '瞪羚谷创业园E座',
          purType: '已完成',
          purTime: '2018-04-10 12:22:22',
          countNum: 6,
          countAmount: 10.00,
          purItemList: [
            { name: '乐虎', itemNum: 2 },
            { name: '巧克力牛奶', itemNum: 2 },
            { name: '进口水果-蔓越莓', itemNum: 2 }
          ]
        },
        {
          addr: '瞪羚谷创业园E座',
          purType: '已完成',
          purTime: '2018-04-10 12:22:22',
          countNum: 6,
          countAmount: 10.00,
          purItemList: [
            { name: '乐虎', itemNum: 2 },
            { name: '巧克力牛奶', itemNum: 2 },
            { name: '进口水果-蔓越莓', itemNum: 2 }
          ]
        },
        {
          addr: '瞪羚谷创业园E座',
          purType: '已完成',
          purTime: '2018-04-10 12:22:22',
          countNum: 6,
          countAmount: 10.00,
          purItemList: [
            { name: '乐虎', itemNum: 2 },
            { name: '巧克力牛奶', itemNum: 2 },
            { name: '进口水果-蔓越莓', itemNum: 2 }
          ]
        }
      ],
      //待支付
      unpaid: [
        {
          addr: '招商银行大厦',
          purType: '已完成',
          purTime: '2018-04-08 12:00:00',
          countNum: 6,
          countAmount: 10.00,
          purItemList: [
            { name: '乐虎', itemNum: 2 },
            { name: '巧克力牛奶', itemNum: 2 },
            { name: '进口水果-蔓越莓', itemNum: 2 }
          ]
        },
        {
          addr: '瞪羚谷创业园E座',
          purType: '已完成',
          purTime: '2018-04-08 12:00:00',
          countNum: 6,
          countAmount: 10.00,
          purItemList: [
            { name: '乐虎', itemNum: 2 },
            { name: '巧克力牛奶', itemNum: 2 },
            { name: '进口水果-蔓越莓', itemNum: 2 }
          ]
        },
      ],
      //已退款
      refunded: [
        {
          addr: '招商银行大厦',
          purType: '已退款',
          purTime: '2018-04-08 12:00:00',
          countNum: 6,
          countAmount: 10.00,
          purItemList: [
            { name: '乐虎', itemNum: 2 },
            { name: '巧克力牛奶', itemNum: 2 },
            { name: '进口水果-蔓越莓', itemNum: 2 }
          ]
        }
      ]
  },
  onLoad: function() {
    var session_key = wx.getStorageSync('session_key');
      wx.request({
        url: 'https://weilaixiansen.com/login/getorderlist',
        method: 'GET',
        data: {
          'session_key': session_key
        },
        success: res => {
          console.log(res);
        },
        fail: error => {
          console.log(error);
        }
      })
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {
    this.setData({ currentTab: e.detail.current });
    console.log(this.data.currentTab);
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
      console.log(that.data.currentTab);
    }
  },
  //去支付
  goPay: function() {
    console.log(1);
  },
  //加载更多
  searchScrollLower: function() {
   // console.log(this.data.allList);
    if (this.data.allList.length < 10) {
      var data = {
        addr: '招商银行大厦',
        purType: '已完成',
        purTime: '2018-04-08 12:00:00',
        countNum: 7,
        countAmount: 10.00,
        purItemList: [
          { name: '乐虎', itemNum: 2 },
          { name: '巧克力牛奶', itemNum: 2 },
          { name: '进口水果-蔓越莓', itemNum: 2 }
        ]
      }
      var da = this.data.allList.concat(data);
      this.setData({
        allList: da
      })
     // console.log(this.data.allList);
    }
   
  }
})
