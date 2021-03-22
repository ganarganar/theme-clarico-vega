{
    #Module information
    'name': 'Emipro Theme Category Listing',
    'category': 'eCommerce',
    'summary': 'This app contains the part of dynamic category listing in menu for Emipro eCommerce Themes.',
    'version': '1.0.0',
    'license': 'OPL-1',
    'depends':['emipro_theme_base'],

    'data': [
        'views/website_menu_view.xml',
        'templates/assets.xml',
    ],

    #Harpiya Store Specific
    'images': [
	'static/description/emipro_theme_category_listing.jpg',
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
