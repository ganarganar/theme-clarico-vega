# -*- coding: utf-8 -*-
"""
    This model is used to show the tab line filed in product template
"""
from harpiya.exceptions import Warning
from harpiya import fields, models, api


class ProductTemplate(models.Model):
    _inherit = "product.template"

    label_line_ids = fields.One2many('product.label.line', 'product_tmpl_id', 'Product Labels',
                                     help="Set the number of product labels")
    product_brand_ept_id = fields.Many2one(
        'product.brand.ept',
        string='Brand',
        help='Select a brand for this product'
    )
    tab_line_ids = fields.One2many('product.tab.line', 'product_id', 'Product Tabs', help="Set the product tabs")
    connector_id = fields.One2many('product.connector.line', 'product_id', 'Entegrasyonlar', elp="Set the product tabs")

    @api.constrains('tab_line_ids')
    def check_tab_lines(self):
        if len(self.tab_line_ids) > 4:
            raise Warning("You can not create more then 4 tabs!!")
