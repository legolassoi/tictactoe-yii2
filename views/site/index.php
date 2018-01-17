<?php

use yii\widgets\ActiveForm;
?>
<div class="container">
    <?php
    $form = ActiveForm::begin([
        'enableClientValidation' => false,
        'action' => ['/site/index'],
        'options' => ['class' => 'enter_form'],
    ]);
    ?>
    <h2>Enter your names</h2>
    <div class="flip"><a href="javascript:void(0)" onclick="login.switchNames()"><img src="/images/flip.png" /></a></div>
    <?= 
        $form->field($model, 'player1')->textInput([
            'autofocus' => true,
            'class' => 'form-control',
            'title' => 'Only alphanumeric symbols and spaces. Maximum 25 characters',
            'id' => 'player1',
            'placeholder' => 'Player 1',
            'pattern' => '[A-Za-z0-9 ]{1,25}',
        ])->label(false);
    ?>
    <?= 
        $form->field($model, 'player2')->textInput([
            'autofocus' => true,
            'class' => 'form-control',
            'title' => 'Only alphanumeric symbols and spaces. Maximum 25 characters',
            'id' => 'player2',
            'placeholder' => 'Player 2',
            'pattern' => '[A-Za-z0-9 ]{1,25}',
        ])->label(false);
    ?>
    <div class="checkbox">
        <label>
            <input id="bot" value="bot" type="checkbox"> AI opponent
        </label>
    </div>
    <div class="checkbox">
            <?= $form->field($model, 'hard_mode')->checkbox()->label(false) ?>
    </div>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Play</button>
<?php ActiveForm::end(); ?>
</div>
<script src="/js/login.js"></script>
<script>
    $(document).ready(function () {
        login.initBotListener();
        login.lockBot();
    });
</script>