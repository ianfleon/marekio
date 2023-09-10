<?php

namespace App\Models;
use CodeIgniter\Model;

class User_Model extends Model {

	protected $table = 'users_tb';
	protected $primaryKey = 'user_id';
	protected $allowedFields = [
		'user_nama', 'user_alamat', 'user_hp', 'user_foto'
	];

}