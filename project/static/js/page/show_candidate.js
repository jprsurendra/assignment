
function btn_delete_click(id) {
    debugger
    $.confirm({
        title: '',
        content: 'This action will delete candidate permanently, Do you want to continue?',
        buttons: {
            yes: {
                btnClass: 'btn button btn-for-alert',
                action: function () {
                    $.ajax({
                        url: "/candidateapi/candidate/" + id,
                        // data: {pk:91},
                        type: 'DELETE',
                        contentType: 'application/json',
                        success: function(data) {
                            console.log(data)
                            debugger
                              if(data.status_code==200){
                                alert("Data Successful Deleted");
                                window.location.href = '/candidate/';
                              } else {

                              }
                        },
                    });
                }//action
            },
            no: {
                btnClass: 'btn button no-bg-button btn-for-alert'
            }
        }
    });

}