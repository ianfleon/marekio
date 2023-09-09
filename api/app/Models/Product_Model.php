<?php

namespace App\Models;

class Product_Model {

    // protected $table = 'products_tb';
    // protected $primaryKey = 'product_id';
    // protected $allowedFields = [
    //     'product_id', 'product_nama', 'product_harga', 'product_desc', 'product_img'
    // ];


    public function get_all()
    {
        $data = [
            [
                'product_id' => 123,
                'nama' => 'Nasi Padang',
                'harga' => 15000,
                'desc' => 'Nasi padang enak',
                'img' => '1.png'
            ],
            [
                'product_id' => 111,
                'nama' => 'Boba Coklat',
                'harga' => 5000,
                'desc' => 'Boba Nih Bos',
                'img' => '2.webp'
            ],
        ];

        return $data;
    }

}