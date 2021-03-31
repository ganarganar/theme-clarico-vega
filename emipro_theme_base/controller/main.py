# -*- coding: utf-8 -*-
"""
    This file is used for create and inherit the core controllers
"""
import datetime
import json
from datetime import timedelta, date
from odoo.http import request
from odoo.tools.safe_eval import safe_eval
from werkzeug.exceptions import NotFound
from odoo.exceptions import UserError
from odoo.addons.auth_signup.models.res_users import SignupError
import werkzeug

from odoo import http
import odoo
import logging
from odoo.tools.translate import _
from odoo.addons.http_routing.models.ir_http import slug
from odoo.addons.sale.controllers.variant import VariantController
from odoo.addons.website.controllers.main import QueryURL
from odoo.addons.website_sale.controllers.main import TableCompute
from odoo.addons.website_sale_wishlist.controllers.main import WebsiteSale
from odoo.addons.website_sale_wishlist.controllers.main import WebsiteSaleWishlist
from psycopg2 import Error


_logger = logging.getLogger(__name__)

class EmiproThemeBase(http.Controller):

    @http.route('/get_test_homepage_data', type='json', auth="user")
    def get_homepage_test_data(self):
        response = http.Response(template="theme_clarico_vega.js_home_page_1_test")
        return response.render()

    @http.route('/web/login_custom', type='json', auth="none", methods=['GET', 'POST'],)
    def web_login_custom(self, login, password, redirect=None, **kw):
        values = {}
        values['login_success'] = False
        if not request.uid:
            request.uid = odoo.SUPERUSER_ID

        values = request.params.copy()
        try:
            values['databases'] = http.db_list()
        except odoo.exceptions.AccessDenied:
            values['databases'] = None

        if request.httprequest.method == 'POST':
            old_uid = request.uid
            try:
                uid = request.session.authenticate(request.session.db, login, password)
                if uid:
                    current_user = request.env['res.users'].sudo().search([('id', '=', uid)])
                    if current_user.has_group('base.group_user'):
                        values['user_type'] = 'internal'
                    else:
                        values['user_type'] = 'portal'
                    values['login_success'] = True

            except odoo.exceptions.AccessDenied as e:
                request.uid = old_uid
                if e.args == odoo.exceptions.AccessDenied().args:
                    values['error'] = _("Wrong login/password")
                else:
                    values['error'] = e.args[0]
        else:
            if 'error' in request.params and request.params.get('error') == 'access':
                values['error'] = _('Only employee can access this database. Please contact the administrator.')

        if 'login' not in values and request.session.get('auth_login'):
            values['login'] = request.session.get('auth_login')

        if not odoo.tools.config['list_db']:
            values['disable_database_manager'] = True
        return values

    @http.route('/web/signup_custom', type='json', auth='public', website=True, sitemap=False)
    def web_auth_signup(self, *args, **kw):

        qcontext = kw
        result = {}

        if 'error' not in qcontext and request.httprequest.method == 'POST':
            try:
                values = {key: qcontext.get(key) for key in ('login', 'name', 'password')}
                if not values:
                    result.update({'is_success':False,'error':'The form was not properly filled in.'})
                    return result
                if values.get('password') != qcontext.get('confirm_password'):
                    result.update({'is_success': False, 'error': 'Passwords do not match; please retype them.'})
                    return result

                if request.env["res.users"].sudo().search([("login", "=", qcontext.get("login"))]):
                    result.update({'is_success': False, 'error': 'Another user is already registered using this email address..'})
                    return result

                supported_lang_codes = [code for code, _ in request.env['res.lang'].get_installed()]
                lang = request.context.get('lang', '').split('_')[0]
                if lang in supported_lang_codes:
                    values['lang'] = lang

                db, login, password = request.env['res.users'].sudo().signup(values, token=None)
                request.env.cr.commit()  # as authenticate will use its own cursor we need to commit the current transaction
                uid = request.session.authenticate(db, login, password)

                if not uid:
                    result.update({'is_success': False, 'error': 'Authentication Failed.'
                                   })
                    return result
                request.env.cr.commit()
                result.update({'is_success': True})
                return result

            except Error as e:
                result.update({'is_success': False, 'error': 'Could not create a new account.'})
                return result

    @http.route('/web/reset_password_custom', type='json', auth='public', website=True, sitemap=False)
    def web_auth_reset_password(self, *args, **kw):
        qcontext = kw

        result = {}

        if 'error' not in qcontext and request.httprequest.method == 'POST':
            try:
                values = {key: qcontext.get(key) for key in ('login', )}
                if not values:
                    result.update({'is_success': False, 'error': 'The form was not properly filled in.'})
                    return result
                if request.env["res.users"].sudo().search([("login", "=", qcontext.get("login"))]):
                    login = qcontext.get('login')
                    _logger.info(
                        "Password reset attempt for <%s> by user <%s> from %s",
                        login, request.env.user.login, request.httprequest.remote_addr)
                    result.update({'is_success': True,
                                   'message': 'An email has been sent with credentials to reset your password'})
                    request.env['res.users'].sudo().reset_password(login)
                    return result

                if not request.env["res.users"].sudo().search([("login", "=", qcontext.get("login"))]):
                    result.update({'is_success': False,'error': 'Reset password: invalid username or email'})
                    return result

            except Error as e:
                result.update({'is_success': False, 'error': 'error when resetting password'})
                return result
            except Exception as e:
                result.update({'is_success': False, 'error': str(e)})
                return result
            except UserError as e:
                result.update({'is_success': False, 'error': str(e.value or e.name)})
                return result
            except SignupError:
                qcontext['error'] = _("Could not reset your password")
                result.update({'is_success': False, 'error': "Could not reset your password"})
                _logger.exception('error when resetting password')
                return result


    @http.route(['/ajax_check_user_status'], type='json', auth="public", website=True)
    def ajax_check_user_status(self):
        user_id = request.session.get('uid', False)
        if user_id:
            current_user = request.env['res.users'].sudo().search([('id', '=', user_id)])
            if current_user.has_group('base.group_user'):
                return 'internal'
            else:
                return 'portal'

    @http.route(['/mega_menu_content_dynamic'], type='json', auth="public", website=True)
    def mega_menu_content_dynamic(self, menu_id):
        response = http.Response(template="emipro_theme_base.website_dynamic_category")
        current_menu = request.env['website.menu'].sudo().search([('id', '=', menu_id)])
        if current_menu.is_dynamic_menu and current_menu.mega_menu_content_dynamic !=  response.render().decode():
            current_menu.write({"mega_menu_content_dynamic": response.render().decode(), "is_dynamic_menu_json": False})
            return response.render().decode()
        else:
            return False

    @http.route(['/quick_view_item_data'], type='json', auth="public", website=True)
    def get_quick_view_item(self, product_id=None):
        """
        This controller return the template for QuickView with product details
        :param product_id: get product id
        :return: quick_view template html
        """
        if product_id:
            product = request.env['product.template'].search([['id', '=', product_id]])
            values = {
                'product': product,
            }
            response = http.Response(template="emipro_theme_base.quick_view_container", qcontext=values)
            return response.render()

    @http.route(['/get_brand_slider'], type='json', auth="public", website=True)
    def get_brand_slider_data(self):
        """
        It's return the updated brand data through ajax
        :return: brand slider template html
        """
        response = http.Response(template="emipro_theme_base.brand_slider_container")
        return response.render()

    @http.route(['/get_category_slider'], type='json', auth="public", website=True)
    def get_category_slider_data(self):
        """
        It's return the updated category slider data through ajax
        :return: category slider template html
        """
        response = http.Response(template="emipro_theme_base.category_slider_container")
        return response.render()

    @http.route(['/slider-preview'], type='http', auth="public", website=True)
    def slider_preview(self, rec_id, **kwargs):
        """
        Return The Slider Preview template
        :param rec_id:
        :param kwargs:
        :return:
        """
        return http.Response(template="emipro_theme_base.slider_preview",
                             qcontext={'rec_id': rec_id}).render()

    @http.route(['/shop/cart/update_custom'], type='json', auth="public", methods=['GET', 'POST'], website=True, csrf=False)
    def cart_update(self, product_id, add_qty=1, set_qty=0, **kw):
        """This route is called when adding a product to cart (no options)."""
        sale_order = request.website.sale_get_order(force_create=True)
        if sale_order.state != 'draft':
            request.session['sale_order_id'] = None
            sale_order = request.website.sale_get_order(force_create=True)

        product_custom_attribute_values = None
        if kw.get('product_custom_attribute_values'):
            product_custom_attribute_values = json.loads(kw.get('product_custom_attribute_values'))

        no_variant_attribute_values = None
        if kw.get('no_variant_attribute_values'):
            no_variant_attribute_values = json.loads(kw.get('no_variant_attribute_values'))

        if sale_order:
            sale_order._cart_update(
                product_id=int(product_id),
                add_qty=add_qty,
                set_qty=set_qty)
            return True
        else:
            return False

    @http.route(['/ajax_cart_item_data'], type='json', auth="public", website=True)
    def get_ajax_cart_item(self, product_id=None):
        """
        This controller return the template for Ajax Add to Cart with product details
        :param product_id: get product id
        :return: ajax cart template html
        """
        if product_id:
            product = request.env['product.template'].search([['id', '=', product_id]])
            values = {
                'product': product,
            }
            response = http.Response(template="emipro_theme_base.ajax_cart_container", qcontext=values)
            return response.render()

    @http.route(['/ajax_cart_sucess_data'], type='json', auth="public", website=True)
    def get_ajax_cart_sucess(self, product_id=None):
        """
        This controller return the template for Ajax Add to Cart with product details
        :param product_id: get product id
        :return: ajax cart template html
        """
        if product_id:
            product = request.env['product.template'].search([['id', '=', product_id]])
            values = {
                'product': product,
            }
            response = http.Response(template="emipro_theme_base.ajax_cart_success_container", qcontext=values)
            return response.render()

    @http.route([
        '/brand',
        '/brand/<model("product.brand.ept"):brand>',
        '/brand/<model("product.brand.ept"):brand>/page/<int:page>',
    ], type='http', auth="public", website=True)
    def Brand(self, brand=None, page=0, category=None, search='', ppg=False, **post):
        add_qty = int(post.get('add_qty', 1))
        Category = request.env['product.public.category']
        if category:
            category = Category.search([('id', '=', int(category))], limit=1)
            if not category or not category.can_access_from_current_website():
                raise NotFound()
        else:
            category = Category

        if ppg:
            try:
                ppg = int(ppg)
                post['ppg'] = ppg
            except ValueError:
                ppg = False
        if not ppg:
            ppg = request.env['website'].get_current_website().shop_ppg or 20

        ppr = request.env['website'].get_current_website().shop_ppr or 4

        attrib_list = request.httprequest.args.getlist('attrib')
        attrib_values = [[int(x) for x in v.split("-")] for v in attrib_list if v]
        attributes_ids = {v[0] for v in attrib_values}
        attrib_set = {v[1] for v in attrib_values}

        domain = WebsiteSale._get_search_domain(self, search, category, attrib_values)

        # Set the brand product
        if brand:
            domain += [('product_brand_ept_id.id', '=', brand.id)]
        else:
            domain += [('product_brand_ept_id', '!=', False)]

        keep = QueryURL('/shop', category=category and int(category), search=search, attrib=attrib_list,
                        order=post.get('order'))

        pricelist_context, pricelist = WebsiteSale._get_pricelist_context(self)

        request.context = dict(request.context, pricelist=pricelist.id, partner=request.env.user.partner_id)

        url = "/shop"
        if search:
            post["search"] = search
        if attrib_list:
            post['attrib'] = attrib_list

        Product = request.env['product.template'].with_context(bin_size=True)

        search_product = Product.search(domain)
        website_domain = request.website.website_domain()
        categs_domain = [('parent_id', '=', False)] + website_domain
        if search:
            search_categories = Category.search(
                [('product_tmpl_ids', 'in', search_product.ids)] + website_domain).parents_and_self
            categs_domain.append(('id', 'in', search_categories.ids))
        else:
            search_categories = Category
        categs = Category.search(categs_domain)

        if category:
            url = "/shop/category/%s" % slug(category)

        product_count = len(search_product)
        pager = request.website.pager(url=url, total=product_count, page=page, step=ppg, scope=7, url_args=post)
        products = Product.search(domain, limit=ppg, offset=pager['offset'],
                                  order=WebsiteSale._get_search_order(self, post))

        ProductAttribute = request.env['product.attribute']
        if products:
            # get all products without limit
            attributes = ProductAttribute.search([('product_tmpl_ids', 'in', search_product.ids)])
        else:
            attributes = ProductAttribute.browse(attributes_ids)

        layout_mode = request.session.get('website_sale_shop_layout_mode')
        if not layout_mode:
            if request.website.viewref('website_sale.products_list_view').active:
                layout_mode = 'list'
            else:
                layout_mode = 'grid'

        values = {
            'search': search,
            'category': category,
            'attrib_values': attrib_values,
            'attrib_set': attrib_set,
            'pager': pager,
            'pricelist': pricelist,
            'add_qty': add_qty,
            'products': products,
            'search_count': product_count,  # common for all searchbox
            'bins': TableCompute().process(products, ppg, ppr),
            'ppg': ppg,
            'ppr': ppr,
            'categories': categs,
            'attributes': attributes,
            'keep': keep,
            'search_categories_ids': search_categories.ids,
            'layout_mode': layout_mode,
            'brand': brand,
            'is_brand_page': True
        }
        if category:
            values['main_object'] = category
        return request.render("website_sale.products", values)

    @http.route(['/slider/render'], type='json', auth="public", website=True)
    def slider_data(self, **kwargs):
        """
        Return the data for slider for product slider and category Slider
        If filter ID is not specified then return first filter slider object else it return specified slider filter
        :param kwargs:
        :return:
        """
        slider_id = kwargs.get('slider_id', False)
        filter_id = kwargs.get('filter_id', False)
        slider_obj = request.env['slider'].sudo().search([('id', '=', int(slider_id))])
        vals = {}
        if slider_obj:
            filter = slider_obj.slider_filter_ids[0] if not filter_id else request.env[
                'slider.filter'].sudo().search([('id', '=', int(filter_id))])
            if filter.filter_id.domain:
                domain = safe_eval(filter.filter_id.domain)
                domain += ['|', ('website_id', '=', None), ('website_id', '=', request.website.id),
                           ('website_published', '=', True)]
                product = request.env['product.template'].sudo().search(domain, limit=slider_obj.slider_limit)
                vals = {
                    'slider_obj': slider_obj,
                    'filter_data': product,
                    # 'active_filter_data': filter_id if filter_id else slider_obj.slider_filter_ids[0].filter_id.id,
                    'active_filter_data': filter_id if filter_id else slider_obj.slider_filter_ids[0].id,
                    'is_default': False if filter_id else True,
                    'show_view_all': True
                }
            tmplt_external_id = slider_obj.slider_style_id.get_external_id().get(
                slider_obj.slider_style_id.id) + "_template"
            tmplt = request.env['ir.ui.view'].sudo().search([('key', '=', tmplt_external_id)])
            if tmplt:
                response = http.Response(template=tmplt_external_id, qcontext=vals)
                return response.render()
            else:
                return False

    @http.route(['/get_best_seller_data'], type='json', auth="public", website=True)
    def get_best_seller_data(self, **kwargs):
        style_id = kwargs.get('style_id', False)
        website_id = request.website.id
        request.env.cr.execute("""select * from sale_report where website_id=%s AND state in ('sale','done') AND date BETWEEN %s and %s
                        """, (website_id, datetime.datetime.today() - timedelta(8), datetime.datetime.today()))
        sale_report_ids = [x[0] for x in request.env.cr.fetchall()]
        products = request.env['sale.report'].sudo().browse(sale_report_ids).mapped('product_tmpl_id')
        if products:
            values = {
                'filter_data': products,
                'is_default': False,
                'show_view_all': False,
            }
            html_slider_data = self.get_template_html(style_id, values)
            return html_slider_data

    @http.route(['/get_new_product_data'], type='json', auth="public", website=True)
    def get_new_product_data(self, **kwargs):

        style_id = kwargs.get('style_id', False)
        products = request.env['product.template'].sudo().search([('website_published', '=', True)], order='id desc',
                                                                 limit=10)
        if products:
            values = {
                'filter_data': products,
                'is_default': False,
                'show_view_all': False,
            }
            html_slider_data = self.get_template_html(style_id, values)
            return html_slider_data

    @http.route(['/get_category_offer_data'], type='json', auth="public", website=True)
    def get_offer(self, **kwargs):

        pricelist_items = self.get_current_priclist_items_ids()
        style_id = kwargs.get('style_id', False)
        products = []
        if style_id and pricelist_items:
            for item in pricelist_items:
                if item.applied_on == '2_product_category':
                    products += request.env['product.template'].sudo().search([('categ_id', '=', int(item.categ_id))])

            if products:
                values = {
                    'filter_data': products,
                    'is_default': False,
                    'category_offer_url': '/shop?category_offers=True',
                    'show_view_all': True,
                }
                html_slider_data = self.get_template_html(style_id, values)
                return html_slider_data

    @http.route(['/get_allproduct_offer_data'], type='json', auth="public", website=True)
    def get_allproduct_offer(self, **kwargs):

        pricelist_items = self.get_current_priclist_items_ids()
        style_id = kwargs.get('style_id', False)
        products = []
        if style_id and pricelist_items:
            for item in pricelist_items:
                if item.applied_on == '3_global':
                    domains = request.website.sale_product_domain()
                    products += request.env['product.template'].sudo().search(domains)

            if products:
                values = {
                    'filter_data': products,
                    'is_default': False,
                    'allproduct_offer_url': '/shop',
                    'show_view_all': True,
                }
                html_slider_data = self.get_template_html(style_id, values)
                return html_slider_data

    @http.route(['/get_product_offer_data'], type='json', auth="public", website=True)
    def get_product_offer(self, **kwargs):
        pricelist_items = self.get_current_priclist_items_ids()
        style_id = kwargs.get('style_id', False)
        products = []
        if style_id and pricelist_items:
            for item in pricelist_items:
                if item.applied_on == '1_product':
                    domains = request.website.sale_product_domain() + [('id', '=', item.product_tmpl_id.id)]
                    products += request.env['product.template'].sudo().search(domains)
            if products:
                values = {
                    'filter_data': products,
                    'is_default': False,
                    'product_offer_url': '/shop?product_offers=True',
                    'show_view_all': True,
                }
                html_slider_data = self.get_template_html(style_id, values)
                return html_slider_data

    @http.route(['/get_category_products_data'], type='json', auth="public", website=True)
    def get_category_products_data(self, **kwargs):
        pricelist = request.website.get_current_pricelist()
        style_id = kwargs.get('style_id', False)
        category_ids = kwargs.get('category_ids', False)
        category_ids = category_ids.split(',')
        is_discount = kwargs.get('is_discount', False)

        domain = [('public_categ_ids', 'in', category_ids), ('website_published', '=', True)]
        without_discount_products = request.env['product.template'].sudo().search(domain)
        discount_products = []

        if is_discount == 'true':
            for product in without_discount_products:
                combination = product._get_first_possible_combination()
                combination_info = product._get_combination_info(combination, add_qty=1,
                                                                 pricelist=pricelist if pricelist else False)
                if combination_info['has_discounted_price']:
                    discount_products += without_discount_products.search([('id', '=', product.id)])

        if is_discount == 'true':
            products = discount_products
        else:
            products = without_discount_products

        if products:
            values = {
                'filter_data': products,
                'is_default': False,
                'allproduct_offer_url': '/shop',
                'show_view_all': True,
            }
            html_slider_data = self.get_template_html(style_id, values)
            return html_slider_data

    def get_template_html(self, style_id, values):

        template_id = request.env['slider.styles'].browse(int(style_id)).get_external_id().get(
            int(style_id)) + "_template"
        template = request.env['ir.ui.view'].sudo().search([('key', '=', template_id)])
        if template:
            response = http.Response(template=template_id, qcontext=values)
            return response.render()

    def get_current_priclist_items_ids(self):
        request.env.cr.execute("""select id from product_pricelist_item where pricelist_id = %s AND (date_start IS NULL OR date_start <= %s AND date_end IS NULL OR date_end >= %s)
                """, (request.website.get_current_pricelist().id, date.today(), date.today()))
        item_ids = [x[0] for x in request.env.cr.fetchall()]
        pricelist_items = request.env['product.pricelist.item'].browse(item_ids)
        return pricelist_items

class EmiproThemeBaseExtended(WebsiteSaleWishlist):

    def _get_search_domain(self, search, category, attrib_values, search_in_description=True):
        """
        Inherit method for implement Price Filter and Brand Filter
        :param search:
        :param category:
        :param attrib_values:
        :return: search domain
        """
        filter_id = request.httprequest.values.get('filter_id', False)
        if filter_id:
            # curr_filter = request.env['ir.filters'].sudo().search([('id', '=', int(filter_id))])
            curr_filter = request.env['slider.filter'].sudo().search([('id', '=', int(filter_id))])
            if curr_filter and curr_filter.filter_id and curr_filter.filter_id.domain:
                domain = safe_eval(curr_filter.filter_id.domain)
                slider_products = request.env['product.template'].sudo().search(domain)
                if slider_products:
                    request.env['product.template'].sudo().search([('id', 'in', slider_products.ids)])
                    domain = [('id', 'in', slider_products.ids)]
                    return domain

        category_offers = request.httprequest.values.get('category_offers', False)
        if category_offers:
            pricelist_items = EmiproThemeBase.get_current_priclist_items_ids(self)
            if pricelist_items:
                ids = []
                products = []
                for item in pricelist_items:
                    if item.applied_on == '2_product_category':
                        products += request.env['product.template'].sudo().search(
                            [('categ_id', '=', int(item.categ_id))])

                for product in products:
                    ids.append(product.id)
                domain = [('id', 'in', ids)]
                return domain

        product_offers = request.httprequest.values.get('product_offers', False)
        if product_offers:
            ids = []
            pricelist_items = EmiproThemeBase.get_current_priclist_items_ids(self)
            if pricelist_items:
                for item in pricelist_items:
                    if item.applied_on == '1_product':
                        ids.append(item.product_tmpl_id.id)
                domain = [('id', 'in', ids)]
                return domain

        domain = super(EmiproThemeBaseExtended, self)._get_search_domain(search=search, category=category,
                                                                         attrib_values=attrib_values,
                                                                         search_in_description=True)
        if attrib_values:
            ids = []
            for value in attrib_values:
                if value[0] == 0:
                    ids.append(value[1])
                    domain += [('product_brand_ept_id.id', 'in', ids)]
        cust_min_val = request.httprequest.values.get('min_price', False)
        cust_max_val = request.httprequest.values.get('max_price', False)

        if cust_max_val and cust_min_val:
            try:
                cust_max_val = float(cust_max_val)
                cust_min_val = float(cust_min_val)
            except ValueError:
                raise NotFound()

            # if not cust_max_val.isunumeric() or not cust_min_val.isnumeric():
            #     raise NotFound()
            products = request.env['product.template'].sudo().search(domain)
            new_prod_ids = []
            pricelist = request.website.pricelist_id
            if products:
                for prod in products:
                    context = dict(request.context, quantity=1, pricelist=pricelist.id if pricelist else False)
                    product_template = prod.with_context(context)

                    list_price = product_template.price_compute('list_price')[product_template.id]
                    price = product_template.price if pricelist else list_price
                    if price and price >= float(cust_min_val) and price <= float(cust_max_val):
                        new_prod_ids.append(prod.id)
                domain += [('id', 'in', new_prod_ids)]
            else:
                domain = [('id', '=', False)]
        return domain


class EptWebsiteSaleVariantController(VariantController):

    @http.route(['/sale/get_combination_info_website'], type='json', auth="public", methods=['POST'],
                website=True)
    def get_combination_info_website(self, product_template_id, product_id, combination, add_qty, **kw):
        """
        Inherit this method because set the product offer timer data if it's available
        :return: result
        """

        res = super(EptWebsiteSaleVariantController, self).get_combination_info_website(
            product_template_id=product_template_id,
            product_id=product_id,
            combination=combination,
            add_qty=add_qty, **kw)
        product = request.env['product.product'].sudo().search([('id', '=', res.get('product_id'))])
        partner = request.env['res.users'].sudo().search([('id', '=', request.uid)]).partner_id
        products_qty_partner = []
        products_qty_partner.append((product, add_qty, partner))
        pricelist = request.website.get_current_pricelist()
        suitable_rule = False
        res.update({'is_offer': False})
        try:
            if pricelist and product:
                vals = pricelist._compute_price_rule(products_qty_partner)
                if vals.get(int(product)) and vals.get(int(product))[1]:
                    suitable_rule = vals.get(int(product))[1]
                    suitable_rule = request.env['product.pricelist.item'].sudo().search(
                        [('id', '=', suitable_rule), ('is_display_timer', '=', True)])
                    if suitable_rule.date_end and (
                            suitable_rule.applied_on == '3_global' or suitable_rule.product_id or suitable_rule.product_tmpl_id or suitable_rule.categ_id):
                        start_date = int(round(datetime.datetime.timestamp(
                            datetime.datetime.combine(suitable_rule.date_start, datetime.datetime.min.time())) * 1000))
                        end_date = int(round(datetime.datetime.timestamp(
                            datetime.datetime.combine(suitable_rule.date_end, datetime.datetime.max.time())) * 1000))
                        current_date = int(round(datetime.datetime.timestamp(datetime.datetime.now()) * 1000))
                        res.update({'is_offer': True,
                                    'start_date': start_date,
                                    'end_date': end_date,
                                    'current_date': current_date,
                                    'suitable_rule': suitable_rule,
                                    'offer_msg': suitable_rule.offer_msg,
                                    })
        except Exception as e:
            return res
        return res
