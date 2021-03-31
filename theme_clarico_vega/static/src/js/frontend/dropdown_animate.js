odoo.define('theme_clarico_vega.dropdown_animate', function (require) {
    "use strict";

    var publicWidget = require('web.public.widget');

    publicWidget.registry.dropdown_animate= publicWidget.Widget.extend({
        selector: "#wrapwrap",
        start: function () {
            self = this;
            self.showDropdown();
            self.showHeader();
            self.showFooter();
            setTimeout(function () {
                var addToCart = $('#product_details').find('#add_to_cart').attr('class');
                var buyNow = $('#product_details').find('#buy_now').attr('class');
                $('.prod_details_sticky_div #add_to_cart').attr('class', addToCart);
                $('.prod_details_sticky_div #buy_now').attr('class', buyNow);
            }, 800);
        },
        showDropdown: function() {
            $(".te_custom_submenu").parent("li.nav-item").addClass("dropdown");
            $(".te_custom_submenu").siblings("a.nav-link").addClass("dropdown-toggle").attr("data-toggle", "dropdown");

           //Scroll up
            $(window).on('scroll',function() {
                if ($(this).scrollTop() > 300) {
                    $('.scrollup-div').fadeIn();
                } else {
                    $('.scrollup-div').fadeOut();
                }
            });
            $('.dropdown, header .js_language_selector .dropup').on('show.bs.dropdown', function() {
                $(this).find('.dropdown-menu').first().stop(true, true).slideDown(150);
            });
            $('.dropdown, header .js_language_selector .dropup').on('hide.bs.dropdown', function() {
                $(this).find('.dropdown-menu').first().stop(true, true).slideUp(150);
            });
        },
        showHeader:function(){
            var HHeight = $('header.o_affix_enabled').height();
            if($('#wrapwrap').hasClass('homepage')){
                $('#wrapwrap').addClass('header_top_overlay');
                $('#wrapwrap:not(.header_top_overlay)').css("margin-top", HHeight);
                $(window).on("scroll", function() {
                    var HeaderscrollTop = $(window).scrollTop();
                    if (HeaderscrollTop >= 196) {
                        $('body').addClass('fixed-header');
                    } else {
                        $('body').removeClass('fixed-header');
                    }
                });
            }
            if ($('.te_header_navbar_10').length) {
                var headerHeight = $('.te_header_navbar_10').height();
                $(window).scroll(function () {
                    var st = $(this).scrollTop();
                    if (st > headerHeight) {
                        $('body').addClass('fixed-header-10-bar');
                        $('.te_header_navbar_10').addClass('start-sticky');
                        $('.header.o_header_affix.affix.affixed').slideUp();
                    } else {
                        $('body').removeClass('fixed-header-10-bar');
                        $('.te_header_navbar_10').removeClass('start-sticky');
                        $('.header.o_header_affix.affix.affixed').slideDown();
                    }
                });
            }
            $(window).on("scroll", function() {
                var getPriceHtml = $('div#product_details .product_price').html();
                var HeaderscrollTop = $(window).scrollTop();
                /* For Header 9 scroll top*/
                if (HeaderscrollTop >= 72) {
                    $('body').addClass('fixed-header-bar');
                } else {
                    $('body').removeClass('fixed-header-bar');
                }
                /* For Header 11 scroll top*/
                if (HeaderscrollTop >= 44) {
                    $('body').addClass('fixed-header-top-bar');
                } else {
                    $('body').removeClass('fixed-header-top-bar');
                }

                // Sticky add to cart bar

                if($('.product_details_sticky').length){
                    if($('div#product_details a#add_to_cart').length){
                        var stickHeight = $('.product_details_sticky .prod_details_sticky_div').height();
                        var fixIconHeight10 = $('.te_header_icon_right').height();
                        var fixIconHeight11 = $('.head_11_rest_icons').height();
                        if ($(this).scrollTop() > $('div#product_details a#add_to_cart').offset().top) {
                            if ($(window).width() < 992){
                                if($('.fixed-header-10-bar').length){
                                    $('div#wrapwrap .product_details_sticky').css('bottom',fixIconHeight10+'px').fadeIn();
                                }
                                else{
                                    $('#product_detail').find('.o_product_feature_panel').css('bottom',stickHeight+'px').fadeIn();
                                }

                                if($('.fixed-header-top-bar').length){
                                    $('div#wrapwrap .product_details_sticky').css('bottom',fixIconHeight11+'px').fadeIn();
                                }
                                else{
                                    $('#product_detail').find('.o_product_feature_panel').css('bottom',stickHeight+'px').fadeIn();
                                }
                            }
                            else{
                                $('div#wrapwrap .product_details_sticky').fadeIn();
                            }

                            if ($(window).width() >= 992){
                                $('#product_detail').find('.o_product_feature_panel').css('bottom',stickHeight+'px').fadeIn();
                            }
                            else
                            {
                                $('div#wrapwrap .product_details_sticky').fadeIn();
                                if($('.fixed-header-10-bar').length){
                                    $('#product_detail').find('.o_product_feature_panel').css('bottom',(stickHeight + fixIconHeight10)+'px').fadeIn();
                                }
                                else{
                                    $('#product_detail').find('.o_product_feature_panel').css('bottom', fixIconHeight10+'px').fadeIn();
                                }
                                if($('.fixed-header-top-bar').length){
                                    $('#product_detail').find('.o_product_feature_panel').css('bottom',(stickHeight + fixIconHeight11)+'px').fadeIn();
                                }
                                else{
                                    $('#product_detail').find('.o_product_feature_panel').css('bottom', fixIconHeight11+'px').fadeIn();
                                }
                            }

                            /* Display prices on add to cart sticky*/
                            if( $( ".js_product.js_main_product" ).hasClass( "css_not_available" )){
                               $('div#wrapwrap .prod_price').html('');
                               //$(".product_details_sticky .prod_add_cart #add_to_cart, .product_details_sticky .prod_add_cart #buy_now").addClass('disabled');
                            }
                            else{
                                $('div#wrapwrap .prod_price').html(getPriceHtml);
                                //$(".product_details_sticky .prod_add_cart #add_to_cart, .product_details_sticky .prod_add_cart #buy_now").removeClass('disabled');
                            }

                            $(".product_details_sticky .prod_add_cart #add_to_cart").click(function(e){
                                if($('body').hasClass('editor_enable')){
                                    e.stopPropagation();
                                }
                                else{
                                    $("div#product_details .js_product.js_main_product #add_to_cart").trigger( "click" );
                                    return false;
                                }
                            });
                            $(".product_details_sticky .prod_add_cart #buy_now").click(function(e){
                                if($('body').hasClass('editor_enable')){
                                    e.stopPropagation();
                                }
                                else{
                                    $("div#product_details .js_product.js_main_product #buy_now").trigger( "click" );
                                    return false;
                                }
                            });
                        } else {
                            if ($(window).width() < 992){
                                if($('.fixed-header-10-bar').length){
                                    $('#product_detail').find('.o_product_feature_panel').css('bottom', fixIconHeight10+'px');
                                }
                                else{
                                    $('#product_detail').find('.o_product_feature_panel').css('bottom', '0px');
                                }

                                if($('.fixed-header-top-bar').length){
                                    $('#product_detail').find('.o_product_feature_panel').css('bottom', fixIconHeight11+'px');
                                }
                                else{
                                    $('#product_detail').find('.o_product_feature_panel').css('bottom', '0px');
                                }
                            }
                            else{
                                $('#product_detail').find('.o_product_feature_panel').css('bottom', '0px');
                            }
                            $('div#wrapwrap .product_details_sticky').fadeOut();
                        }
                    }
                }
             });
            if ($(window).width() > 991){
                 $( ".te_header_navbar_10" ).parent().css( "height", "98px" );
                 $(".te_header_navbar_10 #top_menu_collapse #top_menu > li").hover(
                    function() {
                        $(this).addClass('active_item');
                    }, function() {
                        $( this ).removeClass('active_item');
                    }
                );
            }
        },
        showFooter:function(){
            if ($(window).width() < 768){
                $('#footer .row > .footer-column-2 .footer_top_title_div').click(function() {
                  $(this).siblings('.te_footer_info_ept').toggleClass('active');
                  $(this).toggleClass('active');
                });
            }
        }
    });
});