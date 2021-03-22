{
    #Module information
    'name': 'Emipro Theme Product Label',
    'category': 'eCommerce',
    'summary': 'This app contains the part of product label functionality for Emipro eCommerce Themes.',
    'version': '1.0.0',
    'license': 'OPL-1',
    'depends':['emipro_theme_base'],

    'data': [
        'views/product_label_view.xml',
        'security/ir.model.access.csv',
    ],

    #Harpiya Store Specific
    'images': [
	'static/description/emipro_theme_product_label.jpg',
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
