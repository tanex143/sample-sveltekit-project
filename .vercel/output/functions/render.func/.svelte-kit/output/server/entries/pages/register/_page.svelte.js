import { c as create_ssr_component, e as subscribe, f as add_attribute, v as validate_component } from "../../../chunks/index.js";
import "../../../chunks/SvelteToast.svelte_svelte_type_style_lang.js";
import { a as signupLoading, S as Spinner } from "../../../chunks/userData.js";
import "classnames";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $signupLoading, $$unsubscribe_signupLoading;
  $$unsubscribe_signupLoading = subscribe(signupLoading, (value) => $signupLoading = value);
  let email;
  let password;
  let cpassword;
  $$unsubscribe_signupLoading();
  return `<div class="${"flex h-screen justify-center items-center bg-slate-600"}"><div class="${"text-center bg-gray-400 rounded-lg xl:w-3/12 lg:w-4/12 md:w-6/12 sm:w-8/12 w-11/12"}"><div class="${"p-10"}"><h1 class="${"text-3xl font-bold"}">Register</h1>
            <br>
            <form><div class="${"flex flex-col justify-start"}"><small class="${"text-start pl-1"}">Email</small>
                    <input type="${"email"}" placeholder="${"Email"}" class="${"w-full p-2 rounded-md focus:outline-none"}" style="${"background-color: #E8F0FE"}" required${add_attribute("value", email, 0)}></div>
                <div class="${"flex flex-col justify-start mt-5"}"><small class="${"text-start pl-1"}">Password</small>
                    <input type="${"password"}" placeholder="${"Password"}" class="${"w-full p-2 rounded-md focus:outline-none"}" style="${"background-color: #E8F0FE"}" required${add_attribute("value", password, 0)}></div>
                <div class="${"flex flex-col justify-start mt-5"}"><small class="${"text-start pl-1"}">Confirm Password</small>
                    <input type="${"password"}" placeholder="${"Password"}" class="${"w-full p-2 rounded-md focus:outline-none"}" style="${"background-color: #E8F0FE"}" required${add_attribute("value", cpassword, 0)}></div>
                <div>${$signupLoading ? `<button class="${"w-full bg-slate-600 p-1 rounded-md mt-5"}">${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}</button>` : `<button type="${"submit"}" class="${"w-full bg-slate-600 text-white p-2 rounded-md mt-5 hover:bg-slate-700"}">Register
                        </button>`}</div></form>
            <div class="${"mt-2"}"><small><p>Already have an account? <a href="${"/login"}" class="${"hover:text-gray-300"}">Login</a></p></small></div></div></div></div>`;
});
export {
  Page as default
};
