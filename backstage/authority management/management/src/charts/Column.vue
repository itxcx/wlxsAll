<template>
    <div class="Column">
      <section id="main">

      </section>
    </div>
</template>

<script>
    export default {
      name: "Column",
      data() {
        return {

        }
      },
      mounted() {
        this.$nextTick(() => {
          this.draw();
        })
      },
      methods:{
        draw() {
          this.Highcharts.chart('main',{
            chart: {
              type: 'column'
            },
            title: {
              text: '2018年销售统计排行'
            },
            subtitle: {
              text: '数据截止 2018-03月'
            },
            xAxis: {
              type: 'category',
              labels: {
                rotation: -45,
                style: {
                  fontSize: '13px',
                  fontFamily: 'Verdana, sans-serif'
                }
              }
            },
            yAxis: {
              min: 0,
              tickAmount: 5,
              title: {
                text: '数量 (百万)'
              }
            },
            legend: {
              enabled: false
            },
            credits: {
              enabled: false  //去掉hightchats水印
            },
            tooltip: {
              pointFormat: '销售总量: <b>{point.y:.1f} 百万</b>'
            },
            series: [{
              name: '总销售数量',
              data: [
                ['乐虎', 29.25],
                ['小蛋糕', 23.50],
                ['NFC果汁', 21.51],
                ['雪碧', 16.78],
                ['红丝绒蛋糕', 16.06],
                ['伊利畅轻', 15.20],
                ['褐色炭烧', 14.16],
                ['老酸奶', 13.51],
                ['鸭脖', 13.08],
                ['雪糕', 12.44],
                ['果粒多', 12.19],
                ['薯条', 12.03],
                ['谷粒多', 10.46],
                ['泡面', 10.07],
                ['红茶', 10.05],
                ['红塔山', 9.99],
                ['芙蓉王', 9.78],
                ['金丝猴', 9.73],
                ['方便火锅', 9.27]
              ],
              dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                  fontSize: '13px',
                  fontFamily: 'Verdana, sans-serif'
                }
              }
            }]
          })
        }
      }
    }
</script>

<style lang="less">
  .Column{
    height: 80vh;
    overflow: auto;
    #main{
      width: 99%;
      height: 80vh;
      background: #f3f3f3;
    }
  }
</style>
