$(function () {
  //HTML出力
  let output_html = '';

  output_html += `<div class="p-2 border border-2 border-wiz rounded text-center fw-bold h4 heading-bar text-white">魔道杯データ</div>`;

  output_html += `<div class="row row-cols-sm-2 g-1">`;

  //総合ボード
  output_html += `<div class="d-flex flex-column">`;

  output_html += `<a href="pages/overall-data.html" class="p-2 h-100 border border-2 border-wiz cup-list rounded d-flex flex-row text-decoration-none text-white">`;

  //総合アイコンランダム取得 Overall Data Count
  let od_c_max = Number(overall_data.length);
  let od_c_min = Number(overall_data[overall_data.length - 1].eventId)
  let od_random = Math.floor(Math.random() * (od_c_max - od_c_min) + od_c_min);
  //console.log(od_c_max, od_c_min, od_random);
  let overall_page_icon = overall_data[od_random].data[Math.floor(Math.random() * 3)].img;
  output_html += `<img class="home-chara-img rounded" src="https://i-cf.quiz.colopl.jp/img/card/small/${overall_page_icon}_0.png" onselectstart="return false;" onmousedown="return false;" style="width:64px; height:64px";/>`;

  output_html += `<div class="text-center fw-bold m-auto h6">総合ボードデータ</div>`;

  output_html += `</a>`;
  output_html += `</div>`;


  //全体D
  output_html += `<div class="d-flex flex-column">`;

  output_html += `<a href="pages/daily-data.html" class="p-2 h-100 border border-2 border-wiz cup-list rounded d-flex flex-row text-decoration-none text-white">`;

  //デイリーアイコンランダム取得 Daily Data Count
  let dd_c_max = Number(daily_data.length - 1);
  let dd_c_min = Number(daily_data[daily_data.length - 1].eventId)
  let dd_random = Math.floor(Math.random() * (dd_c_max - dd_c_min) + dd_c_min);
  //console.log(dd_c_max, dd_c_min, dd_random);
  let dd_page_filter = daily_data[dd_random].data.filter(function (value) {
    return value.rank === 1;
  });
  //console.log(dd_page_filter)
  let daily_page_icon = dd_page_filter[Math.floor(Math.random() * dd_page_filter.length)].img;
  output_html += `<img class="home-chara-img rounded" src="https://i-cf.quiz.colopl.jp/img/card/small/${daily_page_icon}_0.png" onselectstart="return false;" onmousedown="return false;" style="width:64px; height:64px";/>`;

  output_html += `<div class="text-center fw-bold m-auto h6">全体デイリー1Pデータ</div>`;

  output_html += `</a>`;
  output_html += `</div>`;

  output_html += `</div>`;
  output_html += `<hr>`;
  output_html += `<div class="row row-cols-sm-2 g-1">`;

  //デッキ
  output_html += `<div class="d-flex flex-column">`;

  output_html += `<a href="pages/deck-data.html?id=${cup_data[0].data.eventYear}" class="p-2 h-100 border border-2 border-wiz cup-list rounded d-flex flex-row text-decoration-none text-white">`;

  //デッキ使用精霊アイコンランダム取得 DecK Data Count
  let dkd_c_max = Number(deck_data.length - 1);
  let dkd_c_min = Number(deck_data[deck_data.length - 1].eventId)
  let dkd_random = Math.floor(Math.random() * (dkd_c_max - dkd_c_min) + dkd_c_min);
  let dkd_random_2 = Math.floor(Math.random() * deck_data[dkd_random].data.length);
  //console.log(dkd_c_max, dkd_c_min, dkd_random,dkd_random_2);
  let deck_page_icon = deck_data[dkd_random].data[dkd_random_2].card[Math.floor(Math.random() * deck_data[dkd_random].data[dkd_random_2].card.length)];
  output_html += `<img class="home-chara-img rounded" src="https://i-cf.quiz.colopl.jp/img/card/small/${deck_page_icon}_0.png" onselectstart="return false;" onmousedown="return false;" style="width:64px; height:64px";/>`;

  output_html += `<div class="text-center fw-bold m-auto h6">魔道杯使用デッキ</div>`;

  output_html += `</a>`;
  output_html += `</div>`;

  //ボーダー
  output_html += `<div class="d-flex flex-column">`;

  output_html += `<a href="pages/border-data.html" class="p-2 h-100 border border-2 border-wiz cup-list rounded d-flex flex-row text-decoration-none text-white">`;

  output_html += `<img class="home-chara-img rounded" src="https://i-cf.quiz.colopl.jp/img/card/small/card_00450_0.png" onselectstart="return false;" onmousedown="return false;" style="width:64px; height:64px";/>`;

  output_html += `<div class="text-center fw-bold m-auto h6">プラチナムボーダー</div>`;

  output_html += `</a>`;
  output_html += `</div>`;

  //魔道杯一覧
  output_html += `<div class="d-flex flex-column">`;

  output_html += `<a href="pages/cup-list.html?id=${cup_data[0].data.eventYear}" class="p-2 h-100 border border-2 border-wiz cup-list rounded d-flex flex-row text-decoration-none text-white">`;

  output_html += `<img class="home-chara-img rounded" src="https://i-cf.quiz.colopl.jp/img/card/small/card_05928_0.png" onselectstart="return false;" onmousedown="return false;" style="width:64px; height:64px";/>`;

  output_html += `<div class="text-center fw-bold m-auto h6">魔道杯一覧</div>`;

  output_html += `</a>`;
  output_html += `</div>`;

  $('.Info_Area_1').html(output_html);
});
