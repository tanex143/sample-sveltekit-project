import supabase from "../supabase";

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
                return { status: "error", message: userError };
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
