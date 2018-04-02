<template>
    <div class="Pie">
      <section id="main"></section>
    </div>
</template>

<script>
    export default {
      name: "Pie",
      data() {
          return {

          }
      },
      mounted() {
        this.$nextTick( () => {
          this.draw();
        })
      },
      methods: {
        draw() {
          this.Highcharts.chart('main', {
            title: {
              text: '2017 ~ 2018 年未来鲜森业务发展情况'
            },
            subtitle: {
              text: '统计数据：www.weilaixiansen.com'
            },
            yAxis: {
              title: {
                text: '业务数量'
              }
            },
            legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle'
            },
            credits: {
              enabled: false  //去掉hightchats水印
            },
            plotOptions: {
              series: {
                pointStart: Date.UTC(2017, 7, 1),
                pointInterval: 24 * 3600 * 1000 * 30,
                label: {
                  connectorAllowed: false
                },
              }
            },
            xAxis: {
              type: 'datetime',
              dateTimeLabelFormats: {
                day: '%Y-%m'
              }
            },
            series: [{
              name: '产品数量',
              data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
            }, {
              name: '销售数量',
              data: [44916, 44064, 49742, 69851, 92490, 110282, 128121, 140434]
            }, {
              name: '纯利润',
              data: [31744, 37722, 43005, 59771, 80185, 104377, 112147, 139387]
            }, {
              name: '业务扩展',
              data: [null, null, 27988, 42169, 55112, 62452, 74400, 74227]
            }, {
              name: '其他',
              data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
            }],
            responsive: {
              rules: [{
                condition: {
                  maxWidth: 500
                },
                chartOptions: {
                  legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                  }
                }
              }]
            }
          });
        }
      }
    }
</script>

<style lang="less">
  .Pie{
    height: 80vh;
    overflow: auto;
    #main{
      width: 99%;
      height: 80vh;
      background: #f3f3f3;
    }
  }
</style>
