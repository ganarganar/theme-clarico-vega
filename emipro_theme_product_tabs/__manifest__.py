{
    # Module information
    'name': 'Emipro Product Tabs',
    'category': 'Website',
    'version': '1.0.0',
    'summary': 'This app contains to add new tabs in individual product',
    'license': 'OPL-1',

    # Dependencies
    'depends': [
        'emipro_theme_base'
    ],

    # Views
    'data': [
        'views/product_tabs.xml',
        'security/ir.model.access.csv',
    ],
'images': [
	'static/description/emipro_theme_product_tabs.jpg',
    ],
    # Author
    'author': 'Emipro Technologies Pvt. Ltd.',
    'website': 'http://www.emiprotechnologies.com',
   'maintainer': 'Emipro Technologies Pvt. Ltd.',

    # Technical
     'installable': True,
    'auto_install': False,
    'price': 0.00,
    'currency': 'EUR',
}
