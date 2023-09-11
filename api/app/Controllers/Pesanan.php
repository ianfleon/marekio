<?php

namespace App\Controllers;


class Pesanan extends BaseController {

	function __construct()
	{
		$this->model = new Pesanan_Model();
	}

	public function add() {
		$reqs = $this->request->getPost();
	}

}