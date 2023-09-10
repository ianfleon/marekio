<?php

namespace App\Models;

use CodeIgniter\Model;

class Cart_Model extends Model {

	protected $table = 'cart_tb';
	protected $primaryKey = 'cart_id';
	protected $allowedFields = [
		'user_xid', 'product_xid'
	];

}