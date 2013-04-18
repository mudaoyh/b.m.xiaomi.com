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
            var data = {
                title: '预约模板'
            };
            var compileTemplate = _.template(YuyueTemplate, data);
            this.$el.html(compileTemplate);
            this.$el.find('#btn').on('click', function(){
                alert('click event');
            });
        }
    });

    return YuyueView;
});