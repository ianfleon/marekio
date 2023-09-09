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

    public function index($id = null)
    {

        $result = [];

        if ($id != null) {
            
            $result = $this->model->find(['product_id' => $id])[0];
            
            return $this->respond([
                'status' => 200,
                'data' => $result
            ]);
            
        }
        
        $this->model->orderBy('product_id', 'DESC');
        $result = $this->model->findAll();

        return $this->respond([
            'status' => 200,
            'data' => $result
        ]);
    }

    public function add()
    {
        $reqs = $this->request->getPost();
        $imgfile = $this->request->getFile('product_img');

        
        $newName = $imgfile->getRandomName();
        $imgfile->move(ROOTPATH . 'public/img', $newName);
        
        $reqs['product_img'] = $newName;

        $result = $this->model->insert($reqs);
    }

    public function delete($id)
    {
        if (!$this->model->delete(['product_id' => $id])) {
            return $this->respond([
                'status' => 500,
                'messages' => 'Data gagal dihapus'
            ]);
        }

        return $this->respond([
            'status' => 200,
            'messages' => 'Data berhasil dihapus'
        ]);

    }

}
