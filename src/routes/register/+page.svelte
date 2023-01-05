<script>
    import supabase from "$lib/supabase";
    import { toast } from "@zerodevx/svelte-toast";
    import * as auth from "$lib/auth/auth";
    import { Spinner } from "flowbite-svelte";
    import { errorTheme, successTheme } from "$lib/customToast";
    import { goto } from "$app/navigation";
    import { signupLoading } from "../../stores/loading";
    let email;
    let password;
    let cpassword;

    const handleRegister = async () => {
        signupLoading.set(true);
        if (password !== cpassword) {
            signupLoading.set(false);
            return toast.push("Password does not match.", errorTheme);
        }
        if (password.length < 6 || cpassword.length < 6) {
            signupLoading.set(false);
            return toast.push(
                "Password must be at least 6 characters.",
                errorTheme
            );
        }

        const resp = await auth.signUpUser(email, password);
        if (resp.status === "success") {
            toast.push("Registration successful.", successTheme);
            goto("/login");
        } else {
            toast.push(resp.message, errorTheme);
            signupLoading.set(false);
            return;
        }
    };
</script>

<div class="flex h-screen justify-center items-center bg-slate-600">
    <div
        class="text-center bg-gray-400 rounded-lg xl:w-3/12 lg:w-4/12 md:w-6/12 sm:w-8/12 w-11/12"
    >
        <div class="p-10">
            <h1 class="text-3xl font-bold">Register</h1>
            <br />
            <form on:submit|preventDefault={handleRegister}>
                <div class="flex flex-col justify-start">
                    <small class="text-start pl-1">Email</small>
                    <input
                        bind:value={email}
                        type="email"
                        placeholder="Email"
                        class="w-full p-2 rounded-md focus:outline-none"
                        style="background-color: #E8F0FE"
                        required
                    />
                </div>
                <div class="flex flex-col justify-start mt-5">
                    <small class="text-start pl-1">Password</small>
                    <input
                        bind:value={password}
                        type="password"
                        placeholder="Password"
                        class="w-full p-2 rounded-md focus:outline-none"
                        style="background-color: #E8F0FE"
                        required
                    />
                </div>
                <div class="flex flex-col justify-start mt-5">
                    <small class="text-start pl-1">Confirm Password</small>
                    <input
                        bind:value={cpassword}
                        type="password"
                        placeholder="Password"
                        class="w-full p-2 rounded-md focus:outline-none"
                        style="background-color: #E8F0FE"
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
                            type="submit"
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
                            href="/login"
                            class="hover:text-gray-300">Login</a
                        >
                    </p>
                </small>
            </div>
        </div>
    </div>
</div>
