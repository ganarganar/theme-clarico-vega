{
    #Module information
    'name': 'Emipro Theme Load More',
    'category': 'eCommerce',
    'summary': 'This app provide the funcitonality of ajax scroll products in shop page.',
    'version': '1.0.0',
    'license': 'OPL-1',
    'depends':['emipro_theme_base'],

    'data': [
        'views/load_more.xml',
	    'templates/assets.xml'
    ],

    #Odoo Store Specific
    'images': [
		'static/description/emipro_theme_load_more.jpg',
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
