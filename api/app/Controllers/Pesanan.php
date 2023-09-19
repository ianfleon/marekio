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

	public function detail($code)
	{
		$this->model->join('products_tb', 'products_tb.product_id = pesanan_tb.product_xid');
		$this->model->where('pesanan_code', $code);

		$datas = $this->model->find();

		$results['products'] = $datas;
		$results['total_product'] = count($datas);
		$results['total_item'] = 0;
		$results['total_harga'] = 0;
		$results['status_pesanan'] = null;

		foreach ($datas as $data) {
			$results['total_harga'] += intval($data['pesanan_jumlah']) * intval($data['product_harga']);
			$results['total_item'] += intval($data['pesanan_jumlah']);
			switch (intval($data['pesanan_status'])) {
				case 0:
					$results['status_pesanan'] = 'Diproses';
					break;
				case 1:
					$results['status_pesanan'] = 'Diantar';
					break;
				case 2:
					$results['status_pesanan'] = 'Selesai';
					break;
				default:
					$results['status_pesanan'] = 'Batal';
					break;
			}
		}

		$results['total_harga'] = number_format($results['total_harga'], 0, ",", ".");
		
		return $this->respond([
			'code' => 200,
			'status' => 'success',
			'data' => $results
		]);
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

	public function get()
	{

		$reqs = $this->request->getGet();
		
		$this->model->join('products_tb', 'pesanan_tb.product_xid = products_tb.product_id');
		// $this->model->join('users_tb', 'pesanan_tb.user_xid = users_tb.user_id');
		$this->model->select(['pesanan_code', 'pesanan_jumlah', 'product_nama']);
		$this->model->where($reqs);

		$result = $this->model->find();

		$ps = [];

		foreach ($result as $res) {			
			if (!array_key_exists($res['pesanan_code'], $ps)) {
				$ps[$res['pesanan_code']] = [];
			}
			
			$ps[$res['pesanan_code']][] = $res['product_nama'];

		}

		return $this->respond([
			'code' => 200,
			'status' => 'success',
			'data' => $ps
		]);
	}

	public function status($code)
	{

		$this->model->join('products_tb', 'pesanan_tb.product_xid = products_tb.product_id');
		$this->model->join('users_tb', 'pesanan_tb.user_xid = users_tb.user_id');
		// $this->model->select(['pesanan_code', 'pesanan_jumlah', 'product_nama']);
		$this->model->where('pesanan_status', intval($code));

		$result = $this->model->find();

		// var_dump($result);
		// exit;

		$pc = [];
		$u = [];

		foreach ($result as $res) {
			
			$c = $res['pesanan_code'];
			// $h = $res['user_hp'];

			if (!array_key_exists($c, $pc)) {
				$pc[$c] = [];
			}

			$pc[$c]['user']['nama'] = $res['user_nama'];
			$pc[$c]['user']['alamat'] = $res['user_alamat'];
			$pc[$c]['user']['hp'] = $res['user_hp'];

		}

		return $this->respond([
			'code' => 200,
			'status' => 'success',
			'data' => $pc
		]);
	}

	public function change()
	{
		$reqs = $this->request->getPost();
		
		$this->model->set('pesanan_status', $reqs['pesanan_status'], false);
		$this->model->where('pesanan_code', $reqs['pesanan_code']);
		$this->model->update();

		error_reporting(1);

		return $this->respond([
			'code' => 200,
			'status' => 'success',
			'message' => 'Status pesanan berubah'
		]);
	}

}