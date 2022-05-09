var appointment = {

    init : function() {
        $(document).on("change", ".step", this.showNextStep);
        $(document).on('change', '.step', this.enableSumbit);
    },

    showNextStep : function() {
        let val = $(this).find('.form-control-lg').val();
        if(!val) {
            return;
        } else {
            let next = $(this).attr('next');
            $('.' + next).prop('hidden', false);
        }
    }, 

    enableSumbit : function() {
        let result = true;
        $('.step').each((i,form) => {
            let val = $(form).find('.form-control-lg').val();
            if(!val) {
                result = false;
            }
        });

        if(result) {
            $('.submitBtn').removeClass('disabled');
        } else {
            $('.submitBtn').addClass('disabled');
        }
    }

}

$(document).on('ready', appointment.init());
