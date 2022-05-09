var survey = {

    init: function() {
        $(document).on('click', '.circle-border', this.selectScore);
        $(document).on('click', '.downside', this.selectDownside);
        $(document).on('click', '.free-text', this.showTextBox);
    },

    selectScore: function() {
        let select = $(this).parent().find('.selected');
        select.removeClass('circle');
        select.addClass('circle-border');
        select.removeClass('selected');
        $(this).addClass('circle');
        $(this).removeClass('circle-border');
        $(this).addClass('selected');
        $('.downside-block').prop('hidden', false);
        $('.textbox').prop('hidden', true);
    }, 

    selectDownside: function() {
        let select = $(this).parent().find('.selected');
        select.removeClass('downside-border');
        select.removeClass('selected');
        $(this).addClass('downside-border');
        $(this).addClass('selected');
    }, 

    showTextBox: function() {
        $(this).parent().prop('hidden', true);
        $('.textbox').prop('hidden', false);
    }


}

$(document).on('ready', survey.init());
