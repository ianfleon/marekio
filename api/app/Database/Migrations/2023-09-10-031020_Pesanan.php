<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Pesanan extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'pesanan_code' => [
                'type' => 'INT'
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
            'cart_id' => [
                'type' => 'INT'
            ]
        ]);

        $this->forge->createTable('pesanan_tb');
    }

    public function down()
    {
        //
    }
}
