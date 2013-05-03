/**
 * indexView.js 登录首页
 */
define([
    'jquery',
    'tmpl',
    'underscore',
    'backbone',
    'libs/mipu',
    'text!templates/account/loginTemplate.html',
    'text!templates/account/logoutTemplate.html'
], function($, tmpl, _, Backbone, Mipu, LoginTemplate, LogoutTemplate){
    var IndexView = Backbone.View.extend({
        el: $('#viewbody'),
        events: {
            'click #login_template #AccountLoginBtn': 'login',
            'click #logout_template #AccountLogoutBtn': 'logout'
        },
        initialize: function(options){
            console.log('account indexView');
        },
        render: function(){
            var options;
            options = {
                url: 'user/show',
                that: this
            };
            Mipu.request(options, function(res, self){
                var compileTemplate, data;
                if(res.result == 'ok'){
                    data = res.data;
                    compileTemplate = $.tmpl(LogoutTemplate, data);
                    console.log('已登录');
                }else{
                    compileTemplate = $.tmpl(LoginTemplate);
                    console.log('未登录');
                }
                self.$el.html(compileTemplate);
            });
        },
        login: function(){
            console.log('login');
            Mipu.doLogin();
        },
        logout: function(){
            console.log('logout');
            Mipu.doLogout();
        }
    });
    return new IndexView;
});
