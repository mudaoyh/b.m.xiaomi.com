/*
* yuyueView.js 预约模板控制器
* */
define([
    'jquery',
    'underscore',
    'backbone',
    'libs/mipu',
    'text!templates/home/yuyueTemplate.html'
], function($, _, Backbone, Mipu, YuyueTemplate){

    var YuyueView = Backbone.View.extend({
        el: $('#viewbody'),
        events: {
            'click #btn': 'login'
        },
        initialize: function(){
            console.log('yuyueView载入yuyue预约模板');
        },
        render: function(){
            var data = {
                title: '预约模板'
            };
            var compileTemplate = _.template(YuyueTemplate, data);
            this.$el.html(compileTemplate);
        },
        login: function(){
            debugger;
            Mipu.doLogin();
        }
    });

    return new YuyueView;
});