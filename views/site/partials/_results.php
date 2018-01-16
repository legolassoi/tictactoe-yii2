<?php foreach ($latest_results as $result) : ?>
    <div class="row pointer" onclick="location.href = '/site/view/<?= $result['id'] ?>'">
        <div class="col-lg-3">
            <div class="pull-right"><?= $result['player1_name'] ?></div>
        </div>
        <div class="col-lg-1"> - </div>
        <div class="col-lg-3">
            <?= $result['player2_name'] ?>
        </div>
        <div class="col-lg-3">
            <b>
                <?php
                switch ($result['winner']) {
                    case 1:
                        echo $result['player1_name'] . " won!";
                        break;
                    case 2:
                        echo $result['player2_name'] . " won!";
                        break;
                    default:
                        echo 'Tie!';
                }
                ?>
            </b>
        </div>
        <div class="col-lg-2 played_time">
            <?= date("d.m.Y H:i", strtotime($result['played'])); ?>
        </div>
    </div>
<?php endforeach; ?>
<div class="row text-center top-header"><a href="/site/results">View all results</a></div>