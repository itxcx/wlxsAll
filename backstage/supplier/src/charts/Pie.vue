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
        /***********************************需要封装********************************
         ***params***
         *    @{id}: 绘图的容器
         *    @{type}: [pie, line, colomun, ...]
         *    @{content}: 需要显示的内容，根据图形的样式显示内容
         *    @{options}: 样式图的数据
         *
        * *************************************************************************/
        draw(id, type, content, options) {
          this.Highcharts.chart('main', {
            chart: {
              type: 'pie'
            },
            title: {
              text: '不同柜子同一单品商品销售对比'
            },
            subtitle: {
              text: '不同点位同一商品在相同时间段内的销售情况统计图' ,
            },
            credits: {
                  enabled: false  //去掉hightchats水印
                },
            tooltip: {
              headerFormat: '',
              pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
              '{point.path}销售总额: <b>{point.y}</b><br/>' +
              '单品销售总额: <b>{point.z}</b><br/>'
            },
            series: [{
              minPointSize: 10,
              innerSize: '20%',
              zMin: 0,
              name: 'countries',
              data: [{
                path: "瞪羚谷",
                name: '乐虎',
                y: 505370,
                z: 92.9
              }, {
                path: "瞪羚谷",
                name: '小蛋糕',
                y: 551500,
                z: 118.7
              }, {
                path: "瞪羚谷",
                name: 'xxx',
                y: 312685,
                z: 124.6
              }, {
                path: "瞪羚谷",
                name: 'NFC果汁',
                y: 78867,
                z: 137.5
              }, {
                path: "瞪羚谷",
                name: '盒饭',
                y: 301340,
                z: 201.8
              }, {
                path: "瞪羚谷",
                name: '水果',
                y: 41277,
                z: 214.5
              }, {
                path: "瞪羚谷",
                name: '星巴克',
                y: 357022,
                z: 235.6
              }]
            }]
          })
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
