<?php

namespace App\Controllers;
use App\Models\User_Model;
use App\Models\Cart_Model;
use CodeIgniter\API\ResponseTrait;

class User extends BaseController {

	protected $cartModel;

	use ResponseTrait;

	function __construct()
	{
		Header('Access-Control-Allow-Origin: *');
        Header('Access-Control-Allow-Headers: *');
		$this->model = new User_Model();
		$this->cartModel = new Cart_Model();
	}

	public function cart($id)
	{
		// echo "User::cart";
		$this->cartModel->where('user_xid', $id);
		$this->cartModel->join('products_tb', 'products_tb.product_id = cart_tb.product_xid');
		// $this->cartModel->join('users_tb', 'users_tb.user_id = cart_tb.user_xid');

		$result = $this->cartModel->findAll();

		return $this->respond([
			'status' => 200,
			'data' => $result
		]);
	}
	
	public function add()
	{

		$reqs = $this->request->getPost();
		$imgfile = $this->request->getFile('user_foto');

		$newName = $imgfile->getRandomName();
        $imgfile->move(ROOTPATH . 'public/img/user', $newName);
        
        $reqs['user_foto'] = $newName;

        $result = $this->model->insert($reqs);

        return $this->respond([
        	'status' => 200,
        	'messages' => 'Berhasil buat akun'
        ]);

	}

}