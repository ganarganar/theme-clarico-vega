# -*- coding: utf-8 -*-
"""
    This model is used to create a product brand fields
"""
from odoo import api, fields, models


class ProductBrandEpt(models.Model):
    _name = 'product.brand.ept'
    _inherit = ['website.published.multi.mixin']
    _order = 'name'
    _description = 'Product Brand'

    name = fields.Char('Brand Name', required=True, translate=True)
    description = fields.Text('Description', translate=True)
    website_id = fields.Many2one("website", string="Website")
    logo = fields.Binary('Logo File')

    def get_products(self):
        product_ids = self.env['product.template'].search([('product_brand_ept_id', '=', self.id)]).ids
        self.product_ids = product_ids
        for brand in self:
            brand.products_count = len(brand.product_ids)

    product_ids = fields.Many2many(
        'product.template',
        string='Brand Products',
        help="Add products for this brand",compute=get_products,readonly=False
    )
    products_count = fields.Integer(
        string='Number of products',
        compute='_get_products_count',
        help='It shows the number of product counts',
        store=True
    )
    is_brand_page = fields.Boolean(string='Is Brand Page',help="It will set the separate landing page for this brand")
    brand_page = fields.Many2one("website.page", string="Brand Page",help="Select the brand page which you want to set for this brand.")



    def write(self,values):
            vals = values.get('product_ids')
            if vals:
                old_values  = self.product_ids.ids
                for remove_id in old_values:
                    product = self.env['product.template'].browse(remove_id)
                    product.write({'product_brand_ept_id': [(2, self.id)]})
            result = super(ProductBrandEpt, self).write(values)
            if vals:
                if self.website_published:
                    if self.product_ids.ids:
                        for product_id in self.product_ids.ids:
                            product = self.env['product.template'].browse(product_id)
                            product.write({'product_brand_ept_id': self.id})
                    else:
                        for remove_id in old_values:
                            product = self.env['product.template'].browse(remove_id)
                            product.write({'product_brand_ept_id': [(2,self.id)]})
            return result


    @api.depends('product_ids')
    def _get_products_count(self):
        """
        Compute The product count of brand
        :return:
        """
        for brand in self:
            brand.products_count = len(brand.product_ids)
