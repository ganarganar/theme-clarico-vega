# -*- coding: utf-8 -*-
"""
    This model is used to create a website wise dynamic category listing
"""

from odoo import api, fields, models

class WebsiteMenu(models.Model):

    _inherit = 'website.menu'

    is_dynamic_menu = fields.Boolean(string="Is Dynamic Menu", default=False)
    menu_label_text = fields.Char(string="Menu Label Text", default=False,
                                    help="Menu Label text to display on the menu link", translate=True)
    menu_label_text_color = fields.Char(string="Menu Label Text Color", default=False)

    # Overide get_tree method to add is_dynamic_menu field
    @api.model
    def get_tree(self, website_id, menu_id=None):
        """
        Overide get_tree method to add custom is_dynamic_menu field
        :param website_id: current website id
        :param menu_id: menu id default none
        :return: make_tree function which is recursively called
        """
        def make_tree(node):
            is_homepage = bool(node.page_id and self.env['website'].browse(website_id).homepage_id.id == node.page_id.id)
            menu_node = {
                'fields': {
                    'id': node.id,
                    'name': node.name,
                    'url': node.page_id.url if node.page_id else node.url,
                    'new_window': node.new_window,
                    'is_mega_menu': node.is_mega_menu,
                    'sequence': node.sequence,
                    'parent_id': node.parent_id.id,
                    'is_dynamic_menu': node.is_dynamic_menu,
                    'menu_label_text': node.menu_label_text,
                    'menu_label_text_color': node.menu_label_text_color,
                },
                'children': [],
                'is_homepage': is_homepage,
            }
            for child in node.child_id:
                menu_node['children'].append(make_tree(child))
            return menu_node

        menu = menu_id and self.browse(menu_id) or self.env['website'].browse(website_id).menu_id
        return make_tree(menu)