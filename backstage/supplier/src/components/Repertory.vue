<template>
    <div class="Repertory">
      <header>
        <select v-model="prov">
          <option v-for="option in arrAll" :value="option.name">
            {{ option.name }}
          </option>
        </select>
        <select v-model="city">
          <option v-for="option in cityArr" :value="option.name">
            {{ option.name }}
          </option>
        </select>
        <select v-model="district" v-if="district">
          <option v-for="option in districtArr" :value="option.name">
            {{ option.name }}
          </option>
        </select>
      </header>
    </div>
</template>

<script>
    export default {
      name: "repertory",
      data() {
        return {
          arrAll: [
              {name: "选择城市", sub: [{name: "请选择"}], type: 1},
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
      select{
        margin: 0;
        padding: 0;
        width: 31vw;
        height: 7.496vh;
        font-size: 2.398vh;
        background: #5fcf6c;
        border: none;
        outline: none;

      }
    }
  }
</style>
