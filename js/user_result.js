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
    user_param = getParam('user');

    function getParam(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    user_param !== null ? user_param = escapeHtml(user_param) : location.href = '../../';

    overall_page = 1;
    daily_page = 1;
    load_first = true;
    unit = [50, 50]; //画像化・1枚あたりのデータ数

    //データ準備
    overall_data_arrange_ready();
    overall_result = _.cloneDeep(overallDataArray);
    daily_data_arrange_ready();
    daily_result = _.cloneDeep(dailyDataArray);
    data_filter();
});

$(function () {

    function page_title() {
        $('.Event_this_page').html(`個人成績（${user_param}）`);
    };

    $('.page-item').on("click", page_title);
    page_title();

});

//ページ制御
$('.overall .page-item').on("click", o_pagination);
$('.daily .page-item').on("click", d_pagination);


function o_pagination() {
    //console.log($(this).val());

    switch ($(this).val()) {
        case 0: //first
            if (overall_page > 1) {
                overall_page = 1;
                //console.log(overall_page);
                data_filter();
            };
            break;
        case 1: //prev
            if (overall_page > 1) {
                overall_page--;
                //console.log(overall_page);
                data_filter();
            };
            break;
        case 2: //next
            if (overall_page < overall_length) {
                overall_page++;
                //console.log(overall_page);
                data_filter();
            };
            break;
        case 3: //last
            if (overall_page < overall_length) {
                overall_page = overall_length;
                //console.log(overall_page);
                data_filter();
            };
            break;
        default:
            break;
    };

};

function d_pagination() {
    //console.log($(this).val());

    switch ($(this).val()) {
        case 0: //first
            if (daily_page > 1) {
                daily_page = 1;
                //console.log(daily_page);
                data_filter();
            };
            break;
        case 1: //prev
            if (daily_page > 1) {
                daily_page--;
                //console.log(daily_page);
                data_filter();
            };
            break;
        case 2: //next
            if (daily_page < daily_length) {
                daily_page++;
                //console.log(daily_page);
                data_filter();
            };
            break;
        case 3: //last
            if (daily_page < daily_length) {
                daily_page = daily_length;
                //console.log(daily_page);
                data_filter();
            };
            break;
        default:
            break;
    };

};

function info() {

    od_user = overallDataArrayUser.filter(value => {
        return value.alias === user_param;
    });
    dd_user = dailyDataArrayUser.filter(value => {
        return value.alias === user_param;
    });
    //console.log(od_user, dd_user);

    let user_img = 'card_05302';
    if (od_user.length) {
        user_img = od_user[0].img !== 'card_05302' ? od_user[0].img : user_img;
    };
    if (dd_user.length && user_img === 'card_05302') {
        user_img = dd_user[0].img !== 'card_05302' ? dd_user[0].img : user_img;
    };
    //console.log(user_img)
    let output_html = '';
    //HTML出力
    output_html += `<div class="accordion" id="accordion">`;
    output_html += `<div class="accordion-item bg-film text-white border-wiz">`;
    output_html += `<h2 class="accordion-header" id="headingOne">`;
    output_html += `<button class="accordion-button collapsed bg-wiz bg-gradient text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapse" aria-expanded="true" aria-controls="collapse">`;

    //帯
    /*let od_color = 'white',
        dd_color = 'white';
    if (od_user.length && od_user[0].bestRank === 1) {
        od_color = 'purple';
    } else if (od_user.length && od_user[0].bestRank <= 10) {
        od_color = 'red';
    } else if (od_user.length && od_user[0].bestRank <= 25) {
        od_color = 'orange';
    } else if (od_user.length && od_user[0].bestRank <= 50) {
        od_color = 'yellow';
    };
    if (dd_user.length && dd_user[0].bestRank === 1) {
        dd_color = 'purple';
    } else if (dd_user.length && dd_user[0].bestRank <= 3) {
        dd_color = 'red';
    } else if (dd_user.length && dd_user[0].bestRank <= 6) {
        dd_color = 'orange';
    } else if (dd_user.length && dd_user[0].bestRank <= 10) {
        dd_color = 'yellow';
    };*/

    /*output_html += `<div class="bg-gradient rounded me-1" style="height:64px; width:0.5em; background-color:${od_color};"></div>`;
    output_html += `<div class="bg-gradient rounded me-1" style="height:64px; width:0.5em; background-color:${dd_color};"></div>`;*/

    output_html += `<img class="p-0 m-0 me-3 rounded" src="https://i-cf.quiz.colopl.jp/img/card/small/${user_img}_0.png" style="height: 64px; width: 64px;" onselectstart="return false;" onmousedown="return false;" loading="lazy"/>`;
    output_html += `<span class="fw-bold">${user_param} 成績</span>`;
    output_html += `</button>`;
    output_html += `</h2>`;

    output_html += `<div id="collapse" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordion">
    <div class="accordion-body row row-cols-md-2 g-1">`;

    //
    output_html += `<div class="d-flex flex-column mt-0">`;
    output_html += `<div class="my-1 p-2 h-100 d-flex flex-column">`;
    output_html += `<table class="table table-sm">`;
    output_html += `<thead>`;
    output_html += `<tr>`;
    output_html += `<th colspan="4" class="text-center">魔道杯成績（総合）<button type="button" class="btn btn-primary btn-sm ms-3 d-none htmlcanvas_button" onclick="html_canvas()" data-bs-toggle="modal" data-bs-target="#resultimg_o"><i class="bi bi-image"></i></button></th>`;
    output_html += `</tr>`;
    output_html += `</thead>`;
    output_html += `<tbody>`;

    if (od_user.length) {

        output_html += `<tr class="align-middle">`;
        output_html += `<td class="fw-bold" scope="row" style="width:50%;">最高順位</td>`;
        output_html += `<td class="text-center fw-bold" scope="row" style="width:50%;">${od_user[0].bestRank}位<small class="text-muted">（${od_user[0].bestRankCount}回）</small></td>`;
        output_html += `</tr>`;

        output_html += `<tr class="align-middle">`;
        output_html += `<td class="fw-bold" scope="row" style="width:50%;">平均順位</td>`;
        output_html += `<td class="text-center fw-bold" scope="row" style="width:50%;">${od_user[0].avgRank.toFixed(2)}位</td>`;
        output_html += `</tr>`;

        output_html += `<tr class="align-middle">`;
        output_html += `<td class="fw-bold" scope="row" style="width:50%;">累計総合ポイント</td>`;
        output_html += `<td class="text-center fw-bold" scope="row" style="width:50%;">${toJapNum(od_user[0].sumPoint)} Pt</td>`;
        output_html += `</tr>`;

        output_html += `<tr class="align-middle">`;
        output_html += `<td class="fw-bold" scope="row" style="width:50%;">平均総合ポイント</td>`;
        output_html += `<td class="text-center fw-bold" scope="row" style="width:50%;">${toThousandDecimal(od_user[0].avgPoint)} Pt</td>`;
        output_html += `</tr>`;

        output_html += `<tr class="align-middle">`;
        output_html += `<td class="fw-bold" scope="row" style="width:50%;">総合ボード回数</td>`;
        output_html += `<td class="text-center fw-bold" scope="row" style="width:50%;">${od_user[0].BoardCount['total']}回</td>`;
        output_html += `</tr>`;

        output_html += `<tr class="align-middle">`;
        output_html += `<td class="fw-bold" scope="row" style="width:50%;">総合ボード1P回数</td>`;
        output_html += `<td class="text-center fw-bold" scope="row" style="width:50%;">${od_user[0].BoardCount1P}回</td>`;
        output_html += `</tr>`;


        if (od_user[0].eventId == cup_data[0].eventId) {
            output_html += `<tr class="align-middle">`;
            output_html += `<td class="fw-bold" scope="row" style="width:50%;">継続中のボード連続回数</td>`;
            output_html += `<td class="text-center fw-bold" scope="row" style="width:50%;">${od_user[0].ContBoardCount}回</td>`;
            output_html += `</tr>`;
            output_html += `<tr class="align-middle">`;
            output_html += `<td class="fw-bold" scope="row" style="width:50%;">継続中のボード1P連続回数</td>`;
            output_html += `<td class="text-center fw-bold" scope="row" style="width:50%;">${od_user[0].ContBoardCount1P}回</td>`;
            output_html += `</tr>`;
        };

        output_html += `<tr class="align-middle">`;
        output_html += `<td class="fw-bold" scope="row" style="width:50%;">総合ボード最大連続回数</td>`;
        output_html += `<td class="text-center fw-bold" scope="row" style="width:50%;">${od_user[0].bestContBoardCount.count}回</td>`;
        output_html += `</tr>`;

        output_html += `<tr class="align-middle">`;
        output_html += `<td class="fw-bold" scope="row" style="width:50%;">総合ボード1P最大連続回数</td>`;
        output_html += `<td class="text-center fw-bold" scope="row" style="width:50%;">${od_user[0].bestContBoardCount1P.count}回</td>`;
        output_html += `</tr>`;


        output_html += `<tr class="align-middle">`;
        output_html += `<td class="fw-bold" scope="row" style="width:50%;">初総合ボード</td>`;
        output_html += `<td class="text-center small" scope="row" style="width:50%;">${od_user[0].firstBoard.eventName}<span class="text-muted">（${od_user[0].firstBoard.eventYear}年）</span></td>`;
        output_html += `</tr>`;

        if (od_user.firstBoard1P) {
            output_html += `<tr class="align-middle">`;
            output_html += `<td class="fw-bold" scope="row" style="width:50%;">初総合ボード1P</td>`;
            output_html += `<td class="text-center small" scope="row" style="width:50%;">${od_user[0].firstBoard1P.eventName}<span class="text-muted">（${od_user[0].firstBoard1P.eventYear}年）</span></td>`;
            output_html += `</tr>`;
        };

        output_html += `</tbody>`;
        output_html += `</table>`;
        //獲得順位
        output_html += `<div class="row g-0 rounded overflow-hidden text-center text-muted">`;
        output_html += `<div class="py-1 border-bottom border-wiz bg-wiz text-white">総合ボード獲得順位（${od_user[0].rankFilled.length}/50）</div>`;
        pageFilled = {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false
        };
        for (let i = 0; i < 5; i++) {
            let count = _.filter(od_user[0].rankFilled, function (num) {
                return num > i * 10 && num <= (i + 1) * 10;
            }).length;
            count == 10 ? pageFilled[i + 1] = true : '';
        };
        //console.log(pageFilled);
        for (let i = 0; i < 50; i++) {
            if (od_user[0].rankFilled.includes(i + 1)) {
                if (pageFilled[Math.ceil((i + 1) / 10)] === true) {
                    output_html += `<div class="py-1  bg-wiz-blue text-warning cyclerank" style="width:10%;">${i + 1}</div>`;
                } else {
                    output_html += `<div class="py-1  bg-wiz-blue text-white" style="width:10%;">${i + 1}</div>`;
                };
            } else {
                output_html += `<div class="py-1  bg-wiz" style="width:10%;">${i + 1}</div>`;
            };
        };
        output_html += `</div>`;

        output_html += `<button class="btn btn-primary bg-gradient w-100 mt-1" data-bs-toggle="modal" data-bs-target="#modal-overall-table" onClick="createImg_overall(${Math.ceil(od_user[0].BoardCount['total'] / unit[0])})">総合ボード成績　画像化</button>`;

    } else {
        output_html += `<tr class="align-middle">`;
        output_html += `<td class="fw-bold text-center" colspan="2">データがありません</td>`;
        output_html += `</tr>`;
        output_html += `</tbody>`;
        output_html += `</table>`;
    };

    output_html += `</div>`;
    output_html += `</div>`;
    //
    //
    output_html += `<div class="d-flex flex-column mt-0">`;
    output_html += `<div class="my-1 p-2 h-100 d-flex flex-column">`;
    output_html += `<table class="table table-sm">`;
    output_html += `<thead>`;
    output_html += `<tr>`;
    output_html += `<th colspan="4" class="text-center">魔道杯成績（デイリー）<button type="button" class="btn btn-primary btn-sm ms-3 d-none" onclick="html_canvas()" data-bs-toggle="modal" data-bs-target="#resultimg_d"><i class="bi bi-image"></i></button></th>`;
    output_html += `</tr>`;
    output_html += `</thead>`;
    output_html += `<tbody>`;

    if (dd_user.length) {
        output_html += `<tr class="align-middle">`;
        output_html += `<td class="fw-bold" scope="row" style="width:50%;">最高順位</td>`;
        output_html += `<td class="text-center fw-bold" scope="row" style="width:50%;">${dd_user[0].bestRank}位<small class="text-muted">（${dd_user[0].bestRankCount}回）</small></td>`;
        output_html += `</tr>`;

        output_html += `<tr class="align-middle">`;
        output_html += `<td class="fw-bold" scope="row" style="width:50%;">平均順位</td>`;
        output_html += `<td class="text-center fw-bold" scope="row" style="width:50%;">${dd_user[0].avgRank.toFixed(2)}位</td>`;
        output_html += `</tr>`;

        output_html += `<tr class="align-middle">`;
        output_html += `<td class="fw-bold" scope="row" style="width:50%;">全D1P回数</td>`;
        output_html += `<td class="text-center fw-bold" scope="row" style="width:50%;">${dd_user[0].BoardCount}回</td>`;
        output_html += `</tr>`;

        output_html += `<tr class="align-middle">`;
        output_html += `<td class="fw-bold" scope="row" style="width:50%;">全D1位回数</td>`;
        output_html += `<td class="text-center fw-bold" scope="row" style="width:50%;">${dd_user[0].BoardCountTop}回</td>`;
        output_html += `</tr>`;

        output_html += `<tr class="align-middle">`;
        output_html += `<td class="fw-bold" scope="row" style="width:50%;">初全D1P</td>`;
        output_html += `<td class="text-center small" scope="row" style="width:50%;">${dd_user[0].firstBoard.eventName}<span class="text-muted">（${dd_user[0].firstBoard.eventYear}年）</span></td>`;
        output_html += `</tr>`;

        if (dd_user[0].firstBoardTop !== undefined) {
            output_html += `<tr class="align-middle">`;
            output_html += `<td class="fw-bold" scope="row" style="width:50%;">初全D1位</td>`;
            output_html += `<td class="text-center small" scope="row" style="width:50%;">${dd_user[0].firstBoardTop.eventName}<span class="text-muted">（${dd_user[0].firstBoardTop.eventYear}年）</span></td>`;
            output_html += `</tr>`;
        };

        output_html += `</tbody>`;
        output_html += `</table>`;
        //獲得順位
        let getRank = dd_user[0].rankFilled[0].length + dd_user[0].rankFilled[1].length + dd_user[0].rankFilled[2].length + dd_user[0].rankFilled[3].length;
        output_html += `<div class="row g-0 rounded overflow-hidden text-center text-muted">`;
        output_html += `<div class="py-1 border-bottom border-wiz bg-wiz text-white">全体デイリー獲得順位（${getRank}/40）</div>`;
        dayFilled = {
            1: dd_user[0].rankFilled[0].length === 10 ? true : false,
            2: dd_user[0].rankFilled[1].length === 10 ? true : false,
            3: dd_user[0].rankFilled[2].length === 10 ? true : false,
            4: dd_user[0].rankFilled[3].length === 10 ? true : false,
        };
        for (let i = 0; i < 4; i++) {
            if (dayFilled[i + 1] === true) {
                output_html += `<div class="py-1 bg-wiz-blue border-end border-wiz text-warning cyclerank" style="width:15%;">${i + 1}日目</div>`;
            } else {
                output_html += `<div class="py-1 bg-wiz border-end border-wiz text-white" style="width:15%;">${i + 1}日目</div>`;
            };
            for (let j = 0; j < 10; j++) {
                if (dd_user[0].rankFilled[i].includes(j + 1)) {
                    if (dayFilled[i + 1] === true) {
                        output_html += `<div class="py-1 bg-wiz-blue text-warning cyclerank" style="width:8.5%;">${j + 1}</div>`;
                    } else {
                        output_html += `<div class="py-1 bg-wiz-blue text-white" style="width:8.5%;">${j + 1}</div>`;
                    };
                } else {
                    output_html += `<div class="py-1  bg-wiz" style="width:8.5%;">${j + 1}</div>`;
                };
            };
        };

        output_html += `</div>`;

        output_html += `<button class="btn btn-primary bg-gradient w-100 mt-1" data-bs-toggle="modal" data-bs-target="#modal-daily-table" onClick="createImg_daily(${Math.ceil(dd_user[0].BoardCount / unit[1])})">全体デイリー成績　画像化</button>`;

    } else {
        output_html += `<tr class="align-middle">`;
        output_html += `<td class="fw-bold text-center" colspan="2">データがありません</td>`;
        output_html += `</tr>`;
        output_html += `</tbody>`;
        output_html += `</table>`;
    };

    output_html += `</div>`;
    output_html += `</div>`;

    output_html += `</div>`

    $('.Info_Area').html(output_html);

}

/*function html_canvas() {

    $('#o_img_output').html('');
    $('#d_img_output').html('');

    (async () => {
        o_img_output.appendChild(await html2canvas(o_img));
    })();

    (async () => {
        d_img_output.appendChild(await html2canvas(d_img));
    })();
};
$('.htmlcanvas_button').on("click", html_canvas);
$('.htmlcanvas_button').on("click", html_canvas);*/

//フィルター
data_filter = function () {

    //デッキデータ
    //未定義aliasにuserNameを代入
    if (deck_data != undefined) {
        deck_data.forEach((element) => {
            element.data.forEach((define) => {
                const check = 'alias' in define; {
                    if (check) { } else {
                        define.alias = define.userName;
                    };
                };
            });
        });

        for (const i in deck_data) {
            deck_data[i].eventYear = cup_data[i].data.eventYear;
        };

        /* 状況に応じて変更 */
        deck_result = []
        for (const i in deck_data) {
            deck_data[i].data = deck_data[i].data.filter(function (value) {
                return value.alias === user_param;
            });
        };
        deck_data.forEach(value => {
            value.data.length ? '' : delete value;
        });
        //console.log(deck_data);
        for (const i in deck_data) {
            deck_data = deck_data.filter(x => {
                return x.data.length;
            });
        };
        deck_result = deck_data;
        //console.log("デッキ", deck_result);
    };

    deck_output(deck_result);


    //総合データ
    overallDataArray = overallDataArray.filter(function (value) {
        return value.alias == user_param;
    });
    overall_length = Math.ceil(overallDataArray.length / 50);

    $('.overall .count_info').html(overallDataArray.length);
    $('.overall .count_info_start').html(overallDataArray.length > 0 ? (overall_page - 1) * 50 + 1 : 0);
    $('.overall .count_info_end').html(overallDataArray.length >= overall_page * 50 ? overall_page * 50 : overallDataArray.length);
    overall = overallDataArray.slice((overall_page - 1) * 50, overall_page * 50);

    //console.log("総合", overall_result);


    //デイリーデータ
    dailyDataArray = dailyDataArray.filter(function (value) {
        return value.alias == user_param;
    });
    daily_length = Math.ceil(dailyDataArray.length / 40);

    $('.daily .count_info').html(dailyDataArray.length);
    $('.daily .count_info_start').html(dailyDataArray.length > 0 ? (daily_page - 1) * 40 + 1 : 0);
    $('.daily .count_info_end').html(dailyDataArray.length >= daily_page * 40 ? daily_page * 40 : dailyDataArray.length);
    daily = dailyDataArray.slice((daily_page - 1) * 40, daily_page * 40);

    //console.log("デイリー", daily_result);

    $('.overall .current-pg').html(`${overall.length > 0 ? overall_page : '0'} / ${overall_length}`);
    $('.daily .current-pg').html(`${daily_length > 0 ? daily_page : '0'} / ${daily_length}`);
    if (load_first === true) {
        info();
    };
    overall_data_output(overall);
    daily_data_output(daily);
};

$(function () {

    let output_html_modal_html2canvas = '';
    let overall_canvas = [];
    let overallDataCanvas = _.cloneDeep(overallDataArray);
    overallDataCanvasRankOrder = _.cloneDeep(overallDataArray);
    overallDataCanvasRankOrder = _(overallDataCanvasRankOrder)
        .orderBy(['rank', 'eventId'],
            ['asc', 'asc'])
        .value();

    table_ready_overall = function (array) {


        for (let j = 0; j < Math.ceil(array.length / unit[0]); j++) {
            let overall_canvas_html = '';
            overall_canvas_html += `<table class="table table-sm table-wiz rounded-0 mb-0">`;
            overall_canvas_html += `<thead>`;
            overall_canvas_html += `<tr class="align-middle">`;
            overall_canvas_html += `<th scope="col" class="text-center" style="width:20%;">開催年月</th>`;
            overall_canvas_html += `<th scope="col" class="text-center">魔道杯</th>`;
            overall_canvas_html += `<th scope="col" class="text-center" style="width:25%;">順位</th>`;
            overall_canvas_html += `<th scope="col" class="text-center" style="width:25%;">ポイント</th>`;
            overall_canvas_html += `</tr>`;
            overall_canvas_html += `</thead>`;
            overall_canvas_html += `<tbody>`;

            for (let i = j * unit[0]; i < array.length && i < (j + 1) * unit[0]; i++) {
                overall_canvas_html += `<tr class="align-middle small small-lg-rel">`;
                overall_canvas_html += `<td scope="col" class="text-center fw-bold" style="width:10%;">${array[i].eventYear}/${array[i].eventImg.slice(2, 4)}</td>`;
                overall_canvas_html += `<td scope="col" class="text-center fw-bold small-5" style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden; max-width: 0;"><img class="quiz-img-o" src="../img/logoImg/${array[i].eventImg}.png" style="height:3.5em;"></td>`;

                //桁合わせ
                const rank_padding = '_'.repeat(2 - String(array[i].rank).length);

                overall_canvas_html += `<td scope="col" class="text-center fw-bold" style="width:25%;">総合 ${array[i].rank <= 10 ? `<span class="fw-bold h5 img-data-rank-top10"><span class="opacity-0">${rank_padding}</span>${array[i].rank}</span>` : `<span class="fw-bold h5"><span class="opacity-0">${rank_padding}</span>${array[i].rank}</span>`}位</td>`;

                //桁合わせ
                let point_padding = '_'.repeat(8 - String(array[i].point).length) + ','.repeat(Math.floor((9 - String(array[i].point).length) / 3));
                overall_canvas_html += `<td scope="col" class="text-center fw-bold" style="width:25%;"><span class="opacity-0">${point_padding}</span>${array[i].point.toLocaleString()} Pt</td>`;
                overall_canvas_html += `</tr>`;
            };

            overall_canvas_html += `</tbody>`;
            overall_canvas_html += `</table>`;
            overall_canvas.push(overall_canvas_html);
        };
    };

    if ($('#canvas_overall_rankorder').prop('checked')) {
        table_ready_overall(overallDataCanvasRankOrder);
    } else {
        table_ready_overall(overallDataCanvas);
    };

    output_html_modal_html2canvas += `<div class="modal" id="modal-overall-table" tabindex="-1" aria-labelledby="modal-overall-tableLabel" aria-hidden="true">`;
    output_html_modal_html2canvas += `<div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">`;

    output_html_modal_html2canvas += `<div class="modal-content border-wiz bg-wiz text-white text-center">`;
    output_html_modal_html2canvas += `<div class="modal-header border-wiz p-3 noselectable">`;
    output_html_modal_html2canvas += `<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>`;
    output_html_modal_html2canvas += `</div>`;
    output_html_modal_html2canvas += `<div class="modal-body">`;
    output_html_modal_html2canvas += `<div class="py-1 noselectable">時間が経っても画像化されない場合や処理が上手くいかなかった場合はウィンドウを再表示してください。<br>${unit[0]}件以上の場合は複数枚に分割されます。</div>`;

    output_html_modal_html2canvas += `<div class="my-2 text-start">`;
    output_html_modal_html2canvas += `<div class="form-check">`;
    output_html_modal_html2canvas += `<input class="form-check-input" type="checkbox" value="" id="canvas_overall_rankorder">`;
    output_html_modal_html2canvas += `<label class="form-check-label" for="canvas_overall_rankorder">順位が高い順に並べ替える</label>`;
    output_html_modal_html2canvas += `</div>`;
    output_html_modal_html2canvas += `</div>`;

    output_html_modal_html2canvas += `<div class="loadingImg-overall my-2">`;
    output_html_modal_html2canvas += `<div class="d-flex justify-content-center">`;
    output_html_modal_html2canvas += `<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>`;
    output_html_modal_html2canvas += `</div>`;
    output_html_modal_html2canvas += `</div>

      <div class="loadedImg-overall d-none">`;
    output_html_modal_html2canvas += `<div class="my-2 py-2 fw-bold bg-film rounded text-dark noselectable">画像の生成が完了しました！</div>`;
    for (let j = 0; j < Math.ceil(overallDataCanvas.length / unit[0]); j++) {
        output_html_modal_html2canvas += `<img id="overall-canvas-output-${j}" class="rounded border border-wiz img-fluid downloadImg my-1">`;
    };
    output_html_modal_html2canvas += `</div>`;
    for (let j = 0; j < Math.ceil(overallDataCanvas.length / unit[0]); j++) {
        output_html_modal_html2canvas += `<div id="overall-canvas-${j}" class="my-1 noselectable"><div class="w-100 py-2 bg-wiz">`;
        output_html_modal_html2canvas += `<span class="h5 fw-bold">${user_param}</span> さんの総合ボード成績`;
        output_html_modal_html2canvas += `<div class="d-inline-block text-end small px-2 w-100 bg-wiz">全${overallDataCanvas.length}件（${j + 1}/${Math.ceil(overallDataCanvas.length / unit[0])}）</div>`;
        output_html_modal_html2canvas += `</div>`;

        output_html_modal_html2canvas += `<div id="table_ready_overall_${j}"></div><div class="w-100 bg-wiz py-1 d-none">`;
        output_html_modal_html2canvas += `<span class="small-5 noselectable" style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden; max-width: 0;">使用している画像・その他の知的財産は株式会社コロプラに帰属します。</span>`;
        output_html_modal_html2canvas += `</div></div>`;
    };
    output_html_modal_html2canvas += `</div>`;
    output_html_modal_html2canvas += `<div class="modal-footer noselectable border-wiz p-1">`;
    output_html_modal_html2canvas += `${navigator.share && 1 == 2 ? `<button type="button" id="img-share-daily" class="btn btn-success bg-gradient me-2">共有</button>` : ''}`;
    output_html_modal_html2canvas += `<button type="button" class="btn btn-secondary bg-gradient" data-bs-dismiss="modal">Close</button>`;
    output_html_modal_html2canvas += `</div>`;
    output_html_modal_html2canvas += `</div>`;
    output_html_modal_html2canvas += `</div>`;
    output_html_modal_html2canvas += `</div>`;

    $('#modal-html2canvas-overall').html(output_html_modal_html2canvas);
    for (let j = 0; j < Math.ceil(overallDataCanvas.length / unit[0]); j++) {
        $(`#table_ready_overall_${j}`).html(overall_canvas[j]);
    };


    output_html_modal_html2canvas = '';
    let daily_canvas = [];
    let dailyDataCanvas = _.cloneDeep(dailyDataArray);
    dailyDataCanvasRankOrder = _.cloneDeep(dailyDataArray);
    dailyDataCanvasRankOrder = _(dailyDataCanvasRankOrder)
        .orderBy(['rank', 'eventId', 'day'],
            ['asc', 'asc', 'asc'])
        .value();

    table_ready_daily = function (array) {
        for (let j = 0; j < Math.ceil(array.length / unit[1]); j++) {
            let daily_canvas_html = '';
            daily_canvas_html += `<table class="table table-sm table-wiz rounded-0 mb-0">`;
            daily_canvas_html += `<thead>`;
            daily_canvas_html += `<tr class="align-middle">`;
            daily_canvas_html += `<th scope="col" class="text-center" style="width:20%;">開催年月</th>`;
            daily_canvas_html += `<th scope="col" class="text-center">魔道杯</th>`;
            daily_canvas_html += `<th scope="col" class="text-center" style="width:25%;">順位</th>`;
            daily_canvas_html += `<th scope="col" class="text-center" style="width:25%;">ポイント</th>`;
            daily_canvas_html += `<thead>`;
            daily_canvas_html += `</tr>`;
            daily_canvas_html += `</thead>`;
            daily_canvas_html += `<tbody>`;

            for (let i = j * unit[1]; i < array.length && i < (j + 1) * unit[1]; i++) {
                daily_canvas_html += `<tr class="align-middle small small-lg-rel">`;
                daily_canvas_html += `<td scope="col" class="text-center fw-bold" style="width:10%;">${array[i].eventYear}/${array[i].eventImg.slice(2, 4)}</td>`;
                daily_canvas_html += `<td scope="col" class="text-center fw-bold small-5" style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden; max-width: 0;"><img class="quiz-img-d" src="../img/logoImg/${array[i].eventImg}.png" style="height:3.5em;"></td>`;

                //桁合わせ
                const rank_padding = '_'.repeat(2 - String(array[i].rank).length);

                daily_canvas_html += `<td scope="col" class="text-center fw-bold" style="width:25%;">${array[i].day}日目 ${array[i].rank <= 3 ? `<span class="fw-bold h5 img-data-rank-top3"><span class="opacity-0">${rank_padding}</span>${array[i].rank}</span>` : `<span class="fw-bold h5"><span class="opacity-0">${rank_padding}</span>${array[i].rank}</span>`}位</td>`;

                //桁合わせ
                let point_padding = '_'.repeat(7 - String(array[i].point).length) + ','.repeat(Math.floor((9 - String(array[i].point).length) / 3));
                daily_canvas_html += `<td scope="col" class="text-center fw-bold" style="width:25%;"><span class="opacity-0">${point_padding}</span>${array[i].point.toLocaleString()} Pt</td>`;
                daily_canvas_html += `</tr>`;
            };

            daily_canvas_html += `</tbody>
        </table>`;
            daily_canvas.push(daily_canvas_html);
        };
    };

    if ($('#canvas_daily_rankorder').prop('checked')) {
        table_ready_daily(dailyDataCanvasRankOrder);
    } else {
        table_ready_daily(dailyDataCanvas);
    };

    output_html_modal_html2canvas += `<div class="modal" id="modal-daily-table" tabindex="-1" aria-labelledby="modal-daily-tableLabel" aria-hidden="true">`;
    output_html_modal_html2canvas += `<div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">`;

    output_html_modal_html2canvas += `<div class="modal-content border-wiz bg-wiz text-white text-center">`;
    output_html_modal_html2canvas += `<div class="modal-header border-wiz p-3 noselectable">`;
    output_html_modal_html2canvas += `<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>`;
    output_html_modal_html2canvas += `</div>`;
    output_html_modal_html2canvas += `<div class="modal-body">`;
    output_html_modal_html2canvas += `<div class="py-1 noselectable">時間が経っても画像化されない場合や処理が上手くいかなかった場合はウィンドウを再表示してください。<br>${unit[1]}件以上の場合は複数枚に分割されます。</div>`;

    output_html_modal_html2canvas += `<div class="my-2 text-start">`;
    output_html_modal_html2canvas += `<div class="form-check">`;
    output_html_modal_html2canvas += `<input class="form-check-input" type="checkbox" value="" id="canvas_daily_rankorder"">
      <label class="form-check-label" for="canvas_daily_rankorder">順位が高い順に並べ替える</label>`;
    output_html_modal_html2canvas += `</div>`;
    output_html_modal_html2canvas += `</div>`;

    output_html_modal_html2canvas += `<div class="loadingImg-daily my-2">`;
    output_html_modal_html2canvas += `<div class="d-flex justify-content-center">`;
    output_html_modal_html2canvas += `<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span>`;
    output_html_modal_html2canvas += `</div>`;
    output_html_modal_html2canvas += `</div>`;
    output_html_modal_html2canvas += `</div>`;

    output_html_modal_html2canvas += `<div class="loadedImg-daily d-none">`;
    output_html_modal_html2canvas += `<div class="my-2 py-2 fw-bold bg-film rounded text-dark noselectable">画像の生成が完了しました！</div>`;
    for (let j = 0; j < Math.ceil(dailyDataCanvas.length / unit[1]); j++) {
        output_html_modal_html2canvas += `<img id="daily-canvas-output-${j}" class="rounded border border-wiz img-fluid downloadImg my-1">`;
    };
    output_html_modal_html2canvas += `</div>`;
    for (let j = 0; j < Math.ceil(dailyDataCanvas.length / unit[1]); j++) {
        output_html_modal_html2canvas += `<div id="daily-canvas-${j}" class="my-1 noselectable"><div class="w-100 py-2 bg-wiz">`;
        output_html_modal_html2canvas += `<span class="h5 fw-bold">${user_param}</span> さんの全体デイリー成績`;
        output_html_modal_html2canvas += `<div class="d-inline-block text-end small px-2 w-100 bg-wiz">全${dailyDataCanvas.length}件（${j + 1}/${Math.ceil(dailyDataCanvas.length / unit[1])}）</div>`;
        output_html_modal_html2canvas += `</div>`;
        output_html_modal_html2canvas += `<div id="table_ready_daily_${j}"></div>`;
        output_html_modal_html2canvas += `<div class="w-100 bg-wiz py-1 d-none">`;
        output_html_modal_html2canvas += `<span class="small-5 noselectable" style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden; max-width: 0;">使用している画像・その他の知的財産は株式会社コロプラに帰属します。</span>`;
        output_html_modal_html2canvas += `</div>`;
        output_html_modal_html2canvas += `</div>`;
    };
    output_html_modal_html2canvas += `</div>`;
    output_html_modal_html2canvas += `<div class="modal-footer noselectable border-wiz p-1">`;
    output_html_modal_html2canvas += `${navigator.share && 1 == 2 ? `<button type="button" id="img-share-daily" class="btn btn-success bg-gradient me-2">共有</button>` : ''}`;
    output_html_modal_html2canvas += `<button type="button" class="btn btn-secondary bg-gradient" data-bs-dismiss="modal">Close</button>`;
    output_html_modal_html2canvas += `</div>`;
    output_html_modal_html2canvas += `</div>`;
    output_html_modal_html2canvas += `</div>`;
    output_html_modal_html2canvas += `</div>`;

    $('#modal-html2canvas-daily').html(output_html_modal_html2canvas);
    for (let j = 0; j < Math.ceil(dailyDataCanvas.length / unit[1]); j++) {
        $(`#table_ready_daily_${j}`).html(daily_canvas[j]);
    };


    $('#canvas_overall_rankorder').on('click', function () {
        overall_canvas = [];
        if ($('#canvas_overall_rankorder').prop('checked')) {
            table_ready_overall(overallDataCanvasRankOrder);
        } else {
            table_ready_overall(overallDataCanvas);
        };
        for (let j = 0; j < Math.ceil(overallDataCanvas.length / unit[0]); j++) {
            $(`#table_ready_overall_${j}`).html(overall_canvas[j]);
        };
        createImg_overall(Math.ceil(od_user[0].BoardCount['total'] / unit[0]));
    });
    $('#canvas_daily_rankorder').on('click', function () {
        daily_canvas = [];
        if ($('#canvas_daily_rankorder').prop('checked')) {
            table_ready_daily(dailyDataCanvasRankOrder);
        } else {
            table_ready_daily(dailyDataCanvas);
        };
        for (let j = 0; j < Math.ceil(dailyDataCanvas.length / unit[1]); j++) {
            $(`#table_ready_daily_${j}`).html(daily_canvas[j]);
        };
        createImg_daily(Math.ceil(dd_user[0].BoardCount['total'] / unit[1]));
    });
});
