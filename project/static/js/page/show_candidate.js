
var row_count = '';
var page = '1'

let booking_filter_data = {};
let save_curent_booking_table_data = [];
let save_all_rendered_booking_table_data = {}


$(document).ready(function () {
    fetch_data();

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
              '<a className="btn btn-success btn-sm" href="/candidate/candidate-detail/' + row.id + '">Edit</a>' +
              '<a className="btn btn-danger btn-sm" onClick="btn_delete_click(\'' + row.id + '\');"> Delete</a>'
          );
      },
    },
  ];

  let emptyTableMsg = '<div style="padding:100px 0px"><p class="no_booking_found">You do not have any data</p></div>';


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
function render_data_table_body(table_data) {
    let row_data = table_data.data.results;

    if (!$.fn.DataTable.isDataTable("#booking_table")) {
        create_data_table("#booking_table");
    }

    $("#booking_table").DataTable().clear().draw();
    $("#div_showing_bookings").removeClass('d-flex');
    $("#div_showing_bookings").hide();

    if (row_data.length > 0) {
        row_data.forEach(function (row) {
            let action_td = '<a className="btn btn-success btn-sm" href="/candidate/candidate-detail/' + row.id + '">Edit</a>' +
                            '<a className="btn btn-danger btn-sm" onClick="btn_delete_click(\'' + row.id + '\');"> Delete</a>';

            $("#booking_table").DataTable().row.add({
                  candidate_name: row.candidate_name || "N/A",
                  address: row.address || "N/A",
                  city: row.city.city_name + '(' + row.city.country.country_name+ ')' || "N/A",
                  owner_info: row.owner_info || "N/A",
                  employee_size: row.employee_size || "N/A",
                  actions: action_td
            }).draw();
        });
    let span_of_listing_count_html = common_pagination(table_data, 'booking_');
    $("#booking_pageination_info").html(span_of_listing_count_html);
    $("#div_showing_bookings").addClass('d-flex');
    $("#div_showing_bookings").show();

    }
}

function fetch_data(page = 1, booking_filter_data = {}) {
    row_count = $("#no_of_booking_rows").children("option:selected").val();
    booking_filter_data['page_size']= row_count;
    booking_filter_data["page"] = page;
    $.ajax({
        method: "GET",
        url: "/candidateapi/candidate/",
        async: false,
        data: booking_filter_data,
        success: function (data) {
          save_curent_booking_table_data = data;
          save_all_rendered_booking_table_data[page]= data;
          render_data_table_body(data);
        },
    });
}
