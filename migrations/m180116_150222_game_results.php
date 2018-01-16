<?php

use yii\db\Migration;

/**
 * Class m180116_150222_game_results
 */
class m180116_150222_game_results extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp()
    {
        $this->createTable('game_results', [
            'id' => 'pk',
            'player1_name' => 'tinytext',
            'player2_name' => 'tinytext',
            'winner' => 'int(3)',
            'final_position' => 'text',
            'played' => 'datetime',
        ]);
    }

    /**
     * @inheritdoc
     */
    public function safeDown()
    {
        echo "m180116_150222_game_results cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180116_150222_game_results cannot be reverted.\n";

        return false;
    }
    */
}
