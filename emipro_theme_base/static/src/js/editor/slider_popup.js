//--------------------------------------------------------------------------
// Product Slider and Category Popup
//--------------------------------------------------------------------------
odoo.define('website_slider.editor', function (require) {
'use strict';

    var core = require('web.core');
    var rpc = require('web.rpc');
    var weContext = require('web_editor.context');
    var options = require('web_editor.snippets.options');
    var wUtils = require('website.utils');
    var WysiwygMultizone = require('web_editor.wysiwyg.multizone');
    var _t = core._t;

        var snippets_slider_common = options.Class.extend({
            popup_template_id: "snippets_list",
            popup_title: _t("Add Slider"),
            select_snippet_list: function (previewMode, value) {
                var self = this;
                var def = wUtils.prompt({
                    'id': this.popup_template_id,
                    'window_title': this.popup_title,
                    'select': _t("Product"),
                    'init': function (field) {
                        return rpc.query({
                                model: 'slider',
                                method: 'name_search',
                                args: ['', [['website_id','in',[false,parseInt($("html").attr("data-website-id"))]],['website_published','=',true]]],
                                context: weContext.get(),
                            });
                    },
                });
                def.then(function (slider_id) {
                    self.$target.attr("data-slider-id", slider_id.val);
                });
                return def;
            },
            onBuilt: function () {
                var self = this;
                this._super();
                this.select_snippet_list('click').guardedCatch(function () {
                    self.getParent()._onRemoveClick($.Event( "click" ));
                });
            },
        });
        options.registry.product_list_slider = snippets_slider_common.extend({
            cleanForSave: function () {
                this.$target.addClass("hidden");
            },
        });


        var snippets_slider_category = options.Class.extend({
            popup_template_id: "snippets_list_category",
            popup_title: _t("Add Category Discount Slider"),
            select_snippet_list: function (previewMode, value) {
                var self = this;
                var def = wUtils.prompt({
                    'id': this.popup_template_id,
                    'window_title': this.popup_title,
                    'select': _t("Slider Style"),
                    'init': function (field) {
                        var $form = this.$dialog.find('div.form-group');
                        $form.append('<div class="te_style_image_block style-1"></div>');
                        return rpc.query({
                                model: 'slider.styles',
                                method: 'name_search',
                                context: weContext.get(),
                            });
                    },
                });
                def.then(function (style_id) {
                    self.$target.attr("data-slider-style-id", style_id.val);
                });
                return def;
            },
            onBuilt: function () {
                var self = this;
                this._super();
                this.select_snippet_list('click').guardedCatch(function () {
                    self.getParent()._onRemoveClick($.Event( "click" ));
                });
            },
        });
        options.registry.category_discount_list = snippets_slider_category.extend({
            cleanForSave: function () {
                this.$target.addClass("hidden");
            },
        });


        var snippets_slider_allproduct = options.Class.extend({
            popup_template_id: "snippets_list_allproduct",
            popup_title: _t("Add All Product Discount Slider"),
            select_snippet_list: function (previewMode, value) {
                var self = this;
                var def = wUtils.prompt({
                    'id': this.popup_template_id,
                    'window_title': this.popup_title,
                    'select': _t("Slider Style"),
                    'init': function (field) {
                        var $form = this.$dialog.find('div.form-group');
                        $form.append('<div class="te_style_image_block style-1"></div>')
                        return rpc.query({
                                model: 'slider.styles',
                                method: 'name_search',
                                context: weContext.get(),
                            });
                    },
                });
                def.then(function (style_id) {
                    self.$target.attr("data-slider-style-id", style_id.val);
                });
                return def;
            },
            onBuilt: function () {
                var self = this;
                this._super();
                this.select_snippet_list('click').guardedCatch(function () {
                    self.getParent()._onRemoveClick($.Event( "click" ));
                });
            },
        });
        options.registry.allproduct_discount_list = snippets_slider_allproduct.extend({
            cleanForSave: function () {
                this.$target.addClass("hidden");
            },
        });

        var snippets_slider_product = options.Class.extend({
            popup_template_id: "snippets_list_product",
            popup_title: _t("Add Product Discount Slider"),
            select_snippet_list: function (previewMode, value) {
                var self = this;
                var def = wUtils.prompt({
                    'id': this.popup_template_id,
                    'window_title': this.popup_title,
                    'select': _t("Slider Style"),
                    'init': function (field) {
                        var $form = this.$dialog.find('div.form-group');
                        $form.append('<div class="te_style_image_block style-1"></div>')
                        return rpc.query({
                                model: 'slider.styles',
                                method: 'name_search',
                                context: weContext.get(),
                            });
                    },
                });
                def.then(function (style_id) {
                    self.$target.attr("data-slider-style-id", style_id.val);
                });
                return def;
            },
            onBuilt: function () {
                var self = this;
                this._super();
                this.select_snippet_list('click').guardedCatch(function () {
                    self.getParent()._onRemoveClick($.Event( "click" ));
                });
            },
        });
        options.registry.product_discount_list = snippets_slider_product.extend({
            cleanForSave: function () {
                this.$target.addClass("hidden");
            },
        });


        var snippets_slider_best_seller = options.Class.extend({
            popup_template_id: "snippets_list_best_seller",
            popup_title: _t("Add Best Seller Slider"),
            select_snippet_list: function (previewMode, value) {
                var self = this;
                var def = wUtils.prompt({
                    'id': this.popup_template_id,
                    'window_title': this.popup_title,
                    'select': _t("Slider Style"),
                    'init': function (field) {
                        var $form = this.$dialog.find('div.form-group');
                        $form.append('<div class="te_style_image_block style-1"></div>')
                        return rpc.query({
                                model: 'slider.styles',
                                method: 'name_search',
                                context: weContext.get(),
                            });
                    },
                });
                def.then(function (style_id) {
                    self.$target.attr("data-slider-style-id", style_id.val);
                });
                return def;
            },
            onBuilt: function () {
                var self = this;
                this._super();
                this.select_snippet_list('click').guardedCatch(function () {
                    self.getParent()._onRemoveClick($.Event( "click" ));
                });
            },
        });
        options.registry.best_seller_discount_list = snippets_slider_best_seller.extend({
            cleanForSave: function () {
                this.$target.addClass("hidden");
            },
        });


        var snippets_slider_new_product = options.Class.extend({
            popup_template_id: "snippets_list_new_product",
            popup_title: _t("Add New Products Slider"),
            select_snippet_list: function (previewMode, value) {
                var self = this;
                var def = wUtils.prompt({
                    'id': this.popup_template_id,
                    'window_title': this.popup_title,
                    'select': _t("Slider Style"),
                    'init': function (field) {
                        var $form = this.$dialog.find('div.form-group');
                        $form.append('<div class="te_style_image_block style-1"></div>')
                        return rpc.query({
                                model: 'slider.styles',
                                method: 'name_search',
                                context: weContext.get(),
                            });
                    },
                });
                def.then(function (style_id) {
                    self.$target.attr("data-slider-style-id", style_id.val);
                });
                return def;
            },
            onBuilt: function () {
                var self = this;
                this._super();
                this.select_snippet_list('click').guardedCatch(function () {
                    self.getParent()._onRemoveClick($.Event( "click" ));
                });
            },
        });
        options.registry.new_product_discount_list = snippets_slider_new_product.extend({
            cleanForSave: function () {
                this.$target.addClass("hidden");
            },
        });


        var snippets_slider_category_products = options.Class.extend({
            popup_template_id: "snippets_list_category_products",
            popup_title: _t("Add New Category Products Slider"),
            select_snippet_list: function (previewMode, value) {
                var self = this;
                var def = wUtils.prompt({
                    'id': this.popup_template_id,
                    'window_title': this.popup_title,
                    'select': _t("Select Style"),
                    'init': function (field) {
                        var $form = this.$dialog.find('div.form-group');
                        $form.prepend('<label class="col-md-4 col-form-label">Select Category:</label><div class="width_div col-md-8"><select multiple class="form-control" id="slider_category_option"></select></div><label class="col-md-4 col-form-label" for="is_discount_products">Is Discount Products</label><div class="col-sm-8 pt-2"><label class="o_switch pt-1" for="is_discount_products"><input type="checkbox" name="is_discount_products" id="is_discount_products"><span></span></label></div>');
                        $form.append('<div class="te_style_image_block style-1"></div>');
                        var slider_styles = rpc.query({
                            model: 'product.public.category',
                            method: 'name_search',
                            args: ['', [['website_id','in',[false,parseInt($("html").attr("data-website-id"))]]]],
                            context: weContext.get(),
                        });
                        slider_styles.then(function (data) {
                            $.each(data, function(key, value) {
                                 $('#slider_category_option')
                                     .append($("<option></option>")
                                                .attr("value",value[0])
                                                .text(value[1]));
                            });
                        });
                        return rpc.query({
                            model: 'slider.styles',
                            method: 'name_search',
                            context: weContext.get(),
                        });
                    },
                });
                def.then(function (data) {
                    var dialog = data.dialog;
                    if(dialog)
                    {
                        var category_ids = dialog.find('#slider_category_option').val();
                        var discount = dialog.find('input[name="is_discount_products"]').prop('checked');
                        self.$target.attr("data-slider-category-id", category_ids);
                        self.$target.attr("data-slider-style-id", data.val);
                        self.$target.attr("data-discount", discount);
                    }
                });
                return def;
            },
            onBuilt: function () {
                var self = this;
                this._super();
                this.select_snippet_list('click').guardedCatch(function () {
                    self.getParent()._onRemoveClick($.Event( "click" ));
                });
            },
        });
        options.registry.category_products_list = snippets_slider_category_products.extend({
            cleanForSave: function () {
                this.$target.addClass("hidden");
            },
        });

        WysiwygMultizone.include({

            start: function () {
                $(document).on('change', '#snippets_list_allproduct .form-control, #snippets_list_product .form-control,#snippets_list_category .form-control,#snippets_list_best_seller .form-control,#snippets_list_new_product .form-control,#snippets_list_category_products .form-control',function(){
                    $(this).parents("form").find(".te_style_image_block").attr("class","te_style_image_block style-"+this.value);
                });
                $('.common_carousel_emp_ept').carousel();
                $('.common_carousel_emp_ept').carousel({
                  interval: 3000
                });
                $('.common_carousel_emp_ept .carousel-item').each(function(){
                    $(this).children().not(':first').remove();

                    for (var i=0;i<2;i++) {
                        $(this).children().not(':first').remove();
                    }
                });

                $("#top_menu > .dropdown").each(function() {
                    $(this).hover(function() {
                        $(this).removeClass('open');
                    });
                });

                return this._super.apply(this, arguments);
            },
        /**
         * @override
         */
            _saveElement: function (outerHTML, recordInfo, editable) {
                var promises = [];

                var $el = $(editable);
                var oldHtml = $(outerHTML);
                oldHtml.find("[data-isemipro='true'],.te_brand_slider,.te_category_slider").empty();
                /* Apply Lazyload for all snippet images*/
                if($('#id_lazyload').length) {
                    if(oldHtml.find('img.lazyload').length){
                        $.each(oldHtml.find('img.lazyload'), function(index, value){
                            var getDataSrcVal = $(value).attr('data-src');
                            var getSrcVal = $(value).attr('src');
                            var getClass = $(value).attr('class');
                            var getWeb = $('.current_website_id').val();
                            if(getDataSrcVal == undefined || getDataSrcVal != ''){
                                $(value).attr('src', '/web/image/website/'+ getWeb +'/lazy_load_image');
                                $(value).attr('data-src', getSrcVal);
                            }
                        });
                    }
                }
                var updateHtml = oldHtml[0].outerHTML;
                // Saving a view content
                var viewID = $el.data('oe-id');
                if (viewID) {
                    promises.push(this._rpc({
                        model: 'ir.ui.view',
                        method: 'save',
                        args: [
                            viewID,
                            updateHtml,
                            $el.data('oe-xpath') || null,
                        ],
                        context: recordInfo.context,
                    }));
                }

                // Saving mega menu options
                if ($el.data('oe-field') === 'mega_menu_content') {
                    // On top of saving the mega menu content like any other field
                    // content, we must save the custom classes that were set on the
                    // menu itself.
                    // FIXME normally removing the 'show' class should not be necessary here
                    // TODO check that editor classes are removed here as well
                    var classes = _.without($el.attr('class').split(' '), 'dropdown-menu', 'o_mega_menu', 'show');
                    promises.push(this._rpc({
                        model: 'website.menu',
                        method: 'write',
                        args: [
                            [parseInt($el.data('oe-id'))],
                            {
                                'mega_menu_classes': classes.join(' '),
                            },
                        ],
                    }));
                }

                // Saving cover properties on related model if any
                var prom = this._saveCoverProperties(editable);
                if (prom) {
                    promises.push(prom);
                }

                return Promise.all(promises);
            }
        });
});
