<script>
    import supabase from "$db/database/supabase";
    import { fade } from "svelte/transition";
    import { Spinner } from "flowbite-svelte";
    import userDataStore from "../../stores/userData";
    import { errorTheme, successTheme } from "$lib/customToast.js";
    import { toast } from "@zerodevx/svelte-toast";
    import { updateProfileLoading } from "../../stores/loading.js";
    import { updateProfile } from "../../lib/profile/profile.js";

    export let isOpen;
    let profile;
    $: profile = $userDataStore.profile ? $userDataStore.profile : "";

    const handleUpdateProfile = async () => {
        updateProfileLoading.set(true);
        const resp = await updateProfile(
            profile,
            $userDataStore.firstName,
            $userDataStore.lastName,
            $userDataStore.id
        );

        if (resp.status === "error") {
            toast.push(resp.message, errorTheme);
        } else {
            toast.push(resp.message, successTheme);
        }

        updateProfileLoading.set(false);
        return;
    };
</script>

{#if isOpen}
    <div role="dialog" class="modal" transition:fade>
        <div class="contents w-5/12">
            <div class="text-center font-semibold text-lg">Profile</div>
            <div class="border-t-2 border-slate-400" />
            <br />
            <div class="flex justify-center gap-5 align-middle items-center">
                {#if $userDataStore.profile}
                    <img
                        src={$userDataStore.profile}
                        class="w-32 h-32 rounded-md object-cover"
                        alt=""
                    />
                {:else}
                    <p
                        class="w-32 h-32 border-slate-400 border-2 rounded-md text-center items-center flex justify-center"
                    >
                        +
                    </p>
                {/if}
                <input
                    type="file"
                    on:change={(e) => (profile = e.currentTarget.files[0])}
                />
            </div>
            <input
                type="text"
                class="bg-slate-300 py-2 px-3 mt-5 focus:outline-none rounded-md w-full"
                placeholder="First name"
                bind:value={$userDataStore.firstName}
            />
            <input
                type="text"
                class="bg-slate-300 py-2 px-3 mt-5 focus:outline-none rounded-md w-full"
                placeholder="Last name"
                bind:value={$userDataStore.lastName}
            />

            {#if $updateProfileLoading}
                <div
                    class="w-full rounded-md bg-slate-700 py-2 mt-5 mb-3 text-center"
                >
                    <Spinner />
                </div>
            {:else}
                <button
                    class="w-full rounded-md bg-slate-700 py-2 mt-5 mb-3 text-center text-white"
                    on:click={handleUpdateProfile}>Update</button
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
        background: #cbd5e1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        pointer-events: auto;
    }
</style>
