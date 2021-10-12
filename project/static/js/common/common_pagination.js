// paggination start
function common_pagination(data, ctl_id_prefix, navFnName) {
    if(data.data.page_info){
        let page = parseInt(data.data.page_info.current_page);
        let total_rows_count = parseInt(data.data.count);
        let max_pages = parseInt(data.data.page_info.num_pages);
        let pages = parseInt(page) + 3;
        let row_count = parseInt(data.data.page_info.items_per_page);
        let start_count = parseInt(data.data.page_info.start_count);
        let end_count = parseInt(data.data.page_info.end_count) - 1;
        ctl_id_prefix = ctl_id_prefix || "";
        navFnName = navFnName || 'goToPage';

        let page_count = 1;
        let button_html = '';
        let last_button = ''

        if (pages > max_pages) {
          pages = max_pages;
        } else {
          last_button = "<button class='table_button btn btn-light'>.....</button><button id='" + ctl_id_prefix + "button_" + max_pages + "' class='table_button btn btn-light' onclick='"+navFnName+"(this," + max_pages + ")')>" + max_pages + "</button>";
        }

        if (parseInt(page) > 5) {
          page_count = parseInt(page) - 3;
          button_html = "<button id='" + ctl_id_prefix + "button_1' class='table_button btn btn-light' onclick='"+navFnName+"(this,1)')>1</button><button class='table_button btn btn-light'>.....</button>";
        }

        for (let i = page_count; i <= pages; i++) {
          let button_id = ctl_id_prefix + 'button_' + i;
          button_html += "<button id='" + button_id + "' class='table_button btn btn-light' onclick='"+navFnName+"(this," + i + ")')>" + i + "</button>";
        }

        button_html += last_button;

        $('#' + ctl_id_prefix + 'url_buttons').html(button_html);

        try {
          let page_number = lead_url.split('page=')[1].split('&')[0];
          $('#' + ctl_id_prefix + 'button_' + page_number).addClass('active').attr('disabled');
          page = page_number;
        } catch (err) {
          $('#' + ctl_id_prefix + 'button_' + page).addClass('active').attr('disabled');
        }

        if (data.data.next || data.data.next_url) {
          $('#' + ctl_id_prefix + 'next_url').html(' <button class="btn btn-primary" onclick="'+navFnName+'(this,' + (parseInt(page) + 1) + ')"> <span class="fa fa-angle-right"> > </span> </button>');
        } else {
          $('#' + ctl_id_prefix + 'next_url').html('');
        }

        if (data.data.previous || data.data.previous_url) {
          $('#' + ctl_id_prefix + 'previous_url').html(' <button class="btn btn-primary"onclick="'+navFnName+'(this,' + (parseInt(page) - 1) + ')"> <span class="fa fa-angle-left"> < </span> </button>')
        } else {
          $('#' + ctl_id_prefix + 'previous_url').html('');
        }

        return start_count + ' to ' + end_count + ' of ' + total_rows_count;
    }
    return ''
  }
  // pagination end