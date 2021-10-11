
document.write('<script type="text/javascript" src="/static/js/jquery.validate.min.js"></script>');
document.write('<script type="text/javascript" src="/static/js/additional-methods.min.js"></script>');

$(function () {

    $.validator.addMethod( "required_validation", function( value, element) {
        
        if(value && value !=''){
          
              var trim_data = value.toString().trim();
              if(!trim_data){
                return false;
              }
              else{
                return true;
              }
          }
          else{
            return false;
          }
      }, " (Required)" );

    $.validator.addMethod( "name_with_special_characters", function( value, element) {
        var v_pattern_regex = /^[ A-Za-z0-9_]*$/
        if(value){
            
              var trim_data = value.trim();
              if(!trim_data){
                return false;
              }
              
        }
        
        if ( this.optional( element ) ) {
          return true;
        }
        return v_pattern_regex.test( value );
      }, " (Invalid)" );

    $.validator.addMethod("image_extension", function (value, element, param) {
                param = typeof param === "string" ? param.replace(/,/g, '|') : "png|jpe?g|gif";
                return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i"));
            }, " (Invalid)");

    $.validator.addMethod("file_extension", function (value, element, param) {
                param = typeof param === "string" ? param.replace(/,/g, '|') : "png|jpe?g|gif|pdf";
                return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i"));
            }, " (Invalid)");

    $.validator.addMethod("file_extension_csv", function (value, element, param) {
                param = typeof param === "string" ? param.replace(/,/g, '|') : "csv";
                return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i"));
            }, " (Invalid)");

    $.validator.addMethod("file_extension_xlsx", function (value, element, param) {
                param = typeof param === "string" ? param.replace(/,/g, '|') : "xlsx|xls";
                return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i"));
            }, " (Invalid)");

    $.validator.addMethod('five_mb_file', function (value, element,param) {
      if(value){
          var size=element.files[0].size;
         size=Math.round(size);
          return this.optional(element) || size <= 5242880 ;
      }
      else{
        return true;
      }
      
    }, ' (Invalid)');

    $.validator.addMethod( "two_with_two_decimal", function( value, element) {
      var v_two_with_two_regex = /^([0-9]\d{0,1}\.\d{1,2}|\.\d{1,2}|[1-9]\d{0,1})$/
        if ( this.optional( element ) ) {
          return true;
        }
        return v_two_with_two_regex.test( value );
    }, " (Invalid)" );

      $.validator.addMethod( "three_with_two_decimal", function( value, element) {
        var v_three_with_two_regex = /^([1-9]\d{0,2}\.\d{1,2}|\.\d{1,2}|[1-9]\d{0,2})$/
        if(value){
            
              var trim_data = value.trim();
              if(!trim_data){
                return false;
              }
              
        }
        if ( this.optional( element ) ) {
          return true;
        }
        return v_three_with_two_regex.test( value );
      }, " (Invalid)" );


    $.validator.addMethod( "ten_with_two_decimal", function( value, element) {
        var v_ten_with_two_regex = /^(0\.\d{1,2}|[1-9]\d{0,9}\.\d{1,2}|\.\d{1,2}|[1-9]\d{0,9})$/
        if(value){
            
              var trim_data = value.trim();
              if(!trim_data){
                return false;
              }
              
        }

        if ( this.optional( element ) ) {
          return true;
        }

        return v_ten_with_two_regex.test( value );
      }, " (Invalid)" );


      $.validator.addMethod( "twelve_with_two_decimal", function( value, element) {
        var v_ten_with_two_regex = /^(0\.\d{1,2}|[1-9]\d{0,11}\.\d{1,2}|\.\d{1,2}|[1-9]\d{0,11})$/
        if(value){

              var trim_data = value.trim();
              if(!trim_data){
                return false;
              }

        }

        if ( this.optional( element ) ) {
          return true;
        }

        return v_ten_with_two_regex.test( value );
      }, " (Invalid)" );

      $.validator.addMethod( "six_with_two_decimal", function( value, element) {
        var v_ten_with_two_regex = /^([0-9]\d{0,5}\.\d{1,2}|\.\d{1,2}|[0-9]\d{0,5})$/
        if(value){

              var trim_data = value.trim();
              if(!trim_data){
                return false;
              }

        }

        if ( this.optional( element ) ) {
          return true;
        }

        return v_ten_with_two_regex.test( value );
      }, " (Invalid)" );

    $.validator.addMethod( "numeric_six_validation", function( value, element) {
        var v_numeric_six_regex = /^[1-9]\d{0,5}$/

        if(value){
            
              var trim_data = value.trim();
              if(!trim_data){
                return false;
              }
              
        }

        if ( this.optional( element ) ) {
          return true;
        }
        return v_numeric_six_regex.test( value );
      }, " (Invalid)" );


      $.validator.addMethod( "numeric_three_validation", function( value, element) {
        var v_numeric_three_regex = /^[1-9]\d{0,2}$/

        if(value){
            
              var trim_data = value.trim();
              if(!trim_data){
                return false;
              }
              
        }

        if ( this.optional( element ) ) {
          return true;
        }
        return v_numeric_three_regex.test( value );
      }, " (Invalid)" );

    $.validator.addMethod( "numeric_eight_validation", function( value, element) {
        var v_numeric_eight_regex = /^[1-9]\d{0,7}$/
        if(value){
            
              var trim_data = value.trim();
              if(!trim_data){
                return false;
              }
              
        }

        if ( this.optional( element ) ) {
          return true;
        }
        return v_numeric_eight_regex.test( value );
      }, " (Invalid)" );


    $.validator.addMethod( "mobile_number_validation", function( value, element) {
        var v_mobile_number_regex = /^[1-9]\d{9,14}$/
        if(value){
            
              var trim_data = value.trim();
              if(!trim_data){
                return false;
              }
              
        }

        if ( this.optional( element ) ) {
          return true;
        }
        return v_mobile_number_regex.test( value );
      }, " (Invalid)" );

    $.validator.addMethod( "alphanumeric_with_special_characters", function( value, element) {
        var v_pattern_regex = /^[ A-Za-z0-9#&()[\\\]\/;:_-]*$/
        if(value){
            
              var trim_data = value.trim();
              if(!trim_data){
                return false;
              }
              
        }

        if ( this.optional( element ) ) {
          return true;
        }
        return v_pattern_regex.test( value );
      }, " (Invalid)" );


    $.validator.addMethod( "alphanumeric_only", function( value, element) {
        var v_pattern_regex = /^[ A-Za-z0-9]*$/
        if(value){
            
              var trim_data = value.trim();
              if(!trim_data){
                return false;
              }
              
        }

        if ( this.optional( element ) ) {
          return true;
        }
        return v_pattern_regex.test( value );
      }, " (Invalid)" );
    
    $.validator.addMethod( "alphanumeric_without_space", function( value, element) {
        var v_pattern_regex = /^[A-Za-z0-9]*$/
        if(value){
            
              var trim_data = value.trim();
              if(!trim_data){
                return false;
              }
              
        }

        if ( this.optional( element ) ) {
          return true;
        }
        return v_pattern_regex.test( value );
    }, " (Invalid)" );

    

    $.validator.addMethod( "alphabet_only", function( value, element) {
        var v_pattern_regex = /^[ A-Za-z]*$/
        if(value){

              var trim_data = value.trim();
              if(!trim_data){
                return false;
              }

        }

        if ( this.optional( element ) ) {
          return true;
        }
        return v_pattern_regex.test( value );
      }, " (Invalid)" );

    $.validator.addMethod( "numeric_only", function( value, element) {
        var v_pattern_regex = /^[0-9]*$/
        if(value){
            
              var trim_data = value.trim();
              if(!trim_data){
                return false;
              }
              
        }

        if ( this.optional( element ) ) {
          return true;
        }
        return v_pattern_regex.test( value );
      }, " (Invalid)" );


    $.validator.addMethod( "exact_10_character_only", function( value, element) {
        if(value){
            
              var trim_data = value.trim();
              if(!trim_data){
                return false;
              }
              
        }

        if ( value && value.length != 10 ) {
            return false;
        } else return true;
    }, " (Invalid)" );


    $.validator.addMethod( "exact_15_character_only", function( value, element) {
        if(value){
            
              var trim_data = value.trim();
              if(!trim_data){
                return false;
              }
              
        }

        if ( value && value.length != 15 ) {
            return false;
        } else return true;
    }, " (Invalid)" );


    $.validator.addMethod( "exact_21_character_only", function( value, element) {
        if(value){
            
              var trim_data = value.trim();
              if(!trim_data){
                return false;
              }
              
        }

        if ( value && value.length != 21 ) {
            return false;
        } else return true;
    }, " (Invalid)" );


    $.validator.addMethod( "email_validation", function( value, element) {
        var v_pattern_regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        if(value){
            
              var trim_data = value.trim();
              if(!trim_data){
                return false;
              }
              
        }

        if ( this.optional( element ) ) {
          return true;
        }
        return v_pattern_regex.test( value );
      }, " (Invalid)" );

    $.validator.addMethod( "mobile_number_validation_length_50", function( value, element) {
        var v_mobile_number_regex = /^[1-9]\d{0,50}$/
        if(value){

              var trim_data = value.trim();
              if(!trim_data){
                return false;
              }

        }

        if ( this.optional( element ) ) {
          return true;
        }
        return v_mobile_number_regex.test( value );
    }, " (Invalid)" );


    $.validator.addMethod( "mobile_number_validation_length_13", function( value, element) {
        var v_mobile_number_regex = /^[1-9]\d{0,13}$/
        if(value){

              var trim_data = value.trim();
              if(!trim_data){
                return false;
              }

        }

        if ( this.optional( element ) ) {
          return true;
        }
        return v_mobile_number_regex.test( value );
    }, " (Invalid)" );


    $.validator.addMethod( "required_cancel_quote_remark_validation", function( value, element) {
        
        var v_cancel_reason = $('#id_cancelled_reason option:selected').text(); 
        if(value){

              var trim_data = value.trim();
              if(!trim_data && v_cancel_reason === 'Others'){
                return false;
              }
              else{
                  return true;
              }

        }
        else if(v_cancel_reason === 'Others' && !value)
        {
          return false;
        }

        if ( this.optional( element ) ) {
          return true;
        }
        return true;
    }, " (Required)" );




    jQuery.validator.addMethod("required", jQuery.validator.methods.required_validation, " (Required)");
    // jQuery.validator.addMethod("email_validation", jQuery.validator.methods.email, " (Invalid Email)");
    jQuery.validator.addMethod("url_validation", jQuery.validator.methods.url, " (Invalid Url)");


    $.validator.addMethod("needsSelection", function (value, element) {
            // alert($(element).val());
            if(!$(element).val()){
              return false;
            }
            var count = $(element).find('option:selected').length;
            return count > 0;
    }, " (Required)");

    $.validator.messages.needsSelection = ' (Required)';

    jQuery.validator.addClassRules("cls_required", {
        //required: true
        required_validation:true
    });

    jQuery.validator.addClassRules("cancel_quote_remark_required", {
        //required: true
        required_cancel_quote_remark_validation:true
    });

    jQuery.validator.addClassRules("tagged_quote_id", { //Tagged quote in client searches Date: June15,2021 -- Required validation
      required_validation:true,
    });

    jQuery.validator.addClassRules("cls_email", {
        required_validation: true,
        email_validation : true
    });

    jQuery.validator.addClassRules("cls_email_not_required", {
        email_validation : true
    });

    jQuery.validator.addClassRules("cls_url", {
        url_validation : true
    });

    jQuery.validator.addClassRules("cls_mobile", {
        // required: true,
        mobile_number_validation:true
    });



    jQuery.validator.addClassRules("cls_multiple", {

        needsSelection:true
    });

    // jQuery.validator.addClassRules("cls_select2", {
    //
    //     needsSelection:true
    // });

    jQuery.validator.addClassRules("cls_two_with_two_decimal", {
        two_with_two_decimal:true
    });

    jQuery.validator.addClassRules("cls_three_with_two_decimal", {
        required_validation: true,
        three_with_two_decimal:true
    });

    jQuery.validator.addClassRules("cls_ten_with_two_decimal", {
        // required: true,
        ten_with_two_decimal:true
    });

    jQuery.validator.addClassRules("cls_twelve_with_two_decimal", {
        // required: true,
        twelve_with_two_decimal:true
    });

    jQuery.validator.addClassRules("cls_six_with_two_decimal", {
      // required: true,
      six_with_two_decimal:true
    });

    jQuery.validator.addClassRules("cls_numeric_six", {
        required_validation: true,
        numeric_six_validation:true
    });

    jQuery.validator.addClassRules("cls_numeric_three", {
      numeric_three_validation:true
  });


    jQuery.validator.addClassRules("cls_numeric_eight", {
        required_validation: true,
        numeric_eight_validation:true
    });


    jQuery.validator.addClassRules("cls_alphanumeric_special_character", {
        required_validation: true,
        alphanumeric_with_special_characters:true
    });

    jQuery.validator.addClassRules("cls_numeric_only", {
      numeric_only:true
    });

    jQuery.validator.addClassRules("cls_alphanumeric", {
        alphanumeric_only:true
    });

    jQuery.validator.addClassRules("cls_alphanumeric_without_space", {
      alphanumeric_without_space:true
  });

    jQuery.validator.addClassRules("cls_alphabet", {
        alphabet_only:true
    });

    jQuery.validator.addClassRules("cls_exact_10_character_only", {
        exact_10_character_only:true
    });


    jQuery.validator.addClassRules("cls_exact_15_character_only", {
        exact_15_character_only:true
    });


    jQuery.validator.addClassRules("cls_exact_21_character_only", {
        exact_21_character_only:true
    });

    jQuery.validator.addClassRules("cls_alphanumeric_special_character_not_required", {
        alphanumeric_with_special_characters:true
    });

    jQuery.validator.addClassRules("cls_name_with_special_characters", {
        name_with_special_characters:true
    });

    jQuery.validator.addClassRules("cls_image_extension", {
        image_extension:true
    });

    jQuery.validator.addClassRules("cls_file_extension", {
        file_extension:true
    });
    jQuery.validator.addClassRules("cls_file_extension_csv", {
        file_extension_csv:true
    });
    jQuery.validator.addClassRules("cls_file_extension_xlsx", {
        file_extension_xlsx:true
    });

    jQuery.validator.addClassRules("cls_5mb_size", {
        five_mb_file:true
    });

    jQuery.validator.addClassRules("cls_contact_length_50", {
    mobile_number_validation_length_50:true
    });

    jQuery.validator.addClassRules("cls_contact_length_13", {
    mobile_number_validation_length_13:true
    });

});

//for browser-compatibility function common_validate_form(form_id, is_ajax_calling=false, ajax_call_function=validate_form, error_message='Please fill all mandatory fields'){

function common_validate_form(form_id, is_ajax_calling, ajax_call_function, error_message, popup_alert =true){
    is_error_popup = false;
    is_ajax_calling = set_default_value(is_ajax_calling, false);
    try {
        if(ajax_call_function === undefined || typeof ajax_call_function === 'undefined') {
            ajax_call_function = set_default_value(ajax_call_function, validate_form);
        }
    }catch(err) {
        console.log(err.message);
    }
    error_message = set_default_value(error_message, 'Please fill all mandatory fields');

    $('#'+form_id).validate({
        ignore: [],

        // onfocusout: true,
        rules:{
            select:{required:true}
        },

        // onfocusout: function(element) {$(element).valid()},

        errorPlacement: function(error, element) {

            $( element )
                .closest( "form" )
                    .find( "label[for='" + element.attr( "id" ) + "']" ).append(error);

        },


        errorElement: "span",

        submitHandler:function(form) {

            if(is_ajax_calling){
               ajax_call_function();
               return false;
            }
            else{
                form.submit();
            }
        },
        invalidHandler: function(event, validator) {

            var errors = validator.numberOfInvalids();
            if (errors && error_message && popup_alert) {
              alert_popup(error_message);
            }
        }
    });
    $('#id_client_form').find('select.cls_multiple').each(function () {
        $(this).change(function () {
            $(this).valid();
    });
    });

    $('#id_client_form').find('select.cls_select2').each(function () {
        $(this).change(function () {
            $(this).valid();
    });
    });

    $('#' +form_id).find('select.cls_multiple').each(function () {
        $(this).change(function () {
            $(this).valid();
    });
    });

    $('#'+form_id).find('select.cls_select2').each(function () {
        $(this).change(function () {
            $(this).valid();
    });
    });

    $('#'+form_id).find('input.cls_required').each(function () {
        $(this).change(function () {
            $(this).valid();
    });
    });




}



// Common method to reset for validationnn error messages
function reset_form_validations(form_id){
    $("#"+form_id).data('validator').resetForm();
    //$("#id_weight_range").addClass('disable-select');
    $("#id_weight_range").addClass('disable-a');
    $("#id_weight_range").addClass('disable-cursor');

}


// Disbale a given set of Character keys
$(".disable_spacial_character").keydown(function(e) {
  if(e.keyCode == '222'){  // disable key 222 => ' and ""
      return false;
  }
});

