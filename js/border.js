$(function () {

    //console.log(cup_data)

    $('#border_sort').on('change', search);
    search();

    function search() {

        search_result = Object.assign([], cup_data.filter(function (value) {
            return value.eventId >= 24;
        }));

        //並べ替え
        if ($('#border_sort').val()) {

            if ($('#border_sort').val() == "1") { //pが高い順
                search_result.sort(function (a, b) {
                    let a_Pt = a.data.border[2];
                    let b_Pt = b.data.border[2];
                    if (a_Pt < b_Pt) return 1;
                    if (a_Pt > b_Pt) return -1;
                    return 0;
                });
            } else if ($('#border_sort').val() == "2") { //pが低い順
                search_result.sort(function (a, b) {
                    let a_Pt = a.data.border[2];
                    let b_Pt = b.data.border[2];
                    if (a_Pt > b_Pt) return 1;
                    if (a_Pt < b_Pt) return -1;
                    return 0;
                });
            } else if ($('#border_sort').val() == "3") { //bdが高い順
                search_result.sort(function (a, b) {
                    let a_Pt = a.data.border[1];
                    let b_Pt = b.data.border[1];
                    if (a_Pt < b_Pt) return 1;
                    if (a_Pt > b_Pt) return -1;
                    return 0;
                });
            } else if ($('#border_sort').val() == "4") { //bdが低い順
                search_result.sort(function (a, b) {
                    let a_Pt = a.data.border[1];
                    let b_Pt = b.data.border[1];
                    if (a_Pt > b_Pt) return 1;
                    if (a_Pt < b_Pt) return -1;
                    return 0;
                });
            } else if ($('#border_sort').val() == "5") { //1pが高い順
                search_result.sort(function (a, b) {
                    let a_Pt = a.data.border[0];
                    let b_Pt = b.data.border[0];
                    if (a_Pt < b_Pt) return 1;
                    if (a_Pt > b_Pt) return -1;
                    return 0;
                });
            } else if ($('#border_sort').val() == "6") { //1pが低い順
                search_result.sort(function (a, b) {
                    let a_Pt = a.data.border[0];
                    let b_Pt = b.data.border[0];
                    if (a_Pt > b_Pt) return 1;
                    if (a_Pt < b_Pt) return -1;
                    return 0;
                });
            } else if ($('#border_sort').val() == "7") { //p所要時間が長い順
                search_result.sort(function (a, b) {
                    let a_Pt = isNaN(a.data.maxSpeed) ? 0 : a.data.border[2] / a.data.maxSpeed;
                    let b_Pt = isNaN(b.data.maxSpeed) ? 0 : b.data.border[2] / b.data.maxSpeed;
                    if (a_Pt < b_Pt) return 1;
                    if (a_Pt > b_Pt) return -1;
                    return 0;
                });
            } else if ($('#border_sort').val() == "8") { //bd所要時間が長い順
                search_result.sort(function (a, b) {
                    let a_Pt = isNaN(a.data.maxSpeed) ? 0 : a.data.border[1] / a.data.maxSpeed;
                    let b_Pt = isNaN(b.data.maxSpeed) ? 0 : b.data.border[1] / b.data.maxSpeed;
                    if (a_Pt < b_Pt) return 1;
                    if (a_Pt > b_Pt) return -1;
                    return 0;
                });
            } else if ($('#border_sort').val() == "9") { //1p所要時間が長い順
                search_result.sort(function (a, b) {
                    let a_Pt = isNaN(a.data.maxSpeed) ? 0 : a.data.border[0] / a.data.maxSpeed;
                    let b_Pt = isNaN(b.data.maxSpeed) ? 0 : b.data.border[0] / b.data.maxSpeed;
                    if (a_Pt < b_Pt) return 1;
                    if (a_Pt > b_Pt) return -1;
                    return 0;
                });
            };

        };


        //console.log(search_result);
        output(search_result);
    };

    function output(array) {

        var contentBlock = document.getElementById('data_table');
        contentBlock.innerHTML = ``;

        for (const i in array) {
            let data = '';
            data = `<tr class="align-middle">`;
            data += `<td scope="col" class="fw-bold">${$('#border_sort').val()?+i+1:array[i].eventId}</td>`;
            data += `<td scope="col"><a href="cup-data.html?id=${array[i].eventId}"><img class="quiz-img" src="../img/logoImg/${array[i].data.eventImg}.png" style="height:2.5em;" loading="lazy"></a></td>`;

            data += `<td scope="col" class="fw-bold ${$('#border_sort').val() == 1 || $('#border_sort').val() == 2|| $('#border_sort').val() == 7?'bg-wiz-blue':''}">${$('#border_sort').val() >= 7?`${array[i].data.maxSpeed?(array[i].data.border[2]/array[i].data.maxSpeed).toFixed(2) : 0.00.toFixed(2)} 時間`:`${(array[i].data.border[2]).toLocaleString()}`}</td>`;
            data += `<td scope="col" class="fw-bold ${$('#border_sort').val() == 3 || $('#border_sort').val() == 4|| $('#border_sort').val() == 8?'bg-wiz-blue':''}">${$('#border_sort').val() >= 7?`${array[i].data.maxSpeed?(array[i].data.border[1]/array[i].data.maxSpeed).toFixed(2): 0.00.toFixed(2)} 時間`:`${(array[i].data.border[1]).toLocaleString() }`}</td>`;
            data += `<td scope="col" class="fw-bold ${$('#border_sort').val() == 5 || $('#border_sort').val() == 6|| $('#border_sort').val() == 9?'bg-wiz-blue':''}">${$('#border_sort').val() >= 7?`${array[i].data.maxSpeed?(array[i].data.border[0]/array[i].data.maxSpeed).toFixed(2): 0.00.toFixed(2)} 時間`:`${(array[i].data.border[0]).toLocaleString() }`}</td>`;

            data += `</tr>`;
            var contentBlock = document.getElementById('data_table');
            contentBlock.insertAdjacentHTML('beforeend', data);
        };
    };

});
