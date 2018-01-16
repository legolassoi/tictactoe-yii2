<?php
$final_position = json_decode($result->final_position);
?>
<div class="container-fluid">
    <div class="row">
        <div class="col-lg-7 md-12">
            <div class="drawing_area">
                <div class="row players top-header">
                    <div id="player1" class="col-xs-4 text-center playername">
                        <span><?= $result->player1_name; ?></span>: <b>X</b>
                    </div>
                    <div id="player2" class="col-xs-4 text-center playername">
                        <span><?= $result->player2_name; ?></span>: <b>O</b>
                    </div>
                </div>
                <div class="row">
                    <?php for ($i = 0; $i < 3; $i++) : ?>
                        <div class="col-xs-4 drawing-cell well"><?= $final_position[$i] ?></div>
                    <?php endfor; ?>	
                </div>
                <div class="row">
                    <?php for ($i = 3; $i < 6; $i++) : ?>
                        <div class="col-xs-4 drawing-cell well"><?= $final_position[$i] ?></div>
                    <?php endfor; ?>	
                </div>
                <div class="row">
                    <?php for ($i = 6; $i < 9; $i++) : ?>
                        <div class="col-xs-4 drawing-cell well"><?= $final_position[$i] ?></div>
                    <?php endfor; ?>	
                </div>
                <div class="row game-actions">
                    <div id="current_game_results" class="text-center text-danger"></div>
                    <button onclick="reset()" class="btn btn-lg btn-default btn-block" type="button">Play Again</button>
                </div>
            </div>
        </div>
        <div class="col-lg-5 hidden-md hidden-sm hidden-xs">
            <div class="row top-header text-center">
                <b>Latest results:</b>
            </div>
            <div id="latest_results">
                <?= $this->render('partials/_results', ['latest_results' => $latest_results]); ?>
            </div>
        </div>
    </div>
    <div class="row text-center top-header hidden-lg">
        <a href="/game/results">View all results</a>
    </div>
</div>
<script src="/js/game.js"></script>
<script>
    $(document).ready(function () {
        game.checkEndGame();
    });
</script>
</body>
</html>