<script>
    import { toast } from "@zerodevx/svelte-toast";
    import { Spinner } from "flowbite-svelte";
    import { errorTheme, successTheme } from "$lib/customToast";
    import { goto } from "$app/navigation";
    import { signupLoading } from "../../stores/loading";
    import { enhance } from "$app/forms";

    export let form;

    $: form && handleRedirect();
</script>

<div class="flex h-screen justify-center items-center bg-slate-600">
    <div
        class="text-center bg-gray-400 rounded-lg xl:w-3/12 lg:w-4/12 md:w-6/12 sm:w-8/12 w-11/12"
    >
        <div class="p-10">
            <h1 class="text-3xl font-bold">Register</h1>
            <br />
            <form method="POST" action="?/register" use:enhance>
                <div class="flex flex-col justify-start">
                    <small class="text-start pl-1">Email</small>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        class="w-full p-2 rounded-md focus:outline-none"
                        style="background-color: #E8F0FE"
                        value={form?.email || ""}
                        required
                    />
                </div>
                <div class="flex flex-col justify-start mt-5">
                    <small class="text-start pl-1">Password</small>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        class="w-full p-2 rounded-md focus:outline-none"
                        style="background-color: #E8F0FE"
                        value={form?.password || ""}
                        required
                    />
                </div>
                <div class="flex flex-col justify-start mt-5">
                    <small class="text-start pl-1">Confirm Password</small>
                    <input
                        name="cpassword"
                        type="password"
                        placeholder="Password"
                        class="w-full p-2 rounded-md focus:outline-none"
                        style="background-color: #E8F0FE"
                        value={form?.cpassword || ""}
                        required
                    />
                </div>
                <div>
                    {#if $signupLoading}
                        <button class="w-full bg-slate-600 p-1 rounded-md mt-5">
                            <Spinner />
                        </button>
                    {:else}
                        <button
                            class="w-full bg-slate-600 text-white p-2 rounded-md mt-5 hover:bg-slate-700"
                        >
                            Register
                        </button>
                    {/if}
                </div>
            </form>
            <div class="mt-2">
                <small>
                    <p>
                        Already have an account? <a
                            href="/"
                            class="hover:text-gray-300">Login</a
                        >
                    </p>
                </small>
            </div>
        </div>
    </div>
</div>
