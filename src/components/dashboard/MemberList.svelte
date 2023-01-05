<script>
    import { openModal } from "svelte-modals";
    import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
    import AddMemberList from "../modal/AddMemberModal.svelte";
    import membersStore from "../../stores/members.js";
    import { selectedGroupStore } from "../../stores/groups.js";
    import {
        deleteMember,
        getMembers,
        memberCRUDListener,
    } from "../../lib/members/members.js";

    const getMembersData = async () => {
        await getMembers($selectedGroupStore.id);
    };

    const handleShowModal = () => {
        openModal(AddMemberList);
    };

    const handleDelete = async (id) => {
        const resp = await deleteMember(id);

        if (resp.status === "error") {
            return toast.push(resp.message, errorTheme);
        }
    };

    const listenGetMembersData = async () => {
        await memberCRUDListener($selectedGroupStore.id);
    };

    $: {
        $selectedGroupStore && getMembersData();
        $selectedGroupStore && listenGetMembersData();
    }
</script>

<div class="col-span-2 bg-slate-400 rounded-md p-3 overflow-y-auto">
    <div class="text-start">
        <p class="border-b-4 border-slate-700 pb-2">Members</p>
    </div>
    <div class="text-start mt-2">
        <button
            on:click|preventDefault={handleShowModal}
            class="border-2 border-slate-700 py-1 w-full rounded-md text-xs hover:text-slate-300 hover:border-slate-300"
        >
            + Add member</button
        >
    </div>
    <div class="mt-3">
        {#if !$membersStore}
            <p class="text-xs">No members yet</p>
        {:else}
            {#each $membersStore as member (member.id)}
                <div class="grid grid-cols-12">
                    <button
                        class="col-span-11 font-semibold py-1 hover:text-slate-300 text-start break-words"
                    >
                        {member.email}
                    </button>
                    <Button
                        size="small"
                        color="bg-slate-500"
                        class="focus:outline-none focus-within:outline-none p-0 m-0 bg-color-400"
                        outline={false}>:</Button
                    >
                    <Dropdown>
                        <DropdownItem on:click={() => handleDelete(member.id)}
                            >Delete</DropdownItem
                        >
                    </Dropdown>
                </div>
            {/each}
        {/if}
    </div>
</div>
