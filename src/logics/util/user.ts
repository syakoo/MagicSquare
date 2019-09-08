import { AppLocalStorage } from "./localStorage";

export const setUserName = (username: string) => {
    AppLocalStorage.setItem("user", username);
}

export const getUserName = () => {
    let userName = AppLocalStorage.getItem("user");
    if(userName==="null"){
        userName="Guest";
        setUserName(userName);
    }
    return userName;
}