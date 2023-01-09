import supabase from "../database/supabase.js";
import userDataStore from "../../stores/userData.js";

export const updateProfile = async (profile, firstName, lastName, userId) => {
    const randomId = Math.floor(Math.random() * 1000000000);

    if (typeof profile !== "string") {
        const { data: uploadImgErrorData, error: uploadImgError } =
            await supabase.storage
                .from("profiles")
                .upload(
                    `private/${profile.name || randomId}__${randomId}`,
                    profile
                );

        if (uploadImgError) {
            return { status: "error", message: uploadImgError.message };
        }

        const { data: downloadImgData } = await supabase.storage
            .from("profiles")
            .getPublicUrl(uploadImgErrorData.path);

        const payload = {
            firstName,
            lastName,
            profile: downloadImgData.publicUrl,
        };

        const { data, error } = await supabase
            .from("usersData")
            .update(payload)
            .eq("id", userId)
            .select();

        if (error) {
            return { status: "error", message: error.message };
        }
        if (data) {
            userDataStore.set(data[0]);
            return { status: "success", message: "Profile updated" };
        }
    } else {
        const { data, error } = await supabase
            .from("usersData")
            .update({ firstName, lastName })
            .eq("id", userId)
            .select();

        if (error) {
            return { status: "error", message: error.message };
        }
        if (data) {
            userDataStore.set(data[0]);
            return { status: "success", message: "Profile updated" };
        }
    }
};
