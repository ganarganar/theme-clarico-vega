from odoo import api, fields, models, _

class IrAttachment(models.Model):
    _inherit = "ir.attachment"

    product_tmpl_id = fields.Many2one("product.template")
    document_title = fields.Char(string="Title")