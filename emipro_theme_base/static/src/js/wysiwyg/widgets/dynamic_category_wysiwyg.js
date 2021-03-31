odoo.define('emipro_theme_base.dynamic_category_wysiwyg', function (require) {
'use strict';
    var LinkDialog = require('wysiwyg.widgets.LinkDialog')
    var Dialog = require('web.Dialog');
    var weWidgets = require('wysiwyg.widgets');

    weWidgets.LinkDialog.include({
        // Menu data save button click method
        save: function () {
          var data = this._getData();
          if (data != null) {
            data.is_dynamic_menu = this.$('input[name="is_dynamic_menu"]').prop('checked') || false;
            data.menu_label_text = this.$('input[name="menu_label_text"]').val();
            data.menu_label_text_color = this.$('input[name="menu_label_text_color"]').val();
            this.data.is_dynamic_menu = data.is_dynamic_menu;
            this.data.menu_label_text = data.menu_label_text;
            this.data.menu_label_text_color = data.menu_label_text_color;
          }
          return this._super.apply(this, arguments);
        },
    });

});