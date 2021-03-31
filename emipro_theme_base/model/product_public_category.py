# -*- coding: utf-8 -*-

"""
    This model is used to create a html field.
"""

from odoo import api, fields, models, _
from odoo.exceptions import UserError, ValidationError


class ProductPublicCategory(models.Model):
    _inherit = "product.public.category"

    allow_in_category_carousel = fields.Boolean(string='Allow In Category Slider',help="You can set this category in category carousel snippets.")
    is_category_page = fields.Boolean(string='Allow Category Page', help="It will set the separate page for this category")
    category_page = fields.Many2one("website.page", string="Select Page",
                                 help="Select the page which you want to set for this category.")

    @api.constrains('allow_in_category_carousel')
    def validate_category_carousel(self):
        if not self.image_1920 and self.allow_in_category_carousel:
            raise ValidationError(
                _("Please set the category image before set this in carousel"))

