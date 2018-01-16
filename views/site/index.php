<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;
?>
<div class="container">
    <?php
    $form = ActiveForm::begin([
        'enableClientValidation' => false,
        'action' => ['/site/play'],
        'options' => ['class' => 'enter_form'],
    ]);
    ?>
    <h2>Enter your names</h2>
    <div class="flip"><a href="javascript:void(0)" onclick="login.switchNames()"><img src="/images/flip.png" /></a></div>
    <input title="Only alphanumeric symbols and spaces. Maximum 25 characters" class="form-control" pattern="[A-Za-z0-9 ]{1,25}" name="player1" id="player1" placeholder="Player 1" type="text" required>
    <input title="Only alphanumeric symbols and spaces. Maximum 25 characters" class="form-control" pattern="[A-Za-z0-9 ]{1,25}" name="player2" id="player2" placeholder="Player 2" type="text" required>
    <div class="checkbox">
        <label>
            <input id="bot" value="bot" type="checkbox"> AI opponent
        </label>
    </div>
    <div class="checkbox">
        <label>
            <input id="hard_mode" name="hard_mode" value="1" type="checkbox"> Hard Mode
        </label>
    </div>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Play</button>
<?php ActiveForm::end(); ?>
</div>
<script src="/js/login.js"></script>
<script>
    $(document).ready(function () {
        login.initBotListener();
    });
</script>