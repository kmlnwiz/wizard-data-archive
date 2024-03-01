//ボードを出力するスクリプト

//ボード出力
overall_data_output = function (array) {
    let output_html = '';
    let output_html_modal = '';
    let output_count = 0;

    //HTML出力
    output_html += `<div class="p-2 border border-2 border-wiz rounded text-center fw-bold h4 heading-bar text-white">総合ボード</div>`;


    if (array.length) {
        output_html += `<div class="row row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-1">`;
        for (let i = 0; i < array.length; i++) {
            //console.log(array[i])

            if (output_count % 10 === 0) {
                output_html += `<div class="d-flex flex-column mt-0">`;
            };

            if (array[i].rank <= 3) { //3位以上
                output_html += `<div class="mb-1 border border-wiz border-1 board-data rounded d-flex flex-row p-0" style="height:64px;${array[i].userName === "" ? 'opacity:0.5;' : ''}"${array[i].userName !== "" ? ` data-bs-toggle="modal" data-bs-target="#modalid-O${array[i].eventId}-${array[i].rank}` : ``}">`;

                if (array[i].isGrandslam && array[i].rank === 1) {
                    output_html += `<div class="" style="height: 62px; width: 62px;">`;
                    output_html += `<div class="grandslam p-0 m-0  board-data-img bd-data-img-rank${array[i].rank}" style="height: 62px; width: 62px;">`;
                    output_html += `<img class="p-0 m-0" src="https://i-cf.quiz.colopl.jp/img/card/small/${array[i].img}_0.png" style="height: 62px; width: 62px;" onselectstart="return false;" onmousedown="return false;" loading="lazy"/>`;
                    output_html += `</div>`;
                    output_html += `</div>`;
                    output_html += `<div class="bd-data-rank${array[i].rank}"></div>`;
                } else {
                    output_html += `<div class="" style="height: 62px; width: 62px;">`;
                    output_html += `<img class="p-0 m-0 board-data-img bd-data-img-rank${array[i].rank}" src="https://i-cf.quiz.colopl.jp/img/card/small/${array[i].img}_0.png" style="height: 62px; width: 62px;" onselectstart="return false;" onmousedown="return false;" loading="lazy"/>`;
                    output_html += `</div>`;
                    output_html += `<div class="bd-data-rank${array[i].rank}"></div>`;
                }
            } else { //4位以下
                output_html += `<div class="mb-1 border border-wiz border-1 board-data rounded d-flex flex-row p-0" style="height:64px;${array[i].userName === "" ? 'opacity:0.5;' : ''}"${array[i].userName !== "" ? ` data-bs-toggle="modal" data-bs-target="#modalid-O${array[i].eventId}-${array[i].rank}` : ``}">`;

                if (array[i].rank <= 10) { //10位以上
                    output_html += `<div class="text-center bd-data-rank-top10" style="height: 64px; width: 64px; font-size:2.5em;">${array[i].rank}</div>`;
                } else {
                    output_html += `<div class="text-center bd-data-rank" style="height: 64px; width: 64px; font-size:2.5em;">${array[i].rank}</div>`;
                };
            };

            output_html += `<div class="flex-fill">`;
            output_html += `<span class="link-white ps-2 bd-data-username fw-bold">${array[i].userName !== "" ? `${array[i].userName}` : 'unknown'}</span>`;
            output_html += `<br>`;
            output_html += `<div class="fw-bold pe-2 text-end bd-data-point border-bottom border-wiz">${array[i].point !== 0 ? `${array[i].point.toLocaleString()}` : ''} Pt</div>`;


            output_html += `<div class="text-center small bd-data-bottom-info overflow-hidden" style="line-height:22px; height:22px;">`;

            if (array[i].userName !== "") {
                let point_padding = '_'.repeat(7 - String(array[i].marginPoint.higher).length) + ','.repeat(Math.floor((9 - String(array[i].marginPoint.higher).length) / 3));
                output_html += `<div class="align-top d-inline-block mx-1">`;
                output_html += `<div class="align-top text-start small-5 fw-bold${array[i].rank === 1 ? ' opacity-0' : ''}"><i class="bi bi-caret-up"></i>${array[i].marginPoint.higher.toLocaleString()} Pt<span class="opacity-0">${point_padding}</span></div>`;
                output_html += `</div>`;

                point_padding = '_'.repeat(7 - String(array[i].marginPoint.lower).length) + ','.repeat(Math.floor((9 - String(array[i].marginPoint.lower).length) / 3));
                output_html += `<div class="align-top d-inline-block mx-1">`;
                output_html += `<div class="align-top text-start small-5 fw-bold${array[i].rank === 50 ? ' opacity-0' : ''}"><i class="bi bi-caret-down"></i>${array[i].marginPoint.lower.toLocaleString()} Pt<span class="opacity-0">${point_padding}</span></div>`;
                output_html += `</div>`;
            };

            //ロゴ
            output_html += `<div class="d-inline-block float-end">`;
            output_html += `<img class="align-baseline" src="../img/logoImg/${array[i].eventImg}.png" style="height:22px; width:56.78px;"">`;
            output_html += `</div>`;
            //ロゴ

            output_html += `</div>`;


            output_html += `</div>`;
            output_html += `</div>`;

            if (output_count % 10 === 9) {
                output_html += `</div>`;
            };


            /* モーダルエリア */
            modal_output = modal => {
                if (array[i].userName !== "") {
                    output_html_modal += `<div class="modal fade" id="modalid-O${modal.eventId}-${modal.rank}" tabindex="-1" aria-labelledby="modalcontent${modal.eventId}-${modal.rank}" aria-hidden="true">`;
                    output_html_modal += `<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">`;
                    output_html_modal += `<div class="modal-content border-wiz bg-wiz text-white">`;
                    output_html_modal += `<div class="modal-header border-wiz p-2">`;


                    output_html_modal += `<h5 class="modal-title" id="modalcontent${modal.eventId}-${modal.rank}">`;
                    output_html_modal += `<img class="p-0 m-0 board-data-img rounded" src="https://i-cf.quiz.colopl.jp/img/card/small/${modal.img}_0.png" style="height: 42px; width: 42px;" onselectstart="return false;" onmousedown="return false;" loading="lazy"/>`;
                    output_html_modal += `<span class="ms-2 fw-bold">${modal.userName}`;
                    //output_html_modal += `<span class="small">${modal.userName !== modal.alias ? ` / ${modal.alias}` : ""}</span>`;
                    output_html_modal += `</span>`;
                    output_html_modal += `</h5>`;

                    output_html_modal += `<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>`;
                    output_html_modal += `</div>`;

                    //モーダルコンテンツ
                    output_html_modal += `<div class="modal-body">`;
                    output_html_modal += `<dl class="row m-0 align-items-center">`;

                    //総合順位
                    output_html_modal += `<dt class="col-5 col-lg-3">総合順位</dt>`;
                    output_html_modal += `<dd class="col-7 col-lg-9 my-1">`;
                    if (modal.rank <= 10) {
                        output_html_modal += `<span class="h6${modal.rank <= 3 ? ` modal-rank${modal.rank}` : ` modal-rank-top10 fw-bold`}">${modal.rank}</span> 位`;
                    } else {
                        output_html_modal += `<span class="h5">${modal.rank}</span> 位`;
                    };
                    output_html_modal += `</dd>`;

                    //総合ポイント
                    output_html_modal += `<dt class="col-5 col-lg-3">総合ポイント</dt>`;
                    output_html_modal += `<dd class="col-7 col-lg-9 my-1"><span class="h5">${modal.point.toLocaleString()}</span> Pt</dd>`;

                    //平均時速
                    output_html_modal += `<dt class="col-5 col-lg-3">平均時速（${modal.cupLength}h）</dt>`;
                    output_html_modal += `<dd class="col-7 col-lg-9 my-1"><span class="h5">${toThousandDecimal(modal.avgSpeed)}</span> Pt/h</dd>`;
                    output_html_modal += `<hr class="m-1">`;

                    //最高順位
                    output_html_modal += `<dt class="col-5 col-lg-3">最高順位</dt>`;
                    output_html_modal += `<dd class="col-7 col-lg-9 my-1">`;
                    if (modal.bestRank <= 10) {
                        output_html_modal += `<span class="h6${modal.bestRank <= 3 ? ` modal-rank${modal.bestRank}` : ` modal-rank-top10 fw-bold`}">${modal.bestRank}</span> 位`;
                    } else {
                        output_html_modal += `<span class="h5">${modal.bestRank}</span> 位`;
                    };
                    output_html_modal += `<small class="">（${modal.bestRankCount}回）</small>`;
                    output_html_modal += `</dd>`;

                    //平均順位
                    let avgComparison = modal.avgRankPrev - modal.avgRank;
                    isNaN(avgComparison) ? avgComparison = 0 : '';
                    output_html_modal += `<dt class="col-5 col-lg-3">平均順位</dt>`;
                    output_html_modal += `<dd class="col-7 col-lg-9 my-1"><span class="h5">${modal.avgRank.toFixed(2)}</span> 位<small class="">（${avgComparison >= 0 ? `<i class="bi bi-arrow-up"></i>${avgComparison.toFixed(2)}` : `<i class="bi bi-arrow-down"></i>${Math.abs(avgComparison).toFixed(2)}`}位）</small></dd>`;

                    //累計総合ポイント
                    output_html_modal += `<dt class="col-5 col-lg-3">累計総合ポイント</dt>`;
                    output_html_modal += `<dd class="col-7 col-lg-9 my-1"><span class="h5">${toJapNum(modal.sumPoint)}</span> Pt</dd>`;

                    //平均総合ポイント
                    output_html_modal += `<dt class="col-5 col-lg-3">平均総合ポイント</dt>`;
                    output_html_modal += `<dd class="col-7 col-lg-9 my-1"><span class="h5">${toThousandDecimal(modal.avgPoint)}</span> Pt</dd>`;
                    output_html_modal += `<hr class="m-1">`;

                    //総合ボード回数
                    output_html_modal += `<dt class="col-5 col-lg-3">総合ボード回数</dt>`;
                    output_html_modal += `<dd class="col-7 col-lg-9 my-1"><span class="h5">${modal.BoardCount['total']}</span> 回</dd>`;

                    //総合ボード1P回数
                    output_html_modal += `<dt class="col-5 col-lg-3 text-truncate">総合ボード1P回数</dt>`;
                    output_html_modal += `<dd class="col-7 col-lg-9 my-1"><span class="h5">${modal.BoardCount1P}</span> 回<small class="">（${toPercent(modal.BoardCount1P / modal.BoardCount['total'], true)}）</small></dd>`;

                    //継続中の総合ボード回数
                    output_html_modal += `<dt class="col-5 col-lg-3 text-truncate">継続中のボード連続回数</dt>`;
                    output_html_modal += `<dd class="col-7 col-lg-9 my-1"><span class="h5">${modal.ContBoardCount}</span> 回<small class="">（最大${modal.bestContBoardCount.count}回）</small></dd>`;

                    //継続中の総合ボード1P回数
                    if (modal.rank <= 10) {
                        output_html_modal += `<dt class="col-5 col-lg-3 text-truncate">継続中のボード1P連続回数</dt>`;
                        output_html_modal += `<dd class="col-7 col-lg-9 my-1"><span class="h5">${modal.ContBoardCount1P}</span> 回<small class="">（最大${modal.bestContBoardCount1P.count}回）</small></dd>`;
                    };
                    output_html_modal += `<hr class="m-1">`;

                    //初総合ボード
                    output_html_modal += `<dt class="col-5 col-lg-3 text-truncate">初総合ボード</dt>`;
                    output_html_modal += `<dd class="col-7 col-lg-9 my-1"><span class="small">${modal.firstBoard.eventName}<span class="small-2">（${modal.firstBoard.eventYear}/${modal.firstBoard.eventImg.slice(2, 4)}）</span></span></dd>`;

                    //初総合ボード1P
                    if (modal.BoardCount1P) {
                        output_html_modal += `<dt class="col-5 col-lg-3 text-truncate">初総合ボード1P</dt>`;
                        output_html_modal += `<dd class="col-7 col-lg-9 my-1"><span class="small">${modal.firstBoard1P.eventName}<span class="small-2">（${modal.firstBoard1P.eventYear}/${modal.firstBoard1P.eventImg.slice(2, 4)}）</span></span></dd>`;
                    };

                    output_html_modal += `</dl>`;
                    output_html_modal += `</div>`;

                    output_html_modal += `<div class="modal-footer border-wiz p-1">`;
                    output_html_modal += `<small class="mx-auto fw-bold">`;
                    output_html_modal += `<a href="cup-data.html?id=${modal.eventId}"><img class="quiz-img" src="../img/logoImg/${modal.eventImg}.png" style="height:2rem;" loading="lazy"></a>`;
                    output_html_modal += ` 総合ボード</small>`;
                    output_html_modal += `<button type="button" class="btn btn-success bg-gradient me-2" onclick="location.href='user-result.html?user=${encodeURIComponent(modal.alias)}'">個人成績</button>`;
                    output_html_modal += `<button type="button" class="btn btn-secondary bg-gradient" data-bs-dismiss="modal">Close</button>`;
                    output_html_modal += `</div>`;
                    output_html_modal += `</div>`;
                    output_html_modal += `</div>`;
                    output_html_modal += `</div>`;
                };
            };
            /* モーダルエリア */

            modal_output(array[i]);

            output_count++;
        };
        output_html += `</div>`;
    } else {
        output_html += `<div class="bg-film text-dark rounded align-items-center text-center mb-0 p-3">`;
        output_html += `<i class="bi bi-exclamation-triangle me-2 h3 fw-bold"></i>`;
        output_html += `<div>総合ボードデータが存在しません。</div>`;
        output_html += `</div>`;
    };


    //Board_Areaクラスにボードを出力
    $('.Board_Area').html(output_html);
    $('.Modal_Area_Overall').html(output_html_modal);
};
