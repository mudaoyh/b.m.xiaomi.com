/*
* indexView.js 首页控制器
* */
define([
    'jquery',
    'underscore',
    'backbone',
    'libs/mipu',
    'libs/api',
    'text!templates/home/indexTemplate.html'
], function($, _, Backbone, Mipu, Api, indexTemplate){

    var IndexView = Backbone.View.extend({
        el: $('#viewbody'),
        initialize: function(){
            console.log('indexView载入render首页模板');
        },
        render: function(){
            this.process(function(self){
                var data, compileTemplate;
                data = {
                    'items' : self.options.res
                };
                compileTemplate = _.template(indexTemplate, data);
                self.$el.html(compileTemplate);
            });
        },
        process: function(callback){
            var options = {
                that: this
            };
            Api.home.index(options, function(res, self){
                self.options.res = res.data.items;
                callback(self);
            });
        }
    });

    return new IndexView;
});