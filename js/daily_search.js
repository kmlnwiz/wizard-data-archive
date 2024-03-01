$(function () {
    page = 1;

    //ページ制御
    $('.page-item').on("click", pagination);

    let cup_search_select = '';

    cup_search_select += `<option value="" selected>魔道杯を選択してください。</option>`;

    for (const i in cup_data) {

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
                    $('.current-pg').html(`${length_check > 0 ? page : '0'} / ${length_check}`);
                    daily = daily_result.slice((page - 1) * 40, page * 40);
                    $('.count_info_start').html(daily_result.length > (page - 1) * 40 ? (page - 1) * 40 + 1 : 0);
                    $('.count_info_end').html(daily_result.length >= page * 40 ? page * 40 : daily_result.length);
                    daily_data_output(daily);
                    //console.log(page);
                };
                break;
            case 1: //prev
                if (page > 1) {
                    page--;
                    $('.current-pg').html(`${length_check > 0 ? page : '0'} / ${length_check}`);
                    daily = daily_result.slice((page - 1) * 40, page * 40);
                    $('.count_info_start').html(daily_result.length > (page - 1) * 40 ? (page - 1) * 40 + 1 : 0);
                    $('.count_info_end').html(daily_result.length >= page * 40 ? page * 40 : daily_result.length);
                    daily_data_output(daily);
                    //console.log(page);
                };
                break;
            case 2: //next
                if (page < Math.ceil(length_check)) {
                    page++;
                    $('.current-pg').html(`${length_check > 0 ? page : '0'} / ${length_check}`);
                    daily = daily_result.slice((page - 1) * 40, page * 40);
                    $('.count_info_start').html(daily_result.length > (page - 1) * 40 ? (page - 1) * 40 + 1 : 0);
                    $('.count_info_end').html(daily_result.length >= page * 40 ? page * 40 : daily_result.length);
                    daily_data_output(daily);
                    //console.log(page);
                };
                break;
            case 3: //last
                if (page < Math.ceil(length_check)) {
                    page = Math.ceil(length_check);
                    $('.current-pg').html(`${length_check > 0 ? page : '0'} / ${length_check}`);
                    daily = daily_result.slice((page - 1) * 40, page * 40);
                    $('.count_info_start').html(daily_result.length > (page - 1) * 40 ? (page - 1) * 40 + 1 : 0);
                    $('.count_info_end').html(daily_result.length >= page * 40 ? page * 40 : daily_result.length);
                    daily_data_output(daily);
                    //console.log(page);
                };
                break;
            default:
                break;
        };
    };

    //データ準備
    daily_data_arrange_ready();

    //検索機能
    function search_data() {

        daily_result = _.cloneDeep(dailyDataArray);

        //開催年検索
        year_search = [];
        $('#year-button input:checked').each(function () {
            year_search.push(Number($(this).val()));
        });
        //console.log(year_search);
        if (year_search.length !== 0) {

            for (const i in daily_result) {

                daily_result = daily_result.filter(function (value) {
                    return year_search.includes(value.eventYear);
                });

            };
        };

        //魔道杯検索
        //順位検索
        cup_search = $('#cup_search').val();
        //console.log(cup_search);
        if (cup_search) {

            for (const i in daily_result) {
                daily_result = daily_result.filter(function (value) {
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

            for (const i in daily_result) {
                daily_result = daily_result.filter(function (value) {
                    return user_search.some(user => value.alias.includes(user) || value.userName.includes(user));
                });
            };

        };
        //console.log(daily_result);

        //ポイント検索
        point_search = $('#point_search').val();
        point_search_condition = $('#point_search_condition').val();
        if (point_search) {

            //console.log(point_search);
            //console.log(point_search_condition);

            for (const i in daily_result) {
                if (point_search_condition == 1) {

                    daily_result = daily_result.filter(function (value) {
                        return value.point >= point_search;
                    });

                } else if (point_search_condition == 2) {

                    daily_result = daily_result.filter(function (value) {
                        return value.point == point_search;
                    });

                } else if (point_search_condition == 3) {

                    daily_result = daily_result.filter(function (value) {
                        return value.point <= point_search;
                    });

                };
            };
        };
        //console.log(daily_result);

        //順位検索
        rank_search = $('#rank_search').val();
        rank_search_condition = $('#rank_search_condition').val();
        if (rank_search) {

            //console.log(rank_search);
            //console.log(rank_search_condition);

            for (const i in daily_result) {
                if (rank_search_condition == 1) {

                    daily_result = daily_result.filter(function (value) {
                        return value.rank <= rank_search;
                    });

                } else if (rank_search_condition == 2) {

                    daily_result = daily_result.filter(function (value) {
                        return value.rank == rank_search;
                    });

                } else if (rank_search_condition == 3) {

                    daily_result = daily_result.filter(function (value) {
                        return value.rank >= rank_search;
                    });

                };
            };
        };
        //日程検索
        day_search = [];
        $('#day-search input:checked').each(function () {
            day_search.push($(this).val());
        });
        //console.log(day_search);
        if (day_search.length !== 0) {

            for (const i in daily_result) {

                function day_1(num) {
                    let result = false;
                    (num === 1) && day_search.includes("1") ? result = true : result = false;
                    return result;
                };

                function day_2(num) {
                    let result = false;
                    (num === 2) && day_search.includes("2") ? result = true : result = false;
                    return result;
                };

                function day_3(num) {
                    let result = false;
                    (num === 3) && day_search.includes("3") ? result = true : result = false;
                    return result;
                };

                function day_4(num) {
                    let result = false;
                    (num === 4) && day_search.includes("4") ? result = true : result = false;
                    return result;
                };

                daily_result = daily_result.filter(function (value) {
                    return day_1(value.day) || day_2(value.day) || day_3(value.day) || day_4(value.day);
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

            for (const i in daily_result) {

                function first_1(first, firstday, current, currentday) {
                    let result = false;
                    (first === current && firstday === currentday) && first_search.includes("1") ? result = true : result = false;
                    return result;
                };

                function first_2(first, firstday, current, currentday) {
                    let result = false;
                    (first === current && firstday === currentday) && first_search.includes("2") ? result = true : result = false;
                    return result;
                };

                daily_result = daily_result.filter(function (value) {
                    return (value.firstBoard ? first_1(value.firstBoard.eventId, value.firstBoard.day, value.eventId, value.day) : '') || (value.firstBoardTop ? first_2(value.firstBoardTop.eventId, value.firstBoardTop.day, value.eventId, value.day) : '');
                });

            };
        };

        //並べ替え
        data_sort = $('#data_sort').val();
        //console.log(data_sort !== "");
        if (data_sort !== "") {
            if (data_sort == "1") { //順位が高い順

                daily_result.sort(function (a, b) {
                    if (a.rank > b.rank) return 1;
                    if (a.rank < b.rank) return -1;
                    if (a.eventId < b.eventId) return 1;
                    if (a.eventId > b.eventId) return -1;
                    if (a.day < b.day) return 1;
                    if (a.day > b.day) return -1;
                    return 0;
                });

            } else if (data_sort == "2") { //順位が低い順

                daily_result.sort(function (a, b) {
                    if (a.rank < b.rank) return 1;
                    if (a.rank > b.rank) return -1;
                    if (a.eventId < b.eventId) return 1;
                    if (a.eventId > b.eventId) return -1;
                    if (a.day < b.day) return 1;
                    if (a.day > b.day) return -1;
                    return 0;
                });

            } else if (data_sort == "3") { //ポイントが高い順

                daily_result.sort(function (a, b) {
                    if (a.point < b.point) return 1;
                    if (a.point > b.point) return -1;
                    if (a.eventId < b.eventId) return 1;
                    if (a.eventId > b.eventId) return -1;
                    if (a.day < b.day) return 1;
                    if (a.day > b.day) return -1;
                    return 0;
                });

            } else if (data_sort == "4") { //ポイントが低い順

                daily_result.sort(function (a, b) {
                    if (a.point > b.point) return 1;
                    if (a.point < b.point) return -1;
                    if (a.eventId < b.eventId) return 1;
                    if (a.eventId > b.eventId) return -1;
                    if (a.day < b.day) return 1;
                    if (a.day > b.day) return -1;
                    return 0;
                });
            } else if (data_sort == "5") { //時速が高い順

                daily_result.sort(function (a, b) {
                    if (a.avgSpeed < b.avgSpeed) return 1;
                    if (a.avgSpeed > b.avgSpeed) return -1;
                    if (a.eventId < b.eventId) return 1;
                    if (a.eventId > b.eventId) return -1;
                    if (a.day < b.day) return 1;
                    if (a.day > b.day) return -1;
                    return 0;
                });

            } else if (data_sort == "6") { //時速が低い順

                daily_result.sort(function (a, b) {
                    if (a.avgSpeed > b.avgSpeed) return 1;
                    if (a.avgSpeed < b.avgSpeed) return -1;
                    if (a.eventId < b.eventId) return 1;
                    if (a.eventId > b.eventId) return -1;
                    if (a.day < b.day) return 1;
                    if (a.day > b.day) return -1;
                    return 0;
                });
            } else if (data_sort == "7") { //下との差が大きい順

                daily_result.sort(function (a, b) {
                    if (a.marginPoint.lower < b.marginPoint.lower) return 1;
                    if (a.marginPoint.lower > b.marginPoint.lower) return -1;
                    if (a.eventId < b.eventId) return 1;
                    if (a.eventId > b.eventId) return -1;
                    if (a.day < b.day) return 1;
                    if (a.day > b.day) return -1;
                    return 0;
                });

            };
        } else {

            daily_result.sort(function (a, b) {
                if (a.eventId < b.eventId) return 1;
                if (a.eventId > b.eventId) return -1;
                if (a.day > b.day) return 1;
                if (a.day < b.day) return -1;
                if (a.rank > b.rank) return 1;
                if (a.rank < b.rank) return -1;
                return 0;
            });
        };

        //console.log("デイリー検索", daily_result);

        length_check = Math.ceil(daily_result.length / 40);

        $('.count_info').html(daily_result.length);

        $('.count_info_start').html(daily_result.length > 0 ? '1' : '0');
        $('.count_info_end').html(daily_result.length >= 40 ? '40' : daily_result.length);

        $('.current-pg').html(`${length_check > 0 ? page : '0'} / ${Math.ceil(daily_result.length / 40)}`);
        daily = daily_result.slice((page - 1) * 40, page * 40);
        daily_data_output(daily);
    };
    search_data();
});
