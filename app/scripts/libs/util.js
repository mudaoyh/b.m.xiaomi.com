/**
 * util.js 通用类
 */
define([
    'jquery',
    'underscore'
], function($, _){
    return {
        Cache: {
            set: function(key, value){
                localStorage.setItem(key, value);
            },
            get: function(key){
                return localStorage.getItem(key);
            },
            remove: function(key){
                localStorage.removeItem(key);
            },
            clear: function(){
                localStorage.clear();
            }
        },
        SessionCache: {
            set: function(key, value){
                sessionStorage.setItem(key, value);
            },
            get: function(key){
                return sessionStorage.getItem(key);
            },
            has: function(key){
                if( !sessionStorage.getItem(key) ){
                    return false;
                }
                return true;
            }
        },
        Cookie: {
            setCookie: function(sName, sValue, oExpires, sPath, sDomain, bSecure) {
                var sCookie = sName + "=" + encodeURIComponent(sValue);
                if (oExpires) {
                    sCookie += "; expires=" + oExpires.toGMTString();
                }
                if (sPath) {
                    sCookie += "; path=" + sPath;
                }
                if (sDomain) {
                    sCookie += "; domain=" + sDomain;
                }
                if (bSecure) {
                    sCookie += "; secure";
                }
                document.cookie = sCookie;
            },
            getCookie: function(sName) {
                var sRE = "(?:; )?" + sName + "=([^;]*);?";
                var oRE = new RegExp(sRE);
                if (oRE.test(document.cookie)) {
                    return decodeURIComponent(RegExp["$1"]);
                } else {
                    return null;
                }
            },
            deleteCookie: function(sName, sPath, sDomain) {
                var sCookie = sName + "=; expires=" + (new Date(0)).toGMTString();
                if (sPath) {
                    sCookie += "; path=" + sPath;
                }
                if (sDomain) {
                    sCookie += "; domain=" + sDomain;
                }
                document.cookie = sCookie;
            }
        },
        Verify: {
            checkMobile: function (mobile) {
                var patrn = /^1[3|4|5|8][0-9]\d{8}$/;	// 11 位手机
                if(!patrn.exec(mobile)) {
                    return false;
                } else {
                    return true;
                }
            },
            checkMail: function (mail){
                var patrn = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
                if(!patrn.exec(mail)) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        isApp: function(){
            try{
                if(!!WE){
                    return true;
                }
            }catch(e){}
            return false;
        },
        AppTrigger: {
            WebEventTrigger: function(name, data){
                try{
                    if( WE && WE.trigger ){
                        if( typeof (data) !== 'string' ){
                            data = JSON.stringify(data);
                        }
                        return WE.trigger(name, data);
                    }
                }catch (e){}
                return false;
            },
            Trigger: function(name, data, callback, that){
                if( !this.WebEventTrigger(name, data) ){
                    callback(data, that);
                }
            }
        }
    };
});