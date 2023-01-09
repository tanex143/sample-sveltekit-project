<script>
    import supabase from "$db/database/supabase";
    import { closeModal } from "svelte-modals";
    import { fade } from "svelte/transition";
    import { toast } from "@zerodevx/svelte-toast";
    import { errorTheme } from "$lib/customToast";
    import { selectedGroupStore } from "$stores/groups";

    export let isOpen;
    let userEmail;

    const handleAddMember = async () => {
        const { error } = await supabase.from("groupMemberss").insert({
            groupId: $selectedGroupStore.id,
            email: userEmail,
        });

        if (error) {
            toast.push(error.message, errorTheme);
            return;
        }

        closeModal();
    };
</script>

{#if isOpen}
    <div role="dialog" class="modal" transition:fade>
        <div class="contents w-2/6">
            <p class="text-center font-semibold text-2xl mt-3">Add Member</p>
            <!-- svelte-ignore a11y-autofocus -->
            <input
                type="text"
                bind:value={userEmail}
                class="py-2 px-3 mt-2 rounded-md bg-slate-300 focus:outline-none"
                placeholder="Add user email"
                autofocus={true}
            />
            <button
                class="w-full rounded-md bg-slate-700 py-2 mt-5 mb-3 text-center text-white"
                on:click={handleAddMember}>ADD</button
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
