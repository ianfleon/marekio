<?php

namespace App\Controllers;
use App\Models\Cart_Model;
use CodeIgniter\API\ResponseTrait;

class Cart extends BaseController {

	use ResponseTrait;

	public function __construct()
	{
		Header('Access-Control-Allow-Origin: *');
        Header('Access-Control-Allow-Headers: *');

 		$this->model = new Cart_Model();

	}

	public function add()
	{
		$reqs = $this->request->getPost();

		$this->model->where(
			['product_xid' => $reqs['product_xid'],
			'user_xid' => $reqs['user_xid']
		]);

		$isExist = $this->model->find();

		if (count($isExist) > 0) {
			return $this->respond([
				'status' => 500,
				'message' => 'Produk sudah ada di keranjang.'
			]);
		}


		if(!$this->model->save($reqs)) {
			return $this->respond([
				'status' => 500,
				'message' => 'Kesalahan server!'
			]);
		}

		return $this->respond([
			'status' => 200,
			'message' => 'Produk berhasil ditambahkan.'
		]);

	}

	public function delete($cartId)
	{
		$this->model->where('cart_id', $cartId);
		
		if(!$this->model->delete()) {
			return $this->respond([
				'status' => 500,
				'message' => 'Gagal hapus data. Cek server!'
			]);
		}

		return $this->respond([
			'status' => 200,
			'message' => 'Produk berhasil dihapus dari keranjang.'
		]);
	}

}