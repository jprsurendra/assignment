
var row_count = '';
var page = '1'

let candidate_filter_data = {};
let save_curent_candidate_table_data = [];
let save_all_rendered_candidate_table_data = {}


$(document).ready(function () {
    fetch_data();

    $("#c_data_table")
    .DataTable()
    .columns()
    .every(function () {
      let key = $(this.header()).attr("name");
      $("input", this.footer()).on("keyup change clear", function () {
        if ($.trim(this.value).length > 2) {
          candidate_filter_data[`${key}`] = $.trim(this.value);
          fetch_data(1, candidate_filter_data);
        } else if (candidate_filter_data[`${key}`]) {
          candidate_filter_data[`${key}`] = "";
          fetch_data(1, candidate_filter_data);
        }
      });
    });

});
//createBookingTable
function create_data_table(id, data) {
  let set_columns = [
    { data: "candidate_name",},
    { data: "address",},
    { data: "city" },
    { data: "owner_info" },
    { data: "employee_size" },
    {
      data: "actions",
      render: function (data, type, row) {
          return (
              '<a class="btn btn-primary btn-sm mr-3" href="/candidate/candidate-detail/' + row.id + '">Edit</a>' +
              '<button class="btn btn-danger btn-sm" onClick="btn_delete_click(\'' + row.id + '\');"> Delete</button>'
          );
      },
    },
  ];

  let emptyTableMsg = '<div style="padding:100px 0px"><p class="no_candidate_found">You do not have any data</p></div>';


  let table = $(id).DataTable({
    data: [],
    bPaginate: false,
    //scrollX : true,
    bInfo: false,
    bFilter: false,
    aaSorting: [],
    columns: set_columns,
    oLanguage: {
        sEmptyTable: emptyTableMsg,
      },
  });
}

//renderBookingTableBody
function render_data_table_body(table_data, page, page_size) {
    let row_data = table_data.data.results;
    table_data.data['page_info'] = {'num_pages': table_data.data.count,
                      'start_count': page_size * (page - 1) + 1,
                      'end_count': (page_size * (page - 1)) + 1 + row_data.length,
                      'current_page': page,
                      'items_per_page': page_size,
                      'next_url': table_data.data.next,
                      'previous_url': table_data.data.previous
                      };


    if (!$.fn.DataTable.isDataTable("#c_data_table")) {
        create_data_table("#c_data_table");
    }

    $("#c_data_table").DataTable().clear().draw();
    $("#div_showing_datas").removeClass('d-flex');
    $("#div_showing_datas").hide();

    if (row_data.length > 0) {
        row_data.forEach(function (row) {
            $("#c_data_table").DataTable().row.add({
                  candidate_name: row.candidate_name || "N/A",
                  address: row.address || "N/A",
                  city: row.city.city_name + ' (' + row.city.country.country_name+ ')' || "N/A",
                  owner_info: row.owner_info || "N/A",
                  employee_size: row.employee_size || "N/A",
                  id: row.id || "N/A"
            }).draw();
        });
        let span_of_listing_count_html = common_pagination(table_data, 'candidate_');
        console.log(span_of_listing_count_html)
        $("#candidate_pageination_info").html(span_of_listing_count_html);
        $("#div_showing_datas").addClass('d-flex');
        $("#div_showing_datas").show();
    }
}

function fetch_data(page = 1, candidate_filter_data = {}) {
    row_count = $("#no_of_candidate_rows").children("option:selected").val();
    candidate_filter_data['page_size']= row_count;
    candidate_filter_data["page"] = page;
    $.ajax({
        method: "GET",
        url: "/candidateapi/candidate/",
        async: false,
        data: candidate_filter_data,
        success: function (data) {
          save_curent_candidate_table_data = data;
          save_all_rendered_candidate_table_data[page]= data;
          render_data_table_body(data, page, row_count); // page_size
        },
    });
}
function candidate_row_count_change() {
  fetch_data(1, candidate_filter_data)
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
                            if(data.status_code==200){
                              alert("Data Successful Deleted");
                            } else {
                                alert("Can't complete the request there are some errors occurred.");
                            }
                            window.location.href = '/candidate/';
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