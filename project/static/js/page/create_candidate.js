$(document).ready(function () {
    common_validate_form('entry-form', true, btn_submit_click, null);
});

function btn_submit_click() {
    alert("btn_submit_click")
    debugger
    //$("#email_error").text('');
    $('.btn_save').addClass('disable-a');

    var data = $('#entry-form').serializeArray().reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});

    $('#preloader').removeClass("disNo");
    let _url = "/candidateapi/candidate/";
    let method_type ='POST';
    try {
        let candidate_id = $('#candidate_id').val();
        if (typeof candidate_id == "undefined") {
            // do nothing, New Object will create
        }else {
            _url = _url + candidate_id + "/";
            method_type = 'PUT';
        }
    }catch(err) {
      // do nothing, New Object will create
    }
    $.ajax({
        type: method_type,
        url: _url,
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (data) {
            debugger
            if(data.status_code==200){
                alert("Data Successful Saved");
                window.location.href = '/candidate/';
            } else {
                $("#email_error").text(data.message);
                $("#entry-form")[0].reset();
                $('.btn_save').removeClass('disable-a');
                $('#preloader').addClass("disNo");
            }
        },
        error: function (xhr, status, error) {
            $("#entry-form")[0].reset();
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