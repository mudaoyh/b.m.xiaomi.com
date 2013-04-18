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
            this.getData(function(res, self){
                var data, compileTemplate;
                data = {
                    items : res.data.items
                };
                compileTemplate = _.template(indexTemplate, data);
                self.$el.html(compileTemplate);
                debugger;

            });
        },
        getData: function(callback){
            var self = this;
            $.ajax({
                url: 'http://app.shopapi.xiaomi.com/v2/home/index?client_id='+Mipu.client_id,
                dataType: 'jsonp',
                success: function(res){
                    callback(res, self);
                }
            });
        }
    });

    return new IndexView;
});