<?php

use yii\grid\GridView;
use yii\helpers\Url;
?>
<div class="container-fluid">
    <div class="row players top-header"></div>
    <?=
    GridView::widget([
        'dataProvider' => $dataProvider,
        'rowOptions' => function ($model, $key, $index, $grid) {
            return ['data-id' => $model->id, 'class'=> 'pointer'];
        },
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],
            'player1_name:ntext',
            'player2_name:ntext',
            [
                'attribute' => 'winner',
                'format' => 'raw',
                'value' => function ($data) {
                    switch ($data->winner) {
                        case 1:
                            return $data->player1_name . " won!";
                        case 2:
                            return $data->player2_name . " won!";
                        default:
                            return 'Tie!';
                    }
                },
            ],
            [
                'attribute' => 'played',
                'format' => 'raw',
                'value' => function ($data) {
                    return date("d.m.Y H:i", strtotime($data->played));
                },
            ],
        ],
    ]);
    ?>
<?php
$this->registerJs("

    $('td').click(function (e) {
        var id = $(this).closest('tr').data('id');
        if(e.target == this)
            location.href = '" . Url::to(['site/view/']) . "/'+id;
    });

");
?>
</div>
</body>
</html>