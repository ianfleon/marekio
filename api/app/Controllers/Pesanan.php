<?php

namespace App\Controllers;
use App\Models\Pesanan_Model;
use CodeIgniter\API\ResponseTrait;

class Pesanan extends BaseController {

	use ResponseTrait;

	function __construct()
	{
		Header('Access-Control-Allow-Origin: *');
		Header('Access-Control-Allow-Headers: *');
		Header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');

		$this->model = new Pesanan_Model();
	}

	public function add() {

		$reqs = $this->request->getPost();
		$reqs['pesanan_code'] = strtoupper(uniqid());
		$reqs['pesanan_created'] = time();

		foreach ($reqs['pesanan'] as $i => $v) {

			// echo $i;

			var_dump($reqs['pesanan'][$i]);

			// $reqs['product_xid'] = $v['product_xid'];
			// $reqs['user_xid'] = $v['user_xid'];

			// if ($this->model->insert($reqs) == 0) {
			// 	return $this->respond([
			// 		'code' => 500,
			// 		'message' => 'Gagal buat pesanan. Cek server.'
			// 	]);
			// } else {
			// 	return $this->respond([
			// 		'code' => 200,
			// 		'message' => 'Pesanan berhasil diproses.'
			// 	]);
			// }
		}

		// var_dump($reqs);

		// if ($this->model->insert($reqs) != 0) {
		// 	return $this->respond([
		// 		'code' => 500,
		// 		'message' => 'Gagal buat pesanan. Cek server.'
		// 	]);
		// }

		// return $this->respond([
		// 	'code' => 200,
		// 	'message' => 'Pesanan berhasil diproses.'
		// ]);
	}

}