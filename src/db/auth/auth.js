// @ts-nocheck
import supabase from "$db/database/supabase";
import userDataStore from "../../stores/userData";

export const signInUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (!error) {
        const { data: userRef } = await supabase
            .from("usersData")
            .select("*")
            .eq("id", data?.user?.id);
        //@ts-ignore
        userDataStore.set({ ...userRef[0], isLoggedIn: true });
        return { status: "success", message: "User logged in" };
    } else {
        return { status: "error", message: error.message };
    }
};

export const signOutUser = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    return "success";
};
