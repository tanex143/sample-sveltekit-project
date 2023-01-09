// @ts-ignore
import supabase from "$db/database/supabase";

export const actions = {
    register: async ({ request }) => {
        const formData = await request.formData();
        const email = formData.get("email");
        const password = formData.get("password");
        const cpassword = formData.get("cpassword");

        if (password !== cpassword) {
            return {
                status: "error",
                message: "Password does not match.",
                email,
                password,
                cpassword,
            };
        }
        if (password.length < 6 || cpassword.length < 6) {
            return {
                status: "error",
                message: "Password must be at least 6 characters.",
                email,
                password,
                cpassword,
            };
        }

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
                        path: "/",
                    };
                }
            }
        } else {
            return { status: "error", message: error };
        }
    },
};
