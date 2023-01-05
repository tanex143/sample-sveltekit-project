<script>
    import { toast } from "@zerodevx/svelte-toast";
    import { goto } from "$app/navigation";
    import { Spinner } from "flowbite-svelte";
    import { openModal } from "svelte-modals";
    import { selectedGroupStore } from "../../stores/groups";
    import { selectedGroupLoading } from "../../stores/loading";
    import userDataStore from "../../stores/userData";
    import ProfileComment from "../../components/ProfileComment.svelte";
    import GroupList from "../../components/dashboard/GroupList.svelte";
    import commentsStores from "../../stores/comments";
    import { errorTheme } from "$lib/customToast";
    import MemberList from "../../components/dashboard/MemberList.svelte";
    import ProfileModal from "../../components/modal/ProfileModal.svelte";
    import { signOutUser } from "../../lib/auth/auth";
    import {
        getComments,
        addComment,
        supabaseCRUDListener,
    } from "../../lib/comments/comments.js";

    let currentComment;

    const handleLogout = async () => {
        const resp = await signOutUser();
        if (resp === "success") {
            goto("/");
        } else {
            toast.push(resp, errorTheme);
        }
    };

    const handleShowProfileModal = () => {
        openModal(ProfileModal);
    };

    const handleGetComments = async () => {
        await getComments($selectedGroupStore);
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
        const resp = await addComment(payload);
        if (resp.status === "error") {
            toast.push(resp.message, errorTheme);
            return;
        }
    };

    const listenGetCommentsData = async () => {
        await supabaseCRUDListener();
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
                    {#if $userDataStore && $userDataStore.firstName}
                        <p>
                            Hello, {$userDataStore.firstName
                                ? $userDataStore.firstName
                                : $userDataStore.email.split("@")[0]}!
                        </p>
                    {:else}
                        <p>Hello!</p>
                    {/if}
                </div>
                <button
                    class="rounded-md bg-blue-600 py-1 px-5 hover:bg-blue-500"
                    on:click|preventDefault={handleShowProfileModal}
                    >Profile</button
                >
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
