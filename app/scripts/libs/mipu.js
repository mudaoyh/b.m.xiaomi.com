/*
* mipu.js 通用类库
* */
define(['jquery'], function($){
    return {
        client_id: '180100031013',
        app_path: 'http://app.shopapi.xiaomi.com/',
        sso_path: 'http://app.shoapi.xiaomi.com/v1/authorize/sso?client_id=',
        request: function(options, callback){
            /*
            * url: api路径
            * param: 参数
            * version: api版本
            * that: 指针
            * */
            var defaults = {
                param: {
                    'client_id': this.client_id
                },
                version: 'v1',
                that: this
            };
            var setting = $.extend(true, defaults, options);
            $.ajax({
                url: this.app_path + setting.version + '/' + setting.url,
                data: setting.param,
                dataType: 'jsonp',
                success: function(res){
                    callback(res, setting.that);
                }
            });
        },
        doLogin: function(){
            location.href = this.sso_path+this.client_id+'&callback='+encodeURIComponent(location.href);
        },
        isApp: function(){
            try{
                if(!!WE){
                    return true;
                }
            }catch(e){}
            return false;
        }
    };
});