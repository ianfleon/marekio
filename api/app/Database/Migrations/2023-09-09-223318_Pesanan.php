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
            'pesanan_jumlah' => [
                'type' => 'INT',
                'constraint' => 10
            ],
            'pesanan_created' => [
                'type' => 'INT',
                'constraint' => '50'
            ],
            'pesanan_status' => [
                'type' => 'INT',
                'constraint' => '12'
            ],
            'user_id' => [
                'type' => 'INT',
                'constraint' => '12'
            ],
            'product_id' => [
                'type' => 'INT',
                'constraint', '12'
            ],
        ]);

        $this->forge->addKey('pesanan_id', true);
        $this->forge->createTable('pesanan_tb');
    }

    public function down()
    {
        //
    }
}
