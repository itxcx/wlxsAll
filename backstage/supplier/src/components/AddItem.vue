<template>
    <div class="Additem">
      <header>
        <div class="pageTitle">
          <span @click="backAddition"><</span>
          <span>录入标签</span>
        </div>
      </header>
      <section class="itemInfoContent">
        <div class="itemGoodsName">
          <input type="text" placeholder="输入商品名称" name="pro_name" v-model="proName"/>
        </div>
        <section class="itemList">
          <p>商品标签列表</p>
          <Tag color="green" v-for="item in allProNumberArray" :key="item" :name="item" closable @on-close="tagDelete">{{item}}</Tag>
        </section>
        <div class="itemGoodsNumber">
          <input type="text" placeholder="输入商品编号" name="pro_number" v-model="proNumber"/>
        </div>
      </section>
      <section class="addBtn" @click="addItemNumber">
        <p>添加商品</p>
      </section>
      <section class="confirmBtn" @click="confirmList">
        <p>确定</p>
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
            }
        },
        mounted() {
          var that = this;
          this.$nextTick(() => {
            that.proName = that.$route.query.proName || '';
            that.allProNumberArray = that.$route.query.numberList || [];
          })
        },
        methods: {
          //返回方法
          backAddition() {
            this.$router.push({
              path: '/addition'
            })
          },
          //添加标签
          addItemNumber() {
            if(this.proNumber && this.allProNumberArray.indexOf(this.proNumber) === -1) {
              this.allProNumberArray.push(this.proNumber);
              this.proNumber = '';
            }
          },
          //删除标签
          tagDelete(event, name) {
            var index = this.allProNumberArray.indexOf(name);
            this.allProNumberArray.splice(index, 1);
          },
          //确定提交按钮方法
          confirmList() {
            this.proName = this.proName.trim();
            if(this.proName && this.allProNumberArray.length > 0) {
              var itemData = {};
              itemData.itemName = this.proName;
              itemData.numberList = this.allProNumberArray;
              itemData.count = this.allProNumberArray.length;
              var isAdd = false;
              var addIndex = null;
              for(var i = 0; i < this.$store.state.exhibData.itemList.length; i++) {
                if(itemData.itemName === this.$store.state.exhibData.itemList[i].itemName) {
                  isAdd = true;
                  addIndex = i;
                }
              }
              if(!isAdd) {
                this.$store.state.exhibData.itemList.push(itemData);
              }else{
                this.$store.state.exhibData.itemList[addIndex].numberList = itemData.numberList;
              }
            }
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
      .itemGoodsName{
        border-bottom: 1px solid #e5e5e5;
        padding: 2.998vh 0;
        input{
          width: 100%;
          border: none;
          outline: medium;
          font-size: 2.698rem;
          color: #373737;
        }
      }
      .itemGoodsNumber{
        border-bottom: 1px solid #e5e5e5;
        padding: 2.998vh 0;
        input{
          width: 100%;
          border: none;
          outline: medium;
          font-size: 2.2488rem;
          color: #999898;
        }
      }
      .itemList{
        border: 1px solid #e5e5e5;
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
    .confirmBtn{
      width: 100vw;
      position: fixed;
      bottom: 0;
      left: 0;
      p{
        width: 79.2vw;
        height: 10.419vh;
        margin: 0 auto;
        color: #fff;
        font-size: 2.2488rem;
        text-align: center;
        background: url("../../static/images/button_bg.png") no-repeat center center;
        background-size: cover;
        line-height: 7.419vh;
      }
    }
  }
</style>
