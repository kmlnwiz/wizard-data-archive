$(function () {
    page = 1;

    //ページ制御
    $('.page-item').on("click", pagination);

    let cup_search_select = '';

    cup_search_select += `<option value="" selected>魔道杯を選択してください。</option>`;

    for (let i = 0; i < cup_data.length; i++) {

        //cup_data_month
        let cd_m_a = cup_data[i].data.eventYear;
        let cd_m_b = cup_data[i].data.eventImg.slice(2, 4);

        cup_search_select += `<option value="${cup_data[i].eventId}">【${cd_m_a + "/" + cd_m_b}】${cup_data[i].data.eventName}</option>`;

    };

    $('#cup_search').html(cup_search_select);

    $('.search-button').on("click", page_reset);
    $('.search-button').on("click", search_data);

    $('#dropdown-user li').on('click', function () {
        let userOR = $(this).text();
        $('#user_search').val($('#user_search').val() + userOR);
    });

    function page_reset() {
        page = 1;
    }

    function pagination() {
        //console.log(length_check);

        //console.log($(this).val(), page);

        switch ($(this).val()) {
            case 0: //first
                if (page > 1) {
                    page = 1;
                    $('.current-pg').html(`${length_check>0?page:'0'} / ${length_check}`);
                    overall = overall_result.slice((page - 1) * 50, page * 50);
                    $('.count_info_start').html(overall_result.length > (page - 1) * 50 ? (page - 1) * 50 + 1 : 0);
                    $('.count_info_end').html(overall_result.length >= page * 50 ? page * 50 : overall_result.length);
                    overall_data_output(overall);
                    //console.log(page);
                };
                break;
            case 1: //prev
                if (page > 1) {
                    page--;
                    $('.current-pg').html(`${length_check>0?page:'0'} / ${length_check}`);
                    overall = overall_result.slice((page - 1) * 50, page * 50);
                    $('.count_info_start').html(overall_result.length > (page - 1) * 50 ? (page - 1) * 50 + 1 : 0);
                    $('.count_info_end').html(overall_result.length >= page * 50 ? page * 50 : overall_result.length);
                    overall_data_output(overall);
                    //console.log(page);
                };
                break;
            case 2: //next
                if (page < Math.ceil(length_check)) {
                    page++;
                    $('.current-pg').html(`${length_check>0?page:'0'} / ${length_check}`);
                    overall = overall_result.slice((page - 1) * 50, page * 50);
                    $('.count_info_start').html(overall_result.length > (page - 1) * 50 ? (page - 1) * 50 + 1 : 0);
                    $('.count_info_end').html(overall_result.length >= page * 50 ? page * 50 : overall_result.length);
                    overall_data_output(overall);
                    //console.log(page);
                };
                break;
            case 3: //last
                if (page < Math.ceil(length_check)) {
                    page = Math.ceil(length_check);
                    $('.current-pg').html(`${length_check>0?page:'0'} / ${length_check}`);
                    overall = overall_result.slice((page - 1) * 50, page * 50);
                    $('.count_info_start').html(overall_result.length > (page - 1) * 50 ? (page - 1) * 50 + 1 : 0);
                    $('.count_info_end').html(overall_result.length >= page * 50 ? page * 50 : overall_result.length);
                    overall_data_output(overall);
                    //console.log(page);
                };
                break;
            default:
                break;
        };
    };

    //データ準備
    overall_data_arrange_ready();

    //検索機能
    function search_data() {

        overall_result = _.cloneDeep(overallDataArray);

        //開催年検索
        year_search = [];
        $('#year-button input:checked').each(function () {
            year_search.push(Number($(this).val()));
        });
        //console.log(year_search);
        if (year_search.length !== 0) {

            for (const i in overall_result) {
                overall_result = overall_result.filter(function (value) {
                    return year_search.includes(value.eventYear);
                });
            };

        };

        //魔道杯検索
        //順位検索
        cup_search = $('#cup_search').val();
        //console.log(cup_search);
        if (cup_search) {

            for (const i in overall_result) {
                overall_result = overall_result.filter(function (value) {
                    return value.eventId == cup_search;
                });
            };

        };
        //名前検索
        user_search = $('#user_search').val();
        if (user_search) {

            user_search = user_search.split('[OR]');
            user_search = user_search.filter(blank => blank !== "");
            //console.log(user_search);

            for (const i in overall_result) {
                overall_result = overall_result.filter(function (value) {
                    return user_search.some(user => value.alias.includes(user) || value.userName.includes(user));
                });
            };

        };
        //console.log(overall_result);

        //ポイント検索
        point_search = $('#point_search').val();
        point_search_condition = $('#point_search_condition').val();
        if (point_search) {

            //console.log(point_search);
            //console.log(point_search_condition);

            for (const i in overall_result) {
                if (point_search_condition == 1) {

                    overall_result = overall_result.filter(function (value) {
                        return value.point >= point_search;
                    });

                } else if (point_search_condition == 2) {

                    overall_result = overall_result.filter(function (value) {
                        return value.point == point_search;
                    });

                } else if (point_search_condition == 3) {

                    overall_result = overall_result.filter(function (value) {
                        return value.point <= point_search;
                    });

                };
            };
        };
        //console.log(overall_result);

        //ポイント調整検索
        point_adjust_search = [];
        $('#point-adjust-search input:checked').each(function () {
            point_adjust_search.push($(this).val());
        });
        //console.log(point_adjust_search);
        if (point_adjust_search.length !== 0) {

            for (const i in overall_result) {


                const zoromePattern = /^(\d)\1+$/;
                const zoromeChecker = function (num) {

                    let result = false;
                    if (zoromePattern.test(`${num}`) && point_adjust_search.includes("1")) {
                        result = true;
                    } else {
                        result = false;
                    }
                    //console.log(`${num}: ${result}`);
                    return result;
                };

                function roundnumber(num) {
                    let result = false;
                    num % (5 * 1e5) === 0 && num !== 0 && point_adjust_search.includes("2") ? result = true : result = false;
                    return result;
                };

                function primeChecker(num) {

                };

                overall_result = overall_result.filter(function (value) {
                    return zoromeChecker(value.point) || roundnumber(value.point) || primeChecker(value.point);
                });

            };
        };
        //console.log(overall_result);

        //順位検索
        rank_search = $('#rank_search').val();
        rank_search_condition = $('#rank_search_condition').val();
        if (rank_search) {

            //console.log(rank_search);
            //console.log(rank_search_condition);

            for (const i in overall_result) {
                if (rank_search_condition == 1) {

                    overall_result = overall_result.filter(function (value) {
                        return value.rank <= rank_search;
                    });

                } else if (rank_search_condition == 2) {

                    overall_result = overall_result.filter(function (value) {
                        return value.rank == rank_search;
                    });

                } else if (rank_search_condition == 3) {

                    overall_result = overall_result.filter(function (value) {
                        return value.rank >= rank_search;
                    });

                };
            };
        };
        //ページ検索
        page_search = [];
        $('#rankpage-search input:checked').each(function () {
            page_search.push($(this).val());
        });
        //console.log(page_search);
        if (page_search.length !== 0) {

            for (const i in overall_result) {

                function page_1(num) {
                    let result = false;
                    (num > 0 && num <= 10) && page_search.includes("1") ? result = true : result = false;
                    return result;
                };

                function page_2(num) {
                    let result = false;
                    (num > 10 && num <= 20) && page_search.includes("2") ? result = true : result = false;
                    return result;
                };

                function page_3(num) {
                    let result = false;
                    (num > 20 && num <= 30) && page_search.includes("3") ? result = true : result = false;
                    return result;
                };

                function page_4(num) {
                    let result = false;
                    (num > 30 && num <= 40) && page_search.includes("4") ? result = true : result = false;
                    return result;
                };

                function page_5(num) {
                    let result = false;
                    (num > 40 && num <= 50) && page_search.includes("5") ? result = true : result = false;
                    return result;
                };

                overall_result = overall_result.filter(function (value) {
                    return page_1(value.rank) || page_2(value.rank) || page_3(value.rank) || page_4(value.rank) || page_5(value.rank);
                });

            };
        };

        //初ボード
        first_search = [];
        $('#first-search input:checked').each(function () {
            first_search.push($(this).val());
        });
        //console.log(first_search);
        if (first_search.length !== 0) {

            for (const i in overall_result) {

                function first_1(first, current) {
                    let result = false;
                    (first === current) && first_search.includes("1") ? result = true : result = false;
                    return result;
                };

                function first_2(first, current) {
                    let result = false;
                    (first === current) && first_search.includes("2") ? result = true : result = false;
                    return result;
                };

                overall_result = overall_result.filter(function (value) {
                    return (value.firstBoard ? first_1(value.firstBoard.eventId, value.eventId) : '') || (value.firstBoard1P ? first_2(value.firstBoard1P.eventId, value.eventId) : '');
                });

            };
        };

        //並べ替え
        data_sort = $('#data_sort').val();
        //console.log(data_sort !== "");
        if (data_sort !== "") {
            if (data_sort == "1") { //順位が高い順

                overall_result.sort(function (a, b) {
                    if (a.rank > b.rank) return 1;
                    if (a.rank < b.rank) return -1;
                    if (a.eventId < b.eventId) return 1;
                    if (a.eventId > b.eventId) return -1;
                    return 0;
                });

            } else if (data_sort == "2") { //順位が低い順

                overall_result.sort(function (a, b) {
                    if (a.rank < b.rank) return 1;
                    if (a.rank > b.rank) return -1;
                    if (a.eventId < b.eventId) return 1;
                    if (a.eventId > b.eventId) return -1;
                    return 0;
                });

            } else if (data_sort == "3") { //ポイントが高い順

                overall_result.sort(function (a, b) {
                    if (a.point < b.point) return 1;
                    if (a.point > b.point) return -1;
                    if (a.eventId > b.eventId) return 1;
                    if (a.eventId < b.eventId) return -1;
                    return 0;
                });

            } else if (data_sort == "4") { //ポイントが低い順

                overall_result.sort(function (a, b) {
                    if (a.point > b.point) return 1;
                    if (a.point < b.point) return -1;
                    if (a.eventId < b.eventId) return 1;
                    if (a.eventId > b.eventId) return -1;
                    return 0;
                });

            } else if (data_sort == "5") { //下との差が大きい順

                overall_result.sort(function (a, b) {
                    if (a.marginPoint.lower < b.marginPoint.lower) return 1;
                    if (a.marginPoint.lower > b.marginPoint.lower) return -1;
                    if (a.eventId < b.eventId) return 1;
                    if (a.eventId > b.eventId) return -1;
                    return 0;
                });

            };
        } else {

            overall_result.sort(function (a, b) {
                if (a.eventId < b.eventId) return 1;
                if (a.eventId > b.eventId) return -1;
                if (a.rank > b.rank) return 1;
                if (a.rank < b.rank) return -1;
                return 0;
            });

        };

        //console.log("総合検索", overall_result);

        length_check = Math.ceil(overall_result.length / 50);

        $('.count_info').html(overall_result.length);

        $('.count_info_start').html(overall_result.length > 0 ? '1' : '0');
        $('.count_info_end').html(overall_result.length >= 50 ? '50' : overall_result.length);

        $('.current-pg').html(`${length_check>0? page:'0'} / ${Math.ceil(overall_result.length / 50)}`);
        overall = overall_result.slice((page - 1) * 50, page * 50);
        overall_data_output(overall);
    };
    search_data();
});
