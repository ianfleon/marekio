<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Products extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'product_id' => [
                'type' => 'INT',
                'auto_increment' => true
            ],
            'product_nama' => [
                'type' => 'VARCHAR',
                'constraint' => '100'
            ],
            'product_harga' => [
                'type' => 'INT',
                'constraint', '12'
            ],
            'product_desc' => [
                'type' => 'TEXT',
                'null' => true
            ],
            'product_img' => [
                'type' => 'VARCHAR',
                'constraint' => '255'
            ]
        ]);

        $this->forge->addKey('product_id', true);
        $this->forge->createTable('products_tb');
    }

    public function down()
    {
        //
    }
}
