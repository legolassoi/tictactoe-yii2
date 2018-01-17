var login = {
    initBotListener: function () {
        var self = this;
        $('#bot').on('click', function () {
            var id = 'player2';
            if ($('#player1').val().toLowerCase() == 'ai opponent') {
                id = 'player1';
            }
            if ($(this).is(':checked')) {
                $('#' + id).val('AI opponent').attr('readonly', true);
            } else {
                $('#player2, #player1').val('').attr('readonly', false);
                $('#namesform-hard_mode').removeAttr('checked');
            }
        });
        $('#player2, #player1').on('keydown', function () {
            self.lockBot();
        });
        $('#namesform-hard_mode').on('click', function () {
            if ($(this).is(':checked') && !$('#bot').is(':checked')) {
                $('#bot').click();
            }
        });
    },
    lockBot: function (el) {
        var pl1 = $('#player1').val();
        var pl2 = $('#player2').val();
        if (pl1.toLowerCase() == 'ai opponent' && !$('#bot').is(':checked')) {
            $('#bot').click();
        }
        if (pl2.toLowerCase() == 'ai opponent' && !$('#bot').is(':checked')) {
            $('#bot').click();
        }
    },
    switchNames: function () {
        var tmp_val = $('#player2').val();
        var tmp_readonly = $('#player2').attr('readonly');
        $('#player2').val($('#player1').val());
        if (typeof $('#player1').attr('readonly') !== 'undefined') {
            $('#player2').attr('readonly', $('#player1').attr('readonly'));
        } else {
            $('#player2').removeAttr('readonly');
        }
        $('#player1').val(tmp_val);
        if (typeof tmp_readonly !== 'undefined') {
            $('#player1').attr('readonly', tmp_readonly);
        } else {
            $('#player1').removeAttr('readonly');
        }
    }
}