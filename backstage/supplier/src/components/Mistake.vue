<template>
    <div class="Mistake">
      <header>
        <section class="login_top">
          <span @click="goBack">
            <Icon type="chevron-left"></Icon>
          </span>
          <p>错拿记录</p>
        </section>
      </header>
      <section class="mistakeList">
        <!--<loadmore :bottomMethod="getMore" class="">-->
          <ul>
            <li v-for="(item, index) in mistakeArray">
              <section class="misAddress" @click="goMistakeInfo(index)">
                <aside></aside>
                <aside class="misInfo">
                  <p>{{item.device_address}}</p>
                  <p>{{item.created_time}}</p>
                  <section>
                    <p>{{item.goods_name}}</p>
                    <p>x{{item.goods_count}}</p>
                  </section>
                </aside>
              </section>
            </li>
          </ul>
          <p class="getMore" @click="getMore">{{ctrlTipTitle}}</p>
        <!--</loadmore>-->
      </section>
      <!-- 加载中提示框 -->
      <section class="loading" v-show="loadingModal">
        <Spin size="large"></Spin>
        <p>数据获取中...</p>
      </section>
      <!-- 查看详情 -->
      <section class="MistakeInfo" v-show="MistakeInfo">
        <header>
          <section class="login_top">
          <span @click="goMistake">
            <Icon type="chevron-left"></Icon>
          </span>
            <p>订单详情</p>
          </section>
        </header>
        <section class="misInfoContent">
          <section class="orderId">
            <span>订单编号:</span>
            <span>{{mistakeInfo.order_id}}</span>
            <span>未付款</span>
          </section>
          <section class="detailInfo">
            <ul class="header">
              <li>商品名称</li>
              <li>标签编号</li>
              <li>金额</li>
              <li>状态</li>
            </ul>
            <ul class="detailContent">
              <li v-for="(item, index) in mistakeInfo.goods">
                <section>{{item.goods_name}}</section>
                <section>
                  <div v-for="item1 in item.status">
                    <span v-for="itemss in item1.tags">{{itemss}}</span>
                  </div>
                </section>
                <section>{{item.price}}</section>
                <section>
                  <div v-for="item2 in item.status">
                    <span>{{item2.message}}</span>
                  </div>
                </section>
              </li>
            </ul>
          </section>
          <section class="payType">
            <span>支付方式:</span>
            <span>待统一支付</span>
          </section>
          <section class="otherInfo">
            <section>
              <span>下单地点:</span>
              <span>{{mistakeInfo.address}}</span>
            </section>
            <section>
              <span>下单时间:</span>
              <span>{{time}}</span>
            </section>
            <section>
              <span>商品金额:</span>
              <span>￥{{mistakeInfo.amount}}</span>
            </section>
          </section>
          <p class="phone">*如订单明细有异常,请致电客服热线<a href="tel:4007707768">400-770-7768</a></p>
        </section>
      </section>
    </div>
</template>

<script>
    export default {
        name: "Mistake",
        data() {
            return {
              mistakeArray: [],
              ctrlTipTitle: '',
              isRequest: true,
              page: 1,
              loadingModal: false,
              mistakeInfo: {},
              time: '',
              MistakeInfo: false,
            }
        },
        mounted() {
          this.$nextTick(() => {
            this.getMistakeData(0);
          })
        },
        methods: {
          //返回按钮
          goBack() {
            this.$router.push({
              path: '/personal'
            })
          },
          //控制详情显示
          goMistake() {
            this.MistakeInfo = false;
          },
          //获取数据方法
          getMistakeData(page) {
            this.loadingModal = true;
            this.$ajax({
              url: `http://merchant.test.weilaixiansen.com/login/chagrelist?page=${page}`,
              method: 'GET'
            }).then((res) => {
                if(res.data.code == 0) {
                  this.loadingModal = false;
                  this.ctrlTipTitle = '点击加载更多...';
                  if(res.data.data == 0 || res.data.data < 5) {
                    this.ctrlTipTitle = '暂时没有更多数据';
                    this.isRequest = false;
                  }
                  this.mistakeArray = res.data.data;
                }else if(res.data.code == 3) {
                  this.$router.push({
                    path: '/'
                  })
                }
            }).catch((error) => {
              console.log(error);
            })
          },
          //点击详情
          goMistakeInfo(index) {
            let order_id = this.mistakeArray[index].order_id;
            let created_time = this.mistakeArray[index].created_time;

            this.MistakeInfo = true;
            this.time = created_time;
            this.mistakeInfoDetail(order_id);
          },
          //获取详情数据
          mistakeInfoDetail(order_id) {
            this.mistakeInfo = {};
            this.$ajax({
              url: `http://merchant.test.weilaixiansen.com/login/sellorderdetail?order_id=${order_id}`,
              method: 'GET'
            }).then((res) => {
              if(res.data.code == 0) {
                this.mistakeInfo = res.data.data;
              }else if(res.data.code == 3) {
                this.$router.push({
                  path: '/'
                })
              }
            }).catch((error) => {
              console.log(error);
            })
          },
          //加载更多
          getMore() {
            if(this.isRequest) {
              this.isRequest = false;
              this.$ajax({
                url: `http://merchant.test.weilaixiansen.com/login/chagrelist?page=${this.page}`,
                method: 'GET'
              }).then((res) => {
                if(res.data.code == 0) {
                  this.page++;
                  if(res.data.data.length == 0 || res.data.data.length < 5) {
                    this.ctrlTipTitle = '暂时没有更多数据';
                  }else if(res.data.data.length == 5) {
                    this.isRequest = true;
                    this.mistakeArray = this.mistakeArray.concat(res.data.data);
                  }
                }else if(res.data.code == 3) {
                  this.$router.push({
                    path: '/'
                  })
                }
              }).catch((error) => {
                console.log(error);
              })
            }
          }
        }
    }
</script>

<style lang="less">
  .Mistake{
    padding-top: 6vh;
    .loading{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 20vh;
      text-align: center;
      height: 10vh;
      color: #65d172;
      border-radius: 10px;
      font-size: 2.388rem;
      z-index: 999;
      .ivu-spin{
        width: 10vw;
        height: 10vw;
        margin: 0 auto;
      }
      .ivu-spin-dot{
        background: #65d172;
      }
    }
    header{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 98;
      .login_top{
        background: #65d172;
        width: 100vw;
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
    }
    .mistakeList{
      height: 94vh;
      width: 100vh;
      overflow-y: auto;
      -webkit-overflow-scrolling : touch;
      ul{
        background: #f1f1f1;
        /*padding-top: 7vh;*/
        li{
          padding: 2.6236vh 4vw;
          background: #fff;
          margin-bottom: 1.4992vh;
          .misAddress{
            display: flex;
            aside:nth-of-type(1) {
              width: 13.333vw;
              height: 13.333vw;
              margin-right: 4vw;
              background: url(../../static/images/nickname.png) no-repeat center center;
              background-size: cover;
              border: 1px solid #e5e5e5;
              border-radius: 50%;
            }
            .misInfo{
              width: 74vw;
              >p:nth-of-type(1) {
                font-size: 2.3988rem;
                color: #373737;
                margin: 5px 0;
              }
              >p:nth-of-type(2) {
                font-size: 1.4992rem;
                color: #999898;
                padding-bottom: 5px;
                border-bottom: 1px solid #e5e5e5;
              }
              section{
                padding: 2.3988vh 0;
                p:nth-of-type(1){
                  width: 90%;
                  float: left;
                  font-size: 2.3988rem;
                  color: #373737;
                }
                p:nth-of-type(2){
                  width: 10%;
                  float: left;
                  font-size: 2.3988rem;
                  color: #999898;
                  text-align: center;
                }
              }
            }
          }
        }
      }
      .getMore{
        text-align: center;
        padding: 1vh 0;
        font-weight: bold;
        font-size: 1.924rem;
        width: 100vw;
      }
    }
    .MistakeInfo{
      background: #f2f2f2;
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      /*.loading{*/
        /*position: fixed;*/
        /*top: 0;*/
        /*left: 0;*/
        /*right: 0;*/
        /*bottom: 0;*/
        /*margin: auto;*/
        /*width: 20vh;*/
        /*text-align: center;*/
        /*height: 10vh;*/
        /*color: #65d172;*/
        /*border-radius: 10px;*/
        /*font-size: 2.388rem;*/
        /*.ivu-spin{*/
          /*width: 10vw;*/
          /*height: 10vw;*/
          /*margin: 0 auto;*/
        /*}*/
        /*.ivu-spin-dot{*/
          /*background: #65d172;*/
        /*}*/
      /*}*/
      header{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 98;
        .login_top{
          background: #65d172;
          width: 100vw;
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
      }
      .misInfoContent{
        padding-top: 6vh;
        background: #f1f1f1;
        height: 100vh;
        .orderId{
          background: #fff;
          padding: 3.337vh;
          font-size: 2.398rem;
          span:nth-of-type(1) {
            color: #999898;
            display: inline-block;
            width: 23%;
          }
          span:nth-of-type(2) {
            color: #373737;
            font-size: 2.098rem;
            display: inline-block;
            width: 50%;
          }
          span:nth-of-type(3) {
            color: #373737;
            display: inline-block;
            width: 22%;
            text-align: right;
          }
        }
        .detailInfo{
          background: #fff;
          margin-top: 1.499vh;
          .header{
            overflow: hidden;
            padding: 0 3.337vh;
            li{
              float: left;
              padding: 1.499vh 0;
              font-size: 2.398rem;
              text-align: center;
              &:nth-of-type(1) {
                width: 27%;
                text-align: left;
              }
              &:nth-of-type(2) {
                width: 27%;
              }
              &:nth-of-type(3) {
                width: 20%;
              }
              &:nth-of-type(4) {
                width: 26%;
              }
            }
          }
        }
        .detailContent{
          li{
            overflow: hidden;
            padding: 1.874vh 0;
            font-size: 2.098rem;
            border-top: 1px solid #e5e5e5;
            vertical-align: bottom;
            text-align: center;
            section{
              float: left;
              &:nth-of-type(1) {
                width: 28%;
                text-align: center;
              }
              &:nth-of-type(2) {
                width: 25%;
                span{
                  display: inline-block;
                }
              }
              &:nth-of-type(3) {
                width: 18%;
              }
              &:nth-of-type(4) {
                width: 27%;
              }
            }
          }
        }
        .payType{
          background: #fff;
          padding: 3.337vh;
          margin-top: 1.499vh;
          font-size: 2.398rem;
          span:nth-of-type(1) {
            color: #999898;
            display: inline-block;
            width: 26%;
          }
          span:nth-of-type(2) {
            color: #373737;
          }
        }
        .otherInfo{
          margin-top: 1.499vh;
          section{
            background: #fff;
            padding: 3.337vh;
            font-size: 2.398rem;
            span:nth-of-type(1) {
              color: #999898;
              display: inline-block;
              width: 26%;
            }
            span:nth-of-type(2) {
              display: inline-block;
              color: #373737;
              width: 70%;
            }
          }
        }
        .phone{
          font-size: 2.098rem;
          color: #999898;
          margin: 2.098vh 0;
          text-align: center;
          a{
            color: #999898;
          }
        }
      }
    }
  }
</style>
