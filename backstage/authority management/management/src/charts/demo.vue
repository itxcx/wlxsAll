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
          //this.drawLine();
          this.draw();
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
        //echarts demo
        // drawLine(){
        //   let myChart = this.Echarts.init(document.getElementById('main'));
        //   // 绘制图表
        //   myChart.setOption({
        //     title : {
        //       text: '某地区销售情况',
        //       subtext: '纯属虚构'
        //     },
        //     tooltip : {
        //       trigger: 'axis'
        //     },
        //     legend: {
        //       data:['意向','预购','成交']
        //     },
        //     toolbox: {
        //       show : true,
        //       feature : {
        //         mark : {show: true},
        //         dataView : {show: true, readOnly: false},
        //         magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
        //         restore : {show: true},
        //         saveAsImage : {show: true}
        //       }
        //     },
        //     calculable : true,
        //     xAxis : [
        //       {
        //         type : 'category',
        //         boundaryGap : false,
        //         data : ['周一','周二','周三','周四','周五','周六','周日']
        //       }
        //     ],
        //     yAxis : [
        //       {
        //         type : 'value'
        //       }
        //     ],
        //     series : [
        //       {
        //         name:'成交',
        //         type:'line',
        //         smooth:true,
        //         itemStyle: {normal: {areaStyle: {type: 'default'}}},
        //         data:[10, 12, 21, 54, 260, 830, 710]
        //       },
        //       {
        //         name:'预购',
        //         type:'line',
        //         smooth:true,
        //         itemStyle: {normal: {areaStyle: {type: 'default'}}},
        //         data:[30, 182, 434, 791, 390, 30, 10]
        //       },
        //       {
        //         name:'意向',
        //         type:'line',
        //         smooth:true,
        //         itemStyle: {normal: {areaStyle: {type: 'default'}}},
        //         data:[1320, 1132, 601, 234, 120, 90, 20]
        //       }
        //     ]
        //   });
        // }


        //highcharts demo
        draw() {
          this.Highcharts.chart('main', {
            title: {
              text: '2010 ~ 2016 年太阳能行业就业人员发展情况'
            },
            subtitle: {
              text: '数据来源：thesolarfoundation.com'
            },
            yAxis: {
              title: {
                text: '就业人数'
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
                label: {
                  connectorAllowed: false
                },
                pointStart: 2010
              }
            },
            series: [{
              name: '安装，实施人员',
              data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
            }, {
              name: '工人',
              data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
            }, {
              name: '销售',
              data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
            }, {
              name: '项目开发',
              data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
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
  .charts{
    height: 80vh;
    overflow: auto;
    #main{
      width: 99%;
      height: 80vh;
      background: #f3f3f3;
    }
  }
</style>
