function overall_data_arrange(data) {

    //開発用
    //data = _.take(data, 5)

    //eventIdを追加する
    data = _.each(data, element => {
        return _.map(element.data, value => {
            value.eventId = element.eventId
        });
    });
    //console.log(data);


    //配列をフラットにする
    data = _(data).map(element => {
        return element.data;
    }).flattenDepth(2).value();
    //console.log(data);


    //aliasを追加する
    data = _.each(data, element => {
        return !_.has(element, 'alias') ? element.alias = element.userName : '';
    });
    //console.log(data);


    //imgキーを追加する
    data = _.each(data, element => {
        return !_.has(element, 'img') ? element.img = '' : '';
    });
    //console.log(data);


    //魔道杯情報を追加する
    data = _.each(data, element => {
        cd = _(cup_data).filter(x => {
            return x.eventId === element.eventId;
        }).flatten().value();
        element.eventName = cd[0].data.eventName; //魔道杯名
        element.eventImg = cd[0].data.eventImg; //魔道杯ロゴ
        element.eventYear = cd[0].data.eventYear; //開催年
        element.cupLength = _.sum(cd[0].data.dayLength); //魔道杯開催時間
        //element.getPoint = cd[0].data.getPoint; //当該魔道杯の最高獲得Pt
        //element.maxSpeed = cd[0].data.maxSpeed; //当該魔道杯の最高時速
    });
    //console.log(data);


    //グランドスラム判定
    data = _.each(data, element => {
        if (element.rank === 1 && element.eventId >= 24) {
            const dd = _.filter(daily_data, x => {
                return x.eventId === element.eventId;
            });
            //console.log(dd);

            const dailyTop = [];
            //1日目
            dd[0].data[0].alias ? dailyTop.push(dd[0].data[0].alias) : dailyTop.push(dd[0].data[0].userName);
            //2日目
            dd[0].data[10].alias ? dailyTop.push(dd[0].data[10].alias) : dailyTop.push(dd[0].data[10].userName);
            //3日目
            dd[0].data[20].alias ? dailyTop.push(dd[0].data[20].alias) : dailyTop.push(dd[0].data[20].userName);
            //4日目
            dd[0].data[30].alias ? dailyTop.push(dd[0].data[30].alias) : dailyTop.push(dd[0].data[30].userName);
            //console.log(dailyTop);

            if (_.filter(dailyTop, x => x === element.alias).length === 4) {
                element.isGrandslam = true;
            } else {
                element.isGrandslam = false;
            }
        } else {
            element.isGrandslam = false;
        };
    });
    //console.log(data);


    //平均時速を算出する
    data = _.each(data, element => {
        return element.avgSpeed = _.round(element.point / element.cupLength, 2);
    });
    //console.log(data);

    //上下ポイント差
    data = _.each(data, element => {
        const marginPoint = {
            higher: element.rank > 1 ? overall_data[overall_data[0].eventId - element.eventId].data[element.rank - 2].point - element.point : 0,
            lower: element.rank < 50 ? element.point - overall_data[overall_data[0].eventId - element.eventId].data[element.rank].point : 0,
        };
        marginPoint.higher < 0 || marginPoint.higher === element.point ? marginPoint.higher = 0 : '';
        marginPoint.lower < 0 || marginPoint.lower === element.point ? marginPoint.lower = 0 : '';
        element.marginPoint = marginPoint;
        //console.log(element.alias, element.marginPoint);
    });

    //記録等を追加する
    //過去の魔道杯を参照する　Compare
    const compare = _.cloneDeep(data);
    data = _.each(data, element => {
        if (element.alias !== '') {
            const pastResult = [];
            _(compare).filter(x => {
                return x.alias === element.alias && x.eventId <= element.eventId
            }).each(x => {
                pastResult.push({
                    eventId: x.eventId,
                    rank: x.rank,
                    point: x.point,
                    avgSpeed: x.avgSpeed,
                    marginPoint: x.marginPoint,
                    eventImg: x.eventImg,
                    eventName: x.eventName,
                    eventYear: x.eventYear,
                    img: x.img,
                });
            });

            //アイコン画像
            let iconImg = _.find(pastResult, x => {
                return x.img !== '';
            });
            iconImg === undefined ? iconImg = {
                img: 'card_05302'
            } : '';
            //console.log(img);
            element.img = iconImg.img;


            //最高順位
            const bestRank = _(pastResult).map(x => {
                return x.rank;
            }).value();
            //console.log(bestRank);
            element.bestRank = _.min(bestRank);

            //最高順位回数
            const bestRankCount = _(pastResult).filter(x => {
                return x.rank === element.bestRank;
            }).value().length;
            //console.log(bestRankCount);
            element.bestRankCount = bestRankCount;

            //前回までの最高順位
            const bestRankPrev = _(pastResult).map(x => {
                return x.rank;
            }).drop(1).value();
            //console.log(bestRank_prev);
            element.bestRankPrev = _.min(bestRankPrev);


            //平均順位
            const avgRank = _(pastResult).map(x => {
                return x.rank;
            }).value();
            //console.log(_.round(avgRank, 2));
            element.avgRank = _.round(_.mean(avgRank), 2);

            //前回までの平均順位
            const avgRankPrev = _(pastResult).map(x => {
                return x.rank;
            }).drop(1).value();
            //console.log(avgRank_prev);
            element.avgRankPrev = _.round(_.mean(avgRankPrev), 2);


            //ボード回数
            const BoardCount = {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                total: 0
            };
            _.each(pastResult, x => {
                if (x.rank <= 10) {
                    BoardCount['1'] += 1;
                } else if (x.rank <= 20) {
                    BoardCount['2'] += 1;
                } else if (x.rank <= 30) {
                    BoardCount['3'] += 1;
                } else if (x.rank <= 40) {
                    BoardCount['4'] += 1;
                } else if (x.rank <= 50) {
                    BoardCount['5'] += 1;
                };
                BoardCount['total'] += 1;
            });
            //console.log(_.round(BoardCount.total, 2));
            element.BoardCount = BoardCount;

            //ボード1P回数
            element.BoardCount1P = element.BoardCount['1']
            //console.log(BoardCount1P);


            //継続中のボード連続回数
            let ContBoardCount = 0;
            for (const i in pastResult) {
                if (pastResult[i].eventId === element.eventId - i) {
                    ContBoardCount++;
                } else {
                    break;
                };
            };
            //console.log(ContBoardCount);
            element.ContBoardCount = ContBoardCount;

            //最大連続回数
            let bestContBoardCount = {
                count: element.ContBoardCount
            };
            var save = 0;
            var save_eventId = element.eventId;
            var end = element.eventId;
            for (const i in pastResult) {
                //console.log(element.userName, pastResult[i].eventId, save_eventId)
                if (pastResult[i].eventId === save_eventId) {
                    save++;
                    save_eventId--;
                    start = pastResult[i].eventId;
                    //console.log(element.userName, pastResult[i].eventId, '連続維持', save)
                } else {
                    if (bestContBoardCount.count <= save) {
                        bestContBoardCount = {
                            start: start,
                            end: end,
                            count: save,
                        };
                    };
                    save = 1;
                    save_eventId = pastResult[i].eventId - 1;
                    end = pastResult[i].eventId;
                    //console.log(element.userName, pastResult[i].eventId, '連続途絶え', save)
                };
                if (bestContBoardCount.count <= save) {
                    bestContBoardCount = {
                        start: start,
                        end: end,
                        count: save,
                    };
                };
            };
            element.bestContBoardCount = bestContBoardCount;
            //console.log(element.userName, element.bestContBoardCount;;


            //継続中のボード1P連続回数
            let ContBoardCount1P = 0;
            for (const i in pastResult) {
                if (pastResult[i].eventId === element.eventId - i && pastResult[i].rank <= 10) {
                    ContBoardCount1P++;
                } else {
                    break;
                };
            };
            //console.log(ContBoardCount1P);
            element.ContBoardCount1P = ContBoardCount1P;


            //最大1P連続回数
            let bestContBoardCount1P = {
                count: element.ContBoardCount1P
            };
            var save = 0;
            var save_eventId = element.eventId;
            var end = element.eventId;
            if (element.BoardCount1P > 0) {
                for (const i in pastResult) {
                    //console.log(element.userName, pastResult[i].eventId, save_eventId)
                    if (pastResult[i].eventId === save_eventId && pastResult[i].rank <= 10) {
                        save++;
                        save_eventId--;
                        start = pastResult[i].eventId;
                        //console.log(element.userName, pastResult[i].eventId, '連続維持', save)
                    } else {
                        if (bestContBoardCount1P.count <= save) {
                            bestContBoardCount1P = {
                                start: start,
                                end: end,
                                count: save,
                            };
                        };
                        save = 0;
                        save_eventId = pastResult[i].eventId - 1;
                        end = pastResult[i].eventId - 1;
                        //console.log(element.userName, pastResult[i].eventId, '連続途絶え', save)
                    };
                };
                if (bestContBoardCount1P.count <= save) {
                    bestContBoardCount1P = {
                        start: start,
                        end: end,
                        count: save,
                    };
                };
            };
            element.bestContBoardCount1P = bestContBoardCount1P;
            //console.log(element.userName, element.bestContBoardCount1P);

            //連覇数
            let ContBoardCountChamp = 0;
            for (const i in pastResult) {
                if (pastResult[i].eventId === element.eventId - i && pastResult[i].rank === 1) {
                    ContBoardCountChamp++;
                } else {
                    break;
                };
            };
            //console.log(ContBoardCountChamp);
            element.ContBoardCountChamp = ContBoardCountChamp;

            //累計総合ポイント
            const sumPoint = _(pastResult).map(x => {
                return x.point;
            }).value();
            //console.log(sumPoint);
            element.sumPoint = _.sum(sumPoint);

            //平均総合ポイント
            const avgPoint = Math.round(element.sumPoint / element.BoardCount['total'] * 100) / 100
            element.avgPoint = avgPoint;
            //console.log(element.alias,element.avgPoint);

            //初ボード
            const firstBoard = _.cloneDeep(_.findLast(pastResult, x => x.eventName));
            delete firstBoard.img;
            delete firstBoard.point;
            delete firstBoard.rank;
            //console.log(firstBoard);
            element.firstBoard = firstBoard;

            //初ボード1P
            const firstBoard1P = _.cloneDeep(_.findLast(pastResult, x => x.eventName && x.rank <= 10));
            if (firstBoard1P) {
                delete firstBoard1P.img;
                delete firstBoard1P.point;
                delete firstBoard1P.rank;
            };
            //console.log(firstBoard1P);
            element.firstBoard1P = firstBoard1P;


            //総合ボード順位ビンゴ
            const rankFilled = _(pastResult).map(x => {
                return x.rank;
            })
                .sortBy()
                .uniq()
                .value()
            //console.log(rankFilled);
            element.rankFilled = rankFilled;

        };
    });

    return data;

};

function overall_data_arrange_ready() {
    overallDataArray = _.cloneDeep(overall_data);
    overallDataArray = overall_data_arrange(overallDataArray);
    //console.log('総合データ', overallDataArray);

    //ユーザー毎 ユーザー名不明を排除
    overallDataArrayUser = _(overallDataArray)
        .uniqBy('alias')
        .reject(x => x.alias === '')
        .value();

    /*rankFilled（総合ボードで取ったことのある順位）が数が多い順
    overallDataArrayUser = _.orderBy(overallDataArrayUser, x => {
        return x.rankFilled.length;
    }, 'desc');*/

    //console.log('総合:ユーザー最新', overallDataArrayUser);
};


function daily_data_arrange(data) {

    //eventIdを追加する
    data = _.each(data, element => {
        return _.map(element.data, value => {
            value.eventId = element.eventId
        });
    });
    //console.log(data);


    //配列をフラットにする
    data = _(data).map(element => {
        return element.data;
    }).flattenDepth(2).value();
    //console.log(data);


    //並べ替え（新しい順　イベント=>日程）
    data = _.orderBy(data, ['eventId', 'day', 'rank'], ['desc', 'desc', 'asc']);
    //console.log(data);


    //aliasを追加する
    data = _.each(data, element => {
        return !_.has(element, 'alias') ? element.alias = element.userName : '';
    });
    //console.log(data);


    //imgキーを追加する
    data = _.each(data, element => {
        return !_.has(element, 'img') ? element.img = '' : '';
    });
    //console.log(data);


    //魔道杯情報を追加する
    data = _.each(data, element => {
        cd = _(cup_data).filter(x => {
            return x.eventId === element.eventId;
        }).flatten().value();
        element.eventName = cd[0].data.eventName; //魔道杯名
        element.eventImg = cd[0].data.eventImg; //魔道杯ロゴ
        element.eventYear = cd[0].data.eventYear; //開催年
        element.day_length = cd[0].data.dayLength[element.day - 1]; //魔道杯開催時間
        //element.getPoint = cd[0].data.getPoint; //当該魔道杯の最高獲得Pt
        //element.maxSpeed = cd[0].data.maxSpeed; //当該魔道杯の最高時速
    });
    //console.log(data);


    //グランドスラム判定
    data = _.each(data, element => {
        if (element.rank === 1 && element.eventId >= 24) {
            const dd = _.filter(daily_data, x => {
                return x.eventId === element.eventId;
            });
            //console.log(dd);

            const dailyTop = [];
            //1日目
            dd[0].data[0].alias ? dailyTop.push(dd[0].data[0].alias) : dailyTop.push(dd[0].data[0].userName);
            //2日目
            dd[0].data[10].alias ? dailyTop.push(dd[0].data[10].alias) : dailyTop.push(dd[0].data[10].userName);
            //3日目
            dd[0].data[20].alias ? dailyTop.push(dd[0].data[20].alias) : dailyTop.push(dd[0].data[20].userName);
            //4日目
            dd[0].data[30].alias ? dailyTop.push(dd[0].data[30].alias) : dailyTop.push(dd[0].data[30].userName);
            //console.log(dailyTop);

            if (_.filter(dailyTop, x => x === element.alias).length === 4) {
                element.isGrandslam = true;
            } else {
                element.isGrandslam = false;
            }
        } else {
            element.isGrandslam = false;
        };
    });
    //console.log(data);


    //平均時速を算出する
    data = _.each(data, element => {
        return element.avgSpeed = _.round(element.point / element.day_length, 2);
    });
    //console.log(data);

    data = _.each(data, element => {
        //上下ポイント差
        const marginPoint = {
            higher: element.rank > 1 ? daily_data[daily_data[0].eventId - element.eventId].data[(element.rank - 2) + ((element.day - 1) * 10)].point - element.point : 0,
            lower: element.rank < 10 ? element.point - daily_data[daily_data[0].eventId - element.eventId].data[(element.rank) + ((element.day - 1) * 10)].point : 0,
        };
        marginPoint.higher < 0 || marginPoint.higher === element.point ? marginPoint.higher = 0 : '';
        marginPoint.lower < 0 || marginPoint.lower === element.point ? marginPoint.lower = 0 : '';
        element.marginPoint = marginPoint;
        //console.log(element.alias, element.marginPoint);
    });

    //記録等を追加する
    //過去の魔道杯を参照する　Compare
    const compare = _.cloneDeep(data);
    data = _.each(data, element => {
        if (element.alias !== '') {
            const pastResult = [];
            _(compare).filter(x => {
                return x.alias === element.alias && (x.eventId < element.eventId ||
                    (x.eventId === element.eventId && x.day <= element.day))
            }).each(x => {
                pastResult.push({
                    eventId: x.eventId,
                    day: x.day,
                    rank: x.rank,
                    point: x.point,
                    avgSpeed: x.avgSpeed,
                    marginPoint: x.marginPoint,
                    eventImg: x.eventImg,
                    eventName: x.eventName,
                    eventYear: x.eventYear,
                    img: x.img,
                });
            });

            //アイコン画像
            let iconImg = _.find(pastResult, x => {
                return x.img !== '';
            });
            iconImg === undefined ? iconImg = {
                img: 'card_05302'
            } : '';
            //console.log(img);
            element.img = iconImg.img;


            //最高順位
            const bestRank = _(pastResult).map(x => {
                return x.rank;
            }).value();
            //console.log(bestRank);
            element.bestRank = _.min(bestRank);

            //最高順位回数
            const bestRankCount = _(pastResult).filter(x => {
                return x.rank === element.bestRank;
            }).value().length;
            //console.log(bestRankCount);
            element.bestRankCount = bestRankCount;

            //前回までの平均順位
            const bestRankPrev = _(pastResult).map(x => {
                return x.rank;
            }).drop(1).value();
            //console.log(bestRank_prev);
            element.bestRankPrev = _.min(bestRankPrev);


            //平均順位
            const avgRank = _(pastResult).map(x => {
                return x.rank;
            }).value();
            //console.log(_.round(avgRank, 2));
            element.avgRank = _.round(_.mean(avgRank), 2);

            //前回までの平均順位
            const avgRankPrev = _(pastResult).map(x => {
                return x.rank;
            }).drop(1).value();
            //console.log(avgRank_prev);
            element.avgRankPrev = _.round(_.mean(avgRankPrev), 2);


            //ボード回数
            const BoardCount = pastResult.length
            //console.log(_.round(BoardCount, 2));
            element.BoardCount = BoardCount;

            //ボード1位回数
            const BoardCountTop = _.filter(pastResult, x => {
                return x.rank === 1;
            }).length;
            //console.log(BoardCountTop);
            element.BoardCountTop = BoardCountTop;

            //初
            const firstBoard = _.cloneDeep(_.findLast(pastResult, x => x.eventName));
            delete firstBoard.img;
            delete firstBoard.point;
            delete firstBoard.rank;
            //console.log(firstBoard);
            element.firstBoard = firstBoard;

            //初1位
            const firstBoardTop = _.cloneDeep(_.findLast(pastResult, x => x.eventName && x.rank === 1));
            if (firstBoardTop) {
                delete firstBoardTop.img;
                delete firstBoardTop.point;
                delete firstBoardTop.rank;
            };
            //console.log(firstBoardTop);
            element.firstBoardTop = firstBoardTop;

            //全体順位ビンゴ
            const rankFilled = [
                [],
                [],
                [],
                []
            ];
            _(pastResult).each(x => {
                rankFilled[x.day - 1].push(x.rank)
            });
            for (let i = 0; i < 4; i++) {
                rankFilled[i] = _(rankFilled[i])
                    .sortBy()
                    .uniq()
                    .value();
            };
            //console.log(rankFilled);
            element.rankFilled = rankFilled;
            element.rankFilledAll = rankFilled[0].length + rankFilled[1].length + rankFilled[2].length + rankFilled[3].length;

        };
    });

    return data;

};

function daily_data_arrange_ready() {
    dailyDataArray = _.cloneDeep(daily_data);
    dailyDataArray = daily_data_arrange(dailyDataArray);
    //console.log('デイリーデータ', dailyDataArray);

    //ユーザー毎 ユーザー名不明を排除
    dailyDataArrayUser = _(dailyDataArray)
        .uniqBy('alias')
        .reject(x => x.alias === '')
        .value();
    //console.log('デイリー:ユーザー最新', dailyDataArrayUser);
};
