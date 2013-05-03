/**
 * listView.js 分类列表页
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'libs/mipu',
    'libs/util',
    'text!templates/product/listTemplate.html',
    'text!templates/product/listItemTemplate.html',
    'text!templates/product/phoneListTemplate.html'
], function($, _, Backbone, Mipu, Util, ListTemplate, ListItemTemplate, PhoneListTemplate){

    var ListView = Backbone.View.extend({
        el: $('#viewbody'),
        initialize: function(){
            console.log('ListTemplate载入render列表模板');
            this.options = {
                'adaptType': ['MI1', 'MI1S', 'MI2', 'BOX', 'MI2S', 'MI2A'],
                'adaptItems': {'MI1':'1','MI1S':'1S','MI2':'2','BOX':'盒子','MI2S':'2S','MI2A':'2A'}
            };
        },
        events: {
            'click #PorductListMoreBtn': 'more',
            'click #adapt_button': 'adaptPanel',
            'click #pick_panel a': 'adaptInit'
        },
        set: function(cate_id, adapt, page_index){
            var adapt = !adapt ? '' : adapt,
                page_index = !page_index ? 1 : page_index;

            this.options.cate_id = cate_id;
            this.options.adapt = adapt;
            this.options.pagesize = 10;
            this.options.pageindex = page_index;
            this.options.cacheName = 'local_list_'+cate_id+'_'+page_index+'_'+adapt;
        },
        process: function(callback){
            if( Util.SessionCache.has(this.options.cacheName) ){
                var data = JSON.parse( Util.SessionCache.get(this.options.cacheName) );
                this.options.res = data;
                callback(this);
            }else{
                var options = {
                    url: 'product/list',
                    param: {
                        'cateid': this.options.cate_id,
                        'pageindex': this.options.pageindex,
                        'pagesize': this.options.pagesize,
                        'adapt': this.options.adapt
                    },
                    that: this
                };
                Mipu.request(options, function(res, self){
                    var data = JSON.stringify(res.data);
                    Util.SessionCache.set( self.options.cacheName, data );
                    self.options.res = res.data;
                    callback(self);
                });
            }
        },
        render: function(){
            this.process(function(self){
                self.$el.html($.tmpl(ListTemplate, self.options.res));
                self.adaptCurrent(self.options.adapt);
            });
        },
        more: function(e){
            this.set(this.options.cate_id, this.options.adapt, this.options.pageindex+=1);
            this.process(function(self){
                self.$el.find('#ProductList').append($.tmpl(ListItemTemplate, self.options.res));
                if(self.options.res.current_page == self.options.res.total_pages){
                    self.$el.find('#PorductListMoreBtn').remove();
                }
            });
        },
        adaptInit: function(e){
            var self = e.currentTarget,
                adapt = $(self).attr('data-adapt');

            this.adaptPanel();
            this.adaptCurrent(adapt);
            this.adaptNav(adapt);
        },
        adaptPanel: function(e){
            var overlay = $('#adapt_panel'),
                adaptBtn = $('#adapt_button'),
                mask = $('.product_product');

            adaptBtn.toggleClass('on');
            mask.toggleClass('adapt_panel_on');
            overlay.toggleClass('visible');
        },
        adaptCurrent: function(adapt){
            var adaptBtn = $('#adapt_button');
            adaptBtn.removeClass().addClass(adapt).text(this.options.adaptItems[adapt]);
        },
        adaptNav: function(adapt){
            var url, aUrl, adaptHash;

            url = location.href;
            aUrl = location.hash.split('/');
            adaptHash = _.intersection(this.options.adaptType, aUrl).toString();

            if(!adaptHash){
                url = url + '/' + adapt;
            }else{
                url = url.replace(adaptHash, adapt);
            }
            if(url.substr(url.length-1) == '/'){
                url = url.substr(0, url.length-1 );
            }
            location.href = url;
        },
        showPhoneList: function(){
            this.$el.html($.tmpl(PhoneListTemplate));
        }
    });

    return new ListView;
});
