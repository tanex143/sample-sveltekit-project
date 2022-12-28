<script>
    import ProfileComment from "../../components/ProfileComment.svelte";
    import supabase from "$lib/supabase";
    import { goto } from "$app/navigation";

    const handleLogout = async () => {
        await supabase.auth.signOut();
        goto("/");
    };
</script>

<div class="flex flex-col h-screen justify-center items-center">
    <div class="grid grid-cols-6 mb-10">
        <div>
            <p>Hello there!</p>
        </div>
        <div class="col-start-6">
            <button on:click|preventDefault={handleLogout}>Logout</button>
        </div>
    </div>
    <div
        class="grid grid-cols-12 gap-4 rounded-lg xl:w-10/12 lg:w-10/12 md:w-8/12 sm:w-10/12 w-11/12 h-4/6"
    >
        <div class="col-span-2 bg-slate-500 rounded-md p-3 overflow-y-auto">
            <div class="text-start">
                <p class="border-b-4 border-slate-700 pb-2">Groups</p>
            </div>
            <div class="text-start mt-2">
                <button
                    class="border-2 border-slate-700 py-1 w-full rounded-md text-xs hover:text-slate-300 hover:border-slate-300"
                >
                    + Add group</button
                >
            </div>
        </div>
        <div class="col-span-8 bg-slate-300 rounded-md p-3 overflow-y-auto">
            <ProfileComment />
            <ProfileComment />
            <ProfileComment />
            <ProfileComment />
            <ProfileComment />
        </div>
        <div class="col-span-2 bg-slate-500 rounded-md p-3 overflow-y-auto">
            <div class="text-start">
                <p class="border-b-4 border-slate-700 pb-2">Members</p>
            </div>
            <div class="text-start mt-2">
                <p>member 1</p>
                <p>member 2</p>
            </div>
        </div>
    </div>

    <div
        class="grid grid-cols-12 gap-4 xl:w-10/12 lg:w-10/12 md:w-8/12 sm:w-10/12 w-11/12"
    >
        <div class="col-start-3 col-span-8">
            <input
                type="text"
                class="bg-slate-300 py-2 px-3 mt-5 focus:outline-none rounded-md w-full"
                placeholder="Add a comment..."
            />
        </div>
    </div>
</div>
