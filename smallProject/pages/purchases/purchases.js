Page({
  data: {
    // tab切换  
    currentTab: 0,
    purchasesList: {
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
        },
        {
          addr: '瞪羚谷创业园E座',
          purType: '已完成',
          purTime: '2018-04-10 12:22:22',
          countNum: 6,
          countAmount: 10.01,
          purItemList: [
            { name: '乐虎', itemNum: 2 },
            { name: '巧克力牛奶', itemNum: 2 },
            { name: '进口水果-蔓越莓', itemNum: 2 }
          ]
        },
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
        },
        {
          addr: '瞪羚谷创业园E座',
          purType: '已退款',
          purTime: '2018-04-08 12:00:00',
          countNum: 6,
          countAmount: 10.00,
          purItemList: [
            { name: '乐虎', itemNum: 2 },
            { name: '巧克力牛奶', itemNum: 2 },
            { name: '进口水果-蔓越莓', itemNum: 2 }
          ]
        },
      ]
    }
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

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
    }
  }  
})
