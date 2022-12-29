<script>
    import "../app.postcss";
    import supabase from "$lib/supabase";
    import { SvelteToast } from "@zerodevx/svelte-toast";
    import { goto } from "$app/navigation";
    import { toast } from "@zerodevx/svelte-toast";
    import { errorTheme } from "$lib/customToast.js";

    const handleListenToLogout = async () => {
        await supabase.auth.onAuthStateChange((event) => {
            if (event == "TOKEN_REFRESHED") {
                toast.push("Session expired.", errorTheme);
                goto("/login");
            }
        });
    };

    $: {
        handleListenToLogout();
    }
</script>

<!-- this is to initialize the toast component -->
<SvelteToast />
<!-- end of this is to initialize the toast component -->
<slot />
