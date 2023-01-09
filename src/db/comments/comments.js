// @ts-nocheck
import { browser } from "$app/environment";
import { toast } from "@zerodevx/svelte-toast";
import { errorTheme } from "$lib/customToast";
import supabase from "$db/database/supabase";
import commentsStores from "../../stores/comments.js";
import { selectedGroupLoading } from "../../stores/loading.js";

export const getComments = async (selectedGroupStore) => {
    selectedGroupLoading.set(true);
    const { data, error } = await supabase
        .from("groupComments")
        .select("*")
        .eq("group_Id", selectedGroupStore.id);

    if (error) {
        toast.push(error.message, errorTheme);
        return;
    }
    if (data) {
        const proms = data.map(async (item) => {
            const { data: user } = await supabase
                .from("usersData")
                .select("id, email, firstName, lastName, profile")
                .eq("id", item.userId);

            return {
                ...item,
                user: user[0],
            };
        });
        const resp = await Promise.all(proms);
        commentsStores.set(resp);
    }
    selectedGroupLoading.set(false);
};

export const addComment = async (payload) => {
    const { error } = await supabase.from("groupComments").insert(payload);
    if (error) {
        return { status: "error", message: error.message };
    }
    return { status: "success", message: "Comment added" };
};

export const supabaseCRUDListener = async () => {
    await supabase
        .channel("public:groupComments")
        .on(
            "postgres_changes",
            { event: "INSERT", schema: "*", table: "groupComments" },
            async (payload) => {
                const { data: user } = await supabase
                    .from("usersData")
                    .select("id, email, firstName, lastName, profile")
                    .eq("id", payload.new.userId);

                commentsStores.update((curr) => [
                    ...curr,
                    { ...payload.new, user: user[0] },
                ]);

                // scroll to bottom
                if (browser) {
                    setTimeout(() => {
                        document.getElementById("commentsDisplay").scrollTo({
                            top: document.getElementById("commentsDisplay")
                                .scrollHeight,
                            behavior: "smooth",
                        });
                    }, 1000);
                }
            }
        )
        .on(
            "postgres_changes",
            { event: "DELETE", schema: "*", table: "groupComments" },
            (payload) => {
                commentsStores.update((curr) => {
                    return curr.filter((group) => group.id !== payload.old.id);
                });
            }
        )
        .on(
            "postgres_changes",
            { event: "UPDATE", schema: "*", table: "groupComments" },
            (payload) => {
                commentsStores.update((curr) => {
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
