# -*- coding: utf-8 -*-
"""
    This model is used to create a product line fields like product template id,website id and label
"""

from odoo import api, fields, models


class ProductLabelLine(models.Model):
    _name = "product.label.line"
    _description = 'Product Template Label Line'

    product_tmpl_id = fields.Many2one('product.template', string='Product Template Id',required=True)
    website_id = fields.Many2one('website',string="Website",required=True)
    label = fields.Many2one('product.label',required=True,string="Label",help="Name of the product label")
    _sql_constraints = [('product_tmpl_id', 'unique (product_tmpl_id,website_id)',
                         'Duplicate records in label line not allowed !')]