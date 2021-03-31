odoo.define('emipro_theme_base.brand_slider', function(require) {
    'use strict';

    var ajax = require('web.ajax');
    var publicWidget = require('web.public.widget');

    publicWidget.registry.te_brand_slider = publicWidget.Widget.extend({
        selector: ".te_brand_slider",
        start: function () {
            self = this;
            self.getBrandData();
        },
        getBrandData: function(){
            /* This function is call while load the page and
            it's initialize the brand slider carousel if it's available */
            if($("#wrapwrap .te_brand_slider").length){
                ajax.jsonRpc('/get_brand_slider', 'call').then(function(data) {
                    var data_replace = $(data).find(".te_brand_slider");
                    $(".te_brand_slider").replaceWith(data_replace);
                    /* Brand Slider */
                    $(".te_brand_slider").show();
                    $('.brand_carousel').owlCarousel({
                        loop: false,
                        rewind: true,
                        margin: 10,
                        nav: true,
                        lazyLoad:true,
                        dots: false,
                        autoplay: $('.te_auto_play_value span').text() == "True" ? true : false,
                        autoplayTimeout: 4000,
                        navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
                        autoplayHoverPause:true,
                        items: 6,
                        responsive: {
                            0: {
                                items: 2,
                            },
                            576: {
                                items: 4,
                            },
                            991: {
                                items: 5,
                            },
                            1200: {
                                items: 6,
                            }
                        }

                    });
                });
            }
        }
    });
});