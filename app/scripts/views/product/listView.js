/**
 * listView.js 分类列表页
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'libs/mipu',
    'text!templates/product/listTemplate.html'
], function($, _, Backbone, Mipu, ListTemplate){

    var ListView = Backbone.View.extend({
        el: $('#viewbody'),
        render: function(cate_id){
            var options = {
                url: '/product/list',
                param: {
                    'cateid': cate_id
                },
                that: this
            };
            Mipu.request(options, function(res, self){
                var data, compileTemplate;
                data = res.data;
                debugger;
                compileTemplate = $.tmpl(ListTemplate, data);
                self.$el.html(compileTemplate);
            });
        }
    });

    return new ListView;
});
