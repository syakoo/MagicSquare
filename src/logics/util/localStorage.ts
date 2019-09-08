export type StorageKeys = "user" | "rankingListNormal" | "rankingListHard";

class AppLocalStorageClass {
    public setItem(key: StorageKeys, data: string) {
        const cache = data;
        localStorage.setItem(key, cache);
    }

    public getItem(key: StorageKeys) {
        const data = localStorage.getItem(key);
        if (data === null) return "null";
        return data;
    }

    public removeItem(key: StorageKeys) {
        localStorage.removeItem(key);
    }
}

export const AppLocalStorage = new AppLocalStorageClass();