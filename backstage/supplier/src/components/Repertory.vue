<!--<template>-->
    <!--<div class="Repertory">-->
      <!--<header>-->
        <!--<Select v-model="prov">-->
          <!--<Option v-for="(opt1, indexall) in arrAll" :value="opt1.name" :key="indexall">-->
            <!--{{ opt1.name }}-->
          <!--</Option>-->
        <!--</Select>-->
        <!--<Select v-model="city">-->
          <!--<Option v-for="(opt2, indexcity) in cityArr" :value="opt2.name" :key="indexcity">-->
            <!--{{ opt2.name }}-->
          <!--</Option>-->
        <!--</Select>-->
        <!--<Select v-model="district" v-if="district">-->
          <!--<Option v-for="(opt3, indexdistrict) in districtArr" :value="opt3.name" :key="indexdistrict">-->
            <!--{{ opt3.name }}-->
          <!--</Option>-->
        <!--</Select>-->
      <!--</header>-->
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
      <!--&lt;!&ndash; 查看模式显示 &ndash;&gt;-->
      <!--<section class="device" v-show="!mapMode">-->
        <!--<ul>-->
          <!--<li v-for="(item, index) in RepertoryArray" class="device_item" :key="index">-->
            <!--<dl>-->
              <!--<dt>{{item.address}}</dt>-->
              <!--<dd>智能售货柜</dd>-->
            <!--</dl>-->
            <!--<div class="device_info">-->
              <!--<ul>-->
                <!--<li v-for="(items, index1) in item.deviceList" :key="index1">-->
                  <!--<span>{{items.name}}</span>-->
                  <!--<span>库存<span>{{items.acount}}</span>件</span>-->
                <!--</li>-->
              <!--</ul>-->
            <!--</div>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</section>-->
      <!--<section id="allmap" class="map" v-show="mapMode"></section>-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->
    <!--export default {-->
      <!--name: "Repertory",-->
      <!--data() {-->
        <!--return {-->
          <!--arrAll: [-->
              <!--{name: "城市", sub: [{name: "请选择"}], type: 1},-->
              <!--{-->
                <!--name: "西安",-->
                <!--sub: [-->
                  <!--{name: "请选择售货柜", sub: [{name: "请选择商品"}]},-->
                  <!--{-->
                    <!--name: "全部售货柜",-->
                    <!--sub: [-->
                      <!--{name: "请选择商品"},-->
                      <!--{name: "乐虎1"},-->
                      <!--{name: "乐虎2"},-->
                      <!--{name: "乐虎3"},-->
                      <!--{name: "其他"}-->
                    <!--],-->
                    <!--type: 0-->
                  <!--},-->
                  <!--{-->
                    <!--name: "瞪羚谷1",-->
                    <!--sub: [-->
                      <!--{name: "请选择商品"},-->
                      <!--{name: "乐虎1"},-->
                      <!--{name: "乐虎2"},-->
                      <!--{name: "乐虎3"},-->
                      <!--{name: "其他"}-->
                    <!--],-->
                    <!--type: 0-->
                  <!--},-->
                  <!--{-->
                    <!--name: "瞪羚谷2",-->
                    <!--sub: [-->
                      <!--{name: "请选择商品"},-->
                      <!--{name: "乐虎1"},-->
                      <!--{name: "乐虎2"},-->
                      <!--{name: "乐虎3"},-->
                      <!--{name: "其他"}-->
                    <!--],-->
                    <!--type: 0-->
                  <!--},-->
                  <!--{-->
                    <!--name: "招商银行1",-->
                    <!--sub: [-->
                      <!--{name: "请选择商品"},-->
                      <!--{name: "乐虎1"},-->
                      <!--{name: "乐虎2"},-->
                      <!--{name: "乐虎3"},-->
                      <!--{name: "其他"}-->
                    <!--],-->
                    <!--type: 0-->
                  <!--},-->
                  <!--{-->
                    <!--name: "招商银行2",-->
                    <!--sub: [-->
                      <!--{name: "请选择商品"},-->
                      <!--{name: "乐虎1"},-->
                      <!--{name: "乐虎2"},-->
                      <!--{name: "乐虎3"},-->
                      <!--{name: "其他"}-->
                    <!--],-->
                    <!--type: 0-->
                  <!--},-->
                  <!--{-->
                    <!--name: "创业大厦1",-->
                    <!--sub: [-->
                      <!--{name: "请选择商品"},-->
                      <!--{name: "乐虎1"},-->
                      <!--{name: "乐虎2"},-->
                      <!--{name: "乐虎3"},-->
                      <!--{name: "其他"}-->
                    <!--],-->
                    <!--type: 0-->
                  <!--},-->
                  <!--{-->
                    <!--name: "创业大厦2",-->
                    <!--sub: [-->
                      <!--{name: "请选择商品"},-->
                      <!--{name: "乐虎1"},-->
                      <!--{name: "乐虎2"},-->
                      <!--{name: "乐虎3"},-->
                      <!--{name: "其他"}-->
                    <!--],-->
                    <!--type: 0-->
                  <!--},-->
                  <!--{-->
                    <!--name: "都市之门1",-->
                    <!--sub: [-->
                      <!--{name: "请选择商品"},-->
                      <!--{name: "乐虎1"},-->
                      <!--{name: "乐虎2"},-->
                      <!--{name: "乐虎3"},-->
                      <!--{name: "其他"}-->
                    <!--],-->
                    <!--type: 0-->
                  <!--},-->
                  <!--{-->
                    <!--name: "都市之门2",-->
                    <!--sub: [-->
                      <!--{name: "请选择商品"},-->
                      <!--{name: "乐虎1"},-->
                      <!--{name: "乐虎2"},-->
                      <!--{name: "乐虎3"},-->
                      <!--{name: "其他"}-->
                    <!--],-->
                    <!--type: 0-->
                  <!--}-->
                  <!--],-->
                <!--type: 1-->
              <!--}-->
            <!--],-->
          <!--prov: '西安',-->
          <!--city: '请选择售货柜',-->
          <!--district: '请选择商品',-->
          <!--cityArr: [],-->
          <!--districtArr: [],-->
          <!--mapMode: false, //地图模式-->
          <!--RepertoryArray: [-->
            <!--{-->
              <!--"address" : "瞪羚谷",-->
              <!--"deviceList": [-->
                <!--{-->
                  <!--"name": "未来鲜森-瞪羚谷1",-->
                  <!--"acount": '90',-->
                  <!--"longitude": 108.98416,-->
                  <!--"latitude": 34.27555-->
                <!--},-->
                <!--{-->
                  <!--"name": "未来鲜森-瞪羚谷2",-->
                  <!--"acount": '88',-->
                  <!--"longitude": 108.95416,-->
                  <!--"latitude": 34.25555-->
                <!--}-->
              <!--]-->
            <!--},-->
            <!--{-->
              <!--"address" : "招商银行",-->
              <!--"deviceList": [-->
                <!--{-->
                  <!--"name": "未来鲜森-招商银行1",-->
                  <!--"acount": '20',-->
                  <!--"longitude": 108.96416,-->
                  <!--"latitude": 34.26555-->
                <!--},-->
                <!--{-->
                  <!--"name": "未来鲜森-招商银行2",-->
                  <!--"acount": '20',-->
                  <!--"longitude": 108.97416,-->
                  <!--"latitude": 34.28555-->
                <!--}-->
              <!--]-->
            <!--}-->
          <!--]-->
        <!--}-->
      <!--},-->
      <!--mounted() { //初始化-->
        <!--this.$nextTick( () => {-->
          <!--this.mapShow();-->
        <!--})-->
      <!--},-->
      <!--methods: {-->
        <!--//切换显示-->
        <!--changeMode() {-->
          <!--this.mapMode = !this.mapMode;-->
        <!--},-->
        <!--updateCity: function () {-->
          <!--for (var i in this.arrAll) {-->
            <!--var obj = this.arrAll[i];-->
            <!--if (obj.name === this.prov) {-->
              <!--this.cityArr = obj.sub;-->
              <!--break;-->
            <!--}-->
          <!--}-->
          <!--this.city = this.cityArr[0].name;-->
        <!--},-->
        <!--updateDistrict: function () {-->
          <!--for (var i in this.cityArr) {-->
            <!--var obj = this.cityArr[i];-->
            <!--if (obj.name === this.city) {-->
              <!--this.districtArr = obj.sub;-->
              <!--break;-->
            <!--}-->
          <!--}-->
          <!--if(this.districtArr && this.districtArr.length > 0 && this.districtArr[0].name) {-->
            <!--this.district = this.districtArr[0].name;-->
          <!--} else {-->
            <!--this.district = '';-->
          <!--}-->
        <!--},-->
        <!--//创建地图方法-->
        <!--mapShow() {-->
          <!--// 百度地图API功能-->
          <!--var map = new BMap.Map("allmap"); //创建Map实例34.2755593788,108.9541677863-->
          <!--map.centerAndZoom(new BMap.Point(108.98416, 34.27555), 15); //初始化地图,设置中心点坐标和地图级别-->
          <!--map.enableScrollWheelZoom();-->
          <!--this.pointShow(map);-->
        <!--},-->
        <!--//创建标注点方法-->
        <!--pointShow(map) {-->
          <!--var data = this.RepertoryArray;-->
          <!--if(data.length > 0) {-->
            <!--for(var i = 0; i < data.length; i++) {-->
              <!--for(var j = 0; j < data[i].deviceList.length; j++) {-->
                <!--var longitude = data[i].deviceList[j].longitude, latitude = data[i].deviceList[j].latitude;-->
                <!--var pt = new BMap.Point(longitude, latitude);-->
                <!--//定义icon时一定要设置anchor属性,否则显示点位会随着地图的缩放移动,此点是不会变动的,icon设置点是根据此点的位置来设置的-->
                <!--var myIcon = new BMap.Icon("./static/images/location_normal.png", new BMap.Size(68, 70), {-->
                  <!--anchor: new BMap.Size(5, 5)-->
                <!--});-->
                <!--var marker = new BMap.Marker(pt, {icon: myIcon}); //创建标注-->
                <!--var acount = data[i].deviceList[j].acount;-->
                <!--var label = new BMap.Label("库存" + acount + "件",{ position: pt,offset: new BMap.Size(-35,-30)});-->
                <!--label.setStyle({-->
                  <!--color : "#ffffff",-->
                  <!--fontSize : "12px",-->
                  <!--height : "25px",-->
                  <!--width: "90px",-->
                  <!--borderRadius: "10px",-->
                  <!--textAlign: "center",-->
                  <!--lineHeight : "20px",-->
                  <!--background: "#ff8827",-->
                  <!--fontFamily:"微软雅黑",-->
                  <!--border: "none"-->
                <!--});-->
                <!--marker.setLabel(label);-->
                <!--map.addOverlay(marker);-->
              <!--}-->
            <!--}-->
          <!--}-->
        <!--}-->
      <!--},-->
      <!--beforeMount: function () {-->
        <!--this.updateCity();-->
        <!--this.updateDistrict();-->
      <!--},-->
      <!--watch: {-->
        <!--prov: function () {-->
          <!--this.updateCity();-->
          <!--this.updateDistrict();-->
        <!--},-->
        <!--city: function () {-->
          <!--this.updateDistrict();-->
        <!--}-->
      <!--},-->
    <!--}-->
<!--</script>-->

<!--<style lang="less">-->
  <!--.Repertory{-->
    <!--/* 去除百度地图水印 */-->
    <!--.anchorBL{-->
      <!--display:none;-->
    <!--}-->
    <!--header{-->
      <!--background: #5fcf6c;-->
      <!--height: 7.496vh;-->
    <!--}-->
    <!--.updateTime{-->
      <!--border-bottom: 1px solid #e5e5e5;-->
      <!--padding: 0.7448vh 5.333vw;-->
      <!--overflow: hidden;-->
      <!--background: #fff;-->
      <!--p{-->
        <!--width: 61.334vw;-->
        <!--font-size: 1.949vh;-->
        <!--color: #9f9f9f;-->
        <!--float: left;-->
        <!--height: 4.1229vh;-->
        <!--line-height: 4.1229vh;-->
      <!--}-->
      <!--div{-->
        <!--width: 28vw;-->
        <!--float: right;-->
        <!--text-align: center;-->
        <!--span{-->
          <!--float: right;-->
          <!--display: block;-->
          <!--width: 20.6667vw;-->
          <!--height: 4.1229vh;-->
          <!--line-height: 4.1229vh;-->
          <!--font-size: 1.724rem;-->
          <!--color: #65d172;-->
          <!--border: 1px solid #65d172;-->
          <!--border-radius: 20px;-->
        <!--}-->
      <!--}-->
    <!--}-->
    <!--.device{-->
      <!--.device_item{-->
        <!--margin-bottom: 1.449vh;-->
        <!--background: #fff;-->
        <!--overflow: hidden;-->
        <!--dl{-->
          <!--display: inline-block;-->
          <!--float: left;-->
          <!--font-size: 2.3988vh;-->
          <!--padding: 4.1229vh 8vw 3.748vh 5.333vw;-->
          <!--dd{-->
            <!--font-size: 1.874rem;-->
            <!--color: #9f9f9f;-->
          <!--}-->
        <!--}-->
        <!--.device_info{-->
          <!--display: inline-block;-->
          <!--ul{-->
            <!--list-style: none;-->
            <!--li{-->
              <!--width: 65.333vw;-->
              <!--&:nth-last-of-type(1) {-->
                <!--border: none;-->
              <!--}-->
              <!--border-bottom: 1px solid #e5e5e5;-->
              <!--font-size: 2.2488rem;-->
              <!--color: #373737;-->
              <!--overflow: hidden;-->
              <!--padding: 1.874vh 0 2.2488vh 0;-->
              <!--&gt;span:nth-of-type(1){-->
                <!--display: inline-block;-->
                <!--width: 43.55vw;-->
              <!--}-->
              <!--span:nth-of-type(2){-->
                <!--display: inline-block;-->
                <!--color: #999898;-->
                <!--width: 20.6vw;-->
                <!--text-align: right;-->
                <!--span{-->
                  <!--display: inline-block;-->
                  <!--font-size: 2.848vh;-->
                  <!--color: #65d172;-->
                <!--}-->
              <!--}-->
            <!--}-->
          <!--}-->
        <!--}-->
      <!--}-->
    <!--}-->
    <!--.map{-->
      <!--width: 100vw;-->
      <!--height: 87vh;-->
    <!--}-->
  <!--}-->
  <!--.ivu-select:nth-of-type(1){-->
    <!--border: none;-->
    <!--width: 20vw;-->
  <!--}-->
  <!--.ivu-select:nth-of-type(2){-->
    <!--border: none;-->
    <!--width: 40vw;-->
  <!--}-->
  <!--.ivu-select:nth-of-type(3){-->
    <!--border: none;-->
    <!--width: 35vw;-->
  <!--}-->
  <!--.ivu-select-single .ivu-select-selection{-->
    <!--background: #5fcf6c;-->
    <!--border: none;-->
    <!--outline: medium;-->
    <!--color: #ffffff;-->
    <!--font-size: 2.248rem;-->
    <!--text-align: right;-->
    <!--height: 7.496vh;-->
    <!--span{-->
      <!--display: inline-block;-->
      <!--font-size: 2.248rem!important;-->
      <!--height: 7.496vh!important;-->
      <!--line-height: 7.496vh!important;-->
    <!--}-->
    <!--.ivu-icon{-->
      <!--color: #ffffff;-->
    <!--}-->
  <!--}-->

<!--</style>-->
<template>
  <div class="Repertory">
    <header>
      <ul>
        <li v-model="city" @click="selectCity">
          <span v-html="city"></span>
          <span :class="!cityDown ? 'down' : 'up'"></span>
        </li>
        <li v-model="device" @click="selectDevice">
          <span v-html="device"></span>
          <span :class="!deviceDown ? 'down' : 'up'"></span>
        </li>
        <li v-model="product" @click="selectProduct">
          <span v-html="product"></span>
          <span :class="!productDown ? 'down' : 'up'"></span>
        </li>
      </ul>
    </header>
    <section class="repertoryContent">
      <!-- 城市列表 -->
      <section v-show="!cityDown" class="cityList">
        <ul>
          <li @click="entryCity">西安</li>
          <li>北京</li>
          <li>上海</li>
          <li>广州</li>
          <li>深圳</li>
          <li>杭州</li>
          <li>成都</li>
          <li>南京</li>
          <li>苏州</li>
          <li>重庆</li>
          <li>武汉</li>
          <li>昆明</li>
          <li>拉萨</li>
        </ul>
      </section>
      <!-- 设备列表 -->
      <section v-show="!deviceDown" class="deviceList">
        <aside class="left">
          <ul>
            <li v-for="(item, index) in deviceList" @click="changeDistrict(index)" :class="item.show ? 'special' : 'normal'">
              {{item.district}}
            </li>
          </ul>
        </aside>
        <aside class="right">
          <ul>
            <li v-for="(item, index) in showDeviceList">
                <p @click="entryDevice">{{item.name}}</p>
                <p>
                  <span></span>
                  <span>{{item.addr}}</span>
                </p>
                <p>距当前定位地址5千米</p>
            </li>
          </ul>
        </aside>
      </section>
      <!-- 商品列表 -->
      <section v-show="!productDown" class="productList">
        <ul>
          <li>
            list
          </li>
        </ul>
      </section>
    </section>
  </div>
</template>

<script>
  export default({
    name: 'Repertory',
    data () {
      return {
        city: '选择城市', //城市
        device: '全部售货柜', //设备
        product: '选择商品', //商品
        cityDown: true, //控制城市选择显示
        deviceDown: true, //控制设备选择显示
        productDown: true, //控制商品选择显示
        active: true,
        deviceList: [
          {
            'district': '全部',
            'show': true,
            'list': [
              {
                'addr': '西安市高新区锦业路69号瞪羚谷E座',
                'name': '未来鲜森-0001'
              },
              {
                'addr': '西安市高新区锦业路69号瞪羚谷E座',
                'name': '未来鲜森-0002'
              },
              {
                'addr': '西安市高新区锦业路69号瞪羚谷E座',
                'name': '未来鲜森-0003'
              },
              {
                'addr': '西安市高新区锦业路69号瞪羚谷E座',
                'name': '未来鲜森-0004'
              },
              {
                'addr': '西安市高新区锦业路69号瞪羚谷E座',
                'name': '未来鲜森-0005'
              },
              {
                'addr': '西安市高新区锦业路69号瞪羚谷E座',
                'name': '未来鲜森-0006'
              },
            ]
          },
          {
            'district': '雁塔区',
            'show': false,
            'list': [
              {
                'addr': '西安市高新区锦业路69号瞪羚谷E座',
                'name': '未来鲜森-0003'
              },
              {
                'addr': '西安市高新区锦业路69号瞪羚谷E座',
                'name': '未来鲜森-0004'
              }
            ]
          },
          {
            'district': '高新区',
            'show': false,
            'list': [
              {
                'addr': '西安市高新区锦业路69号瞪羚谷E座',
                'name': '未来鲜森-0001'
              },
              {
                'addr': '西安市高新区锦业路69号瞪羚谷E座',
                'name': '未来鲜森-0002'
              }
            ]
          },
          {
            'district': '夜未央',
            'show': false,
            'list': [
              {
                'addr': '西安市高新区锦业路69号瞪羚谷E座',
                'name': '未来鲜森-0005'
              },
              {
                'addr': '西安市高新区锦业路69号瞪羚谷E座',
                'name': '未来鲜森-0006'
              }
            ]
          }
        ],
        showDeviceList: []
      }
    },
    mounted() {
      this.$nextTick( () => {
        //初始化方法 显示全部设备
        this.showDeviceList = this.deviceList[0].list;
      })
    },
    methods: {
      //点击选择城市
      selectCity() {
        this.cityDown = !this.cityDown;
        this.deviceDown = true;
        this.productDown = true;
      },
      //点击选择设备
      selectDevice() {
        this.deviceDown = !this.deviceDown;
        this.cityDown = true;
        this.productDown = true;
      },
      //点击选择商品
      selectProduct() {
        this.productDown = !this.productDown;
        this.cityDown = true;
        this.deviceDown = true;
      },
      //点击切换设备列表
      changeDistrict(index) {
        this.showDeviceList = this.deviceList[index].list;
        for(var i = 0; i < this.deviceList.length; i++) {
          this.deviceList[i].show = false;
        }
        this.deviceList[index].show = true;
      },
      //列表选择城市
      entryCity(e) {
        // console.log(e);
        // console.log(e.target.innerHTML);
        this.city = e.target.innerHTML;
        this.selectDevice();
      },
      //列表选择机柜
      entryDevice(e) {
        this.device = e.target.innerHTML;
      }
    }
  })
</script>

<style lang="less">
  .Repertory{
    background: #ffffff;
    padding-top: 7.3718vh;
    header{
      position: fixed;
      top: 0;
      left: 0;
      background: #65d172;
      color: #ffffff;
      height: 7.3718vh;
      ul{
        list-style: none;
        overflow: hidden;
        li{
          float: left;
          font-size: 2.3988rem;
          padding: 2.098vh 0 1.874vh 0;
          text-align: center;
          &:nth-of-type(1) {
            width: 27.2vw;
          }
          &:nth-of-type(2), &:nth-of-type(3){
            width: 36.4vw;
          }
          span:nth-of-type(2){
            display: inline-block;
            width: 5.333vw;
            height: 2.773vh;
            vertical-align: middle;
          }
        }

      }
    }
    .repertoryContent{
      .cityList{
        margin-top: 2vh;
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
        .left{
          width: 27.4466vw;
          float: left;
          font-size: 2.2488rem;
          li{
            padding: 2.2398vh 0;
            text-align: center;
          }
        }
        .right{
          width: 72.5534vw;
          float: right;
          ul{
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
                span:nth-of-type(1){
                  display: inline-block;
                  width: 3.733vw;
                  height: 2.548vh;
                  background: url("../../static/images/location_icon.png") no-repeat center center;
                  background-size: cover;
                  vertical-align: bottom;
                }
              }
              p:nth-of-type(3) {
                font-size: 1.799rem;
                color: #939393;
                padding: 2.6236vh 0;
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
