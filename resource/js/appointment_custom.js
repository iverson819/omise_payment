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
            
            if($('.' + next).hasClass('finalstep')) {
                $('#email').prop('hidden', val === 'yes');
                $('#email').prop('disabled', val === 'yes');
            }

            // time picker
            if($('.' + next).attr('datetimepicker')) {
                flatpickr('#datetime', appointment.timeConfig);
            } else if($('.' + next).attr('datepicker')) {
                flatpickr('#dob', {disableMobile:true});
            }
        }
    }, 

    enableSumbit : function() {
        let result = true;
        $('.step').each((i,form) => {
            let val = $(form).find('.form-control-lg').val();
            let disabled = $(form).find('.form-control-lg').prop('disabled');
            if(!val && !disabled) {
                result = false;
            }
        });

        if(result) {
            $('.submitBtn').removeClass('disabled');
        } else {
            $('.submitBtn').addClass('disabled');
        }
    }, 

    timeConfig: {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        disableMobile:true
    }

}

$(document).on('ready', appointment.init());
$(document).ready( function () {
    $('#picker').dateTimePicker({
        dateFormat:"YYYY-MM-DD HH:mm", 
        showTime:true
    });
})