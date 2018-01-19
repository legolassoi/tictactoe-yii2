<?php

namespace app\models;

/**
 * This is the model class for table "game_results".
 *
 * @property int $id
 * @property string $player1_name
 * @property string $player2_name
 * @property int $winner
 * @property string $final_position
 * @property string $played
 * @author Oleg Stanislavchuk <legolassoi@gmail.com>
 */
class GameResults extends \yii\db\ActiveRecord {
    
    /**
     * @inheritdoc
     */
    public static function tableName() {
        return 'game_results';
    }

    /**
     * @inheritdoc
     */
    public function rules() {
        return [
            [['player1_name', 'player2_name', 'final_position', 'winner'], 'required'],
            [['player1_name', 'player2_name', 'final_position'], 'string'],
            [['winner'], 'integer'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels() {
        return [
            'id' => 'ID',
            'player1_name' => 'Player 1',
            'player2_name' => 'Player 2',
            'winner' => 'Winner',
            'final_position' => 'Final Position',
            'played' => 'Date Played',
        ];
    }
    
    /**
     * improved beforeSave to store played datetime.
     *
     * @return boolean
     */
    public function beforeSave($insert) {
        if (parent::beforeSave($insert)) {
            $this->played = date("Y-m-d H:i:s");
            return true;
        }
        return false;
    }
    
     /**
     * gets last 5 played games ordered by played datetime
     *
     * @return set of model objects
     */
    public static function getLastEntries() {
        $entries = GameResults::find()->limit(5)->orderBy('played DESC')->asArray()->all();
        return $entries;
    }

}
