/**
 * styleListView 套件列表
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'libs/mipu',
    'libs/shopping',
    'text!templates/shopping/styleListTemplate.html'
], function($, _, Backbone, Mipu, Shopping, StyleListTemplate){
    var StyleList = Backbone.View.extend({
        el: $('#viewbody'),
        initialize: function(){
            console.log('Stylelist init');
            this.$el.undelegate('#viewbody', 'change');
        },
        render: function(product_id, consumption){
            this.options.product_id = product_id;
            this.options.consumption = consumption;

            this.process(function(self){
                var compileTemplate = $.tmpl(StyleListTemplate, self.options.res, {
                    getFirstImg: function(products){
                        var image_url = '';
                        for(var key in products){
                            if(products[key].is_sale == true){
                                image_url = products[key].image_url[180];
                                break;
                            }
                        }
                        return image_url;
                    },
                    getFirstName: function(products){
                        var product_name = '';
                        for(var key in products){
                            if(products[key].is_sale == true){
                                product_name = products[key].product_name;
                                break;
                            }
                        }
                        return product_name;
                    },
                    getCount: function(products){
                        var count = 0;
                        for(var key in products){
                            if(products[key].is_sale == true)
                                count++;
                        }
                        return count;
                    }
                });
                self.$el.html(compileTemplate);
                Mipu.formUi.setSelect.init();
            });
        },
        process: function(callback){
            var options = {
                url: 'shopping/stylelist',
                param: {
                    'product_id': this.options.product_id
                },
                that: this
            };
            Mipu.request(options, function(res, self){
                self.options.res = res.data;
                self.options.res.product_id = self.options.product_id;
                callback(self);
            });
        }
    });
    return new StyleList;
});
