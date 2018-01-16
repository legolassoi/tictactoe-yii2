<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use \app\models\GameResults;
use yii\data\ActiveDataProvider;

/**
 * @author Oleg Stanislavchuk <legolassoi@gmail.com
 * 
 */
class SiteController extends Controller {

    private $data = [];

    /**
     * @inheritdoc
     */
    public function actions() {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
        ];
    }

    /**
     * Displays homepage.
     *
     * @return string
     */
    public function actionIndex() {
        return $this->render('index');
    }

    public function actionPlay() {
        $session = Yii::$app->session;
        if (Yii::$app->request->post('player1') && Yii::$app->request->post('player2')) {
            $session->set('player1', preg_replace("/[^0-9a-zA-Z ]/", "", Yii::$app->request->post('player1')));
            $session->set('player2', preg_replace("/[^0-9a-zA-Z ]/", "", Yii::$app->request->post('player2')));
            $session->set('hard_mode', Yii::$app->request->post('hard_mode', false));
            $_POST = [];
            return $this->redirect(['/site/play']);
        }
        $this->data['player1'] = $session->get('player1');
        $this->data['player2'] = $session->get('player2');
        $this->data['hard_mode'] = $session->get('hard_mode');
        if (!$this->data['player1'] || !$this->data['player2']) {
            redirect('/');
        }
        $this->data['latest_results'] = GameResults::getLastEntries();
        return $this->render('play', $this->data);
    }

    public function actionStore() {
        $model = new GameResults();
        $model->load(Yii::$app->request->post());
        if (!$model->save()) {
            die('Something went wrong on saving result.');
        }
        $latest_results = GameResults::getLastEntries();
        $return = $this->render('partials/_results', ['latest_results' => $latest_results]);
        echo $return;
    }

    public function actionView($id = 0) {
        $this->data['result'] = GameResults::findOne($id);
        $this->data['latest_results'] = GameResults::getLastEntries();
        if (!$this->data['result']) {
            throw new \yii\web\NotFoundHttpException();
        }
        return $this->render('view', $this->data);
    }

    public function actionResults() {
        $dataProvider = new ActiveDataProvider([
            'query' => GameResults::find(),
        ]);

        return $this->render('results', [
            'dataProvider' => $dataProvider,
        ]);
    }

}
