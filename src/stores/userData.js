import { writable } from "svelte/store";

const userDataStore = writable({
    isLoggedIn: false,
    id: null,
    email: null,
    firstName: "",
    lastName: "",
    profile: "",
    gender: null,
});

export default userDataStore;
