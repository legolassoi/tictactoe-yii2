var game = {
    game_ended: null,
    cells: [],

    checkEndGame: function () {
        var self = this;
        $('.drawing-cell').each(function (index) {
            self.cells[index] = $(this).text();
        });
        var have_winner = self.checkWinner(self.cells);

        if ($('.drawing-cell:empty').length == 0 && !have_winner) {
            return 0;
        } else if (have_winner) {
            return have_winner;
        } else {
            return null;
        }
    },

    notEmpty: function (indexes) {
        var self = this;
        var ret = true;
        $.each(indexes, function (key, value) {
            if (self.cells[value] == '') {
                ret = false;
            }
        });
        return ret;
    },

    highlightWin: function (indexes) {
        $('.drawing-cell').each(function (index) {
            if ($.inArray(index, indexes) !== -1) {
                $(this).addClass('text-danger');
            }
        });
    },

    checkWinner: function () {
        var self = this;
        // check each combination
        // horizontals
        if (self.cells[0] == self.cells[1] && self.cells[0] == self.cells[2] && self.notEmpty([0, 1, 2])) {
            self.highlightWin([0, 1, 2]);
            if (self.cells[0] == 'X') {
                return 1;
            } else {
                return 2;
            }
        }
        if (self.cells[3] == self.cells[4] && self.cells[3] == self.cells[5] && self.notEmpty([3, 4, 5])) {
            self.highlightWin([3, 4, 5]);
            if (self.cells[3] == 'X') {
                return 1;
            } else {
                return 2;
            }
        }
        if (self.cells[6] == self.cells[7] && self.cells[6] == self.cells[8] && self.notEmpty([6, 7, 8])) {
            self.highlightWin([6, 7, 8]);
            if (self.cells[6] == 'X') {
                return 1;
            } else {
                return 2;
            }
        }
        // verticals
        if (self.cells[0] == self.cells[3] && self.cells[0] == self.cells[6] && self.notEmpty([0, 3, 6])) {
            self.highlightWin([0, 3, 6]);
            if (self.cells[0] == 'X') {
                return 1;
            } else {
                return 2;
            }
        }
        if (self.cells[1] == self.cells[4] && self.cells[1] == self.cells[7] && self.notEmpty([1, 4, 7])) {
            self.highlightWin([1, 4, 7]);
            if (self.cells[1] == 'X') {
                return 1;
            } else {
                return 2;
            }
        }
        if (self.cells[2] == self.cells[5] && self.cells[2] == self.cells[8] && self.notEmpty([2, 5, 8])) {
            self.highlightWin([2, 5, 8]);
            if (self.cells[2] == 'X') {
                return 1;
            } else {
                return 2;
            }
        }
        // cross
        if (self.cells[0] == self.cells[4] && self.cells[0] == self.cells[8] && self.notEmpty([0, 4, 8])) {
            self.highlightWin([0, 4, 8]);
            if (self.cells[0] == 'X') {
                return 1;
            } else {
                return 2;
            }
        }
        if (self.cells[2] == self.cells[4] && self.cells[2] == self.cells[6] && self.notEmpty([2, 4, 6])) {
            self.highlightWin([2, 4, 6]);
            if (self.cells[2] == 'X') {
                return 1;
            } else {
                return 2;
            }
        }
        return false;
    },

    reset: function () {
        var self = this;
        $('.drawing-cell').text('');
        $('.drawing-cell').removeClass('text-danger');
        $('.playername').removeClass('text-danger');
        $('.playername:first').addClass('text-danger');
        $('.game-actions').hide();
        self.game_ended = null;
        self.cells = [];
        ai.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        ai.round = 0;
        var current_player = $('.playername.text-danger');
        // if AI starts
        if (current_player.find('span').text() == 'AI opponent') {
            setTimeout(function () {
                game.makeAIFirstMove();
            }, Math.floor((Math.random() * 1000) + 10));

        }
    },

    processResults: function (game_ended) {
        var self = this;
        self.game_ended = game_ended;
        $('.game-actions').show();
        var html = '';
        switch (self.game_ended) {
            case 1:
                html = $('#player1 span').text() + ' won!';
                break;
            case 2:
                html = $('#player2 span').text() + ' won!';
                break;
            default:
                html = 'Tie!';
        }
        $('#current_game_results').html(html);
        $.ajax({
            url: '/site/store',
            method: 'POST',
            data: {
                'GameResults[player1_name]': $('#player1 span').text(),
                'GameResults[player2_name]': $('#player2 span').text(),
                'GameResults[winner]': self.game_ended,
                'GameResults[final_position]': JSON.stringify(self.cells)
            },
            success: function (response) {
                $('#latest_results').html(response);
            }
        });
    },

    listenClick: function () {
        var self = this;

        $('.drawing-cell').on('click', function () {
            if ($(this).text() != '' || self.game_ended !== null) {
                return;
            }
            var current_player = $('.playername.text-danger');
            // do not allow to move if wait for AI
            if (current_player.find('span').text() == 'AI opponent') {
                return;
            }

            $('.playername:not(.text-danger)').addClass('text-danger');
            current_player.removeClass('text-danger');

            var letter = current_player.find('b').text();
            $(this).text(letter);
            self.game_ended = game.checkEndGame();
            if (self.game_ended !== null) {
                game.processResults(self.game_ended);
                return;
            }
            if ($('.playername.text-danger').find('span').text() == 'AI opponent') {
                setTimeout(function () {
                    self.game_ended = ai.makemove()
                }, Math.floor((Math.random() * 1000) + 100));
            }
        })
    },

    makeAIFirstMove: function () {
        var self = this;
        ai.huPlayer = "O";
        ai.aiPlayer = "X";
        self.game_ended = ai.makemove();
    }
}