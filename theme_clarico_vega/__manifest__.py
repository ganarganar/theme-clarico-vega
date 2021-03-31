{
    # Theme information

    'name': 'Theme Clarico Vega',
    'category': 'Theme/eCommerce',
    'summary': 'Fully Responsive, Clean, Modern & Sectioned Odoo Theme. Crafted to be Pixel Perfect, It is suitable for eCommerce Businesses like Furniture, Fashion, Electronics, Beauty, Health & Fitness, Jewellery, Sports etc.',
    'version': '1.5.3',
    'license': 'OPL-1',
    'depends': [
        'website_theme_install',
        'website_sale_wishlist',
        'emipro_theme_product_carousel',
        'emipro_theme_category_carousel',
        'emipro_theme_quick_filter',
        'emipro_theme_category_listing',
        'emipro_theme_product_timer',
        'website_sale_stock',
        'emipro_theme_load_more',
        'emipro_theme_product_tabs',
        'emipro_theme_product_label_extended',
        'emipro_theme_landing_page',
        'emipro_theme_lazy_load',
        'emipro_theme_banner_video',

    ],

    'data': [
        'data/slider_styles_data.xml',
        'data/compare_data.xml',
        'templates/slider.xml',
        'templates/category.xml',
        'templates/compare.xml',
        'templates/assets.xml',
        'templates/emipro_custom_snippets.xml',
        'templates/odoo_default_snippets.xml',
        'templates/odoo_default_buttons_style.xml',
        'templates/theme_customise_option.xml',
        'templates/customize.xml',
        'templates/blog.xml',
        'templates/shop.xml',
        'templates/login_popup.xml',
        'templates/header.xml',
        'templates/footer.xml',
        'templates/portal.xml',
        'templates/wishlist.xml',
        'templates/cart.xml',
        'templates/contactus.xml',
        'templates/quick_view.xml',
        'templates/price_filter.xml',
        'templates/product.xml',
        'templates/product_label.xml',
        'templates/ajax_cart.xml',
        'templates/menu_config.xml',
        'templates/404.xml',
        'templates/extra_pages.xml',
        'templates/comingsoon.xml',
    ],

    # Odoo Store Specific
    'live_test_url': 'http://claricovega.theme13demo.emiprotechnologies.com/',
    'images': [
        'static/description/main_poster.jpg',
        'static/description/main_screenshot.gif',
    ],

    # Author
    'author': 'Emipro Technologies Pvt. Ltd.',
    'website': 'https://www.emiprotechnologies.com',
    'maintainer': 'Emipro Technologies Pvt. Ltd.',

    # Technical
    'installable': True,
    'auto_install': False,
    'price':240.00,
    'currency': 'EUR',
}
