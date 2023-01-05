import { writable } from "svelte/store";
import { browser } from "$app/environment";

const userInit = {
    isLoggedIn: false,
    id: null,
    email: "",
    firstName: "",
    lastName: "",
    profile: "",
    gender: "",
};

const getStoredUser =
    // @ts-ignore
    JSON.parse(browser && localStorage.getItem("userData")) || userInit;
const userDataStore = writable(browser && getStoredUser);

userDataStore.subscribe((value) => {
    if (browser) {
        localStorage.setItem("userData", JSON.stringify(value));
    }
});

export default userDataStore;
