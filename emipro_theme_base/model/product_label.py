# -*- coding: utf-8 -*-
"""
    This model is used to create a product line field
"""
from odoo import models, fields, api

class product_label(models.Model):
    _name = "product.label"
    _description = "Product Label"

    name = fields.Char("Name", required=True, translate=True,help="Name of the sale label")
    font_html_color = fields.Char(
        string='Font Color',
        help="Here you can set a specific HTML color index (e.g. #ff0000) to display the color of product label text.")
    html_color = fields.Char(
        string='Color',
        help="Here you can set a specific HTML color index (e.g. #ff0000) to display the color of product label.")
    label_style = fields.Selection([
        ('style_1', 'Style 1'),
        ('style_2', 'Style 2'),
        ('style_3', 'Style 3'),
        ('style_4', 'Style 4'),
        ('style_5', 'Style 5')
    ], string="Select the style for label",
        required=True, default='style_1', readonly=False)
