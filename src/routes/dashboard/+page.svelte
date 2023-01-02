<script>
    import supabase from "$lib/supabase";
    import { toast } from "@zerodevx/svelte-toast";
    import { goto } from "$app/navigation";
    import { Spinner, Button } from "flowbite-svelte";
    import {
        selectedGroupStore,
        selectedGroupLoading,
    } from "../../stores/groups";
    import userDataStore from "../../stores/userData";
    import ProfileComment from "../../components/ProfileComment.svelte";
    import GroupList from "../../components/dashboard/GroupList.svelte";
    import commentsStores from "../../stores/comments";
    import { errorTheme } from "$lib/customToast";
    import MemberList from "../../components/dashboard/MemberList.svelte";

    let currentComment;

    const handleLogout = async () => {
        await supabase.auth.signOut();
        goto("/");
    };

    const handleGetComments = async () => {
        selectedGroupLoading.set(true);
        const { data, error } = await supabase
            .from("groupComments")
            .select("*")
            .eq("group_Id", $selectedGroupStore.id);

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

    const handleAddComments = async () => {
        const payload = {
            comments: currentComment,
            type: "text",
            isEdited: false,
            userId: $userDataStore.id,
            group_Id: $selectedGroupStore.id,
        };
        currentComment = "";
        const { error } = await supabase.from("groupComments").insert(payload);
        if (error) {
            console.log("error", error);
        }
    };

    const listenGetCommentsData = async () => {
        await supabase
            .channel("public:groupComments")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "*", table: "groupComments" },
                async (payload) => {
                    console.log("payload", payload);
                    const { data: user } = await supabase
                        .from("usersData")
                        .select("id, email, firstName, lastName, profile")
                        .eq("id", payload.new.userId);

                    commentsStores.update((curr) => [
                        ...curr,
                        { ...payload.new, user: user[0] },
                    ]);

                    // scroll to bottom
                    setTimeout(() => {
                        document.getElementById("commentsDisplay").scrollTo({
                            top: document.getElementById("commentsDisplay")
                                .scrollHeight,
                            behavior: "smooth",
                        });
                    }, 1000);
                }
            )
            .on(
                "postgres_changes",
                { event: "DELETE", schema: "*", table: "groupComments" },
                (payload) => {
                    commentsStores.update((curr) => {
                        return curr.filter(
                            (group) => group.id !== payload.old.id
                        );
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

    $: {
        $selectedGroupStore && handleGetComments();
        listenGetCommentsData();
    }
</script>

<div class="flex flex-col h-screen justify-center items-center">
    <div
        class="grid grid-cols-12 mb-8 gap-4 rounded-lg xl:w-10/12 sm:w-11/12 w-12/12"
    >
        <div class="col-start-3 col-span-8 text-center py-1 text-white">
            <div class="flex justify-between">
                <div>
                    <p>Hello there!</p>
                </div>
                <Button>Profile</Button>
                <div class="col-start-6">
                    <button on:click|preventDefault={handleLogout}
                        >Logout</button
                    >
                </div>
            </div>
        </div>
    </div>
    {#if $selectedGroupStore}
        <div
            class="grid grid-cols-12 gap-4 rounded-lg xl:w-10/12 sm:w-11/12 w-12/12"
        >
            <div class="col-start-3 col-span-8 text-center py-1 text-white">
                {"--->"}
                {$selectedGroupStore.title}
                {"<---"}
            </div>
        </div>
    {/if}
    <div
        class="grid grid-cols-12 gap-4 rounded-lg xl:w-10/12 sm:w-11/12 w-12/12 h-4/6"
    >
        <GroupList />

        <div
            id="commentsDisplay"
            class="col-span-8 bg-slate-300 rounded-md p-3 overflow-y-auto"
        >
            {#if !$selectedGroupLoading}
                {#if $selectedGroupStore}
                    {#if $commentsStores.length < 1}
                        <p
                            class="h-full w-full text-center align-middle my-auto"
                        >
                            Empty
                        </p>
                    {:else}
                        {#each $commentsStores as comment}
                            <ProfileComment commentData={comment} />
                        {/each}
                    {/if}
                {:else}
                    <div class="flex h-full justify-center items-center">
                        Please select group.
                    </div>
                {/if}
            {:else}
                <div class="flex h-full justify-center items-center">
                    <Spinner />
                </div>
            {/if}
        </div>

        <MemberList />
    </div>

    <div
        class="grid grid-cols-12 gap-4 xl:w-10/12 lg:w-10/12 md:w-8/12 sm:w-10/12 w-11/12"
    >
        <div class="col-start-3 col-span-8">
            <input
                type="text"
                class="bg-slate-300 py-2 px-3 mt-5 focus:outline-none rounded-md w-full"
                placeholder="Add a comment..."
                bind:value={currentComment}
                on:keyup={(e) => e.key === "Enter" && handleAddComments()}
            />
        </div>
    </div>
</div>
