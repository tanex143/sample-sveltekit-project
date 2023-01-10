// @ts-nocheck
import supabase from "$db/database/supabase";
import { selectedGroupStore } from "$stores/groups";

export const actions = {
    addGroup: async ({ request }) => {
        const dataForm = await request.formData();
        const groupTitle = dataForm.get("groupTitle");
        const userEmail = dataForm.get("userEmail");
        const userId = dataForm.get("userId");

        const payload = {
            title: groupTitle,
            createdBy: userEmail,
            type: "owner",
            email: userEmail,
        };

        console.log(payload);
        const { data, error } = await supabase
            .from("groups")
            .insert(payload)
            .select();

        if (error) {
            return { status: "error", message: error.message };
        }

        await supabase.from("groupMembers").insert({
            groupId: data[0].id,
            userId: userId,
        });

        return { status: "success", message: "Group added" };
    },
    deleteGroup: async ({ request }) => {
        const dataForm = await request.formData();
        const groupId = dataForm.get("groupId");
        console.log("groupId", groupId);

        // delete the foreign keys first
        await supabase.from("groupComments").delete().eq("group_Id", groupId);
        await supabase.from("groupMemberss").delete().eq("groupId", groupId);

        const { error } = await supabase
            .from("groups")
            .delete()
            .eq("id", groupId);

        if (error) {
            return { status: "error", message: error.message };
        }
        return { status: "success", message: "Group deleted", groupId };
    },
};
