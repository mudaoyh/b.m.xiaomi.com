/*
* mipu.js 通用类库
* */
define([
    'jquery',
    'underscore'
], function($, _){
    return {
        client_id: '180100031013',
        app_path: 'http://app.shopapi.xiaomi.com/',
        sso_path: 'http://app.shopapi.xiaomi.com/v1/authorize/sso?client_id=',
        logout_path: 'http://app.shopapi.xiaomi.com/v1/authorize/sso_logout?client_id=',
        ajax_error_url: [
            'user/show'
        ],
        need_modify_cart: [
            'shopping/addcart',
            'shopping/delcart',
            'shopping/editconsumption',
            'order/submit'
        ],
        request: function(options, callback){
            /*
            * url: api路径
            * param: 参数
            * version: api版本
            * that: 指针
            * */

            var defaults, setting, self;
            defaults = {
                param: {
                    'client_id': this.client_id
                },
                version: 'v1',
                that: this
            };
            setting = $.extend(true, defaults, options);
            self = this;
            $.ajax({
                url: this.app_path + setting.version + '/' + setting.url,
                data: setting.param,
                dataType: 'jsonp',
                success: function(res){
                    if(res.result == 'ok'){
                        callback(res, setting.that);
                    }else if(res.result == 'error'){
                        if(_.indexOf(self.ajax_error_url, setting.url) !== -1){
                            callback(res, setting.that);
                            return false;
                        }
                        // 接口需要预先登录
                        if(!!res.reason && /access_token/.test(res.reason) && false){
                            self.doLogin();
                            return false;
                        }
                    }
                    if(_.indexOf(self.need_modify_cart, setting.url) !== -1){
                        console.log('更新购物车数量');
                        debugger;
                    }
                },
                error: function(){
                    console.error('ajax 出错');
                },
                beforeSend: function(){
                    self.showLoad();
                },
                complete: function(){
                    self.hideLoad();
                }
            });
        },
        doLogin: function(){
            location.href = this.sso_path+this.client_id+'&callback='+encodeURIComponent(location.href);
        },
        doLogout: function(){
            location.href = this.logout_path+this.client_id+'&callback='+encodeURIComponent(location.origin);
        },
        showLoad: function(){
            $('#maskLoad').removeClass('hide');
        },
        hideLoad: function(){
            $('#maskLoad').addClass('hide');
        },
        popup: function(str){
            var popup = $('#popup');
            popup.fadeIn('slow').find('p').html(str);
            setTimeout(function(){
                popup.fadeOut('slow');
            }, 2500)
        },
        activityControl: function(actions, callback, that){
            var options;
            options = {
                url: '/activity/control',
                that: self
            };
            if(!actions){
                this.request(options, function(res, that){
                    callback(true, res.data, that);
                });
            }else{
                callback(false);
            }
        }
    };
});