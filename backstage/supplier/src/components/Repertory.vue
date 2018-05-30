<template>
  <div class="Repertory">
    <section class="login_top">
        <span @click="goMain">
          <Icon type="chevron-left"></Icon>
        </span>
      <p>售货柜库存</p>
    </section>
    <header>
      <ul>
        <li v-model="city" @click="selectCity">
          <span v-html="city" class="selectInput"></span>
          <span :class="!cityDown ? 'down' : 'up'"></span>
        </li>
        <li v-model="device" @click="selectDevice">
          <span v-html="device" class="selectInput"></span>
          <span :class="!deviceDown ? 'down' : 'up'"></span>
        </li>
        <li v-model="product" @click="selectProduct">
          <span v-html="product" class="selectInput"></span>
          <span :class="!productDown ? 'down' : 'up'"></span>
        </li>
      </ul>
    </header>
    <section class="repertoryContent">
      <!-- 所有商品列表 -->
      <section v-show="allList" class="allList">
        <p class="refreshTime">
          <span>库存更新时间:</span>
          <span v-html="refreshTime"></span>
        </p>
        <ul class="itemList">
          <li v-for="(item, index) in allProductArray" @click="itemSelect(index)">
            <span class="itemPic" :style="{backgroundImage: 'url('+ item.picture +')'}" v-show="item.picture"></span>
            <span class="defaultPic" v-show="!item.picture"></span>
            <dl>
              <dt>{{item.goods_name}}</dt>
              <dd>单价: ￥ {{item.price}}</dd>
            </dl>
            <p>库存<span>{{item.count}}</span>件
              <span></span>
            </p>
          </li>
        </ul>
      </section>
      <!-- 城市列表 -->
      <section v-show="cityDown" class="cityList">
        <ul>
          <li @click="entryCity">西安</li>
          <li @click="closeCity">北京</li>
          <li @click="closeCity">上海</li>
          <li @click="closeCity">广州</li>
          <li @click="closeCity">深圳</li>
          <li @click="closeCity">杭州</li>
          <li @click="closeCity">成都</li>
          <li @click="closeCity">南京</li>
          <li @click="closeCity">苏州</li>
          <li @click="closeCity">重庆</li>
          <li @click="closeCity">武汉</li>
          <li @click="closeCity">昆明</li>
          <li @click="closeCity">拉萨</li>
        </ul>
      </section>
      <!-- 设备列表 -->
      <section v-show="deviceDown" class="deviceList">
        <aside class="left">
          <ul>
            <li v-for="(item, index) in allDeviceListArray" @click="changeDistrict(index)" :class="item.show ? 'special' : 'normal'">
              {{item.district}}
            </li>
          </ul>
        </aside>
        <aside class="right">
          <ul>
            <li v-for="(item, index) in showDeviceList">
                <p @click="entryDevice(index)">{{item.address}}</p>
                <p>
                  <span></span>
                  <span>{{item.area_name}}</span>
                </p>
                <!--<p>距当前定位地址5千米</p>-->
            </li>
          </ul>
        </aside>
      </section>
       <!--商品列表-->
      <section v-show="productDown" class="productList">
        <!-- 显示模式 -->
        <section class="productContent">
          <!--<section class="updateTime">-->
            <!--<p>-->
              <!--<span>上次库存更新时间:</span>-->
              <!--<span>2018-5-1</span>-->
            <!--</p>-->
            <!--<div v-show="!mapMode" @click="changeMode">-->
              <!--<span>地图模式 ></span>-->
            <!--</div>-->
            <!--<div v-show="mapMode" @click="changeMode">-->
              <!--<span>列表模式 ></span>-->
            <!--</div>-->
          <!--</section>-->
          <section class="device">
            <ul>
              <li class="device_item">
                <dl>
                  <dt>{{selectProductArray.address}}</dt>
                  <dd>智能售货柜</dd>
                </dl>
                <div class="device_info">
                  <ul>
                    <li v-for="(items, index1) in  selectProductArray.goods_list" :key="index1">
                      <span>{{items.goods_name}}</span>
                      <span>库存<span>{{items.count}}</span>件</span>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </section>
          <!--<section id="allmap" class="map" v-show="mapMode"></section>-->
        </section>

      </section>
      <!-- 选择商品不分柜子 -->
      <section v-show="productItemDown" class="productItem">
        <!-- 显示模式 -->
        <section class="productContent">
          <section class="updateTime">
            <p>
              <span>上次库存更新时间:</span>
              <span>{{refreshTime}}</span>
            </p>
            <div v-show="!mapMode" @click="changeMode">
              <span>地图模式 ></span>
            </div>
            <div v-show="mapMode" @click="changeMode">
              <span>列表模式 ></span>
            </div>
          </section>
          <section class="itemListInfo" v-show="!mapMode">
            <ul>
              <li v-for="item in itemListArray" class="itemInfo">
                <dl>
                  <dt>{{item.area_name}}</dt>
                  <dd>智能售货柜</dd>
                </dl>
                <ul>
                  <li>
                    <p>{{item.address}}</p>
                    <p>库存<span>{{item.count}}</span>件</p>
                  </li>
                </ul>
              </li>
            </ul>
          </section>
          <section id="allmap" class="map" v-show="mapMode"></section>
      </section>
      </section>
    </section>
    <section class="tipModal" v-show="tipStatus">
      <p>{{tipText}}</p>
    </section>
  </div>
</template>

<script>
  export default({
    name: 'Repertory',
    data () {
      return {
        tipStatus: false,
        tipText: '正在建设，马上开放...',
        refreshTime: '', //库存更新时间
        city: '西安', //城市
        device: '全部售货柜', //设备
        product: '选择商品', //商品
        cityDown: false, //控制城市选择显示
        deviceDown: false, //控制设备选择显示
        productDown: false, //控制商品选择显示
        active: true,
        allList: true,
        itemIsSelect: false, //是否选择具体商品
        mapMode: false,
        showDeviceList: [],
        allProductArray: [], //全部商品
        allDeviceListArray: [
          {
            "district": "全部",
            "show": true,
            "devicelist": []
          }
          ],//全部设备
        selectProductArray: [],
        productItemDown: false,//选择商品没有选择柜子
        itemListArray: [],
        commonArray: null
      }
    },
    mounted() {
      this.$nextTick( () => {
        let date = new Date();
        let dataTimes = this.Common.formatDate(date, "yyyy-MM-dd hh:mm:ss");
        this.refreshTime = dataTimes;
        this.getOrderAllData();
        //初始化方法 显示全部设备
        this.showDeviceList = this.allDeviceListArray[0].devicelist;
      })
    },
    methods: {
      //初始化数据获取及处理方法
      getOrderAllData() {
        this.$ajax({
          url: 'http://merchant.test.weilaixiansen.com/login/goodsList',
          method: 'GET'
        }).then((res) => {
          if(res.data.code == 0) {
            let Data = res.data.data;

  //       let Data =  [
  //      {
  //       "address": "",
  //         "devicelist": [{
  //         "device_id": 1000000002,
  //         "address": "xa",
  //         "area_name": "",
  //         "goods_list": [{
  //           "picture": null,
  //           "goods_name": "乐虎抗疲劳",
  //           "count": 4
  //         }]
  //       }, {
  //         "device_id": 1000000006,
  //         "address": "新待遇",
  //         "area_name": "",
  //         "goods_list": [{
  //           "picture": null,
  //           "goods_name": "虎皮卷",
  //           "count": 1
  //         }]
  //       }]
  //     }, {
  //   "address": "高新一路创新大厦",
  //     "devicelist": [{
  //     "device_id": 6101130001,
  //     "address": "高新一路创新大厦左侧01",
  //     "area_name": "高新一路创新大厦",
  //     "goods_list": [{
  //       "picture": null,
  //       "goods_name": "乐虎",
  //       "count": 16
  //     }, {
  //       "picture": null,
  //       "goods_name": "脉动",
  //       "count": 2
  //     }, {
  //       "picture": null,
  //       "goods_name": "澳洲混合坚果仁",
  //       "count": 2
  //     }, {
  //       "picture": null,
  //       "goods_name": "瑞特斯波德巧克力",
  //       "count": 3
  //     }, {
  //       "picture": null,
  //       "goods_name": "伊利每益添原味",
  //       "count": 1
  //     }, {
  //       "picture": null,
  //       "goods_name": "甜甜圈",
  //       "count": 1
  //     }, {
  //       "picture": null,
  //       "goods_name": "Q心抹茶",
  //       "count": 1
  //     }, {
  //       "picture": null,
  //       "goods_name": "诺曼地",
  //       "count": 1
  //     }, {
  //       "picture": null,
  //       "goods_name": "谷物原香三明治",
  //       "count": 1
  //     }, {
  //       "picture": null,
  //       "goods_name": "乳酪包",
  //       "count": 1
  //     }, {
  //       "picture": null,
  //       "goods_name": "牛奶雪花糕",
  //       "count": 3
  //     }, {
  //       "picture": null,
  //       "goods_name": "BK阳光芝士卷",
  //       "count": 1
  //     }]
  //   }, {
  //     "device_id": 6101130002,
  //     "address": "高新一路创新大厦右侧02",
  //     "area_name": "高新一路创新大厦",
  //     "goods_list": [{
  //       "picture": null,
  //       "goods_name": "乐虎",
  //       "count": 1
  //     }, {
  //       "picture": null,
  //       "goods_name": "米旗奶油蛋卷",
  //       "count": 1
  //     }, {
  //       "picture": null,
  //       "goods_name": "诺曼地",
  //       "count": 2
  //     }, {
  //       "picture": null,
  //       "goods_name": "牛奶雪花糕",
  //       "count": 1
  //     }, {
  //       "picture": null,
  //       "goods_name": "Q心抹茶",
  //       "count": 1
  //     }, {
  //       "picture": null,
  //       "goods_name": "甄选培根火腿寿司",
  //       "count": 1
  //     }, {
  //       "picture": null,
  //       "goods_name": "奶香蒸蛋糕",
  //       "count": 1
  //     }, {
  //       "picture": null,
  //       "goods_name": "肉松沙拉",
  //       "count": 2
  //     }, {
  //       "picture": null,
  //       "goods_name": "彩虹心情",
  //       "count": 2
  //     }, {
  //       "picture": null,
  //       "goods_name": "蟹小芳",
  //       "count": 3
  //     }, {
  //       "picture": null,
  //       "goods_name": "诺曼地",
  //       "count": 1
  //     }, {
  //       "picture": null,
  //       "goods_name": "肉松沙拉",
  //       "count": 2
  //     },  {
  //       "picture": null,
  //       "goods_name": "阿宽四川红油面皮",
  //       "count": 6
  //     }, {
  //       "picture": null,
  //       "goods_name": "每益添原味",
  //       "count": 1
  //     }, {
  //       "picture": null,
  //       "goods_name": "BK原味木糠盒",
  //       "count": 3
  //     }, {
  //       "picture": null,
  //       "goods_name": "BK奥利奥木糠盒",
  //       "count": 3
  //     }, {
  //       "picture": null,
  //       "goods_name": "BK肉松小贝",
  //       "count": 1
  //     }, {
  //       "picture": null,
  //       "goods_name": "姚太太精品梅子",
  //       "count": 2
  //     }, {
  //       "picture": null,
  //       "goods_name": "谷粒多早餐奶",
  //       "count": 19
  //     }, {
  //       "picture": null,
  //       "goods_name": "王老吉黑凉茶",
  //       "count": 15
  //     }, {
  //       "picture": null,
  //       "goods_name": "新希望香蕉芒果牛奶",
  //       "count": 10
  //     }, {
  //       "picture": null,
  //       "goods_name": "悦活U格",
  //       "count": 1
  //     }]
  //   }]
  // }, {
  //   "address": "瞪羚谷E座",
  //     "devicelist": [{
  //     "device_id": 6101130004,
  //     "address": "E座左侧04",
  //     "area_name": "瞪羚谷E座",
  //     "goods_list": [{
  //       "picture": null,
  //       "goods_name": "时令农家圣女果350g",
  //       "count": 18
  //     }, {
  //       "picture": null,
  //       "goods_name": "冬季爆款砂糖橘350g",
  //       "count": 12
  //     }, {
  //       "picture": null,
  //       "goods_name": "乐虎(每日两罐3.88)",
  //       "count": 47
  //     }, {
  //       "picture": null,
  //       "goods_name": "阿宽四川红油面皮",
  //       "count": 2
  //     }, {
  //       "picture": null,
  //       "goods_name": "好吃点臻好曲奇",
  //       "count": 2
  //     }, {
  //       "picture": null,
  //       "goods_name": "麦吉士蛋糕",
  //       "count": 1
  //     }, {
  //       "picture": null,
  //       "goods_name": "星巴克咖啡",
  //       "count": 5
  //     }, {
  //       "picture": null,
  //       "goods_name": "天地精华矿泉水",
  //       "count": 2
  //     }, {
  //       "picture": null,
  //       "goods_name": "阿宽四川红油面皮",
  //       "count": 1
  //     }, {
  //       "picture": null,
  //       "goods_name": "大龍燚自煮懒人火锅",
  //       "count": 5
  //     }]
  //   }, {
  //     "device_id": 6101130005,
  //     "address": "E座右侧05",
  //     "area_name": "瞪羚谷E座",
  //     "goods_list": [{
  //       "picture": null,
  //       "goods_name": "时令农家圣女果350g",
  //       "count": 18
  //     }, {
  //       "picture": null,
  //       "goods_name": "冬季爆款砂糖橘350g",
  //       "count": 12
  //     }, {
  //       "picture": null,
  //       "goods_name": "乐虎(每日两罐3.88)",
  //       "count": 11
  //     }, {
  //       "picture": null,
  //       "goods_name": "果2代",
  //       "count": 1
  //     }, {
  //       "picture": null,
  //       "goods_name": "麦吉士蛋糕",
  //       "count": 2
  //     }, {
  //       "picture": null,
  //       "goods_name": "麦吉士榛子味酥塔",
  //       "count": 2
  //     }, {
  //       "picture": null,
  //       "goods_name": "芙列浓巧克力",
  //       "count": 8
  //     }, {
  //       "picture": null,
  //       "goods_name": "大和味鲜切薯条",
  //       "count": 1
  //     }, {
  //       "picture": null,
  //       "goods_name": "新加坡进口方便面",
  //       "count": 4
  //     }, {
  //       "picture": null,
  //       "goods_name": "泰国格力高芒果饼干",
  //       "count": 6
  //     }, {
  //       "picture": null,
  //       "goods_name": "似水柔情自煮懒人火锅",
  //       "count": 1
  //     }, {
  //       "picture": null,
  //       "goods_name": "星巴克咖啡",
  //       "count": 4
  //     }, {
  //       "picture": null,
  //       "goods_name": "天地精华矿泉水",
  //       "count": 7
  //     }, {
  //       "picture": null,
  //       "goods_name": "史上最提神",
  //       "count": 2
  //     }, {
  //       "picture": null,
  //       "goods_name": "农夫山泉NFC橙汁",
  //       "count": 8
  //     }, {
  //       "picture": null,
  //       "goods_name": "Q心抹茶",
  //       "count": 1
  //     }, {
  //       "picture": null,
  //       "goods_name": "诺曼地",
  //       "count": 3
  //     }, {
  //       "picture": null,
  //       "goods_name": "乳酪包",
  //       "count": 1
  //     }, {
  //       "picture": null,
  //       "goods_name": "卢比蛋糕",
  //       "count": 1
  //     }, {
  //       "picture": null,
  //       "goods_name": "磅蛋糕",
  //       "count": 1
  //     }]
  //   }]
  // }, {
  //   "address": "雁塔区招商银行",
  //     "devicelist": [{
  //     "device_id": 6101130006,
  //     "address": "雁塔区招商银行右侧06",
  //     "area_name": "雁塔区招商银行",
  //     "goods_list": [{
  //       "picture": null,
  //       "goods_name": "果2代",
  //       "count": 13
  //     }, {
  //       "picture": null,
  //       "goods_name": "磅蛋糕",
  //       "count": 1
  //     }]
  //   }]
  // }, {
  //   "address": "国家数字出版基地A座",
  //     "devicelist": [{
  //     "device_id": 6101130009,
  //     "address": "国家数字出版基地A座右侧09",
  //     "area_name": "国家数字出版基地A座",
  //     "goods_list": [{
  //       "picture": null,
  //       "goods_name": "果2代",
  //       "count": 11
  //     }, {
  //       "picture": null,
  //       "goods_name": "阿宽四川红油面皮",
  //       "count": 4
  //     }, {
  //       "picture": null,
  //       "goods_name": "似水柔情火锅",
  //       "count": 5
  //     }]
  //   }, {
  //     "device_id": 6101130008,
  //     "address": "国家数字出版基地A座左侧侧08",
  //     "area_name": "国家数字出版基地A座",
  //     "goods_list": [{
  //       "picture": null,
  //       "goods_name": "洽洽小呆瓜",
  //       "count": 2
  //     }, {
  //       "picture": null,
  //       "goods_name": "香甜芒果干",
  //       "count": 2
  //     }, {
  //       "picture": null,
  //       "goods_name": "兵兵有礼公仔",
  //       "count": 7
  //     }, {
  //       "picture": null,
  //       "goods_name": "兵兵有礼玉米杯",
  //       "count": 3
  //     }, {
  //       "picture": null,
  //       "goods_name": "大唐丰韵",
  //       "count": 4
  //     }, {
  //       "picture": null,
  //       "goods_name": "兵兵有礼果冻杯",
  //       "count": 4
  //     }, {
  //       "picture": null,
  //       "goods_name": "兵兵有礼冰箱贴",
  //       "count": 2
  //     }, {
  //       "picture": null,
  //       "goods_name": "兵兵有礼陕西美食本",
  //       "count": 8
  //     }]
  //   }]
  // }, {
  //   "address": "都市之门B座",
  //     "devicelist": [{
  //     "device_id": 6101130010,
  //     "address": "都市之门B座右侧10",
  //     "area_name": "都市之门B座",
  //     "goods_list": [{
  //       "picture": null,
  //       "goods_name": "果2代",
  //       "count": 4
  //     }, {
  //       "picture": null,
  //       "goods_name": "BK原味木糠盒",
  //       "count": 1
  //     }]
  //   }, {
  //     "device_id": 6101130011,
  //     "address": "都市之门B座左侧11",
  //     "area_name": "都市之门B座",
  //     "goods_list": [{
  //       "picture": null,
  //       "goods_name": "养生瓜子",
  //       "count": 2
  //     }]
  //   }]
  // }]
        let data = Data;
        let ddd = JSON.stringify(Data);
        localStorage.setItem('data', ddd);
        localStorage.setItem('deviceData', ddd);
        //处理全部商品
        //所有柜子的同一商品数量相加
            for(let i = 0; i < data.length; i++) {
              for(let j = 0; j < data[i].devicelist.length; j++) {
                for(let k = 0; k < data[i].devicelist[j].goods_list.length; k++) {
                  if(this.allProductArray.length > 0) {
                    let isPush = true;
                    for(let m = 0; m < this.allProductArray.length; m++) {
                      if(data[i].devicelist[j].goods_list[k].goods_name === this.allProductArray[m].goods_name) {
                        let countss = data[i].devicelist[j].goods_list[k].count;
                        this.allProductArray[m].count += countss;
                        isPush = false;
                      }
                    }
                    if(isPush) {
                      this.allProductArray.push(data[i].devicelist[j].goods_list[k]);
                    }
                  }else{
                    this.allProductArray.push(data[i].devicelist[j].goods_list[k]);
                  }
                }
              }
            }

            console.log(this.allProductArray);
            console.log('~~~~~~~~~~~~~~~~~~');
            console.log(data);
        //处理全部设备
        //柜子信息中的第一个项目：全部分类
        let deviceData = JSON.parse(localStorage.getItem('deviceData'))
        for(let i = 0; i < deviceData.length; i++) {
          for(let j = 0; j < deviceData[i].devicelist.length; j++) {
            this.allDeviceListArray[0].devicelist.push(deviceData[i].devicelist[j]);
          }
        }
        for(let i = 0; i < deviceData.length; i++) {
          let obj = {
            "district": deviceData[i].address,
            "show": false,
            "devicelist": deviceData[i].devicelist
          }
          this.allDeviceListArray.push(obj);
        }
        console.log(this.allDeviceListArray);
          }
        }).catch((error) => {
          console.log(error);
        })
      },
      //暂未开放提示方法
      closeCity() {
        this.tipStatus = true;
        let timer = setTimeout(() => {
          this.tipStatus = false;
          clearTimeout(timer);
        }, 1000)
      },
      //返回主页
      goMain() {
        this.$router.push({
          path: '/main'
        })
      },
      //选择城市
      selectCity() {
        this.cityDown = true;
        this.deviceDown = false;
        this.allList = false;
        this.product = '选择商品';
        this.device = '全部售货柜';
        this.productDown = false;
        this.productItemDown = false;
      },
      //列表选择城市
      entryCity(e) {
        this.city = e.target.innerHTML;
        this.cityDown = !this.cityDown;
        this.allList = true;
        // this.deviceDown = !this.deviceDown;
      },
      //选择设备
      selectDevice() {
        this.allList = false;
        this.cityDown = false;
        this.deviceDown = true;
        this.productDown = false;
        this.productItemDown = false;
        this.city = '西安';
        this.product = '选择商品';
        this.device = '全部售货柜';
      },
      //点击切换设备列表
      changeDistrict(index) {
        this.showDeviceList = this.allDeviceListArray[index].devicelist;
        for(let i = 0; i < this.allDeviceListArray.length; i++) {
          this.allDeviceListArray[i].show = false;
        }
        this.allDeviceListArray[index].show = true;
        this.device = '全部售货柜';
      },
      //列表选择机柜
      entryDevice(index) {
        this.device = this.showDeviceList[index].address;
        console.log(this.showDeviceList[index]);
        this.cityDown = false;
        this.deviceDown = false;
        this.productDown = true;
        this.allList = false;
        this.selectProductArray = [];
        this.selectProductArray = this.showDeviceList[index];

      },
      //选择商品
      selectProduct() {
        this.cityDown = false;
        this.deviceDown = false;
        this.product = '选择商品';
        this.productItemDown = false;
        // this.itemIsSelect = true;
        if(this.device === '全部售货柜') {
          this.allList = true;
        }else{
          this.productDown = true;
        }
      },

      //列表选择商品
      itemSelect(index) {
        let goods_name = this.allProductArray[index].goods_name;
        this.city = '西安';
        this.allList = false;
        this.productItemDown = true;
        this.product = goods_name;
        this.itemListArray = [];
        let data = JSON.parse(localStorage.getItem('data'));
        // console.log('getstorage');
        // console.log(data);
        for(let i = 0; i < data.length; i++) {
          for(let j = 0; j < data[i].devicelist.length; j++) {
            for(let k = 0; k < data[i].devicelist[j].goods_list.length; k++) {
                if(goods_name === data[i].devicelist[j].goods_list[k].goods_name) {
                  let obj = {
                    area_name: data[i].devicelist[j].area_name,
                    address: data[i].devicelist[j].address,
                    count: data[i].devicelist[j].goods_list[k].count
                  }
                  this.itemListArray.push(obj)
              }
            }
          }
        }
        console.log(this.itemListArray);
        //获取定位,显示地图
        this.getNowPosition();
        // let lng = 108.8514655870;
        // let lat = 34.2207597143;
        // this.mapShow(lng, lat);
      },
      //切换显示
      changeMode() {
        this.mapMode = !this.mapMode;
      },
      // 获取用户当前位置经纬度
      getNowPosition() {
        var that = this;
        //var map = new BMap.Map("allmap"); //创建Map实例
        var geolocation = new BMap.Geolocation();
        console.log(geolocation);
        geolocation.getCurrentPosition(function(position) {
          if(this.getStatus() == BMAP_STATUS_SUCCESS) {
            if(position && position.point) {
              // var mk = new BMap.Marker(position.point);
              // map.addOverlay(mk);
              //map.panTo(position.point);
              var lng = null, lat = null;
              if(position.point.lng && position.point.lat) {
                lng = position.point.lng;
                lat = position.point.lat;
              }else{
                lng = 108.8514655870;
                lat = 34.2207597143;
              }
              //that.mapShow(map, lng, lat);
              that.mapShow(lng, lat);
            }
          }
          else {
            alert('failed' + this.getStatus());
          }
        })
      },
      //创建地图方法
      mapShow(lng, lat) {
        lng += 0.0020795652;
        lat -= 0.002026155972;
      // 百度地图API功能
      var map = new BMap.Map("allmap"); //创建Map实例  h5获取的经纬度 lat:34.2777999 lng:108.95309828
        console.log(new BMap.Point(lng, lat));
        console.log(map.centerAndZoom);
        map.centerAndZoom(new BMap.Point(lng, lat), 15); //初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom();

        this.pointShow(map);
      },
      //创建标注点方法
      pointShow(map) {
        const PositonArray = [
          {
            address: "xa",
            device_id: 1000000002,
            area_name:"",
            longitude: '',
            latitude: '',
          },
          {
            address:"新待遇",
            area_name:"",
            device_id:1000000006,
            longitude: '',
            latitude: '',
          },
          {
            address:"高新一路创新大厦左侧01",
            area_name:"高新一路创新大厦",
            device_id:6101130001,
            longitude: 108.909917,
            latitude: 34.239044,
          },
          {
            address:"高新一路创新大厦右侧02",
            area_name:"高新一路创新大厦",
            device_id:6101130002,
            longitude: 108.910276,
            latitude: 34.23954,
          },
          {
            address: "E座左侧04",
            area_name: "瞪羚谷E座",
            device_id: 6101130004,
            longitude: 108.86603,
            latitude: 34.202373,
          },
          {
            address: "E座右侧05",
            area_name: "瞪羚谷E座",
            device_id: 6101130005,
            longitude: 108.866484,
            latitude: 34.20238,
          },
          {
            address:"雁塔区招商银行右侧06",
            area_name:"雁塔区招商银行",
            device_id:6101130006,
            longitude: 108.91161,
            latitude: 34.245725,
          },
          {
            address:"雁塔区招商银行左侧07",
            area_name:"雁塔区招商银行",
            device_id:6101130007,
            longitude: 108.911098,
            latitude: 34.245661,
          },
          {
            address:"国家数字出版基地A座右侧09",
            area_name:"国家数字出版基地A座",
            device_id:6101130009,
            longitude: 108.84103,
            latitude: 34.217516,
          },
          {
            address:"国家数字出版基地A座左侧侧08",
            area_name:"国家数字出版基地A座",
            device_id:6101130008,
            longitude: 108.83997,
            latitude: 34.214553,
          },
          {
            address:"都市之门B座右侧10",
            area_name:"都市之门B座",
            device_id:6101130010,
            longitude: 108.894219,
            latitude: 34.201182,
          },
          {
            address:"都市之门B座左侧11",
            area_name:"都市之门B座",
            device_id:6101130011,
            longitude: 108.893595,
            latitude: 34.200955,
          }

        ]
        var data = this.itemListArray;
        console.log(data);
        for(let i = 0; i < data.length; i++) {
          for(let j = 0; j < PositonArray.length; j++) {
            if(data[i].address === PositonArray[j].address) {
              data[i].longitude = PositonArray[j].longitude;
              data[i].latitude = PositonArray[j].latitude;
            }
          }
        }
        if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            var longitude = data[i].longitude, latitude = data[i].latitude;
            var pt = new BMap.Point(longitude, latitude);
            //定义icon时一定要设置anchor属性,否则显示点位会随着地图的缩放移动,此点是不会变动的,icon设置点是根据此点的位置来设置的
            var myIcon = new BMap.Icon("./static/images/location_normal.png", new BMap.Size(38, 39), {
              anchor: new BMap.Size(5, 5),
              imageSize: new BMap.Size(25,26),
            });
            var marker = new BMap.Marker(pt, {icon: myIcon}); //创建标注
            var acount = data[i].count;
            console.log(acount)
            var label = new BMap.Label("库存" + acount + "件", {position: pt, offset: new BMap.Size(-25, -30)});
            label.setStyle({
              "color": "#ffffff",
              "fontSize": "10px",
              "height": "20px",
              "width": "70px",
              "borderRadius": "10px",
              "textAlign": "center",
              "lineHeight": "20px",
              "background": "#ff8827",
              "fontFamily": "微软雅黑",
              "border": "none"
            });
            marker.setLabel(label);
            map.addOverlay(marker);
          }
        }
      },
      //计算距离方法
      getDistance(longitude1, latitude1, longitude2, latitude2) {
        var point1 = new BMap.Point(longitude1, latitude1);
        var point2 = new BMap.Point(longitude2, latitude2);
        var distance = map.getDistance(point1,point2);
        return distance;
      }
    }
  })
</script>

<style lang="less">
  .Repertory{
    width: 100vw;
    height: 100vh;
    background: #f1f1f1;
    /* 去除百度地图水印 */
    .anchorBL {
      display: none;
    }
    .tipModal{
      background: rgba(0,0,0,.7);
      border-radius: 10px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      margin: auto;
      width: 29.2998rem;
      height: 10rem;
      z-index: 99;
      color: #fff;
      text-align: center;
      font-size: 2.0677rem;
      padding: 3vh 0;
    }
    .login_top{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 99;
      width: 100vw;
      background: #65d172;
      height: 5.997vh;
      font-size: 2.398rem;
      line-height: 5.997vh;
      text-align: center;
      color: #fff;
      font-weight: 500;
      span{
        position: absolute;
        left: 4vw;
        top: 0;
      }
    }
    header{
      position: fixed;
      top: 5.997vh;
      left: 0;
      background: #65d172;
      color: #ffffff;
      height: 7.3718vh;
      z-index: 99;
      ul{
        list-style: none;
        overflow: hidden;
        li{
          float: left;
          font-size: 2.3988rem;
          padding: 2.098vh 0 1.874vh 0;
          text-align: center;
          &:nth-of-type(1) {
            width: 23.2vw;
          }
          &:nth-of-type(2), &:nth-of-type(3){
            width: 38.4vw;
          }
          span:nth-of-type(2){
            display: inline-block;
            width: 5.333vw;
            height: 2.773vh;
            /*vertical-align: middle;*/
          }
          .selectInput{
            display: inline-block;
            width: 50%;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .repertoryContent{
      padding-top: 13.3688vh;
      background: #f1f1f1;
      .allList{
        .refreshTime{
          position: fixed;
          top: 13.3688vh;
          left: 0;
          z-index: 99;
          width: 100%;
          background: #fff;
          font-size: 2.098rem;
          padding: 2.02398vh 0 2.02398vh 4.667vw;
          color: #9f9f9f;
          border-bottom: 1px solid #f1f1f1;
        }
        .itemList{
          margin-top: 7.2vh;
          height: 79vh;
          overflow-y: auto;
          -webkit-overflow-scrolling : touch;
          li{
            margin: 1.499vh 0;
            background: #fff;
            padding: 1.874vh 2.667vw;
            overflow: hidden;
            .itemPic{
              display: inline-block;
              float: left;
              width: 16.933vw;
              height: 16.933vw;
              background-size: cover;
            }
            .defaultPic {
              display: inline-block;
              float: left;
              width: 16.933vw;
              height: 16.933vw;
              background: url(../../static/images/wlxs_logo.png) no-repeat center center;
              background-size: cover;
            }
            dl{
              width: 40vw;
              float: left;
              margin: 1vh 4vw;
              font-size: 2.398rem;
              color: #373737;
              dt{
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
              }
            }
            p{
              width: 26.667vw;
              float: left;
              font-size: 2.398rem;
              color: #747475;
              margin-top: 1vh;
              padding: 2.398vh 0;
              text-align: right;
              span{
                color: #65d172;
                font-size: 2.6236rem;
              }
              span:nth-of-type(2) {
                display: inline-block;
                width: 3.066vw;
                height: 2.3238vh;
                background: url(../../static/images/next.png) no-repeat center center;
                background-size: cover;
                vertical-align: middle;
              }
            }
          }
        }
      }
      .cityList{
        /*margin-top: 2vh;*/
        width: 100%;
        height: 86.6312vh;
        background: #fff;
        ul{
          list-style: none;
          li{
            font-size: 2.3988vh;
            border: 1px solid #80858f;
            padding: 0.323vh 10.51vw;
            margin: 0.654vh 1.32vw;
            border-radius: 7px;
            float: left;
          }
        }
      }
      .deviceList{
        background: #fff;
        height: 86.6312vh;
        overflow: hidden;
        .left{
          width: 27.4466vw;
          float: left;
          font-size: 2.2488rem;
          ul{
            height: 79vh;
            overflow-y: auto;
            -webkit-overflow-scrolling : touch;
            li{
              padding: 2.2398vh 0;
              text-align: center;
            }
          }

        }
        .right{
          width: 72.5534vw;
          float: right;
          ul{
            height: 79vh;
            overflow-y: auto;
            -webkit-overflow-scrolling : touch;
            li{
              font-size: 2.2488rem;
              color: #373737;
              padding: 0 4vw;
              border-bottom: 1px solid #e5e5e5;
              p:nth-of-type(1) {
                padding: 2.6236vh 0 1.874vh 0;
              }
              p:nth-of-type(2) {
                font-size: 1.949rem;
                color: #999898;
                padding-bottom: 2vh;
                span:nth-of-type(1){
                  display: inline-block;
                  width: 3.733vw;
                  height: 2.548vh;
                  background: url("../../static/images/location_icon.png") no-repeat center center;
                  background-size: cover;
                  vertical-align: bottom;
                }
              }
              /*p:nth-of-type(3) {*/
                /*font-size: 1.799rem;*/
                /*color: #939393;*/
                /*padding: 2.6236vh 0;*/
              /*}*/
            }
          }
        }
      }
      .productList{
        /*商品条目列表展示*/
        .productItem{
          margin-top: 2vh;
          ul{
            list-style: none;
            li{
              text-align: center;
              font-size: 2.3988vh;
              border: 1px solid #80858f;
              padding: 0.323vh 0;
              margin: 0.654vh 1.32vw;
              width: 30.258vw;
              border-radius: 7px;
              float: left;
            }
          }
        }
        .updateTime {
          border-bottom: 1px solid #e5e5e5;
          padding: 0.7448vh 5.333vw;
          overflow: hidden;
          background: #fff;
          p {
            width: 61.334vw;
            font-size: 1.949vh;
            color: #9f9f9f;
            float: left;
            height: 4.1229vh;
            line-height: 4.1229vh;
          }
          div {
            width: 28vw;
            float: right;
            text-align: center;
            span {
              float: right;
              display: block;
              width: 20.6667vw;
              height: 4.1229vh;
              line-height: 4.1229vh;
              font-size: 1.724rem;
              color: #65d172;
              border: 1px solid #65d172;
              border-radius: 20px;
            }
          }
        }
        .device {
          .device_item {
            margin-bottom: 1.449vh;
            background: #fff;
            overflow: hidden;
            dl {
              width: 30%;
              display: inline-block;
              float: left;
              font-size: 2.3988vh;
              padding: 4.1229vh 8vw 3.748vh 5.333vw;
              dd {
                font-size: 1.874rem;
                color: #9f9f9f;
              }
            }
            .device_info {
              display: inline-block;
              ul {
                list-style: none;
                li {
                  width: 65.333vw;
                  &:nth-last-of-type(1) {
                    border: none;
                  }
                  border-bottom: 1px solid #e5e5e5;
                  font-size: 2.2488rem;
                  color: #373737;
                  overflow: hidden;
                  padding: 1.874vh 0 2.2488vh 0;
                  > span:nth-of-type(1) {
                    display: inline-block;
                    width: 43.55vw;
                  }
                  span:nth-of-type(2) {
                    display: inline-block;
                    color: #999898;
                    width: 20.6vw;
                    text-align: right;
                    span {
                      display: inline-block;
                      font-size: 2.848vh;
                      color: #65d172;
                    }
                  }
                }
              }
            }
          }
        }

      }
      .productItem{
        .map {
          width: 100vw;
          height: 87vh;
        }
        .updateTime {
          border-bottom: 1px solid #e5e5e5;
          padding: 0.7448vh 5.333vw;
          overflow: hidden;
          background: #fff;
          p {
            width: 61.334vw;
            font-size: 1.949vh;
            color: #9f9f9f;
            float: left;
            height: 4.1229vh;
            line-height: 4.1229vh;
          }
          div {
            width: 28vw;
            float: right;
            text-align: center;
            span {
              float: right;
              display: block;
              width: 20.6667vw;
              height: 4.1229vh;
              line-height: 4.1229vh;
              font-size: 1.724rem;
              color: #65d172;
              border: 1px solid #65d172;
              border-radius: 20px;
            }
          }
        }
        .itemListInfo{
          .itemInfo{
            background: #fff;
            margin-bottom: 20px;
            padding: 3.748vh 5.333vw;
            overflow: hidden;
            vertical-align: middle;
            dl{
              width: 25.333%;
              float: left;
              dt{
                font-size: 2.3988rem;
                color: #373737;
              }
              dl{
                font-size: 1.874rem;
                color: #9f9f9f;
              }
            }
            ul{
              width: 74%;
              float: left;
              p{
                float: left;
                font-size: 2.2488rem;
                width: 50%;
              }
              p:nth-of-type(1) {
                color: #373737;
                padding-left: 2vw;
              }
              p:nth-of-type(2) {
                text-align: right;
                color: #999898;
                span{
                  font-size: 2.8485rem;
                  color: #65d172;
                }
              }
            }
          }
        }
      }
    }
  }
  .down{
    background: url('../../static/images/down.png') no-repeat center center;
    background-size: cover;
    transition: all 0.1s ease-out;
  }
  .up{
    background: url("../../static/images/up.png") no-repeat center center;
    background-size: cover;
    transition: all 0.1s ease-out;
  }
  .normal{
    background: #f4f2f2;
    color: #373737;
  }
  .special{
    background: #ffffff;
    color: #65d172;
  }
</style>
