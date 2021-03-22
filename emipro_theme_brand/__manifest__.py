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

    #Harpiya Store Specific
    'images': [
	'static/description/emipro_theme_brand.jpg',
    ],

    # Author
    'author': 'Harpiya Software Tech.',
    'website': 'https://www.harpiya.com',
    'maintainer': 'Harpiya Software Tech.',

    # Technical
    'installable': True,
    'auto_install': False,
    'price': 0.00,
    'currency': 'EUR',
}
