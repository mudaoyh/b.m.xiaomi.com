/**
 * categoryView.js 产品列表页
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'libs/mipu',
    'libs/util',
    'libs/api',
    'text!templates/product/categoryTemplate.html'
], function($, _, Backbone, Mipu, Util, Api, CategoryTemplate){

    var CategoryView = Backbone.View.extend({
        el: $('#viewbody'),
        initialize: function(){
            console.log('CategoryTemplate载入render列表模板');
            this.options = {
                'cacheName': 'local_category'
            }
        },
        render: function(){
            this.process(function(self){
                var data, compileTemplate;
                data = self.options.res;
                compileTemplate = $.tmpl(CategoryTemplate, data);
                self.$el.html(compileTemplate);
            });
        },
        process: function(callback){
            if( Util.SessionCache.has(this.options.cacheName) ){
                var data = JSON.parse( Util.SessionCache.get( this.options.cacheName ) );
                this.options.res = data;
                callback(this);
            }else{
                var options = {
                    'that': this
                };
                Api.product.category(options, function(res, self){
                    var data = JSON.stringify(res.data);
                    Util.SessionCache.set( self.options.cacheName, data );
                    self.options.res = res.data;
                    callback(self);
                });
            }
        }
    });

    return new CategoryView();
});
