<template>
    <div class="RepertoryList">
      <section class="login_top">
        <span @click="goMain">
          <Icon type="chevron-left"></Icon>
        </span>
        <p>{{titleText}}库存</p>
      </section>
      <!-- 选择商品不分柜子 -->
      <section class="productItem">
        <!-- 显示模式 -->
        <section class="productContent">
          <!--<section class="updateTime">-->
          <!--<p>-->
          <!--<span>上次库存更新时间:</span>-->
          <!--<span>{{refreshTime}}</span>-->
          <!--</p>-->
          <!--<div v-show="!mapMode" @click="changeMode">-->
          <!--<span>地图模式 ></span>-->
          <!--</div>-->
          <!--<div v-show="mapMode" @click="changeMode">-->
          <!--<span>列表模式 ></span>-->
          <!--</div>-->
          <!--</section>-->
          <section class="itemListInfo" v-show="!mapMode">
            <ul>
              <li v-for="item in itemListArray" class="itemInfo">
                <dl>
                  <dt>{{item.area_name}}</dt>
                  <!--<dd>智能售货柜</dd>-->
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
    </div>
</template>

<script>
    export default {
        name: "RepertoryList",
        data() {
            return {
              mapMode: false,
              itemListArray: [],
              titleText: ''
            }
        },
        mounted() {
          this.$nextTick(() => {
            this.titleText = this.$route.query.goods_name;
            this.itemListArray = JSON.parse(localStorage.getItem('itemListArray'));
          })
        },
        methods: {
          //返回方法
          goMain() {
            this.$router.push({
              path: '/repertory'
            })
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
    }
</script>

<style lang="less">
  .RepertoryList{
    width: 100vw;
    height: 100vh;
    background: #f1f1f1;
    /* 去除百度地图水印 */
    .anchorBL {
      display: none;
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
    .productItem{
      margin-top: 6vh;
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
            width: 29.333%;
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
            width: 70%;
            float: left;
            p{
              float: left;
              font-size: 2.2488rem;
            }
            p:nth-of-type(1) {
              color: #373737;
              padding-left: 5vw;
              width: 50%;
            }
            p:nth-of-type(2) {
              color: #999898;
              width: 50%;
              text-align: right;
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
</style>
