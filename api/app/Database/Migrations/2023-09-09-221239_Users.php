<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Users extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'user_id' => [
                'type'           => 'INT',
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'user_nama' => [
                'type'       => 'VARCHAR',
                'constraint' => '100',
            ],
            'user_alamat' => [
                'type' => 'VARCHAR',
                'constraint' => '255'
            ],
            'user_hp' => [
                'type' => 'VARCHAR',
                'constraint' => '15'
            ],
            'user_foto' => [
                'type' => 'VARCHAR',
                'constraint' => '255'
            ]
        ]);
        $this->forge->addKey('user_id', true);
        $this->forge->createTable('users_tb');
    }

    public function down()
    {
        //
    }
}
