Page({
  data: {
    issueItems: [
      {
        showIssue: false,
        title: '为什么会出现多次扣款或者扣款与实际不符的情况？',
        content: '请检查是否有以下问题:',
        list: ['您扫码开门后是否有其他人取走商品;','您是否开门取出商品并关闭柜门，又扫码开门将商品放回;','您是否在打开一个柜子后忘记关闭，又打开另外一个柜子，导致被他人取走商品;']
      },
      {
        showIssue: false,
        title: '客户买东西时都会想要便宜点，这是客户的一个正常的消费心理，并不是决定他买不买的主要问题？',
        content: '请检查是否有以下问题:',
        list: ['您扫码开门后是否有其他人取走商品;', '您是否开门取出商品并关闭柜门，又扫码开门将商品放回;', '您是否在打开一个柜子后忘记关闭，又打开另外一个柜子，导致被他人取走商品;']
      },
      {
        showIssue: false,
        title: '客户买东西时都会想要便宜点，这是客户的一个正常的消费心理，并不是决定他买不买的主要问题？',
        content: '请检查是否有以下问题:',
        list: ['您扫码开门后是否有其他人取走商品;', '您是否开门取出商品并关闭柜门，又扫码开门将商品放回;']
      }
    ]
  },
  showIssue: function (e) {
    var index = e.target.dataset.index; 
    console.log(index);
    var toggle = this.data.issueItems[index].showIssue;
    this.setData({
      ['issueItems[' + index + '].showIssue'] :  !toggle
    })
  }
})