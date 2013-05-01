/**
 * viewView.js 产品详情列表
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'libs/mipu',
    'libs/util',
    'text!templates/product/productViewTemplate.html'
], function($, _, Backbone, Mipu, Util, ProductViewTemplate){
    var ProductView = Backbone.View.extend({
        el: $('#viewbody'),
        initialize: function(){
            console.log('productView render');
        },
        render: function(product_id){
            this.options.product_id = product_id;
            this.process(function(self){
                var compileTemplate = $.tmpl(ProductViewTemplate, self.options.res);
                self.$el.html(compileTemplate);
            });
        },
        process: function(callback){
            var options = {
                url: '/product/view',
                param: {
                    'product_id': this.options.product_id
                },
                that: this
            };
            Mipu.request(options, function(res, self){
                self.options.res = res.data.result;
                callback(self);
            });
        }
    });
    return new ProductView;
});
