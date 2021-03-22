# -*- coding: utf-8 -*-
"""
    This model is used to create a quick filter boolean field in attributes
"""

from harpiya import fields, models


class ProductAttribute(models.Model):
    _inherit = ['product.attribute']
    
    is_quick_filter = fields.Boolean(string='Quick Filter',help="It will show this attribute in quick filter")
    website_ids = fields.Many2many('website', help="You can set the filter in particular website.")
  
