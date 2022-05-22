var appointment = {

    apiUrl : "https://care-api-staging.vaultdragon.com/",
    clinicUrl : "clinic?appid=NIKSPWA",
    doctorsUrl : "provider/doctor/?appid=NIKSPWA", 

    init : function() {
        this.fetchAPI(this.apiUrl + this.clinicUrl, $("#location"), this.updateClinicOption);
        this.fetchAPI(this.apiUrl + this.doctorsUrl, $("#doctor"), this.updateDoctorOption);
        $(document).on("change", ".step", this.showNextStep);
        $(document).on('change', '.step', this.enableSumbit);
    },

    fetchAPI : function(url, selector, updateOption) {
        $.ajax({
            url: url,
            type: 'GET',
            contentType : "application/json",
            success: function (response) {
                console.log(response);
                if(response && response.data) {
                    response.data.forEach(each => {
                        let child = $("<option>");
                        updateOption(child, each, selector);
                        selector.append(child)
                    });
                } else {
                    console.log("there is no response coming");
                }
            }
        });
    }, 

    updateDoctorOption : function(child, each) {
        child.val(each._id);
        child.text(each.name);
    },

    updateClinicOption : function(child, each) {
        child.val(each.clinicCode);
        child.text(each.name);
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