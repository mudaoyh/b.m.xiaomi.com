/**
 * viewView.js 产品详情列表
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'libs/mipu',
    'libs/util',
    'libs/api',
    'text!templates/product/productViewTemplate.html',
    'lazyload'
], function($, _, Backbone, Mipu, Util, Api, ProductViewTemplate){
    var ProductView = Backbone.View.extend({
        el: $('#viewbody'),
        events: {
            'click #product_view_template #LoadmoreImagesBtn': 'loadMore',
            'change #product_view_template select': 'selectChange',
            'change #product_view_template .xm-select-style': 'selectProduct',
            'click #product_view_template #AddShoppingCartBtn': 'addCart',
            'click #product_view_template #NextShoppingCartBtn': 'navStyleList'
        },
        initialize: function(){
            console.log('productView render');
        },
        render: function(product_id){
            this.options.product_id = product_id;
            this.options.cacheName = 'product_view_'+product_id;

            this.process(function(self){
                var compileTemplate = $.tmpl(ProductViewTemplate, self.options.res);
                self.$el.html(compileTemplate);
                // 商品详情图片 lazyLoad
                self.$el.find('.imgurl img').lazyload({effect: 'fadeIn'});
                // formSelect 初始化
                Mipu.formUi.setSelect.init();
            });
        },
        process: function(callback){
            if(Util.SessionCache.has( this.options.cacheName )){
                var data = JSON.parse(Util.SessionCache.get(this.options.cacheName));
                this.options.res = data;
                callback(this);
            }else{
                var options = {
                    'param': {
                        'product_id': this.options.product_id
                    },
                    'that': this
                };
                Api.product.view(options, function(res, self){
                    self.options.res = res;
                    Util.SessionCache.set(self.options.cacheName, JSON.stringify(res));
                    callback(self);
                });
            }
        },
        loadMore: function(e){
            var selfEle = e.currentTarget;
            var imgHide = this.$el.find('.product_desc .hide');
            imgHide.eq(0).removeClass('hide');
            imgHide.eq(1).removeClass('hide');
            if(this.$el.find('.product_desc .hide').length == 0){
                $(selfEle).hide();
            }
        },
        selectChange: function(e){
            var selfEle = e.currentTarget;
            // formSelect 选择当前项
            Mipu.formUi.setSelect.changeSelect(selfEle);

        },
        selectProduct: function(e){
            var product_id = $(e.currentTarget).find('option:selected').val();
            location.replace('#/product/view/'+product_id);
        },
        addCart: function(e){
            var product_id, consumption, options;
            product_id = this.options.product_id;
            consumption = $('#xm-select-product-addcart').find('option:selected').val();
            options = {
                'param': {
                    'product_id': product_id,
                    'consumption': consumption
                },
                'that': this
            };
            Api.shopping.addCart(options, function(res, self){
                Mipu.popup('成功加入购物车');
            });
        },
        navStyleList: function(e){
            var product_id, consumption;
            product_id = this.options.product_id;
            consumption = $('#xm-select-product-addcart').find('option:selected').val();
            location.href = '#shopping/stylelist/'+product_id+'/'+consumption;
        }
    });
    return new ProductView;
});
