<template>
  <div class="Detail">
    <section class="detailImg">
      <div :style="{backgroundImage: 'url('+ detail.imgPath +')'}"></div>
    </section>
    <section class="detailName">
      <p>{{detail.reservaName}}</p>
      <p>
        <span>{{detail.reservaPrice | priceFormat}}</span>
        <span>{{detail.purchasePrice | priceFormat}}</span>
      </p>
    </section>
    <section class="detailInfo">
      <h3>商品详情</h3>
      <p>{{detail.info}}</p>
    </section>
    <section class="detailAdd">
      <button @click="addTrolley(i, j)">加入购物车</button>
    </section>
    <section class="tipModal" v-show="addComplete">
      <span class="glyphicon glyphicon-ok"></span>
      <p>{{addText}}</p>
    </section>
    <Footer-tab></Footer-tab>
  </div>
</template>

<script>
  import FooterTab from './FooterTab.vue';
  export default ({
    name: 'Detail',
    data() {
      return {
        addComplete: false,//是否加入购物车
        addText:'添加成功',//添加购物车提示信息
        detail : {},
        i: this.$route.query.row,
        j: this.$route.query.col,
        reservaList: this.$route.query.reserva
      }
    },
    mounted (){
      this.$nextTick(() => {
        let row = this.$route.query.row;
        let col = this.$route.query.col;
        this.detail = this.reservaList[row].itemList[col];
      })
    },
    components: {
      FooterTab
    },
    methods:{
      goReserva(){
        this.$router.push('/reservation');
      },
      addTrolley(i, j){
        //添加商品时先读取localstorage数据
        if(localStorage.getItem('trolleyList')){
          this.$store.state.trolleyList = JSON.parse(localStorage.getItem('trolleyList'))
        }
        console.log(i + '---' + j);
        //let reservaData = this.$store.state.reservaList;
        let device = this.reservaList[i].deviceId;//添加商品所属的设备id
        let addData = this.reservaList[i].itemList[j];//添加的商品信息
        if(this.$store.state.trolleyList.length === 0){
          //购物车为空
          let item = {};
          item.deviceId = device;
          item.checked = false;
          item.list = [];
          this.reservaList[i].itemList[j].checked = false;
          item.list.push(this.reservaList[i].itemList[j]);
          this.$store.state.trolleyList.push(item);
          console.log(this.$store.state.trolleyList);
        }else if(this.$store.state.trolleyList.length > 0){
          //购物车的数据不为空
          let addDev = false, num = -1, indexs = -2;
          for( let m = 0; m < this.$store.state.trolleyList.length; m++){
            if(device === this.$store.state.trolleyList[m].deviceId ){
              addDev = true;
              num = m;
              for( let n = 0; n < this.$store.state.trolleyList[m].list.length; n++){
                if(addData.reId === this.$store.state.trolleyList[m].list[n].reId){
                  indexs = n;
                }
              }
            }
          }
          if(addDev === false){//设备没有添加
            let item = {};
            item.deviceId = device;
            item.checked = false;
            item.list = [];
            this.reservaList[i].itemList[j].checked = false;
            item.list.push(this.reservaList[i].itemList[j]);
            this.$store.state.trolleyList.push(item);
          }else{
            if(indexs === -2){//商品没有添加
              this.$store.state.trolleyList[num].checked = false;
              this.reservaList[i].itemList[j].checked = false;
              this.$store.state.trolleyList[num].list.push(this.reservaList[i].itemList[j]);
            }else{//商品已经添加
              this.$store.state.trolleyList[num].list[indexs].reservaCount++;
              if(this.$store.state.trolleyList[num].list[indexs].reservaCount > this.$store.state.trolleyList[num].list[indexs].realStock){
                this.$store.state.trolleyList[num].list[indexs].reservaCount = this.$store.state.trolleyList[num].list[indexs].realStock;
              }
            }
          }
        }
        //提示框控制
        this.addComplete = true;
        setTimeout( () => {
          this.addComplete = false;
        }, 1000);
        console.log(this.$store.state.trolleyList);
        //添加商品动态设置localstorage数据
        localStorage.setItem('trolleyList', JSON.stringify(this.$store.state.trolleyList));
        //console.log(this.$store.state.trolleyList);
      }
    },
    filters:{
      //金额
      priceFormat: function (value) {
        value = Number(value);
        if(value.toString().split('.')[1] && value.toString().split('.')[1].length < 2){
          value = '￥' + value + '0';
        }else if(value.toString().split('.')[1] && value.toString().split('.')[1].length >= 2){
          value = '￥' + value.toString().split('.')[0] + '.' + value.toString().split('.')[1].substr(0, 2);
        }else{
          value = '￥' + value + '.00';
        }
        return value;
      }
    }
  })
</script>
<style lang="less">
  @headerHeight : 6vh;
  .Detail{
    background: #fff;
    padding: 0 0 11vh 0;
    .tipModal{
      background: rgba(0,0,0,0.8);
      border-radius: 20px;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      margin: auto;
      width: 45vw;
      height: 18vh;
      z-index: 99;
      color: #fff;
      text-align: center;
      font-size: 3.5vw;
      padding: 3vh 0;
      span{
        font-size: 7vh;
      }
    }
    .detailImg{
      div{
        width: 100%;
        height: 30vh;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
      }
    }
    .detailName{
      border-bottom: 1px solid #f2f2f2;
      p:nth-of-type(1){
        padding: 1vh 2vw;
        font-size: 4.5vw;
        font-weight: 600;
      }
      p:nth-of-type(2){
        padding: 1vh 2vw;
        span:nth-of-type(1){
          font-size: 5vw;
          color: #F13D3C;
        }
      }
    }
    .detailInfo{
      padding: 2vh 2vw;
      border-bottom: 1px solid #f2f2f2;
      h3{
        font-size: 4.5vw;
        font-weight: 600;
      }
      p{
        padding: 1vh 0;
        text-indent: 2em;
        font-size: 3.5vw;
      }
    }
    .detailAdd{
      padding: 2vh 2vw;
      button{
        width: 90vw;
        display: block;
        margin: 0 auto;
        border: none;
        border-radius: 5px;
        background: #F13D3C;
        height: 8vh;
        color: #fff;
        font-size: 4vw;
      }
    }
  }
</style>
