<template>
    <div class="Additem">
      <header>
        <div class="pageTitle">
          <span @click="backAddition"><</span>
          <span>录入标签</span>
        </div>
      </header>
      <section class="itemInfoContent">
        <div>
          <input type="text" placeholder="输入商品名称" name="pro_name" v-model="proName"/>
        </div>
        <section class="itemList">
          <ul>
            <li></li>
          </ul>
        </section>
        <div>
          <input type="text" placeholder="输入商品编号" name="pro_number" v-model="proNumber"/>
        </div>
      </section>
      <section class="addBtn" @click="goAddItem">
        <p>添加商品</p>
      </section>
    </div>
</template>

<script>
    export default {
        name: "add-item",//录入标签
        data() {
            return {
              proName: '', //商品名称
              proNumber: '',//商品编码
              allProNumberArray: [],//商品标签数组
              addItemInfo: { //提交已经添加的商品数据
                addr: '',
                itemList: []
              }
            }
        },
        mounted() {
          this.$nextTick(() => {

          })
        },
        methods: {
          backAddition() {
            this.$router.push({
              path: '/addition'
            })
          }
        }
    }
</script>

<style lang="less">
  .Additem{
    width: 100vw;
    header{
      background: #65d172;
      padding: 1.4992vh 0;
      color: #fff;
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
    }
    .itemInfoContent{
      margin: 0 2.4vw;
      border: 1px solid pink;
    }
  }
</style>
