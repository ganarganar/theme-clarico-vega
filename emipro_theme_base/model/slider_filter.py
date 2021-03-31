# -*- coding: utf-8 -*-
"""
    This model is used to create a slider filter fields
"""
from odoo import api, fields, models, _
from odoo.tools.safe_eval import safe_eval
from odoo.exceptions import UserError, ValidationError


class SliderFilter(models.Model):
    _name = "slider.filter"
    _order = "sequence asc"
    _description = "Slider Filter"

    name = fields.Char(string="Name", required=True, translate=True)
    sequence = fields.Integer(string='Sequence')
    website_published = fields.Boolean(string='Website Publish',default=True)
    filter_id = fields.Many2one('ir.filters', 'Filter', required=True,help="Product filter for slider items")
    slider_id = fields.Many2one('slider', string='Filter Product')

    def website_publish_button(self):
        """
        Set slider filter published and unpublished on website
        :return:
        """
        if self.website_published:
            self.write({'website_published': False})
        else:
            self.write({'website_published': True})

    @api.onchange('filter_id')
    def _onchange_filter_id(self):
        """
        If selected Filter has no any product the raise the warning and remove that filter
        :return:
        """
        if self.filter_id:
            domain = safe_eval(self.filter_id.domain)
            domain += ['|', ('website_id', '=', None), ('website_id', '=', self.slider_id.website_id.id),
                       ('website_published', '=', True)]
            product_count = self.env['product.template'].sudo().search_count(domain)
            if product_count < 1:
                self.filter_id = False
                raise UserError(_('Sorry! You can not set filter which is content zero product.'))
