<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Pesanan extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'pesanan_id' => [
                'type' => 'INT',
                'auto_increment' => true
            ],
            'pesanan_code' => [
                'type' => 'VARCHAR',
                'constraint' => '16'
            ],
            'pesanan_jumlah' => [
                'type' => 'INT'
            ],
            'pesanan_created' => [
                'type' => 'INT',
                'constraint' => '25'
            ],
            'pesanan_status' => [
                'type' => 'INT'
            ],
            'product_xid' => [
                'type' => 'INT'
            ],
            'user_xid' => [
                'type' => 'INT'
            ]
        ]);
        $this->forge->addPrimaryKey('pesanan_id');
        $this->forge->createTable('pesanan_tb');
    }

    public function down()
    {
        //
    }
}
