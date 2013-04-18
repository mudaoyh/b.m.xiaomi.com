/*
* mipu.js 通用类库
* */
define(['jquery'], function($){
    return {
        client_id: '180100031013',
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