// @ts-nocheck
import supabase from "$db/database/supabase";
import membersStore from "../../stores/members";

export const getMembers = async (groupId) => {
    const { data } = await supabase
        .from("groupMemberss")
        .select()
        .eq("groupId", groupId);

    membersStore.set(data);
};

export const deleteMember = async (id) => {
    const { error } = await supabase
        .from("groupMemberss")
        .delete()
        .eq("id", id);

    if (error) {
        return { status: "error", message: error.message };
    }
};

export const memberCRUDListener = async (groupId) => {
    await supabase
        .channel("public:groupMemberss")
        .on(
            "postgres_changes",
            { event: "INSERT", schema: "*", table: "groupMemberss" },
            (payload) => {
                if (payload.new.groupId === groupId) {
                    membersStore.update((curr) => [...curr, payload.new]);
                }
            }
        )
        .on(
            "postgres_changes",
            { event: "DELETE", schema: "*", table: "groupMemberss" },
            (payload) => {
                membersStore.update((curr) => {
                    return curr.filter((group) => group.id !== payload.old.id);
                });
            }
        )
        .subscribe();
};
