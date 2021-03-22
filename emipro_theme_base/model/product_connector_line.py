from harpiya import api, fields, models


class ProductConnectorLine(models.Model):
    _name = 'product.connector.line'
    _description = 'Entegrasyonlar'

    product_id = fields.Many2one('product.template', string='Product Template')
    connector_n11 = fields.Boolean(string="n11'e Gönder")
    connector_trendyol = fields.Boolean(string="Tredyol'a Gönder")
    connector_hepsiburada = fields.Boolean(string="Hepsiburada'ya Gönder")