<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Cart extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'cart_id' => [
                'type' => 'INT',
                'auto_increment' => true
            ],
            'user_id' => [
                'type' => 'INT',
                'constraint' => '12'
            ],
            'product_id' => [
                'type' => 'INT',
                'constraint' => '12'
            ]
        ]);
        $this->forge->addKey('cart_id');
        $this->forge->createTable('cart_tb');
    }

    public function down()
    {
        //
    }
}
