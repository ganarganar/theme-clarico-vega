odoo.define('theme_clarico_vega.category_slider', function(require) {
    'use strict';

    var ajax = require('web.ajax');
    var publicWidget = require('web.public.widget');

    publicWidget.registry.te_category_slider = publicWidget.Widget.extend({
        selector: ".te_category_slider",
        start: function () {
            self = this;
            self.getCategorySliderData();
        },
        getCategorySliderData: function(){
            /*
                Initialization the category slider while page load
            */
            if($("#wrapwrap .te_category_slider").length){
                ajax.jsonRpc('/get_category_slider', 'call').then(function(data) {
                    var data_replace = $(data).find(".te_category_slider");
                    $(".te_category_slider").replaceWith(data_replace);
                    $(".te_category_slider").show();
                    $('.category_carousel').owlCarousel({
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
        },
    });
});