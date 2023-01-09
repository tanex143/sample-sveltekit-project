<script>
    import { goto } from "$app/navigation";
    import { toast } from "@zerodevx/svelte-toast";
    import { errorTheme } from "$lib/customToast";
    import { Spinner } from "flowbite-svelte";
    import { loginLoading } from "../stores/loading";
    import { signInUser } from "../lib/auth/auth";

    let email;
    let password;

    const handleLogin = async () => {
        loginLoading.set(true);
        const resp = await signInUser(email, password);

        if (resp.status === "success") {
            loginLoading.set(false);
            goto("/dashboard");
        } else {
            toast.push(resp.message, errorTheme);
            loginLoading.set(false);
            return;
        }
    };
</script>

<div class="flex h-screen justify-center items-center bg-slate-600">
    <div
        class="text-center bg-gray-400 rounded-lg xl:w-3/12 lg:w-4/12 md:w-6/12 sm:w-8/12 w-11/12"
    >
        <div class="p-10">
            <h1 class="text-3xl font-bold">
                Sveltekit <small class="font-normal italic text-sm">with</small>
            </h1>
            <p class="text-3xl font-bold">Supabase</p>
            <br />
            <form on:submit|preventDefault={handleLogin}>
                <div class="flex flex-col justify-start">
                    <label for="email" class="text-start pl-1"
                        ><small>Email</small></label
                    >
                    <input
                        type="email"
                        placeholder="Email"
                        class="w-full p-2 rounded-md focus:outline-none"
                        style="background-color: #E8F0FE"
                        bind:value={email}
                    />
                </div>

                <div class="flex flex-col justify-start mt-5">
                    <label for="password" class="text-start pl-1"
                        ><small>Password</small></label
                    >
                    <input
                        type="password"
                        placeholder="Password"
                        class="w-full p-2 rounded-md focus:outline-none"
                        style="background-color: #E8F0FE"
                        bind:value={password}
                    />
                </div>
                <div>
                    {#if $loginLoading}
                        <button class="w-full bg-slate-600 p-2 rounded-md mt-5">
                            <Spinner />
                        </button>
                    {:else}
                        <button
                            class="w-full bg-slate-600 text-white p-2 rounded-md mt-5 hover:bg-slate-700"
                            type="submit"
                        >
                            Login
                        </button>
                    {/if}
                </div>
                <div class="mt-2">
                    <small>
                        <p>
                            Don't have an account? <a
                                href="/register"
                                class="hover:text-gray-300">Register</a
                            >
                        </p>
                    </small>
                </div>
            </form>
        </div>
    </div>
</div>
