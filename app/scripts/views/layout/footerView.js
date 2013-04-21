/**
 * Created with JetBrains WebStorm.
 * User: caienlei
 * Date: 13-4-21
 * Time: 下午11:44
 * To change this template use File | Settings | File Templates.
 */
define([
    'underscore',
    'backbone',
    'text!templates/layout/footer.html'
], function(_, Backbone, FooterTemplate){

    var FooterView = Backbone.View.extend({
        className: 'footer',
        initialize: function(){
            console.log('FooterView载入render首页模板');
        },
        render: function(){
            this.$el.html(FooterTemplate);
            $('#footer').html(this.$el);
        }
    });

    return new FooterView;
});
