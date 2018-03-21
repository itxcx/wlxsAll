<template>
    <div class="charts">
      <section id="main"></section>
    </div>
</template>

<script>
    export default {
      name: "demo",
      data() {
          return {
          }
      },
      mounted () {
        this.$nextTick( () => {
          this.drawLine();
          // $.ajax({
          //   url: '',
          //   method:  'POST',
          //   data: {data: this.$store.state.reqData}
          // }).then( (res) => {
          //   if(res.code === 0) {
          //     this.drawLine();
          //   }
          // }).catch( (error) => {
          //   console.log(error);
          // })
        })
      },
      methods: {
        drawLine(){
          let myChart = this.Echarts.init(document.getElementById('main'));
          // 绘制图表
          myChart.setOption({
            title: { text: '在Vue中使用echarts'},
            tooltip: {},
            xAxis: {
              data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
            }]
          });
        }
      }
    }
</script>

<style lang="less">
  .charts{
    #main{
      width: 500px;
      height: 300px;
      background: #f3f3f3;
      border: 1px solid deeppink;
    }
  }
</style>
