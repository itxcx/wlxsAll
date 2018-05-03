<template>
    <div class="Repertory">
      <header>
        <Select v-model="prov">
          <Option v-for="option in arrAll" :value="option.name">
            {{ option.name }}
          </Option>
        </Select>
        <Select v-model="city">
          <Option v-for="option in cityArr" :value="option.name">
            {{ option.name }}
          </Option>
        </Select>
        <Select v-model="district" v-if="district">
          <Option v-for="option in districtArr" :value="option.name">
            {{ option.name }}
          </Option>
        </Select>
      </header>
      <section class="updateTime">
        <p>
          <span>上次库存更新时间:</span>
          <span>2018-5-1</span>
        </p>
        <div>
          <span>地图模式 ></span>
        </div>
      </section>
    </div>
</template>

<script>
    export default {
      name: "repertory",
      data() {
        return {
          arrAll: [
              {name: "城市", sub: [{name: "请选择"}], type: 1},
              {
                name: "西安",
                sub: [
                  {name: "请选择售货柜", sub: [{name: "请选择商品"}]},
                  {
                    name: "全部售货柜",
                    sub: [
                      {name: "请选择商品"},
                      {name: "乐虎1"},
                      {name: "乐虎2"},
                      {name: "乐虎3"},
                      {name: "其他"}
                    ],
                    type: 0
                  },
                  {
                    name: "瞪羚谷1",
                    sub: [
                      {name: "请选择商品"},
                      {name: "乐虎1"},
                      {name: "乐虎2"},
                      {name: "乐虎3"},
                      {name: "其他"}
                    ],
                    type: 0
                  },
                  {
                    name: "瞪羚谷2",
                    sub: [
                      {name: "请选择商品"},
                      {name: "乐虎1"},
                      {name: "乐虎2"},
                      {name: "乐虎3"},
                      {name: "其他"}
                    ],
                    type: 0
                  },
                  {
                    name: "招商银行1",
                    sub: [
                      {name: "请选择商品"},
                      {name: "乐虎1"},
                      {name: "乐虎2"},
                      {name: "乐虎3"},
                      {name: "其他"}
                    ],
                    type: 0
                  },
                  {
                    name: "招商银行2",
                    sub: [
                      {name: "请选择商品"},
                      {name: "乐虎1"},
                      {name: "乐虎2"},
                      {name: "乐虎3"},
                      {name: "其他"}
                    ],
                    type: 0
                  },
                  {
                    name: "创业大厦1",
                    sub: [
                      {name: "请选择商品"},
                      {name: "乐虎1"},
                      {name: "乐虎2"},
                      {name: "乐虎3"},
                      {name: "其他"}
                    ],
                    type: 0
                  },
                  {
                    name: "创业大厦2",
                    sub: [
                      {name: "请选择商品"},
                      {name: "乐虎1"},
                      {name: "乐虎2"},
                      {name: "乐虎3"},
                      {name: "其他"}
                    ],
                    type: 0
                  },
                  {
                    name: "都市之门1",
                    sub: [
                      {name: "请选择商品"},
                      {name: "乐虎1"},
                      {name: "乐虎2"},
                      {name: "乐虎3"},
                      {name: "其他"}
                    ],
                    type: 0
                  },
                  {
                    name: "都市之门2",
                    sub: [
                      {name: "请选择商品"},
                      {name: "乐虎1"},
                      {name: "乐虎2"},
                      {name: "乐虎3"},
                      {name: "其他"}
                    ],
                    type: 0
                  }
                  ],
                type: 1
              }
            ],
          prov: '西安',
          city: '请选择售货柜',
          district: '请选择商品',
          cityArr: [],
          districtArr: []
        }
      },
      methods: {
        updateCity: function () {
          for (var i in this.arrAll) {
            var obj = this.arrAll[i];
            if (obj.name === this.prov) {
              this.cityArr = obj.sub;
              break;
            }
          }
          this.city = this.cityArr[0].name;
        },
        updateDistrict: function () {
          for (var i in this.cityArr) {
            var obj = this.cityArr[i];
            if (obj.name === this.city) {
              this.districtArr = obj.sub;
              break;
            }
          }
          if(this.districtArr && this.districtArr.length > 0 && this.districtArr[0].name) {
            this.district = this.districtArr[0].name;
          } else {
            this.district = '';
          }
        }
      },
      beforeMount: function () {
        this.updateCity();
        this.updateDistrict();
      },
      watch: {
        prov: function () {
          this.updateCity();
          this.updateDistrict();
        },
        city: function () {
          this.updateDistrict();
        }
      }
    }
</script>

<style lang="less">
  .Repertory{
    background: #fff;
    header{
      background: #5fcf6c;
      height: 7.496vh;
    }
    .updateTime{
      border-bottom: 1px solid #e5e5e5;
      padding: 0.7448vh 5.333vw;
      overflow: hidden;
      p{
        width: 61.334vw;
        font-size: 1.949vh;
        color: #9f9f9f;
        float: left;
        height: 4.1229vh;
        line-height: 4.1229vh;
      }
      div{
        width: 28vw;
        float: right;
        text-align: center;
        span{
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
  }
  .ivu-select:nth-of-type(1){
    border: none;
    width: 20vw;
  }
  .ivu-select:nth-of-type(2){
    border: none;
    width: 40vw;
  }
  .ivu-select:nth-of-type(3){
    border: none;
    width: 35vw;
  }
  .ivu-select-single .ivu-select-selection{
    background: #5fcf6c;
    border: none;
    outline: medium;
    color: #ffffff;
    font-size: 2.248rem;
    text-align: right;
    height: 7.496vh;
    span{
      display: inline-block;
      font-size: 2.248rem!important;
      height: 7.496vh!important;
      line-height: 7.496vh!important;
    }
    .ivu-icon{
      color: #ffffff;
    }
  }


</style>
