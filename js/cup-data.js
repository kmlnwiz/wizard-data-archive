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

    if (/^[0-9]{3}$/.test(page_id) === false && /^[0-9]{2}$/.test(page_id) === false && /^[0-9]{1}$/.test(page_id) === false) {
        alert('不正なパラメータ');
        location.href = `?id=${cup_data[0].eventId}`;
    };

    page_id !== null ? eventId = escapeHtml(page_id) : eventId = cup_data[0].eventId;
    event_first = 1;
    event_last = cup_data.length;
    $('.current-pg').html(`${eventId} / ${event_last}`);

    //データ準備
    overall_data_arrange_ready();
    overall_result = _.cloneDeep(overallDataArray);
    daily_data_arrange_ready();
    daily_result = _.cloneDeep(dailyDataArray);
    data_filter();
});

$(function () {

    function page_Img() {
        titleLogo = `<div class="p-2 bg-wiz border border-2 border-wiz rounded text-center text-white">`;
        titleLogo += `<img class="mx-auto d-block bd-data-logoImg" src="../img/logoImg/${cup_data[cup_data.length - eventId].data.eventImg}.png" onselectstart="return false;" onmousedown="return false;" />`;
        titleLogo += `<div class="mt-2 event-date fw-bold">【第${cup_data[cup_data.length - eventId].eventId}回】${cup_data[cup_data.length - eventId].data.eventYear}年　${cup_data[cup_data.length - eventId].data.eventDate[0]} ～ ${cup_data[cup_data.length - eventId].data.eventDate[1]}</div>`;
        titleLogo += `</div>`
        $('.bd-logoImg').html(titleLogo);
    };

    function page_title() {
        $('.cup-list-link').html(`<a href="cup-list.html?id=${cup_data[cup_data.length - eventId].data.eventYear}">魔道杯一覧（${cup_data[cup_data.length - eventId].data.eventYear}年開催）</a>`);
        //console.log(Event_data[0].data.eventName)
        $('.Event_this_page').html(`第${eventId}回`);
    }

    $('.page-item').on("click", page_title);
    $('.page-item').on("click", page_Img);
    $('.page-item').on("click", info);
    page_title();
    page_Img();
    info();
});

//ページ制御
$('.page-item').on("click", pagination);

function pagination() {
    //console.log($(this).val());

    switch ($(this).val()) {
        case 0: //first
            if (eventId > event_first) {
                eventId = event_first;
                history.replaceState('', '', `?id=${eventId}`);
                $('.current-pg').html(`${eventId} / ${event_last}`);
                //console.log(eventId);
                data_filter();
            };
            break;
        case 1: //prev
            if (eventId > event_first) {
                eventId--;
                history.replaceState('', '', `?id=${eventId}`);
                $('.current-pg').html(`${eventId} / ${event_last}`);
                //console.log(eventId);
                data_filter();
            };
            break;
        case 2: //next
            if (eventId < event_last) {
                eventId++;
                history.replaceState('', '', `?id=${eventId}`);
                $('.current-pg').html(`${eventId} / ${event_last}`);
                //console.log(eventId);
                data_filter();
            };
            break;
        case 3: //last
            if (eventId < event_last) {
                eventId = event_last;
                history.replaceState('', '', `?id=${eventId}`);
                $('.current-pg').html(`${eventId} / ${event_last}`);
                //console.log(eventId);
                data_filter();
            };
            break;
        default:
            break;
    };
};

function info() {
    let output_html = '';
    //HTML出力
    if (cup_data[cup_data.length - eventId].eventId >= 24) {
        output_html += `<div class="accordion" id="accordion">`;
        output_html += `<div class="accordion-item bg-film border-wiz">`;
        output_html += `<h2 class="accordion-header" id="headingOne">`;
        output_html += `<button class="accordion-button collapsed bg-wiz text-white bg-gradient" type="button" data-bs-toggle="collapse" data-bs-target="#collapse" aria-expanded="true" aria-controls="collapse">詳細</button>`;
        output_html += `</h2>`;

        output_html += `<div id="collapse" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordion">`;
        output_html += `<div class="accordion-body row row-cols-md-2 row-cols-lg-3 g-0 p-2 pb-0">`;
        //
        output_html += `<div class="d-flex flex-column mt-0">`;
        output_html += `<div class="my-1 p-2 h-100 rounded d-flex flex-column">`;

        output_html += `<table class="table mb-0">`;
        output_html += `<thead>`;
        output_html += `<tr>
      <th colspan="2" class="text-center">クイズ形式</th>
      </tr>`;
        output_html += `</thead>`;
        output_html += `<tbody>`;
        if (cup_data[cup_data.length - eventId].data.eventQuiz[0] !== undefined) {
            output_html += `<tr>`;
            output_html += `<td class="text-center fw-bold" scope="row" style="width:50%;">クイズ形式1</td>`;
            output_html += `<td class="text-center fw-bold">${cup_data[cup_data.length - eventId].data.eventQuiz[0].toLocaleString()}</td>`;
            output_html += `</tr>`;
        };
        if (cup_data[cup_data.length - eventId].data.eventQuiz[1] !== undefined) {
            output_html += `<tr>`;
            output_html += `<td class="text-center fw-bold" scope="row">クイズ形式2</td>`;
            output_html += `<td class="text-center fw-bold">${cup_data[cup_data.length - eventId].data.eventQuiz[1].toLocaleString()}</td>`;
            output_html += `</tr>`;
        };
        if (cup_data[cup_data.length - eventId].data.eventQuiz[2] !== undefined) {
            output_html += `<tr>`;
            output_html += `<td class="text-center fw-bold" scope="row">クイズ形式3</td>`;
            output_html += `<td class="text-center fw-bold">${cup_data[cup_data.length - eventId].data.eventQuiz[2].toLocaleString()}</td>`;
            output_html += `</tr>`;
        };
        output_html += `</tbody>`;
        output_html += `</table>`;

        output_html += `</div>`;
        output_html += `</div>`;
        //
        //
        output_html += `<div class="d-flex flex-column mt-0">`;
        output_html += `<div class="my-1 p-2 h-100 rounded d-flex flex-column">`;

        output_html += `<table class="table mb-0">`;
        output_html += `<thead>`;

        output_html += `<tr>`;
        output_html += `<th colspan="2" class="text-center">ボーダー</th>`;
        output_html += `</tr>`;
        output_html += `</thead>`;
        output_html += `<tbody>`;
        output_html += `<tr>`;
        output_html += `<td class="fw-bold" scope="row">総合ボード1P（10位）</td>`;
        output_html += `<td class="text-end fw-bold">${cup_data[cup_data.length - eventId].data.border[0].toLocaleString()} Pt</td>`;
        output_html += `</tr>`;
        output_html += `<tr>`;
        output_html += `<td class="fw-bold" scope="row">総合ボード（50位）</td>`;
        output_html += `<td class="text-end fw-bold">${cup_data[cup_data.length - eventId].data.border[1].toLocaleString()} Pt</td>`;
        output_html += `</tr>`;
        output_html += `<tr>`;
        output_html += `<td class="fw-bold" scope="row">プラチナム（100位）</td>`;
        output_html += `<td class="text-end fw-bold">${cup_data[cup_data.length - eventId].data.border[2].toLocaleString()} Pt</td>`;
        output_html += `</tr>`;
        output_html += ` </tbody>`;
        output_html += `</table>`;

        output_html += `</div>`
        output_html += `</div>`
        //
        //
        output_html += `<div class="d-flex flex-column mt-0">`;
        output_html += `<div class="my-1 p-2 h-100 rounded d-flex flex-column">`;

        output_html += `<table class="table mb-0">`;
        output_html += `<thead>`;
        output_html += `<tr>`;
        output_html += `<th colspan="2" class="text-center">その他</th>`;
        output_html += `</tr>`;
        output_html += `</thead>`;
        output_html += `<tbody>`;
        output_html += `<tr>`;
        output_html += `<td class="fw-bold" scope="row">獲得ポイント</td>`;
        output_html += `<td class="text-end fw-bold">${cup_data[cup_data.length - eventId].data.getPoint !== undefined ? `${cup_data[cup_data.length - eventId].data.getPoint.toLocaleString()}` : ''} Pt</td>`;
        output_html += `</tr>`;
        output_html += `<tr>`;
        output_html += `<td class="fw-bold" scope="row">最高時速（持越有）</td>`;
        output_html += `<td class="text-end fw-bold">${cup_data[cup_data.length - eventId].data.maxSpeed !== undefined ? `${cup_data[cup_data.length - eventId].data.maxSpeed.toLocaleString()}` : ''} Pt</td>`;;
        output_html += `</tr>`;

        /* 推測ラップ計算 */
        if (cup_data[cup_data.length - eventId].data.maxSpeed !== undefined && cup_data[cup_data.length - eventId].data.getPoint !== undefined) {
            h_per_count = Math.floor(cup_data[cup_data.length - eventId].data.maxSpeed / cup_data[cup_data.length - eventId].data.getPoint);
            req_lap_max = Math.floor(3600 / (h_per_count - 1));
            req_lap_min = Math.ceil(3600 / (h_per_count));
            //console.log("1h", h_per_count);
            //console.log("最遅", req_lap_max, "最速", req_lap_min);
            cupLength = cup_data[cup_data.length - eventId].data.dayLength.reduce(function (sum, element) {
                return sum + element;
            });
            /* 推測ラップ・理論値計算 */
            point_mission = 0;
            if (cup_data[cup_data.length - eventId].eventId >= 39) {
                point_mission = 60000;
            };
            output_html += `<tr>`;
            output_html += `<td class="fw-bold" scope="row">推定最速ラップ</td>`;
            output_html += `<td class="text-end fw-bold">（${h_per_count}周）${Math.floor(req_lap_min / 60)}:${("00" + req_lap_min % 60).slice(-2)}～${Math.floor(req_lap_max / 60)}:${("00" + req_lap_max % 60).slice(-2)}</td>`;
            output_html += `</tr>`;
            /*output_html += `<tr>`;
            output_html += `<td class="fw-bold" scope="row">総合理論値（${cupLength}h）</td>`;
            output_html += `<td class="text-end fw-bold">${(Math.floor((3600 * cupLength) /req_lap_min)*cup_data[cup_data.length - eventId].data.getPoint + point_mission).toLocaleString()} Pt</td>`;
            output_html += `</tr>`;
            output_html += `<tr>`;
            output_html += `<td class="fw-bold" scope="row">デイリー理論値（${cup_data[cup_data.length - eventId].data.dayLength[1]}h）</td>`;
            output_html += `<td class="text-end fw-bold">${(Math.floor((3600 * cup_data[cup_data.length - eventId].data.dayLength[1]) /req_lap_min)*cup_data[cup_data.length - eventId].data.getPoint + point_mission).toLocaleString()} Pt</td>`;
            output_html += `</tr>`;*/
        };
        output_html += `</tbody>`;
        output_html += `</table>`;

        output_html += `</div>`;
        output_html += `</div>`;
        //


    } else {
        output_html += `<div class="accordion" id="accordion">`;
        output_html += `<div class="accordion-item">`;
        output_html += `<h2 class="accordion-header" id="headingOne">`;
        output_html += `<button class="accordion-button collapsed bg-wiz text-white bg-gradient text-muted disabled" type="button" data-bs-toggle="collapse" data-bs-target="#collapse" aria-expanded="true" aria-controls="collapse">詳細</button>`;
        output_html += `</h2>`;
        output_html += `</div>`;
        output_html += `</div>`;
    };

    output_html += `</div>`;


    output_html += `<div class="row g-0">`;

    output_html += `<div class="col-12 col-md-6 p-2">`;
    output_html += `<button class="btn btn-primary bg-gradient w-100 ${eventId < 24?'d-none':''}" data-bs-toggle="modal" data-bs-target="#modal-overall-table" onClick="createImg_overall()">総合ボード　画像化</button>`;
    output_html += `</div>`;

    output_html += `<div class="col-12 col-md-6 p-2">`;
    output_html += `<button class="btn btn-primary bg-gradient w-100 ${eventId < 24?'d-none':''}" data-bs-toggle="modal" data-bs-target="#modal-daily-table" onClick="createImg_daily()">全体デイリー　画像化</button>`;
    output_html += `</div>`;

    output_html += `</div>`;


    $('.Info_Area').html(output_html);
};

//フィルター
data_filter = function () {
    //総合データ
    /* 状況に応じて変更 */
    overall = overall_result.filter(function (value) {
        return value.eventId == eventId;
    });

    //console.log("総合", overall);


    //デイリーデータ
    /* 状況に応じて変更 */
    daily = daily_result.filter(function (value) {
        return value.eventId == eventId;
    });
    daily = _.orderBy(daily, ['eventId', 'day'], ['desc', 'asc']);

    //console.log("デイリー", daily);


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

        /* 状況に応じて変更 */
        deck_result = deck_data.filter(function (value) {
            return value.eventId == eventId;
        });
        //console.log("デッキ", deck_result);
    };

    const output1 = function () {
        return new Promise(function (resolve, reject) {
            overall_data_output(overall)
            resolve()
        });
    };
    const output2 = function () {
        return new Promise(function (resolve, reject) {
            daily_data_output(daily)
            resolve()
        });
    };

    deck_output(deck_result);

    output1()
        .then(function () {
            //console.log(overall.length / 50)

            let output_html_modal_html2canvas = '';
            //テーブル生成
            let overall_canvas = [];
            for (let j = 0; j < Math.ceil(overall.length / 50); j++) {
                let overall_canvas_html = '';
                overall_canvas_html += `<table class="table table-sm table-wiz rounded-0 mb-0">`;
                overall_canvas_html += `<thead>`;
                overall_canvas_html += `<tr class="align-middle">`;
                overall_canvas_html += `<th scope="col" class="text-center" style="width:25%;">順位</th>`;
                overall_canvas_html += `<th scope="col" class="text-center">ユーザー名</th>`;
                overall_canvas_html += `<th scope="col" class="text-center" style="width:25%;">ポイント</th>`;
                overall_canvas_html += `<th scope="col" class="d-none d-lg-table-cell text-center" style="width:20%;">平均時速</th>`;
                overall_canvas_html += `</tr>`;
                overall_canvas_html += `</thead>`;
                overall_canvas_html += `<tbody>`;

                for (let i = j * 50; i < overall.length && i < (j + 1) * 50; i++) {
                    overall_canvas_html += `<tr class="align-middle small small-lg-rel">`;

                    //桁合わせ
                    const rank_padding = '_'.repeat(2 - String(overall[i].rank).length);

                    overall_canvas_html += `<td scope="col" class="text-center fw-bold" style="width:25%;">総合 ${overall[i].rank <= 10 ? `<span class="fw-bold h5 img-data-rank-top3"><span class="opacity-0">${rank_padding}</span>${overall[i].rank}</span>` : `<span class="fw-bold h5"><span class="opacity-0">${rank_padding}</span>${overall[i].rank}</span>`}位</td>`;
                    overall_canvas_html += `<td scope="col" class="text-center fw-bold" style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden; max-width: 0;">${overall[i].userName}</td>`;

                    //桁合わせ
                    let point_padding = '_'.repeat(8 - String(overall[i].point).length) + ','.repeat(Math.floor((9 - String(Math.round(overall[i].avgSpeed)).length) / 3));
                    overall_canvas_html += `<td scope="col" class="text-center fw-bold" style="width:25%;"><span class="opacity-0">${point_padding}</span>${overall[i].point.toLocaleString()} Pt</td>`;
                    point_padding = '';

                    //桁合わせ
                    point_padding = '_'.repeat(6 - String(Math.round(overall[i].avgSpeed)).length) + ','.repeat(Math.floor((6 - String(Math.round(overall[i].avgSpeed)).length) / 3));
                    overall_canvas_html += `<td scope="col" class="d-none d-lg-table-cell text-center fw-bold" style="width:20%;"><span class="opacity-0">${point_padding}</span>${toThousandDecimal(Math.round(overall[i].avgSpeed * 100) / 100)} Pt/h</td>`;
                    overall_canvas_html += `</tr>`;
                };

                overall_canvas_html += `</tbody>`;
                overall_canvas_html += `</table>`;
                overall_canvas.push(overall_canvas_html);
            };

            output_html_modal_html2canvas += `<div class="modal" id="modal-overall-table" tabindex="-1" aria-labelledby="modal-overall-tableLabel" aria-hidden="true">`;
            output_html_modal_html2canvas += `<div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">`;

            output_html_modal_html2canvas += `<div class="modal-content border-wiz bg-wiz text-white text-center">`;
            output_html_modal_html2canvas += `<div class="modal-header border-wiz p-3 noselectable">`;
            output_html_modal_html2canvas += `<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>`;
            output_html_modal_html2canvas += `</div>`;
            output_html_modal_html2canvas += `<div class="modal-body">`;
            output_html_modal_html2canvas += `<div class="py-1 noselectable">時間が経っても画像化されない場合や処理が上手くいかなかった場合はウィンドウを再表示してください。</div>`;

            output_html_modal_html2canvas += `<div class="loadingImg-overall my-2">`;
            output_html_modal_html2canvas += `<div class="d-flex justify-content-center">`;
            output_html_modal_html2canvas += `<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>`;
            output_html_modal_html2canvas += `</div>`;
            output_html_modal_html2canvas += `</div>`;

            output_html_modal_html2canvas += `<div class="loadedImg-overall d-none">`;
            output_html_modal_html2canvas += `<div class="my-2 py-2 fw-bold bg-film rounded text-dark noselectable">画像の生成が完了しました！</div>`;
            for (let j = 0; j < Math.ceil(overall.length / 50); j++) {
                output_html_modal_html2canvas += `<img id="overall-canvas-output" class="rounded border border-wiz img-fluid downloadImg my-1">`;
            };
            output_html_modal_html2canvas += `</div>`;
            for (let j = 0; j < Math.ceil(overall.length / 50); j++) {
                output_html_modal_html2canvas += `<div id="overall-canvas" class="my-1 noselectable">`;
                output_html_modal_html2canvas += `<div class="w-100 py-2 bg-wiz">`;
                //output_html_modal_html2canvas += `<img class="quiz-img-d d-block mx-auto" src="../img/logoImg/${cup_data[cup_data.length - eventId].data.eventImg}.png" style="height:3.5em;">`;
                output_html_modal_html2canvas += `<span class="fw-bold">${cup_data[cup_data.length - eventId].data.eventName}</span>`;
                output_html_modal_html2canvas += `<br>`;
                output_html_modal_html2canvas += `総合TOP50`;
                output_html_modal_html2canvas += `</div>`;
                output_html_modal_html2canvas += `${overall_canvas[j]}`;
                output_html_modal_html2canvas += `<div class="w-100 bg-wiz py-1">`;
                output_html_modal_html2canvas += `<span class="noselectable" style="">開催期間：${cup_data[cup_data.length - eventId].data.eventYear}年　${cup_data[cup_data.length - eventId].data.eventDate[0]}～${cup_data[cup_data.length - eventId].data.eventDate[1]}</span>`;
                output_html_modal_html2canvas += `</div>`;
                output_html_modal_html2canvas += `</div>`;
            };
            output_html_modal_html2canvas += `</div>`;
            output_html_modal_html2canvas += `<div class="modal-footer noselectable border-wiz p-1">`;
            //output_html_modal_html2canvas += `<a type="button" id="overall-canvas-download" class="btn btn-success bg-gradient me-2">画像を保存</a>`;
            output_html_modal_html2canvas += `<button type="button" class="btn btn-secondary bg-gradient" data-bs-dismiss="modal">Close</button>`;
            output_html_modal_html2canvas += `</div>`;
            output_html_modal_html2canvas += `</div>`;
            output_html_modal_html2canvas += `</div>`;
            output_html_modal_html2canvas += `</div>`;

            $('#modal-html2canvas-overall').html(output_html_modal_html2canvas);
        });


    output2()
        .then(function () {
            //console.log(daily.length / 40)

            let output_html_modal_html2canvas = '';
            //テーブル生成
            let daily_canvas = [];
            for (let j = 0; j < Math.ceil(daily.length / 40); j++) {
                let daily_canvas_html = '';
                daily_canvas_html += `<table class="table table-sm table-wiz rounded-0 mb-0">
                <thead><tr class="align-middle">`;
                daily_canvas_html += `<th scope="col" class="text-center" style="width:25%;">順位</th>`;
                daily_canvas_html += `<th scope="col" class="text-center">ユーザー名</th>`;
                daily_canvas_html += `<th scope="col" class="text-center" style="width:25%;">ポイント</th>`;
                daily_canvas_html += `<th scope="col" class="d-none d-lg-table-cell text-center" style="width:20%;">平均時速</th>`;
                daily_canvas_html += `</tr>`;
                daily_canvas_html += `</thead>`;
                daily_canvas_html += `<tbody>`;

                for (let i = j * 40; i < daily.length && i < (j + 1) * 40; i++) {
                    daily_canvas_html += `<tr class="align-middle small small-lg-rel">`;

                    //桁合わせ
                    const rank_padding = '_'.repeat(2 - String(daily[i].rank).length);

                    daily_canvas_html += `<td scope="col" class="text-center fw-bold" style="width:25%;">${daily[i].day}日目 ${daily[i].rank <= 3 ? `<span class="fw-bold h5 img-data-rank-top3"><span class="opacity-0">${rank_padding}</span>${daily[i].rank}</span>` : `<span class="fw-bold h5"><span class="opacity-0">${rank_padding}</span>${daily[i].rank}</span>`}位</td>`;

                    daily_canvas_html += `<td scope="col" class="text-center fw-bold" style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden; max-width: 0;">${daily[i].userName}</td>`;

                    //桁合わせ
                    let point_padding = '_'.repeat(7 - String(daily[i].point).length) + ','.repeat(Math.floor((9 - String(Math.round(daily[i].avgSpeed)).length) / 3));
                    daily_canvas_html += `<td scope="col" class="text-center fw-bold " style="width:25%;"><span class="opacity-0">${point_padding}</span>${daily[i].point.toLocaleString()} Pt</td>`;

                    //桁合わせ
                    point_padding = '_'.repeat(6 - String(Math.round(daily[i].avgSpeed)).length) + ','.repeat(Math.floor((6 - String(Math.round(daily[i].avgSpeed)).length) / 3));
                    daily_canvas_html += `<td scope="col" class="d-none d-lg-table-cell text-center fw-bold" style="width:20%;"><span class="opacity-0">${point_padding}</span>${toThousandDecimal(Math.round(daily[i].avgSpeed*100)/100)} Pt/h</td>
                    </tr>`;
                };

                daily_canvas_html += `</tbody>`;
                daily_canvas_html += `</table>`;
                daily_canvas.push(daily_canvas_html);
            };

            output_html_modal_html2canvas += `<div class="modal" id="modal-daily-table" tabindex="-1" aria-labelledby="modal-daily-tableLabel" aria-hidden="true">`;
            output_html_modal_html2canvas += `<div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">`;

            output_html_modal_html2canvas += `<div class="modal-content border-wiz bg-wiz text-white text-center">`;
            output_html_modal_html2canvas += `<div class="modal-header border-wiz p-3 noselectable">`;
            output_html_modal_html2canvas += `<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>`;
            output_html_modal_html2canvas += `</div>`;
            output_html_modal_html2canvas += `<div class="modal-body">`;
            output_html_modal_html2canvas += `<div class="py-1 noselectable">時間が経っても画像化されない場合や処理が上手くいかなかった場合はウィンドウを再表示してください。</div>`;

            output_html_modal_html2canvas += `<div class="loadingImg-daily my-2">`;
            output_html_modal_html2canvas += `<div class="d-flex justify-content-center">`;
            output_html_modal_html2canvas += `<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>`;
            output_html_modal_html2canvas += `</div>`;
            output_html_modal_html2canvas += `</div>`;

            output_html_modal_html2canvas += `<div class="loadedImg-daily d-none">`;
            output_html_modal_html2canvas += `<div class="my-2 py-2 fw-bold bg-film rounded text-dark noselectable">画像の生成が完了しました！</div>`;
            for (let j = 0; j < Math.ceil(daily.length / 40); j++) {
                output_html_modal_html2canvas += `<img id="daily-canvas-output" class="rounded border border-wiz img-fluid downloadImg my-1">`;
            };
            output_html_modal_html2canvas += `</div>`;
            for (let j = 0; j < Math.ceil(daily.length / 40); j++) {
                output_html_modal_html2canvas += `<div id="daily-canvas" class="my-1 noselectable">`;
                output_html_modal_html2canvas += `<div class="w-100 py-2 bg-wiz">`;
                //output_html_modal_html2canvas += `<img class="quiz-img-d d-block mx-auto" src="../img/logoImg/${cup_data[cup_data.length - eventId].data.eventImg}.png" style="height:3.5em;">`;
                output_html_modal_html2canvas += `<span class="fw-bold">${cup_data[cup_data.length - eventId].data.eventName}</span>`;
                output_html_modal_html2canvas += `<br>`;
                output_html_modal_html2canvas += `全体デイリーTOP10`;
                output_html_modal_html2canvas += `</div>`;
                output_html_modal_html2canvas += `${daily_canvas[j]}`;
                output_html_modal_html2canvas += `<div class="w-100 bg-wiz py-1">`;
                output_html_modal_html2canvas += `<span class="noselectable" style="">開催期間：${cup_data[cup_data.length - eventId].data.eventYear}年　${cup_data[cup_data.length - eventId].data.eventDate[0]}～${cup_data[cup_data.length - eventId].data.eventDate[1]}</span>`;
                output_html_modal_html2canvas += `</div>`;
                output_html_modal_html2canvas += `</div>`;
            };
            output_html_modal_html2canvas += `</div>`;
            output_html_modal_html2canvas += `<div class="modal-footer noselectable border-wiz p-1">`;
            //output_html_modal_html2canvas += `<a type="button" id="overall-canvas-download" class="btn btn-success bg-gradient me-2">画像を保存</a>`;
            output_html_modal_html2canvas += `<button type="button" class="btn btn-secondary bg-gradient" data-bs-dismiss="modal">Close</button>`;
            output_html_modal_html2canvas += `</div>`;
            output_html_modal_html2canvas += `</div>`;
            output_html_modal_html2canvas += `</div>`;
            output_html_modal_html2canvas += `</div>`;

            $('#modal-html2canvas-daily').html(output_html_modal_html2canvas);
        });
};
