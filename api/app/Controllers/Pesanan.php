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
		
		$this->model->join('products_tb', 'pesanan_tb.product_xid = products_tb.product_id');
		$this->model->select(['pesanan_code', 'product_nama']);
		$this->model->where($reqs);

		$result = $this->model->find();

		$ps = [];

		foreach ($result as $res) {
			// var_dump($result);
			
			if (!array_key_exists($res['pesanan_code'], $ps)) {
				$ps[$res['pesanan_code']] = [];
			}
			
			$ps[$res['pesanan_code']][] = $res['product_nama'];

			// array_push($ps[$res['pesanan_code']], $res);
		}

		$finalResult = [];

		// foreach ($ps as $k => $p) {
		// 	// $finalResult[$k][] = $p['product_nama'];
		// 	var_dump($p);
		// 	for
		// }

		// var_dump($finalResult);

		// exit;

		return $this->respond([
			'code' => 200,
			'status' => 'success',
			'data' => $ps
		]);
	}

}