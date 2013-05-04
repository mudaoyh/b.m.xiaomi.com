/**
 * api.js 接口
 */

define([
    'jquery',
    'libs/mipu'
], function($, Mipu){

    var Api = {
        'product': {
            'category': function(options, callback){
                var setting = $.extend(true, {
                    'url': 'product/category'
                }, options);
                Mipu.request(setting, function(res, self){
                    callback(res, self);
                });
            },
            'list': function(options, callback){
                var setting = $.extend(true, {
                    'url': 'product/list'
                }, options);
                Mipu.request(setting, function(res, self){
                    callback(res, self);
                });
            },
            'view': function(options, callback){
                var setting = $.extend(true, {
                    'url': 'product/view'
                }, options);
                Mipu.request(setting, function(res, self){
                    var product, selectConsumptionArray, i, k, stylelist;

                    product = res.data.result;
                    selectConsumptionArray = [];

                    for(i = 1,k=parseInt(product.buy_limit); i<=k; i+=1){
                        selectConsumptionArray.push(i);
                    }
                    // 购买限制 buy_limit
                    product.selectConsumptionArray = selectConsumptionArray;

                    product.stylelength = 0;
                    for(stylelist in product.style){
                        product.stylelength += 1;
                    }
                    callback(product, self);
                });
            }
        },
        'shopping': {
            'addCart': function(options, callback){
                var setting = $.extend(true, {
                    'url': 'shopping/addCart',
                    'loading': false
                }, options);
                Mipu.request(setting, function(res, self){
                    callback(res, self);
                });
            },
            'styleList': function(options, callback){
                var setting = $.extend(true, {
                    'url': 'shopping/stylelist'
                }, options);
                Mipu.request(setting, function(res, self){
                    callback(res, self);
                });
            }
        },
        'home': {
            'index': function(options, callback){
                var setting = $.extend(true, {
                    'url': 'home/index',
                    'version': 'v2'
                }, options);
                Mipu.request(setting, function(res, self){
                    callback(res, self);
                });
            }
        },
        'user': {
            'show': function(options, callback){
                var setting = $.extend(true, {
                    'url': 'user/show'
                }, options);
                Mipu.request(setting, function(res, self){
                    callback(res, self);
                });
            }
        },
        'activity': {
            'control': function(actions, options, callback){
                var setting = $.extend(true, {
                    'url': 'activity/control'
                }, options);
                if(!actions){
                    Mipu.request(setting, function(res, self){
                        callback(true, res.data, self);
                    });
                }else{
                    callback(false);
                }
            }
        }
    };

    return Api;
});
