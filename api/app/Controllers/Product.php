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
  
        // $newName = $imgfile->getRandomName();
        // $imgfile->move(ROOTPATH . 'public/img/product', $newName);
        
        $reqs['product_img'] = $this->_upload_img($imgfile);

        $result = $this->model->insert($reqs);
    }

    private function _upload_img($imgfile)
    {
        // $imgPath = ROOTPATH . 'public/img/product';

        // Ubah ini jika sudah upload ke hosting
        $imgPath = PUBLIC_HTML_PATH . '/img/product';

        $newName = $imgfile->getRandomName();
        $imgfile->move($imgPath, $newName);

        return $newName;
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

    public function update()
    {
        $reqs = $this->request->getPost();
        $imgfile = $this->request->getFile('product_img');

        if ($imgfile->getSize() > 0) {
            // $newName = $imgfile->getRandomName();
            // $imgfile->move(ROOTPATH . 'public/img/product', $newName);
            $reqs['product_img'] = $this->_upload_img($imgfile);
        }

        $result = $this->model->save($reqs);
        // var_dump($result);

        if ($result) {
            return $this->respond([
                'code' => 200,
                'status' => 'success',
                'message' => 'Data berhasil diupdate'
            ]);
        }
    }

}
