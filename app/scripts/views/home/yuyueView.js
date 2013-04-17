/*
* yuyueView.js 预约模板控制器
* */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/home/yuyueTemplate.html'
], function($, _, Backbone, YuyueTemplate){

    var YuyueView = Backbone.View.extend({
        el: $('#app'),
        initialize: function(){
            console.log('yuyueView载入yuyue预约模板');
        },
        render: function(){
            this.$el.html(YuyueTemplate);
        }
    });

    return YuyueView;
});