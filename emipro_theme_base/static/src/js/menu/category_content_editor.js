odoo.define('emipro_theme_base.category_content_editor', function (require) {
'use strict';
    var core = require('web.core');
    var weWidgetsContentMenu = require('website.contentMenu');
    var qweb = core.qweb;
    var _t = core._t;

    weWidgetsContentMenu.EditMenuDialog.include({
        // Menu edit button click method
        _onEditMenuButtonClick: function (ev) {
            var $menu = $(ev.currentTarget).closest('[data-menu-id]');
            var menuID = $menu.data('menu-id');
            var menu = this.flat[menuID];
            if (menu) {
                var dialog = new weWidgetsMenuEntryDialog(this, {dialogClass: 'dialog_dynamic_menu',}, null, _.extend({
                    menuType: menu.fields['is_mega_menu'] ? 'mega' : undefined,
                    class: 'custom_class',
                }, menu.fields));
                dialog.on('save', this, link => {
                    _.extend(menu.fields, {
                        'name': link.text,
                        'url': link.url,
                        'is_dynamic_menu': link.is_dynamic_menu,
                        'menu_label_text': link.menu_label_text,
                        'menu_label_text_color': link.menu_label_text_color,
                    });
                    $menu.find('.js_menu_label').first().text(menu.fields['name']);
                });
                dialog.open();
            } else {
                Dialog.alert(null, "Could not find menu entry");
            }
        },
        // Add new menu button click method
        _onAddMenuButtonClick: function (ev) {
            var menuType = ev.currentTarget.dataset.type;
            var dialog = new weWidgetsMenuEntryDialog(this, {dialogClass: 'dialog_dynamic_menu'}, null, {
                menuType: menuType,
            });
            dialog.on('save', this, link => {
                var newMenu = {
                    'fields': {
                        'id': _.uniqueId('new-'),
                        'name': link.text,
                        'url': link.url,
                        'new_window': link.isNewWindow,
                        'is_mega_menu': menuType === 'mega',
                        'sequence': 0,
                        'parent_id': false,
                        'is_dynamic_menu': link.is_dynamic_menu,
                        'menu_label_text': link.menu_label_text,
                        'menu_label_text_color': link.menu_label_text_color,
                    },
                    'children': [],
                    'is_homepage': false,
                };
                this.flat[newMenu.fields['id']] = newMenu;
                this.$('.oe_menu_editor').append(
                    qweb.render('website.contentMenu.dialog.submenu', {submenu: newMenu})
                );
            });
            dialog.open();
        },
    });
    var weWidgetsMenuEntryDialog = weWidgetsContentMenu.MenuEntryDialog.extend({
    });
});