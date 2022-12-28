<script>
    import "../app.postcss";
    import { SvelteToast } from "@zerodevx/svelte-toast";
</script>

<!-- this is to initialize the toast component -->
<SvelteToast />
<!-- end of this is to initialize the toast component -->
<slot />
