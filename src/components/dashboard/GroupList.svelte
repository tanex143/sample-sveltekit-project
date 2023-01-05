<script>
    import { openModal } from "svelte-modals";
    import Modal from "../modal/Modal.svelte";
    import { groupsStore, selectedGroupStore } from "../../stores/groups.js";
    import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
    import { toast } from "@zerodevx/svelte-toast";
    import { errorTheme } from "$lib/customToast.js";
    import userDataStore from "../../stores/userData.js";
    import {
        editGroup,
        getGroups,
        deleteGroup,
        groupsCRUDListener,
    } from "../../lib/groups/groups";

    let onEdit = false;
    let toEditId = null;
    let editedName = "";

    const handleOnEdit = (id, title) => {
        onEdit = true;
        toEditId = id;
        editedName = title;
    };

    const handleSaveChanges = async () => {
        const resp = await editGroup(editedName, toEditId);
        if (resp.status === "error") {
            return toast.push(resp.message, errorTheme);
        }
        onEdit = false;
        toEditId = null;
        editedName = "";
    };

    const handleShowModal = () => {
        openModal(Modal);
    };

    const getGroupsData = async () => {
        await getGroups($userDataStore.email);
    };

    const handleSelectGroup = (value) => {
        selectedGroupStore.set(value);
    };

    const handleDelete = async (groupId) => {
        const resp = await deleteGroup(groupId, $selectedGroupStore);
        if (resp.status === "error") {
            return toast.push(error.message, errorTheme);
        }
    };

    const listenGetGroupsData = async () => {
        await groupsCRUDListener($userDataStore.email);
    };

    $: {
        getGroupsData();
        listenGetGroupsData();
    }
</script>

<div class="col-span-2 bg-slate-400 rounded-md p-3 overflow-y-auto">
    <div class="text-start">
        <p class="border-b-4 border-slate-700 pb-2">Groups</p>
    </div>
    <div class="text-start mt-2">
        <button
            on:click|preventDefault={handleShowModal}
            class="border-2 border-slate-700 py-1 w-full rounded-md text-xs hover:text-slate-300 hover:border-slate-300"
        >
            + Add group</button
        >
    </div>
    <div class="mt-3">
        {#if !$groupsStore}
            <p class="text-xs">No groups yet</p>
        {:else}
            {#each $groupsStore as groupTitle (groupTitle.id)}
                <div class="grid grid-cols-12">
                    {#if onEdit && toEditId === groupTitle.id}
                        <input
                            type="text"
                            class="col-span-11 border-2 border-slate-700 rounded-md py-1 px-2"
                            bind:value={editedName}
                            on:blur={handleSaveChanges}
                            on:keyup={(e) =>
                                e.key === "Enter" && handleSaveChanges()}
                        />
                    {:else}
                        <button
                            on:click={() => handleSelectGroup(groupTitle)}
                            class="col-span-11 font-semibold py-1 hover:text-slate-300 text-start"
                        >
                            {groupTitle.title}
                        </button>
                        <Button
                            size="small"
                            color="bg-slate-500"
                            class="focus:outline-none focus-within:outline-none p-0 m-0 bg-color-400"
                            outline={false}>:</Button
                        >
                        <Dropdown>
                            <DropdownItem
                                on:click={() =>
                                    handleOnEdit(
                                        groupTitle.id,
                                        groupTitle.title
                                    )}>Edit</DropdownItem
                            >
                            <DropdownItem
                                on:click={() => handleDelete(groupTitle.id)}
                                >Delete</DropdownItem
                            >
                        </Dropdown>
                    {/if}
                </div>
            {/each}
        {/if}
    </div>
</div>
