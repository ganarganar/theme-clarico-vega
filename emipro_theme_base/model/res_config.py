# -*- coding: utf-8 -*-
"""
    This model is used to create a boolean social sharing options.
"""
import base64
from odoo import fields, models, tools, api, _
from odoo.modules.module import get_resource_path
from odoo.addons.website.tools import get_video_embed_code

class res_config(models.TransientModel):
    _inherit = "res.config.settings"

    facebook_sharing = fields.Boolean(string='Facebook', related='website_id.facebook_sharing',readonly=False)
    twitter_sharing = fields.Boolean(string='Twitter', related='website_id.twitter_sharing',readonly=False)
    linkedin_sharing = fields.Boolean(string='Linkedin', related='website_id.linkedin_sharing',readonly=False)
    mail_sharing = fields.Boolean(string='Mail', related='website_id.mail_sharing',readonly=False)
    is_load_more = fields.Boolean(string='Load More', related='website_id.is_load_more', readonly=False,
                                 help="Load next page products with Ajax")
    load_more_image = fields.Binary(string='Load More Image', related='website_id.load_more_image', readonly=False,
                               help="Display this image while load more applies.")
    button_or_scroll = fields.Selection([
        ('automatic', 'Automatic- on page scroll'),
        ('button', 'Button- on click button')
        ], string="Loading type for products", related='website_id.button_or_scroll',
        required=True, default='automatic', readonly=False,help="Define how to show the pagination of products in a shop page with on scroll or button.")
    prev_button_label = fields.Char(string='Label for the Prev Button', related='website_id.prev_button_label', readonly=False, translate=True)
    next_button_label = fields.Char(string='Label for the Next Button', related='website_id.next_button_label', readonly=False, translate=True)
    is_lazy_load = fields.Boolean(string='Lazyload', related='website_id.is_lazy_load', readonly=False,
                                 help="Lazy load will be enabled.")
    lazy_load_image = fields.Binary(string='Lazyload Image', related='website_id.lazy_load_image', readonly=False,
                                   help="Display this image while lazy load applies.")
    banner_video_url = fields.Many2one('ir.attachment', "Video URL", related='website_id.banner_video_url', help='URL of a video for banner.', readonly=False)
    number_of_product_line = fields.Selection([
        ('1', '1'),
        ('2', '2'),
        ('3', '3')
        ], string="Number of lines for product name", related='website_id.number_of_product_line',
        default='1', readonly=False, help="Number of lines to show in product name for shop.")
    is_auto_play = fields.Boolean(string='Slider Auto Play', related='website_id.is_auto_play', default=True, readonly=False)

    @api.onchange('is_load_more')
    def get_value_icon_load_more(self):
        if self.is_load_more == False:
            img_path = get_resource_path('theme_clarico_vega', 'static/src/img/Loadmore.gif')
            with tools.file_open(img_path, 'rb') as f:
                self.load_more_image = base64.b64encode(f.read())

    @api.onchange('is_lazy_load')
    def get_value_icon_lazy_load(self):
        if self.is_lazy_load == False:
            img_path = get_resource_path('theme_clarico_vega', 'static/src/img/Lazyload.gif')
            with tools.file_open(img_path, 'rb') as f:
                self.lazy_load_image = base64.b64encode(f.read())

    @api.onchange('module_sale_product_configurator')
    def install_child_modules(self):
        if self.module_sale_product_configurator:
            irModuleObject = self.env['ir.module.module']
            irModuleObject.update_list()
            emiproInheritModuleId = irModuleObject.search(
                [
                    ('state', '!=', 'installed'),
                    ('name', '=', 'emipro_theme_sale_product_configurator')
                ]
            )
            if emiproInheritModuleId:
                emiproInheritModuleId[0].button_immediate_install()
