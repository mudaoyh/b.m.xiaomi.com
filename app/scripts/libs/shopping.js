/**
 * shopping.js 购物车通用方法
 */

define(['libs/mipu'], function(Mipu){
    var Shopping = {
        addCart: function(options, callback, that){
            var defaults, setting;
            defaults = {
                url: 'shopping/addCart',
                that: that,
                loading: false
            };
            setting = $.extend(true, defaults, options);
            Mipu.request(setting, function(res, self){
                callback(res, self);
            });
        }
    };
    return Shopping;
});
