//----------------------------------------------------
// Dynamic Product Slider Snippet
//----------------------------------------------------
odoo.define('website_slider.product_offer_slider', function (require) {
    'use strict';

    var ajax = require("web.ajax");
    var sAnimations = require('website.content.snippets.animation');
    var publicWidget = require('web.public.widget');
    var sale = new sAnimations.registry.WebsiteSale();
//
    publicWidget.registry.test_js_homepage_style = publicWidget.Widget.extend({
        selector: ".test_js_homepage_style",
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
//        alert("Build Calling........");
        var self = this;
        var registryData = publicWidget.registry;
        var style_id = self.$target.attr("data-slider-style-id");
        ajax.jsonRpc('/get_test_homepage_data', 'call', {}).then(function (data) {
            $(self.$target).html(data);
        });

//            var self = this;
//            var registryData = publicWidget.registry;
//            if(registryData.js_slider_snippet)
//            {
//                var productSlider = new publicWidget.registry.js_slider_snippet();
//                var style_id = self.$target.attr("data-slider-style-id");
//                ajax.jsonRpc('/get_new_product_data', 'call', {'style_id': style_id}).then(function (data) {
//                    $(self.$target).html(data);
//                    if($('#id_lazyload').length) {
//                        $("img.lazyload").lazyload();
//                    }
//                    productSlider.initOwlSlider();
//                    $(self.$target).find(".a-submit").click(function (event) {
//                        sale._onClickSubmit(event)
//                     });
//                    productSlider.addToWishlist($(self.$target));
//                    productSlider.slider_render($(self.$target));
//                });
//            }
        }
    });


//

    publicWidget.registry.js_category_discount = publicWidget.Widget.extend({
        selector: ".js_category_discount",
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
            var self = this;
            var registryData = publicWidget.registry;
            if(registryData.js_slider_snippet)
            {
                var productSlider = new publicWidget.registry.js_slider_snippet();
                var style_id = self.$target.attr("data-slider-style-id");
                ajax.jsonRpc('/get_category_offer_data', 'call', {'style_id': style_id}).then(function (data) {
                    $(self.$target).html(data);
                    if($('#id_lazyload').length) {
                        $("img.lazyload").lazyload();
                    }
                    productSlider.initOwlSlider();
                    $(self.$target).find(".a-submit").click(function (event) {
                        sale._onClickSubmit(event)
                     });
                    productSlider.addToWishlist($(self.$target));
                    productSlider.slider_render($(self.$target));
                });
            }

        }
    });

    publicWidget.registry.js_allproduct_discount = publicWidget.Widget.extend({
        selector: ".js_allproduct_discount",
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
            var self = this;
            var registryData = publicWidget.registry;
            if(registryData.js_slider_snippet)
            {
                var productSlider = new publicWidget.registry.js_slider_snippet();
                var style_id = self.$target.attr("data-slider-style-id");
                ajax.jsonRpc('/get_allproduct_offer_data', 'call', {'style_id': style_id}).then(function (data) {
                    $(self.$target).html(data);
                    if($('#id_lazyload').length) {
                        $("img.lazyload").lazyload();
                    }
                    productSlider.initOwlSlider();
                    $(self.$target).find(".a-submit").click(function (event) {
                        sale._onClickSubmit(event)
                     });
                    productSlider.addToWishlist($(self.$target));
                    productSlider.slider_render($(self.$target));
                });
            }
        }
    });
    publicWidget.registry.js_product_discount = publicWidget.Widget.extend({
        selector: ".js_product_discount",
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
            var self = this;
            var registryData = publicWidget.registry;
            if(registryData.js_slider_snippet)
            {
                var productSlider = new publicWidget.registry.js_slider_snippet();
                var style_id = self.$target.attr("data-slider-style-id");
                ajax.jsonRpc('/get_product_offer_data', 'call', {'style_id': style_id}).then(function (data) {
                    $(self.$target).html(data);
                    if($('#id_lazyload').length) {
                        $("img.lazyload").lazyload();
                    }
                    productSlider.initOwlSlider();
                    $(self.$target).find(".a-submit").click(function (event) {
                        sale._onClickSubmit(event)
                     });
                    productSlider.addToWishlist($(self.$target));
                    productSlider.slider_render($(self.$target));
                });
            }
        }
    });
    publicWidget.registry.js_best_seller = publicWidget.Widget.extend({
        selector: ".js_best_seller",
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
            var self = this;
            var registryData = publicWidget.registry;
            if(registryData.js_slider_snippet)
            {
                var productSlider = new publicWidget.registry.js_slider_snippet();
                var style_id = self.$target.attr("data-slider-style-id");
                ajax.jsonRpc('/get_best_seller_data', 'call', {'style_id': style_id}).then(function (data) {
                    $(self.$target).html(data);
                    if($('#id_lazyload').length) {
                        $("img.lazyload").lazyload();
                    }
                    productSlider.initOwlSlider();
                    $(self.$target).find(".a-submit").click(function (event) {
                        sale._onClickSubmit(event)
                     });
                    productSlider.addToWishlist($(self.$target));
                    productSlider.slider_render($(self.$target));
                });
            }
        }
    });
    publicWidget.registry.js_new_product = publicWidget.Widget.extend({
        selector: ".js_new_product",
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
            var self = this;
            var registryData = publicWidget.registry;
            if(registryData.js_slider_snippet)
            {
                var productSlider = new publicWidget.registry.js_slider_snippet();
                var style_id = self.$target.attr("data-slider-style-id");
                ajax.jsonRpc('/get_new_product_data', 'call', {'style_id': style_id}).then(function (data) {
                    $(self.$target).html(data);
                    if($('#id_lazyload').length) {
                        $("img.lazyload").lazyload();
                    }
                    productSlider.initOwlSlider();
                    $(self.$target).find(".a-submit").click(function (event) {
                        sale._onClickSubmit(event)
                     });
                    productSlider.addToWishlist($(self.$target));
                    productSlider.slider_render($(self.$target));
                });
            }
        }
    });

    publicWidget.registry.js_category_products = publicWidget.Widget.extend({
        selector: ".js_category_products",
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
            var self = this;
            var registryData = publicWidget.registry;
            if(registryData.js_slider_snippet)
            {
                var productSlider = new publicWidget.registry.js_slider_snippet();
                var category_ids = self.$target.attr("data-slider-category-id");
                var style_id = self.$target.attr("data-slider-style-id");
                var is_discount = self.$target.attr("data-discount");
                ajax.jsonRpc('/get_category_products_data', 'call', {'style_id': style_id,'category_ids':category_ids,'is_discount':is_discount}).then(function (data) {
                    $(self.$target).html(data);
                    if($('#id_lazyload').length) {
                        $("img.lazyload").lazyload();
                    }
                    productSlider.initOwlSlider();
                    $(self.$target).find(".a-submit").click(function (event) {
                        sale._onClickSubmit(event)
                     });
                    productSlider.addToWishlist($(self.$target));
                    productSlider.slider_render($(self.$target));
                });
            }
        }
    });
});