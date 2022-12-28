<script>
    import { closeModal } from "svelte-modals";
    import { fade } from "svelte/transition";
    import supabase from "$lib/supabase";
    // import { generateRandomId } from "$lib/utils";

    export let isOpen;
    let groupTitle;

    const handleAddGroup = async () => {
        const { error } = await supabase.from("groups").insert({
            title: groupTitle,
            // id: generateRandomId(),
            // user_id: user.id,
            // members: [user.id],
        });
        closeModal();
    };
</script>

{#if isOpen}
    <div role="dialog" class="modal" transition:fade>
        <div class="contents w-2/6">
            <p class="text-center font-semibold text-2xl mt-3">Add Group</p>
            <input
                type="text"
                bind:value={groupTitle}
                class="py-2 px-3 mt-2 rounded-md bg-slate-300 focus:outline-none"
                placeholder="Group Title"
            />
            <button
                class="w-full rounded-md bg-slate-700 py-2 mt-5 mb-3 text-center text-white"
                on:click={handleAddGroup}>ADD</button
            >
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
