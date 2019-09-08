import { AppLocalStorage, StorageKeys } from "./localStorage";
import { getDB, setDB } from "./fireStore";
import { Imode } from "../../types";

export interface IScore {
    time: number;
    date?: Date;
}

export interface rankingData {
    name: string;
    total: IScore;
    weekly?: IScore;
}

// export const setRankingList = (rankingList: IScore[]) => {
//     AppLocalStorage.setItem("rankingList", JSON.stringify(rankingList));
// }

// export const getRankingList = () => {
//     const data = AppLocalStorage.getItem("rankingList");
//     return JSON.parse(data);
// }

// export const isUserExist = (userName: string) => {
//     const scoreRankingList = getRankingList();
//     for (let i = 0; i < scoreRankingList.length; i++) {
//         if (userName === scoreRankingList[i].name) {
//             return scoreRankingList[i].time;
//         }
//     }
//     return 0;
// };

// export const rankingOfAll = (time: number) => {
//     const scoreRankingList = getRankingList();
//     for (let i = 0; i < scoreRankingList.length; i++) {
//         if (time < scoreRankingList[i].time) {
//             return i + 1;
//         }
//     }
//     return scoreRankingList.length + 1;
// }

// export const loadScoreRanking = async () => {
//     console.log("call getScoreRanking");
//     let scoreRanking: any[] = [];

//     await getDB("score_board_3")
//         .then(snapshot => {
//             if (snapshot === []) {
//                 console.log("No matching documents. XD");
//                 return [];
//             }

//             Object.keys(snapshot).forEach((key) => {
//                 scoreRanking.push(snapshot[key]);
//             })
//         })
//         .catch(err => {
//             console.log("Error getting Ranking", err);
//         });

//     scoreRanking.sort((a, b) => {
//         return (a.time > b.time) ? 1 : -1;
//     })
//     setRankingList(scoreRanking);

//     return scoreRanking;
// }

// export const setScoreRanking = (score: IScore) => {
//     console.log("call setScoreRanking");

//     const preTime = isUserExist(score.name);
//     if (!preTime) {
//         setDB("score_board_3", score.name, score);
//     } else {
//         if (preTime >= score.time) {
//             setDB("score_board_3", score.name, score);
//         } else {
//             console.log("前回のスコアの方が良いため、更新しませんでした。");
//         }
//     }
// };

class rankingList {
    mode: Imode;
    key: StorageKeys;


    constructor(mode: Imode) {
        this.mode = mode;
        this.key = (mode === "normal") ? "rankingListNormal" : "rankingListHard";
    }

    public setRankingList = (rankingList: rankingData[]) => {
        AppLocalStorage.setItem(this.key, JSON.stringify(rankingList));
    }

    public getRankingList = (): rankingData[] => {
        const data = AppLocalStorage.getItem(this.key);
        return JSON.parse(data);
    }

    public isUserExist = (userName: string): number => {
        const scoreRankingList = this.getRankingList();
        for (let i = 0; i < scoreRankingList.length; i++) {
            if (userName === scoreRankingList[i].name) {
                return scoreRankingList[i].total.time;
            }
        }
        return 0;
    };

    public rankingOfAll = (time: number) => {
        const scoreRankingList = this.getRankingList();
        for (let i = 0; i < scoreRankingList.length; i++) {
            if (time < scoreRankingList[i].total.time) {
                return i + 1;
            }
        }
        return scoreRankingList.length + 1;
    }

    public loadScoreRanking = async () => {
        console.log("call getScoreRanking");
        let scoreRanking: any[] = [];

        await getDB(this.mode)
            .then(snapshot => {
                if (snapshot === []) {
                    console.log("No matching documents. XD");
                    return [];
                }

                Object.keys(snapshot).forEach((key) => {
                    scoreRanking.push(snapshot[key]);
                })
            })
            .catch(err => {
                console.log("Error getting Ranking", err);
            });
        console.log(scoreRanking);
        scoreRanking.sort((a, b) => {
            return (a.total.time > b.total.time) ? 1 : -1;
        })
        this.setRankingList(scoreRanking);

        return scoreRanking;
    }

    public setScoreRanking = (name: string, score: IScore) => {
        console.log("call setScoreRanking");
        const data: rankingData = {
            name: name,
            total: score
        }

        const preTime = this.isUserExist(data.name);
        if (!preTime) {
            setDB(this.mode, data.name, data);
        } else {
            if (preTime >= score.time) {
                setDB(this.mode, data.name, data);
            } else {
                console.log("前回のスコアの方が良いため、更新しませんでした。");
            }
        }
    };

}

console.log("rankingList.ts");

export const rankingListNormal = new rankingList("normal");
export const rankingListHard = new rankingList("hard");