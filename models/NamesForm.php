<?php

namespace app\models;

use yii\base\Model;
use Yii;

/**
 * Login form
 */
class NamesForm extends Model {

    public $player1;
    public $player2;
    public $hard_mode = false;

    /**
     * @inheritdoc
     */
    public function rules() {
        return [
            [['player1', 'player2'], 'required'],
            ['hard_mode', 'boolean'],
            [['player1', 'player2'], 'string', 'max' => 25, 'message' => 'Maximum 25 characters'],
            [['player1', 'player2'], 'match', 'pattern' => "/^[\w ]+$/", 'message' => 'Only alphanumeric symbols and spaces'],
        ];
    }

    /**
     * Stores data into session
     *
     * @return boolean
     */
    public function remember() {
        $session = Yii::$app->session;
        if ($this->validate()) {
            $session->set('player1', $this->player1);
            $session->set('player2', $this->player2);
            $session->set('hard_mode', $this->hard_mode);
            return true;
        } else {
            return false;
        }
    }

}
