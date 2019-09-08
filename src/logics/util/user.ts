import { AppLocalStorage } from "./localStorage";

export const setUserName = (username: string) => {
    AppLocalStorage.setItem("user", username);
}

export const getUserName = () => {
    return AppLocalStorage.getItem("user");
}