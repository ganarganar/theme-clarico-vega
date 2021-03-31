# -*- coding: utf-8 -*-
"""
    This model is used to create a slider template
"""
from odoo import api, fields, models, _
from odoo.exceptions import UserError, ValidationError


class Slider(models.Model):
    _name = "slider"
    _inherit = ['website.published.multi.mixin']
    _description = "Slider Carousel"

    name = fields.Char(string='Name', required=True)
    website_id = fields.Many2one("website", string="Website", required=True)
    theme_id = fields.Many2one('ir.module.module', string="Theme", compute='_compute_theme')
    slider_filter_ids = fields.One2many("slider.filter", "slider_id", string="Filter",help="Select the Product filter for slider items")
    slider_style_id = fields.Many2one('slider.styles', string='Slider Style',required=True,help="Select the slider styles")
    slider_limit = fields.Integer(string='Slider Limit', default=10,required=True,help="Set the slider carousel limit")

    @api.depends('website_id')
    def _compute_theme(self):
        """
        Set a theme_id based in website
        :return:
        """
        self.theme_id = self.website_id.theme_id.id

    @api.onchange('website_id')
    def _onchange_website_id(self):
        """
        Remove a slider_style_id when website_id change
        :return:
        """
        self.slider_style_id = False

    def write(self, vals):
        """
        If it is product slider then slider_filter_ids is required else raise warning
        :param vals:
        :return:
        """
        res = super(Slider, self).write(vals)
        if not self.slider_filter_ids:
            raise UserError(_('Sorry! Please set product filters first'))
        else:
            return res

    @api.model
    def create(self, vals_list):
        """
        If it is product slider then slider_filter_ids is required else raise warning
        :param vals_list:
        :return:
        """
        res = super(Slider, self).create(vals_list)
        if not res.slider_filter_ids:
            raise UserError(_('Sorry! Please set product filters first'))
        else:
            return res

    def action_preview(self):
        """
        Redirecting to the preview controller
        :return:
        """
        url = '/slider-preview?rec_id=' + str(self.id)
        return {
            'name': ('Edit Template'),
            'type': 'ir.actions.act_url',
            'url': url,
            'target': 'new',
        }

