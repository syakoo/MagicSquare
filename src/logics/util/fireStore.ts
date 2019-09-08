import { fireStore } from "./firebase";

type DBKeys = "score_board_3" | "normal" | "hard" | "analysis";

export const setDB = (key: DBKeys, doc: string, data: any) => {
    console.log("set DB");
    fireStore.collection(key).doc(doc).set(data);
}

export const getDB = async (key: DBKeys) => {
    console.log("get DB");
    let items: {[key: string]: any} = {};

    await fireStore.collection(key).get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log("No matching documents. XD");
                return {};
            }

            snapshot.forEach((doc) => {
                items[doc.id] = doc.data();
            });
        }).catch(err => {
            console.log("Error getting Ranking", err);
        });

    return items;
}