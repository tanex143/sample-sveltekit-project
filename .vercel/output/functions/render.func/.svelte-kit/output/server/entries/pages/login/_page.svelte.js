import { c as create_ssr_component, e as subscribe, f as add_attribute, v as validate_component } from "../../../chunks/index.js";
import "../../../chunks/SvelteToast.svelte_svelte_type_style_lang.js";
import "classnames";
import { l as loginLoading, S as Spinner } from "../../../chunks/userData.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $loginLoading, $$unsubscribe_loginLoading;
  $$unsubscribe_loginLoading = subscribe(loginLoading, (value) => $loginLoading = value);
  let email;
  let password;
  $$unsubscribe_loginLoading();
  return `<div class="${"flex h-screen justify-center items-center bg-slate-600"}"><div class="${"text-center bg-gray-400 rounded-lg xl:w-3/12 lg:w-4/12 md:w-6/12 sm:w-8/12 w-11/12"}"><div class="${"p-10"}"><h1 class="${"text-3xl font-bold"}">Sveltekit <small class="${"font-normal italic text-sm"}">with</small></h1>
            <p class="${"text-3xl font-bold"}">Supabase</p>
            <br>
            <form><div class="${"flex flex-col justify-start"}"><label for="${"email"}" class="${"text-start pl-1"}"><small>Email</small></label>
                    <input name="${"email"}" type="${"email"}" placeholder="${"Email"}" class="${"w-full p-2 rounded-md focus:outline-none"}" style="${"background-color: #E8F0FE"}"${add_attribute("value", email, 0)}></div>

                <div class="${"flex flex-col justify-start mt-5"}"><label for="${"password"}" class="${"text-start pl-1"}"><small>Password</small></label>
                    <input name="${"password"}" type="${"password"}" placeholder="${"Password"}" class="${"w-full p-2 rounded-md focus:outline-none"}" style="${"background-color: #E8F0FE"}"${add_attribute("value", password, 0)}></div>
                <div>${$loginLoading ? `<button class="${"w-full bg-slate-600 p-2 rounded-md mt-5"}">${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}</button>` : `<button class="${"w-full bg-slate-600 text-white p-2 rounded-md mt-5 hover:bg-slate-700"}" type="${"submit"}">Login
                        </button>`}</div>
                <div class="${"mt-2"}"><small><p>Don&#39;t have an account? <a href="${"/register"}" class="${"hover:text-gray-300"}">Register</a></p></small></div></form></div></div></div>`;
});
export {
  Page as default
};
