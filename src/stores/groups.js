import { writable } from "svelte/store";

export const groupsStore = writable(null);
export const selectedGroupStore = writable(null);
export const selectedGroupLoading = writable(false);
