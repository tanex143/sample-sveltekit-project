<script>
    export let commentData;

    console.log("commentData", commentData);
</script>

<div
    class="grid grid-cols-12 gap-2 bg-slate-400 pt-3 pl-3 pr-3 rounded-md mb-3"
>
    <div class="col-span-12">
        <div class="flex gap-3">
            {#if commentData.user && commentData.user.profile}
                <img
                    src={commentData.user.profile}
                    class="w-9 h-9 rounded-full"
                    alt=""
                />
            {:else}
                <div class="w-9 h-9 rounded-full bg-slate-600" />
            {/if}
            <div class="flex flex-col">
                <div class="flex gap-2">
                    <p class="text-sm font-semibold">
                        {commentData.user && commentData.user.firstName
                            ? commentData.user.firstName
                            : commentData.user.email.split("@")[0]}
                    </p>
                </div>
                <p class="text-xs ">Member | {commentData.created_at}</p>
            </div>
        </div>
    </div>
    <div class="col-span-12">
        <div class="flex gap-3">
            <div class="w-9 h-9 rounded-full" />
            <p class="text-sm">{commentData.comments}</p>
        </div>
    </div>
</div>
