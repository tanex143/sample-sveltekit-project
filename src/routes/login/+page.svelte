<script>
    const handleLogin = (e) => {
        console.log("event", e);
        console.log("event", e.target.email.value);
        console.log("event", e.target.password.value);
    };
</script>

<div class="flex h-screen justify-center items-center bg-slate-700">
    <div
        class="text-center bg-gray-500 rounded-lg xl:w-3/12 lg:w-4/12 md:w-6/12 sm:w-8/12 w-11/12"
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
                        name="email"
                        type="text"
                        placeholder="Email"
                        class="w-full p-2 rounded-md focus:outline-none bg-gray-300"
                    />
                </div>

                <div class="flex flex-col justify-start mt-5">
                    <label for="password" class="text-start pl-1"
                        ><small>Password</small></label
                    >
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        class="w-full p-2 rounded-md focus:outline-none bg-gray-300"
                    />
                </div>
                <div>
                    <button
                        class="w-full bg-slate-700 text-white p-2 rounded-md mt-5 hover:bg-slate-600"
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
