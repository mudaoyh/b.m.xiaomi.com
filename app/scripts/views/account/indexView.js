/**
 * indexView.js 登录首页
 */
define([
    'jquery',
    'tmpl',
    'underscore',
    'backbone',
    'libs/mipu',
    'libs/api',
    'text!templates/account/loginTemplate.html',
    'text!templates/account/logoutTemplate.html'
], function($, tmpl, _, Backbone, Mipu, Api, LoginTemplate, LogoutTemplate){
    var IndexView = Backbone.View.extend({
        el: $('#viewbody'),
        events: {
            'click #login_template #AccountLoginBtn': 'login',
            'click #logout_template #AccountLogoutBtn': 'logout'
        },
        initialize: function(){
            console.log('account indexView');
        },
        render: function(){
            this.process(function(self){
                var compileTemplate, data;
                if(self.options.res.result == 'ok'){
                    data = self.options.res.data;
                    compileTemplate = $.tmpl(LogoutTemplate, data);
                    console.log('已登录');
                }else{
                    compileTemplate = $.tmpl(LoginTemplate);
                    console.log('未登录');
                }
                self.$el.html(compileTemplate);
            });
        },
        process: function(callback){
            var options = {
                that: this
            };
            Api.user.show(options, function(res, self){
                self.options.res = res;
                callback(self);
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
