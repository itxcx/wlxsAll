/*********
 * jquery plug_in draw coding
 * author: jilon
 * ********************/
;(function ($, window, document, undefined) {
    const DRAW = function(ele, opts) {
        this.element = ele;
        this.default = {
            'height': '1.2',//进度条的高度
            'procedure': 0,//默认显示的进度数据
            'borderRadius': '2px',//每个单元的圆角
            'marginLeft': '1px',//每个单元的相互距离，如果为0则为连续的
            'gradientColor': ['#95c747', '#a7ce43', '#b6d33f', '#c2d83c', '#c7da3b']
        };
        this.options = $.extend({}, this.default, opts);
    };
    DRAW.prototype = {
        makeDraw: function() {
            let boxHeight = this.options.height,
                borderRadius = this.options.borderRadius,
                procedure = this.options.procedure,
                gradientColor = this.options.gradientColor,
                marginLeft = this.options.marginLeft;
            //创建进度条盒子
            $('<ul class="box"></ul>').css({
                'listStyle': 'none',
                'float': 'left'
            }).appendTo($(this.element));
            $('<p></p>').css({
                'marginLeft': '10px',
                'float': 'left'
            }).html(procedure + '%').appendTo($(this.element));
            for(let i = 0; i < 100; i++) {
                $('<li></li>').css({
                    'width': 0.35 + 'vw',
                    'height': boxHeight - 0.1 + 'rem',
                    'float': 'left',
                    'background': '#555555',
                    'marginLeft': marginLeft,
                    'borderRadius': borderRadius
                }).appendTo($(this.element).find('.box'));
            }
            function makeIndexPlus(elem,procedure) {
                let index = 0;
                let timer = setInterval(function () {
                    makeChildBackground(elem, index);
                    index++;
                    if(index >= procedure) {
                        clearInterval(timer);
                    }
                }, 10);
            }
            makeIndexPlus(this.element, procedure);
            //设置显示数据的颜色
            function makeChildBackground(elem, index) {
                if(index <= 20) {
                    $(elem).find('li').eq(index).css({
                        'background': gradientColor[0]
                    })
                }else if(index > 20 && index <= 40) {
                    $(elem).find('li').eq(index).css({
                        'background': gradientColor[1]
                    })
                }else if(index > 40 && index <= 60) {
                    $(elem).find('li').eq(index).css({
                        'background': gradientColor[2]
                    })
                }else if(index > 60 && index <= 80) {
                    $(elem).find('li').eq(index).css({
                        'background': gradientColor[3]
                    })
                }else{
                    $(elem).find('li').eq(index).css({
                        'background': gradientColor[4]
                    })
                }
            }
        },
    };
    $.fn.makeDraw = function(options) {
        const makeDraw = new DRAW(this, options);
        return makeDraw.makeDraw();
    }
})(jQuery, window, document);
