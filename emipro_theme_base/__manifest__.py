# -*- coding: utf-8 -*-
{
    # Theme information
    'name': 'Harpiya Tema Temeli',
    'category': 'Base',
    'summary': 'Harpiya temaları için temel modül.',
    'version': '2.0.7',
    'license': 'OPL-1',
    'depends': [
        'website_theme_install',
        'website_sale_wishlist',
	    'website_sale_comparison',
        'website_blog',
    ],

    'data': [
        'templates/template.xml',
	    'security/ir.model.access.csv',
        'views/social_sharing.xml',
    ],

    #Harpiya Store Specific
    'images': [
        'static/description/emipro_theme_base.jpg',
    ],

    # Author
    'author': 'Harpiya Software Tech.',
    'website': 'https://www.harpiya.com',
    'maintainer': 'Harpiya Software Tech.',

    # Technical
    'installable': True,
    'auto_install': False,
}
