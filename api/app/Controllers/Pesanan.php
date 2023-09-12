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
		$userId = $this->request->getPost('user_xid');
		$unicode = uniqid();
		$timecreated = time();

		foreach ($reqs['pesanan'] as $i => $v) {

			$reqs['pesanan'][$i]['pesanan_code'] = $unicode;
			$reqs['pesanan'][$i]['pesanan_created'] = $timecreated;
			$reqs['pesanan'][$i]['pesanan_status'] = 0;
			$reqs['pesanan'][$i]['user_xid'] = $userId;

		}
		
		$res = $this->model->insertBatch($reqs['pesanan']);
		
		if ($res > 0) {
			return $this->respond([
				'code' => 200,
				'message' => 'Pesanan berhasil diproses.'
			]);
		}
		

		return $this->respond([
			'code' => 500,
			'message' => 'Gagal buat pesanan. Cek server.'
		]);
		
	}

	public function get($datas)
	{

		$reqs = $this->request->getGet();

		$this->model->where($reqs);
		$result = $this->model->find();

		return $this->respond([
			'code' => 200,
			'status' => 'success',
			'data' => $result
		]);
	}

}