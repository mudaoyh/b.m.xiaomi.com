/**
 * shopping.js 购物车通用方法
 */

define(['libs/mipu'], function(Mipu){
    var Shopping = {
        addCart: function(product_id, consumption, callback, that){
            var options = {
                url: '/shopping/addCart',
                param: {
                    'product_id': product_id,
                    'consumption': consumption
                },
                that: that,
                loading: false
            };
            Mipu.request(options, function(res, self){
                callback(res, self);
            });
        }
    };
    return Shopping;
});
