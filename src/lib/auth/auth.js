import supabase from "../supabase";
import userDataStore from "./../../stores/userData";

export const signUpUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (!error) {
        if (data) {
            const { error: userError } = await supabase
                .from("usersData")
                .insert({
                    created_at: data?.user?.created_at,
                    email: data?.user?.email,
                    id: data?.user?.id,
                    last_sign_in_at: data?.user?.last_sign_in_at,
                    updated_at: data?.user?.updated_at,
                });
            if (userError) {
                return { status: "error", message: userError.message };
            } else {
                return {
                    status: "success",
                    message: "User created",
                    path: "/login",
                };
            }
        }
    } else {
        return { status: "error", message: error };
    }
};

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
