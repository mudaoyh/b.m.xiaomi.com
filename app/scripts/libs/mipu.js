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
            'user/show',
            'shopping/cartlist'
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
            * loading: 正在加载遮罩
            * */

            var defaults, setting, self;
            defaults = {
                param: {
                    'client_id': this.client_id
                },
                version: 'v1',
                that: this,
                loading: true
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
                        if(!!res.reason && /access_token/.test(res.reason)){
                            self.doLogin();
                            return false;
                        }
                        console.error(res);
                        self.popup(res.description);
                    }
                    if(_.indexOf(self.need_modify_cart, setting.url) !== -1){
                        console.error('需要更新购物车数量');
                        // Todo
                    }
                },
                error: function(){
                    console.error('ajax 出错');
                },
                beforeSend: function(){
                    if(setting.loading){
                        self.showLoad();
                    }
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
                popup.fadeOut();
            }, 2000)
        },
        formUi: {
            setSelect: {
                init: function(){
                    $('.option').each(function(){
                        var selected = $(this).parent().find('select:selected'),
                            first_child = $(this).parent().find('select option').eq(0);
                        if(selected.length > 0){
                            $(this).text(selected.text());
                        }else{
                            $(this).text(first_child.text());
                        }
                    });
                },
                changeSelect: function(that){
                    var str = $(that).find('option:selected').text();
                    $(that).parent().find('.option').text(str);
                }
            }
        }
    };
});