<script>
    import { closeModal } from "svelte-modals";
    import { fade } from "svelte/transition";
    import { toast } from "@zerodevx/svelte-toast";
    import userDataStore from "$stores/userData";
    import { errorTheme, successTheme } from "$lib/customToast";
    import { addGroupLoading } from "$stores/loading.js";
    import { Spinner } from "flowbite-svelte";
    import { enhance } from "$app/forms";

    export let isOpen;

    const handleFormResult = () => {
        addGroupLoading.set(true);
        return ({ result }) => {
            console.log("result", result);
            if (result.data.status === "error") {
                toast.push(result.data.message, errorTheme);
                return;
            } else {
                toast.push(result.data.message, successTheme);
            }
            closeModal();
            addGroupLoading.set(false);
        };
    };
</script>

{#if isOpen}
    <div role="dialog" class="modal" transition:fade>
        <div class="contents w-2/6">
            <p class="text-center font-semibold text-2xl mt-3">Add Group</p>
            <form
                method="POST"
                action={`/dashboard?/addGroup`}
                use:enhance={handleFormResult}
            >
                <!-- svelte-ignore a11y-autofocus -->
                <input
                    type="text"
                    name="groupTitle"
                    class="py-2 px-3 mt-2 rounded-md bg-slate-300 focus:outline-none w-full"
                    placeholder="Group Title"
                    autofocus={true}
                />
                <!-- hidden input just to get the email and user id in the server -->
                <input
                    type="text"
                    name={"userEmail"}
                    value={$userDataStore.email}
                    class="hidden"
                />
                <input
                    type="text"
                    name={"userId"}
                    value={$userDataStore.id}
                    class="hidden"
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
                        >ADD</button
                    >
                {/if}
            </form>
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
