/**
 * categoryView.js 产品列表页
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'libs/mipu',
    'libs/util',
    'text!templates/product/categoryTemplate.html'
], function($, _, Backbone, Mipu, Util,  CategoryTemplate){

    var CategoryView = Backbone.View.extend({
        el: $('#viewbody'),
        initialize: function(){
            console.log('CategoryTemplate载入render列表模板');
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
                Mipu.request({
                    url: '/product/category',
                    that: this
                }, function(res, self){
                    var data = JSON.stringify(res.data);
                    Util.SessionCache.set( self.options.cacheName, data );
                    self.options.res = data;
                    callback(self);
                });
            }
        }
    });

    var options = {
        cacheName: 'local_category'
    };
    return new CategoryView(options);
});
