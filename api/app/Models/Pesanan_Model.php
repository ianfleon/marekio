<?php

namespace App\Models;
use CodeIgniter\Model;

class Pesanan_Model extends Model {

    protected $table = 'pesanan_tb';
    protected $primaryKey = 'pesanan_id';
    protected $allowedFields = [
        'pesanan_code', 'pesanan_jumlah', 'pesanan_created', 'pesanan_status', 'product_xid', 'user_xid'
    ];
    
}