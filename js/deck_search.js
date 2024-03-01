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
    //console.log(page_id)

    if (/^[0-9]{4}$/.test(page_id) === false) {
        alert('不正なパラメータ');
        location.href = `?id=${cup_data[0].data.eventYear}`;
    } else {

        page_id !== null ? eventYear = escapeHtml(page_id) : eventYear = cup_data[0].data.eventYear;
        $('.current-pg').html(`${eventYear}年開催`);

        data_filter();
    };
});

$(function () {
    $('.page-item').on("click", page_title);

    function page_title() {
        //console.log(Event_data[0].data.eventName)
        $('.Event_this_page').html(`魔道杯使用デッキ（${eventYear}年開催）`);
    };

    page_title();
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
                data_filter();
            };
            break;
        case 1: //prev
            if (eventYear > 2013) {
                eventYear--;
                history.replaceState('', '', `?id=${eventYear}`);
                $('.current-pg').html(`${eventYear}年開催`);
                //console.log(eventYear);
                data_filter();
            };
            break;
        case 2: //next
            if (eventYear < cup_data[0].data.eventYear) {
                eventYear++;
                history.replaceState('', '', `?id=${eventYear}`);
                $('.current-pg').html(`${eventYear}年開催`);
                //console.log(eventYear);
                data_filter();
            };
            break;
        case 3: //last
            if (eventYear != cup_data[0].data.eventYear) {
                eventYear = cup_data[0].data.eventYear;
                history.replaceState('', '', `?id=${eventYear}`);
                $('.current-pg').html(`${eventYear}年開催`);
                //console.log(eventYear);
                data_filter();
            };
            break;
        default:
            break;
    };
};

//フィルター
data_filter = function () {
    //デッキデータ
    //未定義aliasにuserNameを代入
    if (deck_data != undefined) {
        deck_data.forEach((element) => {
            element.data.forEach((define) => {
                const check = 'alias' in define; {
                    if (check) {} else {
                        define.alias = define.userName;
                    };
                };
            });
        });

        for (const i in deck_data) {
            deck_data[i].eventYear = cup_data[i].data.eventYear;
        };

        /* 状況に応じて変更 */
        deck_result = deck_data.filter(function (value) {
            return value.eventYear == eventYear;
        });
        //console.log("デッキ", deck_result);
    };

    deck_output(deck_result);
};
