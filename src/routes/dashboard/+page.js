// @ts-nocheck
import supabase from "$db/database/supabase";
import userDataStore from "$stores/userData";
import { groupsStore } from "$stores/groups";

export const load = async () => {
    userDataStore.subscribe(async (userData) => {
        if (userData) {
            console.log("subscribing to groups channel1");
            const { data } = await supabase
                .from("groups")
                .select()
                .eq("email", userData.email);

            groupsStore.set(data);
        }

        console.log("subscribing to groups channel");

        await supabase
            .channel("public:groups")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "*", table: "groups" },
                (payload) => {
                    if (payload.new.email === userData.email) {
                        groupsStore.update((curr) => [...curr, payload.new]);
                    }
                }
            )
            .on(
                "postgres_changes",
                { event: "DELETE", schema: "*", table: "groups" },
                (payload) => {
                    groupsStore.update((curr) => {
                        return (
                            curr &&
                            curr.filter((group) => group.id !== payload.old.id)
                        );
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
    });
};
