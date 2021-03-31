{
    #Module information
    'name': 'Emipro Theme Brand',
    'category': 'eCommerce',
    'summary': 'This app contains part of brand functionality for Emipro eCommerce Themes.',
    'version': '1.1.0',
    'license': 'OPL-1',
    'depends':['emipro_theme_base'],

    'data': [
        'views/product_template.xml',
        'views/product_brand_ept.xml',
        'templates/assets.xml',
	    'security/ir.model.access.csv',
    ],

    #Odoo Store Specific
    'images': [
	'static/description/emipro_theme_brand.jpg',
    ],

    # Author
    'author': 'Emipro Technologies Pvt. Ltd.',
    'website': 'https://www.emiprotechnologies.com',
    'maintainer': 'Emipro Technologies Pvt. Ltd.',

    # Technical
    'installable': True,
    'auto_install': False,
    'price': 0.00,
    'currency': 'EUR',
}
