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
            var options = {
                url: '/product/category',
                that: this
            };
            Mipu.request(options, function(res, self){
                var data, compileTemplate;
                data = {
                    'categroies': res.data.categroies
                };
                compileTemplate = $.tmpl(CategoryTemplate, data);
                self.$el.html(compileTemplate);
            });
        }
    });

    return new CategoryView;
});
