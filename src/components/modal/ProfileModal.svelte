<script>
    import { fade } from "svelte/transition";

    export let isOpen;
</script>

{#if isOpen}
    <div role="dialog" class="modal" transition:fade>
        <div class="contents w-2/6">
            <div>profile modal</div>
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
