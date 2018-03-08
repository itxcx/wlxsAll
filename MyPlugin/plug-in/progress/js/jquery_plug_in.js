/*********
 * jquery plug_in test coding
 * author: jilon
 * ********************/
;(function ($, window, document, undefined) {
    const setStyle = function(ele, opts) {
        this.element = ele;
        this.default = {
            'color': 'pink',
            'fontSize': '16px',
            'textDecoration': 'none'
        };
        this.options = $.extend({}, this.default, opts);
    };

    setStyle.prototype = {
        setCss: function() {
            return this.element.css({
                'color': this.options.color,
                'fontSize': this.options.fontSize,
                'textDecoration': this.options.textDecoration
            })
        }
    };

    $.fn.myCss = function(options) {
        const mySetCss = new setStyle(this, options);
        return mySetCss.setCss();
    }
})(jQuery, window, document);
