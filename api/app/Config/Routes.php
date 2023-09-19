<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php')) {
    require SYSTEMPATH . 'Config/Routes.php';
}

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(false);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/products', 'Product::index');
$routes->get('/products/detail/(:num)', 'Product::index/$1');
$routes->get('/products/delete/(:num)', 'Product::delete/$1');
$routes->get('/user/cart/(:num)', 'User::cart/$1');
$routes->get('/user/detail/(:num)', 'User::detail/$1');

$routes->post('/user/save', 'User::save');
$routes->post('/user/add', 'User::add');
$routes->post('/user/login', 'User::login');

$routes->post('/products/add', 'Product::add');
$routes->post('/products/update', 'Product::update');

$routes->post('/cart/add', 'Cart::add');
$routes->get('/cart/delete/(:num)', 'Cart::delete/$1');

$routes->post('/pesanan/add', 'Pesanan::add');
$routes->post('/pesanan/change', 'Pesanan::change');
$routes->get('/pesanan/detail/(:any)', 'Pesanan::detail/$1');

$routes->get('/pesanan/list/(:any)', 'Pesanan::get/$1');
$routes->get('/pesanan/status/(:num)', 'Pesanan::status/$1');

/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
    require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
