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
        <loadmore :bottomMethod="getMore" class="">
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
          <p class="getMore">{{ctrlTipTitle}}</p>
        </loadmore>
      </section>
      <!-- 加载中提示框 -->
      <section class="loading" v-show="loadingModal">
        <Spin size="large"></Spin>
        <p>数据获取中...</p>
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
          //获取数据方法
          getMistakeData(page) {
            this.loadingModal = true;
            this.$ajax({
              url: `http://merchant.test.weilaixiansen.com/login/chagrelist?page=${page}`,
              method: 'GET'
            }).then((res) => {
                if(res.data.code == 0) {
                  this.loadingModal = false;
                  this.ctrlTipTitle = '上划加载更多...';
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
            this.$router.push({
              path: '/mistakeInfo',
              query: {
                order_id: order_id,
                time: created_time
              }
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
      height: 100vh;
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
  }
</style>
