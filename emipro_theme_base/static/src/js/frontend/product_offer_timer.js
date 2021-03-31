odoo.define('emipro_theme_base.product_offer_timer', function(require) {
    'use strict';

    var sAnimations = require('website.content.snippets.animation');
    var publicWidget = require('web.public.widget');
    var timer;
    var core = require('web.core');
    var _t = core._t;

    sAnimations.registry.WebsiteSale.include({
     	/**
    	 * added a product Timer
    	 */
    	_onChangeCombination:function (ev, $parent, combination) {
    	/**
    	* while change the product attribute
    	*/
            this._super.apply(this, arguments);
            var current_date = combination.current_date
            var start_date = combination.start_date
            var end_date= combination.end_date
            var msg= combination.offer_msg
            if(end_date != parseInt($(".end_date").val())) {
                if(combination.is_offer && combination.current_date !== 'undefined') {
                    var append_date = "<div class='timer_input'><input type='hidden' class='current_date' value="+ current_date+"></input><input type='hidden' class='start_date' value="+ start_date +"></input><input type='hidden' class='end_date' value="+ end_date +"></input><p class='te_offer_timer_prod'>"+msg+"</p></div>"
                    $(".timer_data").html(append_date);
                    $(".current_date").trigger('change');
                } else {
                    $("#timer_portion_content_ept").removeClass("d-none");
                    var append_date = "<div class='timer_input'><input type='hidden' class='current_date' value="+ 0+"></input><input type='hidden' class='start_date' value="+ 0 +"></input><input type='hidden' class='end_date' value="+ 0 +"></input></div>"
                    $(".timer_data").html(append_date);
                    $(".current_date").trigger('change');
                }
            }
            if(combination.has_discounted_price) {
                 $(".js_product .te_discount").show();
                 var difference = combination.list_price - combination.price;
                 var discount = Math.round(difference*100/combination.list_price);
                 $(".js_product .te_discount .oe_currency_value").html(difference.toFixed(2));
                 $(".js_product .te_discount .te_percentage").html("("+discount+"%)");
            } else{
                $(".js_product .te_discount").hide();
            }
            setTimeout(function () {
                var addToCart = $('#product_details').find('#add_to_cart').attr('class');
                var buyNow = $('#product_details').find('#buy_now').attr('class');
                $('.prod_details_sticky_div #add_to_cart').attr('class', addToCart);
                $('.prod_details_sticky_div #buy_now').attr('class', buyNow);
            }, 200);
        },
    });
    publicWidget.registry.timer_data = publicWidget.Widget.extend({
        selector: ".timer_data",
        events: {
            'change .current_date':'initOfferTimer',
        },
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
        },
        initOfferTimer: function() {
            /* This method is called for initialize and update the offer timer in at product page*/
            var product_offer;
        	clearInterval(timer);
            var count_start_date = parseInt($(".start_date").val());
            var count_end_date = parseInt($(".end_date").val());
            var current_date_time = parseInt($(".current_date").val());
            var current_date = current_date_time
            $("#timer_portion_content_ept").addClass("d-none");
            timer = setInterval(function() {
                if (count_start_date <= current_date && count_end_date >= current_date) {
                    var duration = count_end_date - current_date;
                    product_offer = true;
                } else {
                    product_offer = false;
                }
                if (duration > 0) {
                    var days = Math.floor(duration / (1000 * 60 * 60 * 24));
                    var hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    var minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((duration % (1000 * 60)) / 1000);

                    if ((seconds + '').length == 1) {
                        seconds = "0" + seconds;
                    }
                    if ((days + '').length == 1) {
                        days = "0" + days;
                    }
                    if ((hours + '').length == 1) {
                        hours = "0" + hours;
                    }
                    if ((minutes + '').length == 1) {
                        minutes = "0" + minutes;
                    }
                }

                // If the count down is over, write some text
                if (duration <= 0) {
                    clearInterval(timer);
                    seconds = "00";
                    days = "00";
                    minutes = "00";
                    hours = "00";
                }
                if (product_offer == true && duration > 0) {
                      $("#days").text(days);
                      $("#hours").text(hours);
                      $("#minutes").text(minutes);
                      $("#seconds").text(seconds);
                      $(".te_offer_timer_prod").css("display", "block");
                      $("#timer_portion_content_ept").removeClass("d-none");
                }
                current_date= current_date+1000
            }, 1000);
        }

    });

});