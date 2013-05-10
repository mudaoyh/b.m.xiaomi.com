/**
 * checkout.js 购物车结算
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'libs/mipu',
    'libs/api'
], function($, _, Backbone, Mipu, Api){
    var checkoutView = Backbone.View.extend({
        initialize: function(){
            console.log('orderCheckout init');
        },
        render: function(){
            debugger;
        }
    });
    return new checkoutView
});
