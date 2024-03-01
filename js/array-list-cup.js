function escapeHtml(data) {
    //data = data.replace(/&/g, '&amp;');
    data = data.replace(/>/g, '&gt;');
    data = data.replace(/</g, '&lt;');
    data = data.replace(/"/g, '&quot;');
    data = data.replace(/'/g, '&#x27;');
    data = data.replace(/`/g, '&#x60;');
    return data;
};

$(function () {
    page_id = getParam('id');

    function getParam(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    if (/^[0-9]{4}$/.test(page_id) === false) {
        alert('不正なパラメータ');
        location.href = `?id=${cup_data[0].data.eventYear}`;
    };

    //console.log(page_id)

    /*if (page_id == null) {
        setTimeout(function () {
            location.href = `?id=${cup_data[0].data.eventYear}`;
        }, 5000);
    };*/

    page_id !== null ? eventYear = escapeHtml(page_id) : eventYear = cup_data[0].data.eventYear;
    $('.current-pg').html(`${eventYear}年開催`);
});

$(function () {
    $('.page-item').on("click", page_title);

    function page_title() {
        //console.log(Event_data[0].data.eventName)
        $('.Event_this_page').html(`魔道杯一覧（${eventYear}年開催）`);
    };

    page_title();
    info();
});

//ページ制御
$('.page-item').on("click", pagination);

function pagination() {
    //console.log($(this).val());

    switch ($(this).val()) {
        case 0: //first
            if (eventYear != 2013) {
                eventYear = 2013;
                history.replaceState('', '', `?id=${eventYear}`);
                $('.current-pg').html(`${eventYear}年開催`);
                //console.log(eventYear);
                info();
            };
            break;
        case 1: //prev
            if (eventYear > 2013) {
                eventYear--;
                history.replaceState('', '', `?id=${eventYear}`);
                $('.current-pg').html(`${eventYear}年開催`);
                //console.log(eventYear);
                info();
            };
            break;
        case 2: //next
            if (eventYear < cup_data[0].data.eventYear) {
                eventYear++;
                history.replaceState('', '', `?id=${eventYear}`);
                $('.current-pg').html(`${eventYear}年開催`);
                //console.log(eventYear);
                info();
            };
            break;
        case 3: //last
            if (eventYear != cup_data[0].data.eventYear) {
                eventYear = cup_data[0].data.eventYear;
                history.replaceState('', '', `?id=${eventYear}`);
                $('.current-pg').html(`${eventYear}年開催`);
                //console.log(eventYear);
                info();
            };
            break;
        default:
            break;
    };
};

function info() {
    let output_html = '';
    //HTML出力

    $('.Info_Area_year').html(`<div class="p-2 m-0 border border-2 border-wiz rounded text-center fw-bold h4 heading-bar text-white">魔道杯一覧（${eventYear}年開催）</div>`);

    cd_filter = cup_data.filter(function (value) { //Cup_Data
        return value.data.eventYear == eventYear;
    });
    cd_filter = cd_filter.reverse(); //開催順ソート
    //console.log(cd_filter);

    if (cd_filter.length) {

        output_html += `<div class="row row-cols-md-2 row-cols-xl-3 g-1">`;

        for (const i in cd_filter) {

            od_filter = overall_data.filter(function (value) { // Overall_Data
                return value.eventId == cd_filter[i].eventId;
            });
            if (od_filter.length > 0) {
                od_filter = od_filter[0].data.slice(0, 3); //1位のみ
                //console.log('総合優勝', od_filter[0].userName);
            };

            output_html += `<div class="d-flex flex-column">`;
            output_html += `<a href="cup-data.html?id=${cd_filter[i].eventId}" class="p-2 h-100 border border-2 border-wiz cup-list rounded d-flex flex-column text-decoration-none text-white">`;


            output_html += `<img class="mx-auto d-block bd-data-logoImg" src="../img/logoImg/${cd_filter[i].data.eventImg}.png" onselectstart="return false;" onmousedown="return false;" />`;

            output_html += `<div class="mt-2 text-center event-date fw-bold border-top border-wiz pt-2">【第${cd_filter[i].eventId}回】${cd_filter[i].data.eventYear}年　${cd_filter[i].data.eventDate[0]} ～ ${cd_filter[i].data.eventDate[1]}`;

            /*output_html += `<div class="position-absolute mx-2">`;
            output_html += `<img class="me-1 rounded" src="https://i-cf.quiz.colopl.jp/img/card/small/${od_filter[0].img}_0.png" style="height: 24px; width: 24px;" onselectstart="return false;" onmousedown="return false;" />`;
            output_html += `<img class="me-1 rounded" src="https://i-cf.quiz.colopl.jp/img/card/small/${od_filter[1].img}_0.png" style="height: 24px; width: 24px;" onselectstart="return false;" onmousedown="return false;" />`;
            output_html += `<img class="rounded" src="https://i-cf.quiz.colopl.jp/img/card/small/${od_filter[2].img}_0.png" style="height: 24px; width: 24px;" onselectstart="return false;" onmousedown="return false;" />`;
            output_html += `</div >`;*/

            output_html += `</div>`;


            output_html += `</div>`;
            output_html += `</a>`;
        };

        output_html += `</div>`;
    };

    $('.Info_Area').html(output_html);
};
