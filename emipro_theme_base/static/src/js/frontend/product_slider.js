//----------------------------------------------------
// Dynamic Product Slider Snippet
//----------------------------------------------------
odoo.define('website_slider.front_js', function (require) {
    'use strict';
    var sAnimations = require('website.content.snippets.animation');
    var ajax = require("web.ajax");
    var wSaleUtils = require('website_sale.utils');
    var sale = new sAnimations.registry.WebsiteSale();
    var rpc = require('web.rpc');
    var wish = new sAnimations.registry.ProductWishlist();
    var publicWidget = require('web.public.widget');
    var quickView = require("emipro_theme_base.quick_view");
    var quickViewObj = new publicWidget.registry.quickView();

    publicWidget.registry.js_slider_snippet = publicWidget.Widget.extend({
        selector: ".js_slider_snippet",
        start: function () {
            this.redrow();
        },
        stop: function () {
            this.clean();
        },
        redrow: function (debug) {
            this.clean(debug);
            this.build(debug);
        },
        clean: function (debug) {
            this.$target.empty();
        },
        build: function (debug) {
            /* on built snippent render the template of style as per configuration and call the common function
            {Play with Logic} Logic : common method if not given then display first filter data other wise based on
            argument display data on template */
            var self = this;
            var slider_id = self.$target.attr("data-slider-id");
            ajax.jsonRpc('/slider/render', 'call', {'slider_id': slider_id}).then(function (data) {
                $(self.$target).html(data);
                if($('#id_lazyload').length) {
                    $("img.lazyload").lazyload();
                }
                self.initOwlSlider();
                $(self.$target).find(".js_filter_change").first().addClass( "active" );
                $(self.$target).find(".a-submit").click(function (event) {
                    sale._onClickSubmit(event)
                 });
                self.addToWishlist($(self.$target));
                self.slider_render($(self.$target));
            });
            
        },
        addToWishlist: function (target) {
            /* Init wishlist function using wishlist class object also click as per base logic
            base on click disable all data-product-product-id into page */
            var self = this;
            wish.willStart();
            $(target).find(".o_add_wishlist").click(function (event) {
                event.stopImmediatePropagation();
                $(this).prop("disabled", true).addClass('disabled');
                var productId = parseInt( $(this).attr('data-product-product-id'), 10);
                $("[data-product-product-id='"+productId+"']").prop("disabled", true).addClass('disabled');
                if (productId && !_.contains(wish.wishlistProductIDs, productId)) {
                    rpc.query({
                        route: '/shop/wishlist/add',
                        params: {
                            product_id: productId,
                        },
                    }).then(function (result) {
                        wish.wishlistProductIDs.push(productId);
                        wish._updateWishlistView();
                        wSaleUtils.animateClone($('#my_wish'), $(this).closest('form'), 25, 40);
                    }).guardedCatch(function (err, data) {
                        $(this).prop("disabled", false).removeClass('disabled');
                        var wproductId = parseInt( $(this).attr('data-product-product-id'), 10);
                        $("[data-product-product-id='"+wproductId+"']").prop("disabled", false).removeClass('disabled');
                    });
                }
            })
        },
        initOwlSlider: function () {
            $('.te_product_slider_1, .te_slider_style_2_right_pannel, .te_product_slider_5, .te_slider_style_6').owlCarousel({
                loop: false,
                rewind: true,
                margin: 10,
                nav: true,
                lazyLoad:true,
                dots: false,
                navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
                autoplay: $('.te_auto_play_value span').text() == "True" ? true : false,
                autoplayTimeout: 4000,
                autoplayHoverPause:true,
                items: 4,
                responsive: {
                    0: {
                        items: 1,
                    },
                    576: {
                        items: 2,
                    },
                    991: {
                        items: 3,
                    },
                    1200: {
                        items: 4,
                    },
                },
            });
            $('.te_product_slider_4').owlCarousel({
                loop: false,
                rewind: true,
                nav: true,
                dots: false,
                lazyLoad:true,
                navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
                autoplay: true,
                autoplayTimeout: 4000,
                autoplayHoverPause:true,
                items: 2,
                responsive: {
                    0: {
                        items: 1,
                    },
                    576: {
                        items: 2,
                    },
                },
            });
        },
        slider_render: function(target){
            /* This method is used for update the dynamic product carousel while page load */
            var self = this;
            $(target).find(".js_filter_change").click(function(){
                $('.cus_theme_loader_layout').removeClass('d-none');
                var filter_id = $(this).attr('data-id');
                $(target).find(".js_filter_change").removeClass('active');
                $(this).addClass('active');
                var current_filter = $(target).find("div[filter-id='" + filter_id + "']");
                var slider_id = $(target).attr("data-slider-id");
                $(target).find(".js_filter_data").hide()
                if (current_filter.length == 1){
                    $('.cus_theme_loader_layout').addClass('d-none');
                    $('.cus_theme_loader_layout').addClass('hidden');
                    current_filter.show()
                }
                else {
                    ajax.jsonRpc('/slider/render', 'call', {'slider_id': slider_id,'filter_id':filter_id}).then(function (data) {
                        $('.cus_theme_loader_layout').addClass('d-none');
                        $('.cus_theme_loader_layout').addClass('hidden');
                        $(target).find(".js_data_container").append($(data).find(".js_filter_data"));
                        $(target).find(".a-submit").click(function (event) {
                            sale._onClickSubmit(event)
                        });
                        self.addToWishlist(target);
                        self.initOwlSlider();
                        if($('#id_lazyload').length) {
                            $("img.lazyload").lazyload();
                        }
                    });
                }
            });
        }
    });
    $('#myCarousel_banner_prod_slider').find('.te_product_slider_1.owl-carousel').owlCarousel({
        loop: false,
        rewind: true,
        margin: 10,
        nav: true,
        dots: false,
        navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause:true,
        items: 3,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 2,
            },
            991: {
                items: 3,
            },
            1200: {
                items: 3,
            },
        },
    });

});
