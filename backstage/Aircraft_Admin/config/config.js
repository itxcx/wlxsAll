/**
 * 公用配置方法
 *     INFO
 * ${getCommonStore}: 请求配置信息
 * ${drawNavbar}: 渲染左边导航栏方法
 * ${drawPie}: 饼图渲染方法
 * ${drawColumn}: 柱状图和折线图绘制方法
 *                柱图columnType === column, 折线图columnType === ''
 * *****/

/* 左边导航渲染*/
function drawNavbar(commonStore) {
    $.each(commonStore.leftNav, function(index, item) {
        let topTipContent = null;
        // 判断有没有二级菜单
        if(item.itemList.length !== 0) {
            topTipContent = `<a href="#" data-target=.${index} class="nav-header" data-toggle="collapse">
                     <span class="${item.iconType}"></span>
                     <span>${item.topTip}</span>
                     <i class="fa fa-collapse"></i>
                </a>`;
        }else{
            topTipContent = `<a href="#" data-target=.${index} class="nav-header" data-toggle="collapse">
                     <span class="${item.iconType}"></span>
                     <span>${item.topTip}</span>
                </a>`;
        }
        let topTip = $('<li></li>');
        topTip.append(topTipContent);

        $.each(item.itemList, function(i, value) {
            let itemContent = `<ul class="${index} nav nav-list collapse">
                    <li  class="active">
                        <a href=${value.path}><span class="fa fa-caret-right"></span><span>${value.title}</span></a>
                    </li></ul>`;
            topTip.append(itemContent);
        });
        $('#leftNav > ul').append(topTip);
        $('.0').addClass('in'); //第一项默认展开
    });
}

/* pie绘制方法 */
function drawPie(elementId, PieData, PieType) {
    //修改默认颜色
    const pieColors = (function () {
        let colors = [], base = Highcharts.getOptions().colors[0], i;
        for (i = 0; i < 10; i += 1) {
            colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
        }
        return colors;
    }());
    let type;
    type = PieType ? PieType : 'pie';
    Highcharts.chart(elementId, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: type
        },
        credits: {//版权信息
            enabled: false
        },
        title: {
            text: PieData.title
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                colors: pieColors,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: PieData.name,
            colorByPoint: true,
            data: PieData.item
        }]
    });
}

/* 柱状图绘制方法 */
function drawColumn(elementId,columnData,columnType) {
    let type;
    type = columnType ? columnType : '';
    Highcharts.chart(elementId, {
        chart: {
            type: type
        },
        title: {
            text: columnData.title
        },
        subtitle: {
            text: columnData.subtitle
        },
        xAxis: {
            categories: columnData.categories,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: columnData.yAsix
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} k</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        credits: { //版权信息
            enabled: false
        },
        series: columnData.mainData
    });
}