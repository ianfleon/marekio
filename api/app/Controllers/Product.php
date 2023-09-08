<?php

namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;
use App\Models\Product_Model;

class Product extends BaseController
{
    use ResponseTrait;

    function __construct()
    {
        $this->model = new Product_Model();
    }

    public function list()
    {
        $this->model->findAll ();
    }
}
