odoo.define('theme_clarico_vega.website_recently_viewed', function (require) {
    "use strict";

    var publicWidget = require('web.public.widget');
//    var wSaleWishList = require('theme_clarico_vega.wishlist_animate');
    var wSaleUtils = require('website_sale.utils');
    var productsRecentlyViewedSnippet = new publicWidget.registry.productsRecentlyViewedSnippet();

    //--------------------------------------------------------------------------
    // Recently viewed product slider add to cart animation
    //--------------------------------------------------------------------------
    publicWidget.registry.productsRecentlyViewedSnippet.include({
        _onAddToCart: function (ev) {
            var self = this;
            var $card = $(ev.currentTarget).closest('.card');
            this._rpc({
                route: "/shop/cart/update_json",
                params: {
                    product_id: $card.find('input[data-product-id]').data('product-id'),
                    add_qty: 1
                },
            }).then(function (data) {
                wSaleUtils.updateCartNavBar(data);
                var $navButton = self.getCustomNavBarButton('.o_wsale_my_cart');
                var fetch = self._fetch();
                var animation = wSaleUtils.animateClone($navButton, $(ev.currentTarget).parents('.o_carousel_product_card'), 17, 16);
                Promise.all([fetch, animation]).then(function (values) {
                    self._render(values[0]);
                });
            });
        },
        // Recently viewed product slider get add to cart selector based on header
        getCustomNavBarButton: function(selector) {
            var $affixedHeaderButton = $('header.affixed ' + selector);
            if ($affixedHeaderButton.length) {
                return $affixedHeaderButton;
            } else {
                var $header = $('div.te_header_before_overlay '+ selector);
                if($header.length){
                    return $header;
                } else {
                    return $('header ' + selector).first();
                }
            }
        },
    });

});