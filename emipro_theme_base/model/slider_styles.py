# -*- coding: utf-8 -*-
"""
    This model is used to create a slider styles fields
"""
from odoo import api, fields, models, _

class SliderStyles(models.Model):
    _name = "slider.styles"
    _description = "Slider Styles"

    name = fields.Char(string='Name', required=True)
    theme_id = fields.Many2one('ir.module.module', string="Theme", required=True)

