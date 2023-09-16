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

	public function detail($id)
	{
		$this->model->where('user_id', $id);
		$result = $this->model->first();
		
		return $this->respond([
			'code' => 200,
			'status' => 'success',
			'data' => $result
		]);

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
	
	public function save()
	{

		$reqs = $this->request->getPost();
        $result = $this->model->save($reqs);

        return $this->respond([
        	'status' => 200,
        	'messages' => 'Berhasil simpan akun'
        ]);

	}

	public function login()
	{
		$reqs = $this->request->getPost();
		
		$this->model->where($reqs);

		$result = $this->model->find();

		// var_dump($reqs);
		// exit;

		if (count($result) > 0) {
			return $this->respond([
				'code' => 200,
				'status' => 'success',
				'message' => 'Login berhasil',
				'data' => [
					'user_id' => $result[0]['user_id']
				]
			]);
		}

		return $this->respond([
			'code' => 404,
			'status' => 'error',
			'message' => 'Akun tidak ditemukan'
		]);

	}

}