/*
* indexView.js 首页控制器
* */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/home/indexTemplate.html'
], function($, _, Backbone, indexTemplate){

    var IndexView = Backbone.View.extend({
        el: $('#app'),
        initialize: function(){
            console.log('indexView载入render首页模板');
        },
        render: function(){
            this.$el.html(indexTemplate);
        }
    });

    return new IndexView;
});