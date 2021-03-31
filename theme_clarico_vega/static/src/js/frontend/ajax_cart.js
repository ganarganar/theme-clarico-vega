odoo.define('theme_clarico_vega.ajax_cart', function (require) {
    "use strict";
    var sAnimations = require('website.content.snippets.animation');
    var publicWidget = require('web.public.widget');
    var core = require('web.core');
     var ajax = require('web.ajax');
    var _t = core._t;
    var WebsiteSale = new sAnimations.registry.WebsiteSale();
    var QWeb = core.qweb;
    var xml_load = ajax.loadXML(
        '/website_sale_stock/static/src/xml/website_sale_stock_product_availability.xml',
        QWeb
    );
    /*var OptionalProductsModal = require('sale_product_configurator.OptionalProductsModal');*/
    var flag = 1;

    publicWidget.registry.WebsiteSale.include({
        _submitForm: function () {
            var $productCustomVariantValues = $('<input>', {
                name: 'product_custom_attribute_values',
                type: "hidden",
                value: JSON.stringify(this.rootProduct.product_custom_attribute_values)
            });
            this.$form.append($productCustomVariantValues);

            var $productNoVariantAttributeValues = $('<input>', {
                name: 'no_variant_attribute_values',
                type: "hidden",
                value: JSON.stringify(this.rootProduct.no_variant_attribute_values)
            });
            this.$form.append($productNoVariantAttributeValues);

            if (this.isBuyNow) {
                this.$form.append($('<input>', {name: 'express', type: "hidden", value: true}));
                this.$form.trigger('submit', [true]);
                return new Promise(function () {});
            }

            /*this.$form.trigger('submit', [true]);*/

            /*return new Promise(function () {});*/
            var frm = this.$form
            var variant_count = frm.find('#add_to_cart').attr('variant-count');
            var is_product = $(".not_product_page").length;
            var is_ajax_cart = frm.find('.a-submit').hasClass('ajax-add-to-cart');
            var is_quick_view = frm.find('.a-submit').hasClass('quick-add-to-cart');
            var product_id = frm.find('#add_to_cart').attr('product-id');
            if(!product_id) {
               product_id = frm.find('.a-submit').attr('product-id');
            }
            if(!variant_count) {
               variant_count = frm.find('.a-submit').attr('variant-count');
            }
            /** Stock availability message for ajax cart popup */
            var combination = [];
            xml_load.then(function () {
                var $message = $(QWeb.render(
                    'website_sale_stock.product_availability',
                    combination
                ));
                $('div.availability_messages').html($message);
            });
            if(/*variant_count == 1 || */is_product == 0 || is_ajax_cart || is_quick_view) {
                /** if product has no variant then success popup will be opened */
                var product_product = frm.find('input[name="product_id"]').val();
                var quantity = frm.find('.quantity').val();
                if(!quantity) {
                   quantity = 1;
                }
                ajax.jsonRpc('/shop/cart/update_custom', 'call',{'product_id':product_product,'add_qty':quantity}).then(function(data) {
                    var ajaxCart = new publicWidget.registry.ajax_cart();
                    if(data) {
                        var $quantity = $(".my_cart_quantity");
                        var old_quantity = $quantity.html();
                        $quantity.parent().parent().removeClass('d-none');
                        $quantity.html(parseInt(quantity) + parseInt(old_quantity)).hide().fadeIn(600);

                        $('.ajax_cart_modal > .close').trigger('click');
                        $('.quick_view_modal > .close').trigger('click');
                        if(!product_id) {
                            product_id = frm.find('.product_template_id').attr('value');
                        }
                        setTimeout(function(){
                            ajaxCart.ajaxCartSucess(product_id);
                        }, 700);
                    }
                });
            } else {
            /** if product has multiple variants then variant selection popup will be opened */
                ajax.jsonRpc('/ajax_cart_item_data', 'call',{'product_id':product_id}).then(function(data) {
                    if($("#wrap").hasClass('js_sale'))
                    {
                        $("#ajax_cart_model_shop .modal-body").html(data);
                        $("#ajax_cart_model_shop").modal({keyboard: true});
                    } else {
                        $("#ajax_cart_model .modal-body").html(data);
                        $("#ajax_cart_model").modal({keyboard: true});
                    }
                    $('#ajax_cart_model, #ajax_cart_model_shop').removeClass('ajax-sucess');
                    $('#ajax_cart_model, #ajax_cart_model_shop').addClass('ajax-cart-item');

                    /** trigger click event for the variant change and qty */
                    if (flag) {
                        var WebsiteSale = new sAnimations.registry.WebsiteSale();
                        WebsiteSale.init();
                        $(document).on('click', 'input.js_product_change', function(ev){
                            WebsiteSale.onChangeVariant(ev);
                        });
                        $(document).on('change', '.js_main_product [data-attribute_exclusions]', function(ev){
                            WebsiteSale.onChangeVariant(ev);
                        });
                        $(document).on('change', 'form .js_product:first input[name="add_qty"]', function(ev){
                            WebsiteSale._onChangeAddQuantity(ev);
                        });
                        $(document).on('click', 'a.js_add_cart_json', function(ev){
                            WebsiteSale._onClickAddCartJSON(ev);
                        });
                        flag = 0;
                     }

                    /** Product gallery will be refreshed */

                    setTimeout(function(){
                        $('.ajax_cart_content #product_detail #thumbnailSlider').show();
                        var theme_script = new sAnimations.registry.product_detail();
                        theme_script.productGallery();
                        $('#mainSlider .owl-carousel').trigger('refresh.owl.carousel');
                        $('#thumbnailSlider .owl-carousel').trigger('refresh.owl.carousel');
                    }, 200);
                    $('.variant_attribute  .list-inline-item input:checked').parents('.list-inline-item').addClass('active_li');
                    $(".variant_attribute li").each(function() {
                        if($(this).find('.css_attribute_color').hasClass('active')) {
                            $(this).parent('.list-inline-item').addClass('active_li');
                        }
                    });

                    $( ".list-inline-item .css_attribute_color" ).change(function() {
                        $('.list-inline-item').removeClass('active_li');
                        $(this).parent('.list-inline-item').addClass('active_li');
                    });
                    setTimeout(function(){
                        $('.ajax_cart_content').find('.quantity').val('1').trigger('change');
                    },500);
                });
            }
        },
        _onClickSubmit: function (ev, forceSubmit) {
            if ($(ev.currentTarget).is('#add_to_cart, #products_grid .a-submit') && !forceSubmit) {
                return;
            }
            var $aSubmit = $(ev.currentTarget);
            if (!ev.isDefaultPrevented() && !$aSubmit.is(".disabled")) {
                ev.preventDefault();
                var is_quick_view = $aSubmit.hasClass('quick-add-to-cart');
                if (is_quick_view || ($('#ajax_cart_template').val() == 1 && $aSubmit.parents('.te_pc_style_main').length) ) {
                    var frm = $aSubmit.closest('form');
                    var product_product = frm.find('input[name="product_id"]').val();
                    var quantity = frm.find('.quantity').val();
                    if(!quantity) {
                       quantity = 1;
                    }
                    ajax.jsonRpc('/shop/cart/update_custom', 'call',{'product_id':product_product,'add_qty':quantity}).then(function(data) {
                        var ajaxCart = new publicWidget.registry.ajax_cart();
                        if(data) {
                            var $quantity = $(".my_cart_quantity");
                            var old_quantity = $quantity.html();
                            $quantity.parent().parent().removeClass('d-none');
                            $quantity.html(parseInt(quantity) + parseInt(old_quantity)).hide().fadeIn(600);

                            $('.ajax_cart_modal > .close').trigger('click');
                            $('.quick_view_modal > .close').trigger('click');
                            var product_id = frm.find('.product_template_id').attr('value');
                            setTimeout(function(){
                                ajaxCart.ajaxCartSucess(product_id);
                            }, 700);
                        }
                    });
                } else {
                    $aSubmit.closest('form').submit();
                    $('.ajax_cart_modal > .close').trigger('click');
                    $('.quick_view_modal > .close').trigger('click');
                }
            }
            if ($aSubmit.hasClass('a-submit-disable')){
                $aSubmit.addClass("disabled");
            }
            if ($aSubmit.hasClass('a-submit-loading')){
                var loading = '<span class="fa fa-cog fa-spin"/>';
                var fa_span = $aSubmit.find('span[class*="fa"]');
                if (fa_span.length){
                    fa_span.replaceWith(loading);
                } else {
                    $aSubmit.append(loading);
                }
            }
        }
    });
    publicWidget.registry.ajax_cart = publicWidget.Widget.extend({
        selector: ".oe_website_sale",
        ajaxCartSucess: function(product_id){
            /** Success popup */
            ajax.jsonRpc('/ajax_cart_sucess_data', 'call',{'product_id':product_id}).then(function(data) {
                if($("#wrap").hasClass('js_sale')) {
                    $("#ajax_cart_model_shop .modal-body").html(data);
                    $("#ajax_cart_model_shop").modal({keyboard: true});
                } else {
                    $("#ajax_cart_model .modal-body").html(data);
                    $("#ajax_cart_model").modal({keyboard: true});
                }
                $('#ajax_cart_model, #ajax_cart_model_shop').removeClass('ajax-cart-item');
                $('#ajax_cart_model, #ajax_cart_model_shop').addClass('ajax-sucess');

            });
        }
    });
    $(document).on('click', '.ajax-sucess-continue', function(){
        $('.ajax_cart_modal > .close').trigger('click');
    });
    if (!$('#ajax_cart_product_template').length) {
        $(document).on('click', '.oe_website_sale #add_to_cart', async function(ev){
            if($('#add_to_cart').hasClass('quick-add-to-cart') || $('.a-submit').attr('optional-product') == 1) {
                ev.preventDefault();
            } else {
                var is_quick_view = $('#add_to_cart').hasClass('quick-add-to-cart');
                if(!is_quick_view) {
                    ev.preventDefault();
                    WebsiteSale._onClickAdd(ev);
                }
            }
        });
    }
});
