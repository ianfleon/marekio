<?php

namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;
use App\Models\Product_Model;

class Product extends BaseController
{
    use ResponseTrait;

    protected $productModel;

    public function __construct()
    {
        
        Header('Access-Control-Allow-Origin: *');
        Header('Access-Control-Allow-Headers: *');
        Header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');

        $this->model = new Product_Model();
    }

    public function list()
    {

        $result = $this->model->get_all();

        return $this->respond([
            'status' => 200,
            'data' => $result
        ]);
    }
}
