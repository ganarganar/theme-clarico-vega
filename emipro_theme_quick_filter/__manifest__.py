{
    #Module information
    'name': 'Emipro Theme Quick Filter',
    'category': 'eCommerce',
    'summary': 'This app contains the part of quick filter functionality for Emipro eCommerce Themes.',
    'version': '1.0.0',
    'license': 'OPL-1',
    'depends':['emipro_theme_base'],

    'data': [
        'views/quick_filter_view.xml',
        'templates/assets.xml'
    ],

    #Odoo Store Specific
    'images': [
	'static/description/emipro_theme_quick_filter.jpg',
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
