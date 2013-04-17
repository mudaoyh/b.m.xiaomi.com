/*
* mipu.js 通用类库
* */
define(['jquery'], function($){
    return {
        isApp: function(){
            try{
                if(!!WE){
                    return true;
                }
            }catch(e){}
            return false;
        }
    }
});