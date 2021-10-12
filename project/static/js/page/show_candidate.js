
var row_count = 0;

$(document).ready(function () {


});


function fetch_data(page = 1, quote_filter_data = {}) {
    row_count = $("#quote_table_no_of_rows").children("option:selected").val();
    quote_filter_data ['page_size']= row_count;
    quote_filter_data["page"] = page;
    $.ajax({
    method: "GET",
    url: "/quotationapis/quotations/",
    async: false,
    data: quote_filter_data,
    success: function (data) {
        save_curent_quote_table_data = data;
        save_all_rendered_quote_table_data[page]= data;
        renderTableBody(data);
    },
    });
}



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

let candidates_table = $('#candidates_table').DataTable({
    // data: [],
    // bPaginate: false,
    // bInfo: false,
    // bFilter: false,
    // aaSorting: [],
    columns:[
        {},
        {},
        {},
        {},
        {},
        {},
    ]
  });