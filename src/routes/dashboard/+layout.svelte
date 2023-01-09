<script>
    import supabase from "$db/database/supabase";
    import { Modals, closeModal } from "svelte-modals";
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import { toast } from "@zerodevx/svelte-toast";
    import { errorTheme } from "$lib/customToast.js";

    const checkIfLoggedIn = async () => {
        const { data } = await supabase.auth.getSession();
        if (!data.session) {
            toast.push("Session expired.", errorTheme);
            if (browser) {
                localStorage.clear();
                goto("/");
            }
        }
    };
    $: checkIfLoggedIn();
</script>

<div class="bg-slate-700">
    <slot />
    <Modals>
        <div
            slot="backdrop"
            class="backdrop"
            aria-hidden="true"
            on:click|preventDefault={closeModal}
        />
    </Modals>
</div>

<style>
    .backdrop {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
    }
</style>
