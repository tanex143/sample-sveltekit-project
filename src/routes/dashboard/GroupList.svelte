<script>
    import { openModal } from "svelte-modals";
    import { enhance } from "$app/forms";
    import AddGroupModal from "../../components/modal/AddGroupModal.svelte";
    import { groupsStore, selectedGroupStore } from "$stores/groups.js";
    import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
    import { toast } from "@zerodevx/svelte-toast";
    import { errorTheme } from "$lib/customToast.js";
    import { editGroup } from "$db/groups/groups";

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
        openModal(AddGroupModal);
    };

    const handleSelectGroup = (value) => {
        selectedGroupStore.set(value);
    };

    const handleFormResult = () => {
        return ({ result }) => {
            if (result.data.status === "error") {
                toast.push(result.data.message, errorTheme);
                return;
            }
            if ($selectedGroupStore.id === result.data.groupId) {
                selectedGroupStore.set(null);
            }
        };
    };
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
                <form
                    method="POST"
                    action="/dashboard?/deleteGroup"
                    use:enhance={handleFormResult}
                >
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
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <p
                                on:click={() => handleSelectGroup(groupTitle)}
                                class="col-span-11 font-semibold py-1 hover:text-slate-300 text-start cursor-pointer"
                            >
                                {groupTitle.title}
                            </p>
                            <input
                                type="text"
                                name="groupId"
                                value={groupTitle.id}
                                class="hidden"
                            />
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
                                <DropdownItem>
                                    <button type="submit"> Delete </button>
                                </DropdownItem>
                            </Dropdown>
                        {/if}
                    </div>
                </form>
            {/each}
        {/if}
    </div>
</div>
