/**
 * styleListView 套件列表
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'libs/mipu',
    'libs/shopping',
    'text!templates/shopping/styleListTemplate.html'
], function($, _, Backbone, Mipu, Shopping, StyleListTemplate){
    var StyleList = Backbone.View.extend({
        el: $('#viewbody'),
        initialize: function(){
            console.log('Stylelist init');
        },
        render: function(product_id, consumption){
            this.options.product_id = product_id;
            this.options.consumption = consumption;

            this.process(function(self){
                var compileTemplate = $.tmpl(StyleListTemplate, self.options.res);
                self.$el.html(compileTemplate);
            });
        },
        process: function(callback){
            var options = {
                url: 'shopping/stylelist',
                param: {
                    'product_id': this.options.product_id
                },
                that: this
            };
            Mipu.request(options, function(res, self){
                self.options.res = res.data;
                self.options.res.product_id = self.options.product_id;
                callback(self);
            });
        }
    });
    return new StyleList;
});
