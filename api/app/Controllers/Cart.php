<?php

namespace App\Controllers;
use App\Models\Cart_Model;

class Cart extends BaseController {

	public function __construct()
	{
		Header('Access-Control-Allow-Origin: *');
        Header('Access-Control-Allow-Headers: *');

 		$this->model = new Cart_Model();

	}

	public function add()
	{
		$reqs = $this->request->getPost();
		$this->model->insert($reqs);
	}

}