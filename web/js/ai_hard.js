var ai = {
    board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    huPlayer: "X",
    aiPlayer: "O",
    iter: 0,
    round: 0,
    moves: [],
    makemove: function () {
        var self = this;
        // some random to make game more interesting
        if (self.round == 0) {
            var cells = [0, 2, 4, 6, 8];
            var cell = cells[Math.floor(Math.random() * cells.length)];
        } else {
            $('.drawing-cell').each(function (index) {
                if ($(this).text() != "")
                    self.board[index] = $(this).text();
            });
            var cell = self.minimax(self.board, self.aiPlayer).index;
        }
        $('.drawing-cell').each(function (index) {
            if (index == cell) {
                cell = $(this);
            }
        });
        var current_player = $('.playername.text-danger');
        $('.playername:not(.text-danger)').addClass('text-danger');
        current_player.removeClass('text-danger');

        cell.text(self.aiPlayer);
        self.round++;
        var game_ended = game.checkEndGame();
        if (game_ended !== null) {
            game.processResults(game_ended);
        }
        return game_ended;
    },
    minimax: function (reboard, player) {
        var self = this;
        self.iter++;
        let array = self.avail(reboard);
        if (self.winning(reboard, self.huPlayer)) {
            return {
                score: -10
            };
        } else if (self.winning(reboard, self.aiPlayer)) {
            return {
                score: 10
            };
        } else if (array.length === 0) {
            return {
                score: 0
            };
        }

        var moves = [];

        for (var i = 0; i < array.length; i++) {
            var move = {};
            move.index = reboard[array[i]];
            reboard[array[i]] = player;

            if (player == self.aiPlayer) {
                var g = self.minimax(reboard, self.huPlayer);
                move.score = g.score;
            } else {
                var g = self.minimax(reboard, self.aiPlayer);
                move.score = g.score;
            }
            reboard[array[i]] = move.index;
            moves.push(move);
        }

        var bestMove;
        if (player === self.aiPlayer) {
            var bestScore = -10000;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            var bestScore = 10000;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        self.moves = moves;
        return moves[bestMove];
    },
    //available spots
    avail: function (reboard) {
        return reboard.filter(s => s != "X" && s != "O");
    },
    winning: function (board, player) {
        if (
                (board[0] == player && board[1] == player && board[2] == player) ||
                (board[3] == player && board[4] == player && board[5] == player) ||
                (board[6] == player && board[7] == player && board[8] == player) ||
                (board[0] == player && board[3] == player && board[6] == player) ||
                (board[1] == player && board[4] == player && board[7] == player) ||
                (board[2] == player && board[5] == player && board[8] == player) ||
                (board[0] == player && board[4] == player && board[8] == player) ||
                (board[2] == player && board[4] == player && board[6] == player)
                ) {
            return true;
        } else {
            return false;
        }
    }
}