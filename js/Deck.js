//デッキを出力するスクリプト

//ボード出力
deck_output = function (array) {

    let output_html = '';
    let output_html_modal = '';

    //HTML出力
    output_html += `<div class="p-2 border border-2 border-wiz rounded text-center fw-bold h4 heading-bar text-white">デッキ</div>`;


    if (array.length) {
        for (const i in array) {

            if (array.length > 0) {
                if ((i) != 0) {
                    output_html += `<hr>`;
                };

                output_html += `<a href="cup-data.html?id=${array[i].eventId}" class="mt-3 mb-1 p-2 border border-2 border-wiz cup-list rounded d-flex flex-row text-decoration-none text-dark">`;
                output_html += `<img class="mx-auto d-block deck-data-logoImg" src="../img/logoImg/${cup_data[cup_data.length - array[i].eventId].data.eventImg}.png" onselectstart="return false;" onmousedown="return false;" />`;
                output_html += `</a >`;
            };

            let deck_NoCollapse = array[i].data.filter(x => {
                return x.collapse === undefined || x.collapse !== true;
            });
            let deck_Collapse = array[i].data.filter(x => {
                return x.collapse === true;
            });

            if (!deck_NoCollapse.length) {
                deck_NoCollapse = _.cloneDeep(deck_Collapse);
                deck_Collapse = [];
            };

            //console.log(deck_NoCollapse, deck_Collapse);

            function deck_output(Array) {

                if (Array.length <= 1) {
                    output_html += `<div class="row g-1">`; //1
                } else if (Array.length <= 2) {
                    output_html += `<div class="row row-cols-md-2 g-1">`; //1
                } else if (Array.length <= 3) {
                    output_html += `<div class="row row-cols-md-2 row-cols-xl-3 g-1">`; //1
                } else if (Array.length >= 4) {
                    output_html += `<div class="row row-cols-md-2 row-cols-xl-3 row-cols-xxl-4 g-1">`; //1
                };
                for (const j in Array) {

                    output_html += `<div class="d-flex flex-column mt-0">`; //2
                    output_html += `<div class="my-1 p-0 h-100 border border-wiz border-1 deck-data rounded d-flex flex-column overflow-hidden">`; //3

                    output_html += `<div class="mx-auto">`; //4
                    for (let k = 0; k < 5; k++) {

                        output_html += `<div class="m-1 p-0 d-inline-block">`;

                        //精霊
                        if (Array[j].card[k] !== undefined) {
                            if (!(Array[j].is_EX == undefined || Array[j].is_EX[k] == false)) {
                                output_html += `<img class="deck-data-img-exas position-absolute" src="../img/materials/EX-AS.png" data-bs-toggle="modal" data-bs-target="#modalid-deck-${Array[j].collapse ? `C` : ''}${array[i].eventId}-${j}-${k}" loading="lazy"/>`;
                                output_html += `<img class="deck-data-img-frame-ex position-absolute" src="https://i-cf.quiz.colopl.jp/img/pvnranking/frame/${Array[j].frame[k]}.png" onselectstart="return false;" loading="lazy">`
                                output_html += `<img class="deck-data-img-card-ex" src="https://i-cf.quiz.colopl.jp/img/card/small/${Array[j].card[k]}_0.png" onselectstart="return false;" onmousedown="return false;"/ loading="lazy">`;
                            } else {
                                output_html += `<img class="deck-data-img-frame position-absolute" src="https://i-cf.quiz.colopl.jp/img/pvnranking/frame/${Array[j].frame[k]}.png" onselectstart="return false;" data-bs-toggle="modal" data-bs-target="#modalid-deck-${Array[j].collapse ? `C` : ''}${array[i].eventId}-${j}-${k}" loading="lazy">`;
                                output_html += `<img class="deck-data-img-card" src="https://i-cf.quiz.colopl.jp/img/card/small/${Array[j].card[k]}_0.png" onselectstart="return false;" onmousedown="return false;"/ loading="lazy">`;
                            };
                        } else {
                            output_html += `<img class="deck-data-img position-absolute" src="../img/materials/frame_undefined.png" onselectstart="return false;" loading="lazy"/>`;
                            output_html += `<img class="deck-data-img" src="../img/materials/card_undefined.png" onselectstart="return false;" onmousedown="return false;" loading="lazy"/>`;
                        };

                        output_html += `</div>`;

                    };
                    output_html += `</div>`; // 4/

                    output_html += `<div class="container-fluid border-top border-2 border-wiz p-0">`; //5
                    output_html += `<div class="row m-0 fw-bold text-center">`; //6
                    if (Array[j].userName !== undefined && Array[j].userName !== "") {
                        output_html += `<div class="col m-0 p-0">${Array[j].desc == undefined ? '覇級' : `${Array[j].desc}`}</div>`;
                        output_html += `<div class="col m-0 p-0 border-start border-wiz">`;
                        output_html += `<a href="user-result.html?user=${encodeURIComponent(Array[j].alias)}" class="text-white text-decoration-none ranking-name">${Array[j].userName}</a>`;
                        output_html += `</div>`;

                        output_html += `</div>`; // 6/

                        output_html += `<div class="row m-0 p-0 fw-bold text-center">` //6;
                        if (!Array[j].result.includes(8) && !Array[j].result.includes(9)) {
                            output_html += `${Array[j].result.includes(1) ? `<div class="col m-0 p-0 small-2 border-wiz border-top bg-wiz-blue">総合1位</div>` : `<div class="col m-0 p-0 small-2 border-wiz border-top text-muted">総合1位</div>`}`;
                            output_html += `${Array[j].result.includes(2) ? `<div class="col m-0 p-0 small-2 border-wiz border-top border-start bg-wiz-blue">総合2位</div>` : `<div class="col m-0 p-0 small-2 border-wiz border-top border-start text-muted">総合2位</div>`}`;
                            output_html += `${Array[j].result.includes(3) ? `<div class="col m-0 p-0 small-2 border-wiz border-top border-start bg-wiz-blue">総合3位</div>` : `<div class="col m-0 p-0 small-2 border-wiz border-top border-start text-muted">総合3位</div>`}`;
                            output_html += `${Array[j].result.includes(4) ? `<div class="col m-0 p-0 small-2 border-wiz border-top border-start bg-wiz-blue">1日目</div>` : `<div class="col m-0 p-0 small-2 border-wiz border-top border-start text-muted">1日目</div>`}`;
                            output_html += `${Array[j].result.includes(5) ? `<div class="col m-0 p-0 small-2 border-wiz border-top border-start bg-wiz-blue">2日目</div>` : `<div class="col m-0 p-0 small-2 border-wiz border-top border-start text-muted">2日目</div>`}`;
                            output_html += `${Array[j].result.includes(6) ? `<div class="col m-0 p-0 small-2 border-wiz border-top border-start bg-wiz-blue">3日目</div>` : `<div class="col m-0 p-0 small-2 border-wiz border-top border-start text-muted">3日目</div>`}`;
                            output_html += `${Array[j].result.includes(7) ? `<div class="col m-0 p-0 small-2 border-wiz border-top border-start bg-wiz-blue">4日目</div>` : `<div class="col m-0 p-0 small-2 border-wiz border-top border-start text-muted">4日目</div>`}`;
                            output_html += `</div>`; // 6/
                        } else {
                            output_html += `${Array[j].result.includes(8) ? `<div class="col m-0 p-0 small-2 border-wiz border-top bg-wiz-blue">総合1P</div>` : `<div class="col m-0 p-0 small-2 border-wiz border-top text-muted">総合1P</div>`}`;
                            output_html += `${Array[j].result.includes(9) ? `<div class="col m-0 p-0 small-2 border-wiz border-top border-start bg-wiz-blue">全体D表彰台</div>` : `<div class="col m-0 p-0 small-2 border-wiz border-top border-start text-muted">全体D表彰台</div>`}`;
                            output_html += `</div>`; // 6/
                        }
                    } else {
                        output_html += `<div class="col m-0 p-0">${Array[j].desc == undefined ? '覇級' : `${Array[j].desc}`}</div>`;

                        output_html += `</div>`; // 6/
                    };
                    output_html += `</div>`; // 5/

                    output_html += `</div>`; // 3/
                    output_html += `</div>`; // 2/

                    for (let k = 0; k < 5; k++) {
                        if (Array[j].card[k] !== undefined) {
                            /* モーダルエリア */
                            output_html_modal += `<div class="modal fade" id="modalid-deck-${Array[j].collapse?`C`:''}${array[i].eventId}-${j}-${k}" tabindex="-1" aria-labelledby="modalcontent-${Array[j].collapse?`C`:''}${array[i].eventId}-${j}-${k}" aria-hidden="true">`;
                            output_html_modal += `<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">`;
                            output_html_modal += `<div class="modal-content border-wiz bg-wiz text-white">`;
                            output_html_modal += `<div class="modal-header border-wiz p-2">`;

                            //画像　ヘッダー
                            Array[j].rank <= 3 ? img_no =
                                Array[j].img :
                                img_no = "card_05302";

                            output_html_modal += `<h5 class="modal-title" id="modalcontent-${Array[j].collapse ? `C` : ''}${array[i].eventId}-${j}-${k}">`;
                            output_html_modal += `<img class="p-0 m-0 position-absolute" src="https://i-cf.quiz.colopl.jp/img/pvnranking/frame/${Array[j].frame[k]}.png" style="height: 42px; width: 42px;" onselectstart="return false;" loading="lazy" />`;
                            output_html_modal += `<img class="p-0 m-0" src="https://i-cf.quiz.colopl.jp/img/card/small/${Array[j].card[k]}_0.png" style="height: 42px; width: 42px;" onselectstart="return false;" onmousedown="return false;" loading="lazy"/>`;
                            output_html_modal += `<span class="ms-2 fw-bold small">${Array[j].cardName[k]}</span>`;
                            output_html_modal += `</h5>`;

                            output_html_modal += `<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>`;
                            output_html_modal += `</div>`;

                            //モーダルコンテンツ
                            output_html_modal += `<div class="modal-body">`;

                            output_html_modal += `<figure class="figure p-0 my-0 d-block">`;
                            output_html_modal += `<img class="mx-auto d-block deck-img" src="https://i-cf.quiz.colopl.jp/img/card/middle/${Array[j].card[k]}_1.png" onselectstart="return false;" onmousedown="return false;" loading="lazy"/>`;
                            //output_html_modal += `<figcaption class="figure-caption text-center">©Colopl.Inc</figcaption>`;
                            output_html_modal += `</figure>`;

                            /*
                            output_html_modal += `<div class="row my-1 mx-1 small">`;
                            output_html_modal += `<div class="col-4 p-1 fw-bold text-center rounded-start border border-end-0 border-wiz">`;
                            output_html_modal += `レベル`;
                            output_html_modal += `</div>`;
                            output_html_modal += `<div class="col-4 p-1 fw-bold text-center border border-wiz border-start border-end border-wiz">`;
                            output_html_modal += `マナプラス`;
                            output_html_modal += `</div>`;
                            output_html_modal += `<div class="col-4 p-1 fw-bold text-center rounded-end border border-start-0 border-wiz">`;
                            output_html_modal += `潜在能力`;
                            output_html_modal += `</div>`;
                            output_html_modal += `</div>`;


                            output_html_modal += `<div class="row mt-1 mx-1 small-2">`;
                            output_html_modal += `<div class="col-4 p-1 fw-bold text-center rounded-top-start border-end-0 border border-wiz">`;
                            output_html_modal += Array[j].item ? (Array[j].item[k][0] ? `${Array[j].item[k][0]}` : `潜在結晶`) : `潜在結晶`;
                            output_html_modal += `</div>`;
                            output_html_modal += `<div class="col-8 p-1 rounded-top-end border border-wiz">`;
                            output_html_modal += ``;
                            output_html_modal += `</div>`;
                            output_html_modal += `</div>`;

                            output_html_modal += `<div class="row mb-1 mx-1 small-2">`;
                            output_html_modal += `<div class="col-4 p-1 fw-bold text-center rounded-bottom-start border-end-0 border border-top-0 border-wiz ">`;
                            output_html_modal += Array[j].item ? (Array[j].item[k][1] ? `${Array[j].item[k][1]}` : `潜在結晶`) : `潜在結晶`;
                            output_html_modal += `</div>`;
                            output_html_modal += `<div class="col-8 p-1 rounded-bottom-end border border-top-0 border-wiz">`;
                            output_html_modal += ``;
                            output_html_modal += `</div>`;
                            output_html_modal += `</div>`;
                            */

                            output_html_modal += `</div>`;

                            output_html_modal += `<div class="modal-footer border-wiz p-1">`;
                            output_html_modal += `<button type="button" onclick="window.open('https://www.google.co.jp/search?q=${encodeURIComponent(Array[j].cardName[k])}','_blank','noreferrer')" class="btn btn-success bg-gradient d-block my-2">検索する</button>`;
                            output_html_modal += `<button type="button" class="btn btn-secondary bg-gradient" data-bs-dismiss="modal">Close</button>`;
                            output_html_modal += `</div>`;
                            output_html_modal += `</div>`;
                            output_html_modal += `</div>`;
                            output_html_modal += `</div>`;
                            output_html_modal += `</div>`;
                            /* モーダルエリア */
                        };
                    };
                };
                output_html += `</div>`; // 1/
            };

            deck_output(deck_NoCollapse);

            //
            if (deck_Collapse.length) {
                //総合4位~10位、全体表彰台
                output_html += `<button class="btn btn-primary bg-gradient w-100 mb-1" type="button" data-bs-toggle="collapse" data-bs-target="#deck${array[i].eventId}" aria-expanded="false" aria-controls="collapse${array[i].eventId}">もっと見る</button>`;

                output_html += `<div class="collapse" id="deck${array[i].eventId}">`; //0
                deck_output(deck_Collapse);
                output_html += `</div>`; //0
            };
            //

        };

    } else {
        output_html += `<div class="bg-film text-dark rounded align-items-center text-center mb-0 p-3">`;
        output_html += `<i class="bi bi-exclamation-triangle me-2 h3 fw-bold"></i>`;
        output_html += `<div>デッキデータが存在しません。</div>`;
        output_html += `</div>`;
    };


    //Deck_Areaクラスにデッキを出力
    $('.Deck_Area').html(output_html);
    $('.Modal_Area_Deck').html(output_html_modal);
};
