$(document).ready(function () {
    common_validate_form('entry-form', true, btn_submit_click, null);
});

function btn_submit_click() {
    alert("btn_submit_click")
    $("#email_error").text('');
    $('.btn_login').addClass('disable-a');

    var data = $('#login-form').serializeArray().reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});

    $('#preloader').removeClass("disNo");
    $.ajax({
        type: 'POST',
        url: '/userapi/login',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (data) {
            if (typeof data.data == "undefined") {
                //data = data;
            }else{
               data = data.data;
            }
            if (data.message == "Login Successful") {
                if(data.next_url){
                    if(data.next_url == "/quote/"){                         // DATE: March 4,2021
                        if(data.user_type == "Shipper"){                    //when Shipper user Login/homepage
                            $(location).attr('href',data.next_url);
                        }
                        else{                                               //when Internal User came from HomePage

                            $(location).attr('href','/customer-care'+data.next_url);
                        }

                    }else{                                                  // DATE: March 4,2021
                        $(location).attr('href',data.next_url);
                    }

                } else{
                    $(location).attr('href',data.url);
                }
            } else {
                $("#email_error").text(data.message);
                $("#login-form")[0].reset();
                $('.btn_login').removeClass('disable-a');
                $('#preloader').addClass("disNo");
            }
        },
        error: function (xhr, status, error) {
            $("#login-form")[0].reset();
            $('.btn_login').removeClass('disable-a');

            setTimeout(function(){
                $('#preloader').addClass("disNo")
                var err = eval("(" + xhr.responseText + ")");
                $("#email_error").text(err.data.message);
             }, 700);

        },
        contentType: "application/json"
    });
}

function btn_country_click(){
    debugger
    if($('#country_id').val()){
        $.ajax({
            method: 'GET',
            url: '/commonapi/city/?country_id=' + $('#country_id').val() ,
            async: false,
            success: function(res){
                let select=$('#city_id');
                select.empty();
                select.append('<option value="">Please Select Country</option>');
                if(res.data){
                    $.each(res.data,function(index, item){
                      select.append('<option value="'+item.id+'">'+item.city_name+'</option>');
                    });
                }
            },
            error: function(xhr, desc, err){
                console.log(xhr.responseText);
                alert(xhr.responseText);
            }
        });
    }else{
        alert("Please select Country.")
    }
}