/** @type {import('./$types').Actions} */
export const actions = {
    login: async ({ request }) => {
        const data = await request.formData();
        const email = data.get("email");
        const password = data.get("password");
        // localStorage.setItem('email', JSON.stringify(email));

        console.log(email, password);

        return { success: true };
    },
};
