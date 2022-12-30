<script>
    import supabase from "$lib/supabase";
    import { goto } from "$app/navigation";
    import { toast } from "@zerodevx/svelte-toast";
    import { errorTheme } from "$lib/customToast";
    import userDataStore from "../../stores/userData";

    let email;
    let password;
    let loading = false;

    const handleLogin = async () => {
        loading = true;
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        const { data: userRef } = await supabase
            .from("usersData")
            .select("*")
            .eq("id", data.user.id);
        userDataStore.set(userRef[0]);
        if (!error) {
            goto("/dashboard");
            loading = false;
        } else {
            toast.push(error.message, errorTheme);
            loading = false;
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
                        bind:value={email}
                        name="email"
                        type="email"
                        placeholder="Email"
                        class="w-full p-2 rounded-md focus:outline-none"
                        style="background-color: #E8F0FE"
                    />
                </div>

                <div class="flex flex-col justify-start mt-5">
                    <label for="password" class="text-start pl-1"
                        ><small>Password</small></label
                    >
                    <input
                        bind:value={password}
                        name="password"
                        type="password"
                        placeholder="Password"
                        class="w-full p-2 rounded-md focus:outline-none"
                        style="background-color: #E8F0FE"
                    />
                </div>
                <div>
                    <button
                        disabled={loading}
                        class="w-full bg-slate-600 text-white p-2 rounded-md mt-5 hover:bg-slate-700"
                        type="submit"
                    >
                        Login
                    </button>
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
