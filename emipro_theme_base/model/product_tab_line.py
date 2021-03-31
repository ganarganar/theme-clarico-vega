from odoo import api, fields, models, tools, _


class ProductTabLine(models.Model):
    _name = "product.tab.line"
    _description = 'Product Label Line'
    _order = "sequence, id"

    product_id = fields.Many2one('product.template', string='Product Template')
    tab_name = fields.Char("Tab Name", required=True, translate=True)
    tab_content = fields.Html("Tab Content", sanitize_attributes=False, translate=True)
    website_ids = fields.Many2many('website', help="You can set the description in particular website.")
    sequence = fields.Integer('Sequence', default=1, help="Gives the sequence order when displaying.")

    def checkTab(self, currentWebsite, tabWebsiteArray):
        if currentWebsite in tabWebsiteArray or len(tabWebsiteArray) == 0:
            return True
        else:
            return False
