var ai = {
    board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    huPlayer: "X",
    aiPlayer: "O",
    round: 0,
    makemove: function () {
        var self = this;
        var cell = self.calculatemove();
        var current_player = $('.playername.text-danger');
        $('.playername:not(.text-danger)').addClass('text-danger');
        current_player.removeClass('text-danger');
        cell.text(self.aiPlayer);
        var game_ended = game.checkEndGame();
        if (game_ended !== null) {
            game.processResults(game_ended);
        }
        return game_ended;
    },

    calculatemove: function () {
        var self = this;
        var cells = [];
        $('.drawing-cell').each(function (index) {
            cells[index] = $(this);
        });
        var move_index = self.checkTwoInLine(self.aiPlayer);
        if (move_index !== false) {
            return cells[move_index];
        }
        move_index = self.checkTwoInLine(self.huPlayer);
        if (move_index !== false) {
            return cells[move_index];
        }
        return self.pickRandomCell();
    },

    pickRandomCell: function () {
        var cells = $('.drawing-cell:empty');
        var cell = $(cells[Math.floor(Math.random() * cells.length)]);
        return cell;
    },

    checkTwoInLine: function (letter) {
        var cells = [];
        $('.drawing-cell').each(function (index) {
            cells[index] = $(this).text();
        });
        // horizontal 1
        if (letter == cells[0] && letter == cells[1] && game.notEmpty([0, 1]) && cells[2] == '') {
            return 2;
        }
        if (letter == cells[1] && letter == cells[2] && game.notEmpty([2, 1]) && cells[0] == '') {
            return 0;
        }
        if (letter == cells[0] && letter == cells[2] && game.notEmpty([0, 2]) && cells[1] == '') {
            return 1;
        }
        // horizontal 2
        if (letter == cells[3] && letter == cells[4] && game.notEmpty([3, 4]) && cells[5] == '') {
            return 5;
        }
        if (letter == cells[4] && letter == cells[5] && game.notEmpty([5, 4]) && cells[3] == '') {
            return 3;
        }
        if (letter == cells[3] && letter == cells[5] && game.notEmpty([5, 3]) && cells[4] == '') {
            return 4;
        }
        // horizontal 3
        if (letter == cells[6] && letter == cells[7] && game.notEmpty([6, 7]) && cells[8] == '') {
            return 8;
        }
        if (letter == cells[7] && letter == cells[8] && game.notEmpty([7, 8]) && cells[6] == '') {
            return 6;
        }
        if (letter == cells[6] && letter == cells[8] && game.notEmpty([6, 8]) && cells[7] == '') {
            return 7;
        }
        // vertical 1
        if (letter == cells[0] && letter == cells[3] && game.notEmpty([0, 3]) && cells[6] == '') {
            return 6;
        }
        if (letter == cells[3] && letter == cells[6] && game.notEmpty([3, 6]) && cells[0] == '') {
            return 0;
        }
        if (letter == cells[0] && letter == cells[6] && game.notEmpty([0, 6]) && cells[3] == '') {
            return 3;
        }
        // vertical 2
        if (letter == cells[1] && letter == cells[4] && game.notEmpty([1, 4]) && cells[7] == '') {
            return 7;
        }
        if (letter == cells[4] && letter == cells[7] && game.notEmpty([7, 4]) && cells[1] == '') {
            return 1;
        }
        if (letter == cells[1] && letter == cells[7] && game.notEmpty([1, 7]) && cells[4] == '') {
            return 4;
        }
        // vertical 3
        if (letter == cells[2] && letter == cells[5] && game.notEmpty([2, 5]) && cells[8] == '') {
            return 8;
        }
        if (letter == cells[5] && letter == cells[8] && game.notEmpty([5, 8]) && cells[2] == '') {
            return 2;
        }
        if (letter == cells[2] && letter == cells[8] && game.notEmpty([2, 8]) && cells[5] == '') {
            return 5;
        }
        // cross 1
        if (letter == cells[0] && letter == cells[4] && game.notEmpty([0, 4]) && cells[8] == '') {
            return 8;
        }
        if (letter == cells[4] && letter == cells[8] && game.notEmpty([4, 8]) && cells[0] == '') {
            return 0;
        }
        if (letter == cells[0] && letter == cells[8] && game.notEmpty([0, 8]) && cells[4] == '') {
            return 4;
        }
        // cross 2
        if (letter == cells[2] && letter == cells[4] && game.notEmpty([2, 4]) && cells[6] == '') {
            return 6;
        }
        if (letter == cells[4] && letter == cells[6] && game.notEmpty([4, 6]) && cells[2] == '') {
            return 2;
        }
        if (letter == cells[2] && letter == cells[6] && game.notEmpty([2, 6]) && cells[4] == '') {
            return 4;
        }
        return false;
    }
}