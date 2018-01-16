
<div class="container-fluid">
    <div class="row">
        <div class="col-lg-7 md-12">
            <div class="drawing_area">
                <div class="row players top-header">
                    <div id="player1" class="col-xs-6 text-center playername">
                        <span><?= $player1; ?></span>: <b>X</b>
                    </div>
                    <div id="player2" class="col-xs-6 text-center playername">
                        <span><?= $player2; ?></span>: <b>O</b>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4 drawing-cell well"></div>
                    <div class="col-xs-4 drawing-cell well"></div>
                    <div class="col-xs-4 drawing-cell well"></div>
                </div>
                <div class="row">
                    <div class="col-xs-4 drawing-cell well"></div>
                    <div class="col-xs-4 drawing-cell well"></div>
                    <div class="col-xs-4 drawing-cell well"></div>
                </div>
                <div class="row">
                    <div class="col-xs-4 drawing-cell well"></div>
                    <div class="col-xs-4 drawing-cell well"></div>
                    <div class="col-xs-4 drawing-cell well"></div>
                </div>
                <div class="row game-actions">
                    <div id="current_game_results" class="text-center text-danger"></div>
                    <button onclick="game.reset(); game_ended = null;" class="btn btn-lg btn-default btn-block" type="button">Play Again</button>
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
<script src="/js/ai<?= ($hard_mode) ? "_hard" : ""; ?>.js"></script>
<script>
    $(document).ready(function () {
        $('#player1').addClass('text-danger');
        var current_player = $('.playername.text-danger');
        // if AI starts
        if (current_player.find('span').text() == 'AI opponent') {
            game.makeAIFirstMove();
        }
        game.listenClick();
    });
</script>
</body>
</html>