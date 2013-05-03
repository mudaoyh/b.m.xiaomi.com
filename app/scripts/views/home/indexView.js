/*
* indexView.js 首页控制器
* */
define([
    'jquery',
    'underscore',
    'backbone',
    'libs/mipu',
    'text!templates/home/indexTemplate.html'
], function($, _, Backbone, Mipu, indexTemplate){

    var IndexView = Backbone.View.extend({
        el: $('#viewbody'),
        initialize: function(){
            console.log('indexView载入render首页模板');
        },
        render: function(){
            var options = {
                url: 'home/index',
                version: 'v2',
                that: this
            };
            Mipu.request(options, function(res, self){
                var data, compileTemplate;
                data = {
                    'items' : res.data.items
                };
                compileTemplate = _.template(indexTemplate, data);
                self.$el.html(compileTemplate);
            });
        }
    });

    return new IndexView;
});