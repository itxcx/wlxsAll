<template>
    <div class="addition">
      <header>
        <div class="pageTitle">
          <span><</span>
          <span>商品入库</span>
        </div>
        <div class="location">
          <span></span>
          <span v-html="location">{{location}}</span>
        </div>
      </header>
      <section class="tipInfo">
        <h3>处理中</h3>
        <p>库存数量
          <span v-html="restoreCount"></span>个,可上架商品
          <span v-html="addallow"></span>个
        </p>
      </section>
      <section class="itemList">
        <ul>
          <li></li>
        </ul>
      </section>
      <section class="addBtn" @click="goAddItem">
        <p>添加商品</p>
      </section>
    </div>
</template>

<script>
    export default {
        name: "addition",
        data() {
            return {
              location: '西安市高新区锦业路瞪羚谷E座1F',
              restoreCount: 100,
              addallow: 90
            }
        },
        mounted() {
            this.$nextTick(() => {
            })
        },
        methods: {
          //添加商品和标签
          goAddItem() {
            this.$router.push({
              path: '/addItem'
            })
          }
        }
    }
</script>

<style lang="less">
  .addition{
    width: 100vw;
    header{
      background: #65d172;
      color: #fff;
      padding-bottom: 2.248vh;
      .pageTitle{
        width: 100%;
        height: 4.497vh;
        position: relative;
        font-size: 2.698rem;
        span:nth-of-type(1) {
          position: absolute;
          left: 4.6667vw;;
          top: 0;
        }
        span:nth-of-type(2) {
          display: block;
          width: 100%;
          text-align: center;
          height: 4.497vh;
          line-height: 4.497vh;
        }
      }
      .location{
        margin-top: 3.3733vh;
        span:nth-of-type(1) {
          margin-left: 4.6667vw;
          display: inline-block;
          width: 4.6667vw;
          height: 3.598vh;
          background: url("../../static/images/green_location.png") no-repeat center center;
          background-size: cover;
          vertical-align: bottom;
        }
        span:nth-of-type(2) {
          font-size: 2.6986rem;
          margin-left: 2vw;
        }
      }
    }
    .tipInfo{
      padding: 3.3733vh 0 2.2488vh 0;
      text-align: center;
      border-bottom: 2px solid #e5e5e5;
      margin: 0 2.4vw;
      h3{
        font-size: 3.1484rem;
        font-weight: normal;
        color: #373737;
      }
      p{
        color: #999898;
        font-size: 2.2488rem;
        span:nth-of-type(2){
          font-size: 3.3733rem;
          color: #65d172;
        }
      }
    }
    .addBtn{
      width: 100%;
      p{
        width: 87.866vw;
        height: 6.0179vh;
        margin: 4.1229vh auto;
        font-size: 2.2488rem;
        text-align: center;
        color: #65d172;
        border: 1px dashed #65d172;
        border-radius: 20px;
        line-height: 6.0179vh;
      }
    }
  }
</style>
