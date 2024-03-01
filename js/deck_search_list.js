//フィルター
$(function () {
    //デッキデータ
    //未定義aliasにuserNameを代入
    if (deck_data != undefined) {
        deck_data.forEach((element) => {
            element.data.forEach((define) => {
                const check1 = 'alias' in define; {
                    if (check1) {} else {
                        define.alias = define.userName;
                    };
                };
                const check2 = 'collapse' in define; {
                    if (check2) {
                        delete define.collapse;
                    } else {};
                };
            });
        });

        for (const i in deck_data) {
            deck_data[i].eventYear = cup_data[i].data.eventYear;
        };

        /* 状況に応じて変更 */
        deck_result = deck_data.filter(function (value) {
            return value;
        });
        //console.log("デッキ", deck_result);
    };

    deck_output(deck_result);
});

$('.search').on('click', deckList_search);

$('#dropdown-chara li').on('click', function () {
    let charaOR = $(this).text();
    $('#chara_name').val($('#chara_name').val() + charaOR);
});

function deckList_search() {

    var chara_name = $('#chara_name').val();
    var user_name = $('#user_name').val();
    deck_filter = _.cloneDeep(deck_data);

    if (chara_name) {
        //chara_name = chara_name.split('[OR]');
        //chara_name = chara_name.filter(blank => blank !== "");
        //console.log(chara_name);

        deck_filter.forEach(value => {
            value.data = value.data.filter(x => {
                //console.log(x.cardName.length)
                return x.cardName.some(x => x.indexOf(chara_name) !== -1);
            });
        });

        deck_filter = deck_filter.filter(value => {
            return value.data.length;
        });

    };

    if (user_name) {
        user_name = user_name.split(/\s/);
        user_name = user_name.filter(blank => blank !== "");
        //console.log(user_name);

        deck_filter.forEach(value => {
            value.data = value.data.filter(x => {
                return x.alias.indexOf(user_name) !== -1 || x.userName.indexOf(user_name) !== -1;
            });
        });

        deck_filter = deck_filter.filter(value => {
            return value.data.length;
        });

    };

    deck_result = deck_filter;
    //console.log(deck_result);
    deck_output(deck_result);

};
