import supabase from "../lib/supabase";

export const actions = {
    login: async ({ request }) => {
        const formData = await request.formData();
        const email = formData.get("email");
        const password = formData.get("password");

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        console.log("data", data);
        console.log("error", error);

        if (!error) {
            const { data: userRef } = await supabase
                .from("usersData")
                .select("*")
                .eq("id", data?.user?.id);

            return {
                status: "success",
                message: "User logged in",
                // @ts-ignore
                datas: { ...userRef[0], isLoggedIn: true },
            };
        } else {
            return { status: "error", message: error.message };
        }
    },
};
