<?php

namespace App\Models;

use CodeIgniter\Model;

class Product_Model extends Model {

    protected $table = 'products_tb';
    protected $primaryKey = 'product_id';
    protected $allowedFields = [
        'product_id', 'product_nama', 'product_harga', 'product_desc', 'product_img'
    ];

}