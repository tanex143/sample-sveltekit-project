import { c as create_ssr_component, e as subscribe, g as each, p as is_promise, n as noop, v as validate_component, m as missing_component } from "../../../chunks/index.js";
import { s as supabase } from "../../../chunks/SvelteToast.svelte_svelte_type_style_lang.js";
import { w as writable } from "../../../chunks/index2.js";
import { t as toast, e as errorTheme } from "../../../chunks/customToast.js";
const exitBeforeEnter = writable(false);
const transitioning = writable(null);
const modals = writable([]);
function isLazyModal(component) {
  return typeof component.prototype === "undefined";
}
async function getComponent(component) {
  return component().then((res) => res.default);
}
const Modals = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $modals, $$unsubscribe_modals;
  let $transitioning, $$unsubscribe_transitioning;
  let $$unsubscribe_exitBeforeEnter;
  $$unsubscribe_modals = subscribe(modals, (value) => $modals = value);
  $$unsubscribe_transitioning = subscribe(transitioning, (value) => $transitioning = value);
  $$unsubscribe_exitBeforeEnter = subscribe(exitBeforeEnter, (value) => value);
  $$unsubscribe_modals();
  $$unsubscribe_transitioning();
  $$unsubscribe_exitBeforeEnter();
  return `${$modals.length > 0 ? `${slots.backdrop ? slots.backdrop({}) : ``}` : ``}

${slots.default ? slots.default({}) : `
  ${each($modals, (modal, i) => {
    return `
    ${isLazyModal(modal.component) ? `${function(__value) {
      if (is_promise(__value)) {
        __value.then(null, noop);
        return `
        ${slots.loading ? slots.loading({}) : ``}
      `;
      }
      return function(component) {
        return `
        ${validate_component(component || missing_component, "svelte:component").$$render(
          $$result,
          Object.assign(
            {
              isOpen: i === $modals.length - 1 && !$transitioning
            },
            modal.props
          ),
          {},
          {}
        )}
      `;
      }(__value);
    }(getComponent(modal.component))}` : `
      ${validate_component(modal.component || missing_component, "svelte:component").$$render(
      $$result,
      Object.assign(
        {
          isOpen: i === $modals.length - 1 && !$transitioning
        },
        modal.props
      ),
      {},
      {}
    )}`}`;
  })}
`}`;
});
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ".backdrop.svelte-rr46dx{position:fixed;top:0;bottom:0;right:0;left:0;background:rgba(0, 0, 0, 0.5)}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const checkIfLoggedIn = async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      toast.push("Session expired.", errorTheme);
    }
  };
  $$result.css.add(css);
  {
    checkIfLoggedIn();
  }
  return `<div class="${"bg-slate-700"}">${slots.default ? slots.default({}) : ``}
    ${validate_component(Modals, "Modals").$$render($$result, {}, {}, {
    backdrop: () => {
      return `<div slot="${"backdrop"}" class="${"backdrop svelte-rr46dx"}" aria-hidden="${"true"}"></div>`;
    }
  })}
</div>`;
});
export {
  Layout as default
};
