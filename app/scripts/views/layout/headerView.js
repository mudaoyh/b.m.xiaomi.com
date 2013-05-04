/**
 * Created with JetBrains WebStorm.
 * User: caienlei
 * Date: 13-4-21
 * Time: 下午11:28
 * To tmlchange this template use File | Settings | File Templates.
 */
define([
    'underscore',
    'backbone',
    'text!templates/layout/header.html'
], function(_, Backbone, HeaderTemplate){

    var HeaderView = Backbone.View.extend({
        className: 'header',
        initialize: function(){
            console.log('HeaderView载入render首页模板');
        },
        render: function(){
            this.$el.html(HeaderTemplate);
            $('#header').html(this.$el);
        },
        remove: function(){
            this.$el.remove();
        }
    });

    return new HeaderView;
});