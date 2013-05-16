/**
 * add.js 添加购物车
 * 接口参数
 * consignee
 * province_id
 * city_id
 * district_id
 * address
 * zipCode
 * tel
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'libs/mipu',
    'libs/util',
    'libs/api',
    'text!templates/address/addTemplate.html'
], function($, _, Backbone, Mipu, Util, Api, AddTemplate){
    var AddressAdd = Backbone.View.extend({
        el: $('#viewbody'),
        events: {
            'click #add_template #AddressAddBtn': 'verification',
            'change #add_template select': 'changeSelect',
            'change #add_template #province_id': 'getCity',
            'change #add_template #city_id': 'getDistrict'
        },
        initialize: function(){
            console.log('address:add init');
            this.on({
                'get:province': this.getProvince,
                'add:address': this.addressAdd
            });
        },
        render: function(origin){
            /*
            * origin
            * 判断从购物车还是收货地址列表的来源
            * 在添加成功之后进行跳转
            * */
            this.options.origin = origin;

            var compileTemplate = $.tmpl(AddTemplate);
            this.$el.html(compileTemplate);

            Mipu.formUi.setSelect.init();
            this.trigger('get:province', 1);
        },
        verification: function(){
            this.options.consignee = this.$el.find('#consignee').val();
            this.options.province_id = this.$el.find('#province_id option:selected[value!=0]').val();
            this.options.city_id = this.$el.find('#city_id option:selected[value!=0]').val();
            this.options.district_id = this.$el.find('#district_id option:selected[value!=0]').val();
            this.options.address = this.$el.find('#address').val();
            this.options.zipcode = this.$el.find('#zipcode').val();
            this.options.tel = this.$el.find('#tel').val();

            if(!this.options.consignee){
                Mipu.popup('请填写收货人姓名');
                return false;
            }
            if(!this.options.province_id){
                Mipu.popup('请选择省份');
                return false;
            }
            if(!this.options.city_id){
                Mipu.popup('请选择城市');
                return false;
            }
            if(!this.options.district_id){
                Mipu.popup('请选择区');
                return false;
            }
            if(!this.options.address){
                Mipu.popup('请填写具体地址');
                return false;
            }
            if(!this.options.zipcode){
                Mipu.popup('请填写正确的邮政编码');
                return false;
            }
            if(!this.options.tel){
                Mipu.popup('请填写正确的邮政编码');
                return false;
            }

            this.trigger('add:address');
        },
        addressAdd: function(){
            /*
             * Todo
             * 向接口添加购物车
             * 根据origin来源，进行跳转
             * */

            var options = {
                'param': {
                    'consignee': this.options.consignee,
                    'province_id': this.options.province_id,
                    'city_id': this.options.city_id,
                    'district_id': this.options.district_id,
                    'address': this.options.address,
                    'zipcode': this.options.zipcode,
                    'tel': this.options.tel
                },
                'that': this
            };
            Api.address.add(options, function(res, self){
                console.log('添加购物车，成功');
            });

        },
        changeSelect: function(e){
            var selfEle = e.currentTarget;
            Mipu.formUi.setSelect.changeSelect(selfEle);
        },
        getProvince: function(parent){
            this.options.cacheProvince = 'addressProvince_'+parent;

            var items = this.$el.find('#province_id option[value!=0], ' +
                '#city_id option[value!=0], ' +
                '#district_id option[value!=0]');
            items.remove();

            if(Util.SessionCache.has( this.options.cacheProvince )){
                var data = Util.SessionCache.get( this.options.cacheProvince );
                this.renderOptions(JSON.parse(data)).appendTo(this.$el.find('#province_id'));
            }else{
                // 通过 country_id 获取省份列表
                var options = {
                    'param': {
                        'parent': parent
                    },
                    'that': this
                };
                Api.address.getProvince(options, function(res, self){
                    var data = res.data.regions;
                    // 缓存至cache
                    Util.SessionCache.set(self.options.cacheProvince, JSON.stringify(data));

                    self.renderOptions(data).appendTo(self.$el.find('#province_id'));
                });
            }
        },
        getCity: function(e){
            var parent = e.currentTarget.value;
            this.options.cacheCity = 'addressCity_'+ parent;

            var items = this.$el.find('#city_id option[value!=0], ' +
                '#district_id option[value!=0]');
            items.remove();

            if(Util.SessionCache.has( this.options.cacheCity )){
                var data = Util.SessionCache.get( this.options.cacheCity );
                this.renderOptions(JSON.parse(data)).appendTo(this.$el.find('#city_id'));

            }else{
                // 通过 province_id 获取城市列表
                var options = {
                    'param': {
                        'parent': e.currentTarget.value
                    },
                    'that': this
                };
                Api.address.getCity(options, function(res, self){
                    // Todo 地址信息持久化
                    var data = res.data.regions;
                    // 缓存至cache
                    Util.SessionCache.set(self.options.cacheCity, JSON.stringify(data));

                    self.renderOptions(data).appendTo(self.$el.find('#city_id'));
                });
            }
        },
        getDistrict: function(e){
            var parent = e.currentTarget.value;
            this.options.cacheDistrict = 'addressDistrict_'+ parent;

            this.$el.find('#district_id option[value!=0]').remove();

            if(Util.SessionCache.has( this.options.cacheDistrict )){
                var data = Util.SessionCache.get( this.options.cacheDistrict );
                this.renderOptions(JSON.parse(data)).appendTo(this.$el.find('#district_id'));
            }else{
                // 通过 city_id 获取地区列表
                var options = {
                    'param': {
                        'parent': e.currentTarget.value
                    },
                    'that': this
                };
                Api.address.getDistrict(options, function(res, self){
                    var data = res.data.regions;
                    Util.SessionCache.set(self.options.cacheDistrict, JSON.stringify(data));

                    self.renderOptions(data).appendTo(self.$el.find('#district_id'));
                });
            }
        },
        renderOptions: function(data){
            var arr = [];
            $.each(data, function(key, value){
                arr.push(value);
            });
            var markup = '<option value="${region_id}">${region_name}</option>';
            $.template('addressTemplate', markup);
            var compileTemplate = $.tmpl('addressTemplate', arr);
            return compileTemplate;
        }
    });
    return new AddressAdd;
});
