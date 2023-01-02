<script>
    import { openModal } from "svelte-modals";
    import Modal from "../modal/Modal.svelte";
    import { groupsStore, selectedGroupStore } from "../../stores/groups.js";
    import supabase from "$lib/supabase";
    import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
    import { toast } from "@zerodevx/svelte-toast";
    import { errorTheme } from "$lib/customToast.js";
    import userDataStore from "../../stores/userData.js";

    let onEdit = false;
    let toEditId = null;
    let editedName = "";

    const handleOnEdit = (id, title) => {
        onEdit = true;
        toEditId = id;
        editedName = title;
    };

    const handleSaveChanges = async () => {
        const { error } = await supabase
            .from("groups")
            .update({ title: editedName })
            .eq("id", toEditId);
        if (error) {
            return toast.push(error.message, errorTheme);
        }
        onEdit = false;
        toEditId = null;
        editedName = "";
    };

    const handleShowModal = () => {
        openModal(Modal);
    };

    const getGroupsData = async () => {
        const { data } = await supabase
            .from("groups")
            .select()
            .eq("email", $userDataStore.email);
        groupsStore.set(data);
    };

    const handleSelectGroup = (value) => {
        selectedGroupStore.set(value);
    };

    const handleDelete = async (id) => {
        await supabase.from("groupComments").delete().eq("group_Id", id);
        await supabase.from("groupMemberss").delete().eq("groupId", id);

        const { error } = await supabase.from("groups").delete().eq("id", id);
        if (error) {
            return toast.push(error.message, errorTheme);
        }
    };

    const listenGetGroupsData = async () => {
        await supabase
            .channel("public:groups")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "*", table: "groups" },
                (payload) => {
                    if (payload.new.email === $userDataStore.email) {
                        groupsStore.update((curr) => [...curr, payload.new]);
                    }
                }
            )
            .on(
                "postgres_changes",
                { event: "DELETE", schema: "*", table: "groups" },
                (payload) => {
                    groupsStore.update((curr) => {
                        return curr.filter(
                            (group) => group.id !== payload.old.id
                        );
                    });
                }
            )
            .on(
                "postgres_changes",
                { event: "UPDATE", schema: "*", table: "groups" },
                (payload) => {
                    groupsStore.update((curr) => {
                        return curr.map((group) => {
                            if (group.id === payload.new.id) {
                                return payload.new;
                            }
                            return group;
                        });
                    });
                }
            )
            .subscribe();
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
