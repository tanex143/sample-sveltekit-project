// @ts-nocheck
import supabase from "../supabase";
import { groupsStore, selectedGroupStore } from "../../stores/groups.js";

export const getGroups = async (userEmail) => {
    const { data } = await supabase
        .from("groups")
        .select()
        .eq("email", userEmail);
    // @ts-ignore
    groupsStore.set(data);
};

export const addGroup = async (payload, userId) => {
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
};

export const editGroup = async (editedName, toEditId) => {
    const { error } = await supabase
        .from("groups")
        .update({ title: editedName })
        .eq("id", toEditId);

    if (error) {
        return { status: "error", message: error.message };
    }
    return { status: "success", message: "Group updated" };
};

export const deleteGroup = async (groupId, selectedGroup) => {
    // delete the foreign keys first
    await supabase.from("groupComments").delete().eq("group_Id", groupId);
    await supabase.from("groupMemberss").delete().eq("groupId", groupId);
    if (selectedGroup && selectedGroup.id === groupId) {
        selectedGroupStore.set(null);
    }

    const { error } = await supabase.from("groups").delete().eq("id", groupId);

    if (error) {
        return { status: "error", message: error.message };
    }
    return { status: "success", message: "Group deleted" };
};

export const groupsCRUDListener = async (userEmail) => {
    await supabase
        .channel("public:groups")
        .on(
            "postgres_changes",
            { event: "INSERT", schema: "*", table: "groups" },
            (payload) => {
                if (payload.new.email === userEmail) {
                    groupsStore.update((curr) => [...curr, payload.new]);
                }
            }
        )
        .on(
            "postgres_changes",
            { event: "DELETE", schema: "*", table: "groups" },
            (payload) => {
                groupsStore.update((curr) => {
                    return curr.filter((group) => group.id !== payload.old.id);
                });
            }
        )
        .on(
            "postgres_changes",
            { event: "UPDATE", schema: "*", table: "groups" },
            (payload) => {
                groupsStore.update((curr) => {
                    return curr.map((group) => {
                        if (group.id === payload.new.id) {
                            return payload.new;
                        }
                        return group;
                    });
                });
            }
        )
        .subscribe();
};