//--------------------------------------------------------------------------
// Modify Timer in Offer Timer Snippet
//--------------------------------------------------------------------------
harpiya.define('theme_clarico_vega.editor_js',function(require) {
'use strict';
    var core = require('web.core');
    var options = require('web_editor.snippets.options');
    var wUtils = require('website.utils');
    var _t = core._t;
        var set_timer = options.Class.extend({
            popup_template_id: "editor_new_product_slider_template",
            popup_title: _t("Set Offer Timer"),
            date_configure: function(type,value) {
                var self = this;
                var def = wUtils.prompt({
                    'id': this.popup_template_id,
                    'window_title': this.popup_title,
                     input: "Date",init: function (date) {
                        var $group = this.$dialog.find('div.form-group');
                        /*$group.find('input').attr("placeholder","Time Format Ex. Oct 01, 2019 13:00:00")*/
                        var days = 1;
                        var date = new Date(Date.now()+days*24*60*60*1000).toDateString();
                        $group.find('input').after("<span class='show-format-span'>Time Format Ex. "+ date.substr(date.indexOf(' ')+ 1) +" 13:00:00</span>");
                    }
                });
                def.then(function (date, $dialog) {
                    var dt = new Date(date.val);
                    var dts=(dt.toString());
                    if(dts == 'Invalid Date')
                        {
                            alert("Invalid Time Format. Please enter correct format of Time")
                            self.$target.attr("data-date","nan");
                            self.date_configure('click')
                        }
                    else
                        {
                            self.$target.attr("data-date", date.val);
                            var dialog = self.$($dialog).find('.btn-primary');
                            dialog.trigger('click');
                        }

                });
                return def;
            },
             onBuilt: function () {
                var self = this;
                this._super();
                this.date_configure('click').guardedCatch(function () {
                    self.getParent()._onRemoveClick($.Event( "click" ));
                });
             },
        });
        options.registry.js_timer = set_timer.extend({
            cleanForSave: function(){
                this.$target.empty();
            }
        });
});
    
