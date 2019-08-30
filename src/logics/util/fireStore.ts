import { fireStore } from "./firebase";

interface IScore {
    name: string;
    time: number;
    date?: Date;
}

export const getScoreRanking = async () => {
    console.log("call getScoreRanking");
    let scoreRanking: any[] = [];

    await fireStore.collection('score_board_3').orderBy("time").get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log("No matching documents. XD");
                return [];
            }

            snapshot.forEach((doc) => {
                scoreRanking.push(doc.data());
            });
        })
        .catch(err => {
            console.log("Error getting Ranking", err);
        });

    return scoreRanking;
}

// export const isUserExist = async (userName: string) => {
//     console.log("call isUseExist");

//     if (userName === "") {
//         return 0;
//     }
//     let score = 0;
//     await scoreRankingBoard.doc(userName).get()
//         .then(doc => {
//             if (doc.exists) {
//                 score = doc.data()!.time;
//             } else {
//                 return 0;
//             }
//         }).catch(err => {
//             console.log('Error getting documents', err);
//         });

//     return score;
// }
export const isUserExist = (userName: string, scoreRankingList: IScore[]) => {
    for (let i = 0; i < scoreRankingList.length; i++) {
        if (userName === scoreRankingList[i].name) {
            return scoreRankingList[i].time;
        }
    }
    return 0;
};


// export const setScoreRanking = (score: IScore): void => {
//     console.log("call setScoreRanking");

//     isUserExist(score.name).then((preTime) => {
//         if (!preTime) {
//             scoreRankingBoard.doc(score.name).set(score);
//         } else {
//             if (preTime >= score.time) {
//                 scoreRankingBoard.doc(score.name).set(score);
//             } else {
//                 console.log("前回のスコアの方が良いため、更新しませんでした。");
//             }
//         }
//     })
// }
export const setScoreRanking = (score: IScore, scoreRankingList:IScore[]) => {
    const preTime = isUserExist(score.name, scoreRankingList);
    if (!preTime) {
        fireStore.collection('score_board_3').doc(score.name).set(score);
    } else {
        if (preTime >= score.time) {
            fireStore.collection('score_board_3').doc(score.name).set(score);
        } else {
            console.log("前回のスコアの方が良いため、更新しませんでした。");
        }
    }
};

// export const RankingOfAll = async (time: number) => {
//     console.log("call RankingOfAll");
//     let ranking = 0;
//     await getScoreRanking().then((scoreRanking) => {
//         for (let i = 0; i < scoreRanking.length; i++) {
//             ranking = i + 1;
//             if (scoreRanking[i].time > time) {
//                 break;
//             }
//             ranking++;
//         }
//     })

//     return ranking;
// }
export const rankingOfAll = (time: number, scoreRankingList: IScore[]) => {
    for (let i = 0; i < scoreRankingList.length; i++) {
        if (time < scoreRankingList[i].time) {
            return i + 1;
        }
    }
    return scoreRankingList.length + 1;
}