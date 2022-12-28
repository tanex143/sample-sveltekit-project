<script>
    import { Modals, closeModal } from "svelte-modals";
</script>

<div class="bg-slate-700">
    <slot />
    <Modals>
        <div
            slot="backdrop"
            class="backdrop"
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
