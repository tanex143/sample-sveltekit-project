<script>
    import { closeModal } from "svelte-modals";
    import { fade } from "svelte/transition";
    import { toast } from "@zerodevx/svelte-toast";
    import userDataStore from "../../stores/userData";
    import { errorTheme } from "$lib/customToast";
    import { addGroup } from "../../lib/groups/groups.js";
    import { addGroupLoading } from "../../stores/loading.js";
    import { Spinner } from "flowbite-svelte";

    export let isOpen;
    let groupTitle;

    const handleAddGroup = async () => {
        addGroupLoading.set(true);
        const payload = {
            title: groupTitle,
            createdBy: $userDataStore.email,
            type: "owner",
            email: $userDataStore.email,
        };

        const resp = await addGroup(payload, $userDataStore.id);

        if (resp.status === "error") {
            toast.push(resp.message, errorTheme);
            return;
        }
        addGroupLoading.set(false);

        closeModal();
    };
</script>

{#if isOpen}
    <div role="dialog" class="modal" transition:fade>
        <div class="contents w-2/6">
            <p class="text-center font-semibold text-2xl mt-3">Add Group</p>
            <!-- svelte-ignore a11y-autofocus -->
            <input
                type="text"
                bind:value={groupTitle}
                class="py-2 px-3 mt-2 rounded-md bg-slate-300 focus:outline-none"
                placeholder="Group Title"
                autofocus={true}
            />
            {#if $addGroupLoading}
                <button
                    class="w-full rounded-md bg-slate-700 py-1 mt-5 mb-3 text-center"
                >
                    <Spinner />
                </button>
            {:else}
                <button
                    class="w-full rounded-md bg-slate-700 py-2 mt-5 mb-3 text-center text-white"
                    on:click={handleAddGroup}>ADD</button
                >
            {/if}
        </div>
    </div>
{/if}

<style>
    .modal {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        /* allow click-through to backdrop */
        pointer-events: none;
    }

    .contents {
        min-width: 240px;
        border-radius: 6px;
        padding: 16px;
        background: #94a3b8;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        pointer-events: auto;
    }
</style>
