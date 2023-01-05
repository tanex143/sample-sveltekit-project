import { c as create_ssr_component, q as compute_rest_props, s as setContext, r as spread, t as escape_object, u as escape_attribute_value, f as add_attribute, w as is_void, n as noop, k as getContext, x as get_current_component, v as validate_component, y as globals, z as compute_slots, e as subscribe, h as escape, g as each } from "../../../chunks/index.js";
import { s as supabase } from "../../../chunks/SvelteToast.svelte_svelte_type_style_lang.js";
import classNames from "classnames";
import { u as userDataStore, s as selectedGroupLoading, S as Spinner } from "../../../chunks/userData.js";
import { w as writable } from "../../../chunks/index2.js";
import { createPopper } from "@popperjs/core";
import { t as toast, e as errorTheme } from "../../../chunks/customToast.js";
const Frame = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "tag",
    "color",
    "rounded",
    "border",
    "shadow",
    "transition",
    "params",
    "node",
    "use",
    "options"
  ]);
  setContext("background", true);
  let { tag = "div" } = $$props;
  let { color = "default" } = $$props;
  let { rounded = false } = $$props;
  let { border = false } = $$props;
  let { shadow = false } = $$props;
  let { transition = void 0 } = $$props;
  let { params = {} } = $$props;
  let { node = void 0 } = $$props;
  let { use = noop } = $$props;
  let { options = {} } = $$props;
  const bgColors = {
    gray: "bg-gray-100 dark:bg-gray-200 ",
    red: "bg-red-100 dark:bg-red-200",
    yellow: "bg-yellow-100 dark:bg-yellow-200 ",
    green: "bg-green-100 dark:bg-green-200 ",
    indigo: "bg-indigo-100 dark:bg-indigo-200 ",
    purple: "bg-purple-100 dark:bg-purple-200 ",
    pink: "bg-pink-100 dark:bg-pink-200 ",
    blue: "bg-blue-100 dark:bg-blue-200 ",
    light: "bg-gray-50 dark:bg-gray-700",
    dark: "bg-gray-100 dark:bg-gray-700",
    default: "bg-white dark:bg-gray-800",
    dropdown: "bg-white dark:bg-gray-700",
    navbar: "bg-white dark:bg-gray-900",
    navbarUl: "bg-gray-50 dark:bg-gray-800",
    form: "bg-gray-50 dark:bg-gray-700",
    primary: "bg-primary-100 dark:bg-primary-200 ",
    none: ""
  };
  const textColors = {
    gray: "text-gray-700 dark:text-gray-800",
    red: "text-red-700 dark:text-red-800",
    yellow: "text-yellow-700 dark:text-yellow-800",
    green: "text-green-700 dark:text-green-800",
    indigo: "text-indigo-700 dark:text-indigo-800",
    purple: "text-purple-700 dark:text-purple-800",
    pink: "text-pink-700 dark:text-pink-800",
    blue: "text-blue-700 dark:text-blue-800",
    light: "text-gray-700 dark:text-gray-300",
    dark: "text-gray-700 dark:text-gray-300",
    default: "text-gray-500 dark:text-gray-400",
    dropdown: "text-gray-700 dark:text-gray-200",
    navbar: "text-gray-700 dark:text-gray-200",
    navbarUl: "text-gray-700 dark:text-gray-400",
    form: "text-gray-900 dark:text-white",
    primary: "text-primary-700 dark:text-primary-800",
    none: ""
  };
  const borderColors = {
    gray: "border-gray-500 dark:bg-gray-200 ",
    red: "border-red-500 dark:bg-red-200 ",
    yellow: "border-yellow-500 dark:bg-tellow-200 ",
    green: "border-green-500 dark:bg-green-200 ",
    indigo: "border-indigo-500 dark:bg-indigo-200 ",
    purple: "border-purple-500 dark:bg-purple-200 ",
    pink: "border-pink-500 dark:bg-pink-200 ",
    blue: "border-blue-500 dark:bg-blue-200 ",
    light: "border-gray-500",
    dark: "border-gray-500",
    default: "border-gray-200 dark:border-gray-700",
    dropdown: "border-gray-100 dark:border-gray-700",
    navbar: "border-gray-100 dark:border-gray-700",
    navbarUl: "border-gray-100 dark:border-gray-700",
    form: "border-gray-300 dark:border-gray-700",
    primary: "border-primary-500 dark:bg-primary-200 ",
    none: ""
  };
  let divClass;
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
    $$bindings.tag(tag);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.border === void 0 && $$bindings.border && border !== void 0)
    $$bindings.border(border);
  if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0)
    $$bindings.shadow(shadow);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.params === void 0 && $$bindings.params && params !== void 0)
    $$bindings.params(params);
  if ($$props.node === void 0 && $$bindings.node && node !== void 0)
    $$bindings.node(node);
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  {
    setContext("color", color);
  }
  divClass = classNames(bgColors[color], textColors[color], rounded && (color === "dropdown" ? "rounded" : "rounded-lg"), border && "border", borderColors[color], shadow && "shadow-md", $$props.class);
  return `${transition ? `${((tag$1) => {
    return tag$1 ? `<${tag}${spread([escape_object($$restProps), { class: escape_attribute_value(divClass) }], {})}${add_attribute("this", node, 0)}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
  })(tag)}` : `${((tag$1) => {
    return tag$1 ? `<${tag}${spread([escape_object($$restProps), { class: escape_attribute_value(divClass) }], {})}${add_attribute("this", node, 0)}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
  })(tag)}`}`;
});
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["pill", "outline", "gradient", "size", "href", "btnClass", "type", "color", "shadow"]);
  const group = getContext("group");
  let { pill = false } = $$props;
  let { outline = false } = $$props;
  let { gradient = false } = $$props;
  let { size = group ? "sm" : "md" } = $$props;
  let { href = void 0 } = $$props;
  let { btnClass = void 0 } = $$props;
  let { type = "button" } = $$props;
  let { color = group ? outline ? "dark" : "alternative" : "blue" } = $$props;
  let { shadow = null } = $$props;
  const colorClasses = {
    blue: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
    dark: "text-white bg-gray-800 hover:bg-gray-900 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700",
    alternative: "text-gray-900 bg-white border border-gray-200 dark:border-gray-600 hover:bg-gray-100 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 hover:text-blue-700 focus:text-blue-700 dark:focus:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700",
    light: "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700",
    green: "text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
    red: "text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
    yellow: "text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 dark:focus:ring-yellow-900",
    primary: "text-white bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800",
    purple: "text-white bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
  };
  const gradientClasses = {
    blue: "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-blue-300 dark:focus:ring-blue-800 ",
    green: "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-green-300 dark:focus:ring-green-800",
    cyan: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-cyan-300 dark:focus:ring-cyan-800",
    teal: "text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-teal-300 dark:focus:ring-teal-800",
    lime: "text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-lime-300 dark:focus:ring-lime-800",
    red: "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-red-300 dark:focus:ring-red-800",
    pink: "text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-pink-300 dark:focus:ring-pink-800",
    purple: "text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-purple-300 dark:focus:ring-purple-800",
    purpleToBlue: "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800",
    cyanToBlue: "text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-cyan-300 dark:focus:ring-cyan-800",
    greenToBlue: "text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800",
    purpleToPink: "text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800",
    pinkToOrange: "text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-pink-200 dark:focus:ring-pink-800",
    tealToLime: "text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l focus:ring-lime-200 dark:focus:ring-teal-700",
    redToYellow: "text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-red-100 dark:focus:ring-red-400"
  };
  const coloredShadowClasses = {
    blue: "shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80",
    green: "shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80",
    cyan: "shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80",
    teal: "shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 ",
    lime: "shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80",
    red: "shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 ",
    pink: "shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80",
    purple: "shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80"
  };
  const outlineClasses = {
    blue: "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800",
    light: "text-gray-500 hover:text-gray-900 bg-white border border-gray-200 dark:border-gray-600 dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-400",
    dark: "text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:bg-gray-900 focus:text-white focus:ring-gray-300 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800",
    green: "text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-green-300 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800",
    red: "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900",
    yellow: "text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900",
    purple: "text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-purple-300 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
  };
  const sizeClasses = {
    xs: "px-3 py-2 text-xs",
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
    xl: "px-6 py-3.5 text-base"
  };
  function rounded(gradientOutline = false) {
    if (group) {
      return pill ? "first:rounded-l-full last:rounded-r-full" : gradientOutline ? "first:rounded-l-md last:rounded-r-md" : "first:rounded-l-lg last:rounded-r-lg";
    }
    return pill ? "rounded-full" : gradientOutline ? "rounded-md" : "rounded-lg";
  }
  const hasBorder = () => outline || color === "alternative" || color === "light";
  let buttonClass;
  let gradientOutlineClass;
  if ($$props.pill === void 0 && $$bindings.pill && pill !== void 0)
    $$bindings.pill(pill);
  if ($$props.outline === void 0 && $$bindings.outline && outline !== void 0)
    $$bindings.outline(outline);
  if ($$props.gradient === void 0 && $$bindings.gradient && gradient !== void 0)
    $$bindings.gradient(gradient);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.btnClass === void 0 && $$bindings.btnClass && btnClass !== void 0)
    $$bindings.btnClass(btnClass);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0)
    $$bindings.shadow(shadow);
  buttonClass = btnClass ? btnClass : classNames(
    "text-center font-medium",
    group ? "focus:ring-2" : "focus:ring-4",
    group && "focus:z-10",
    group || "focus:outline-none",
    outline && gradient ? "p-0.5" : "inline-flex items-center justify-center " + sizeClasses[size],
    gradient ? gradientClasses[color] : outline ? outlineClasses[color] : colorClasses[color],
    color === "alternative" && (group ? "dark:bg-gray-700 dark:text-white dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-600" : "dark:bg-transparent dark:border-gray-800 dark:hover:border-gray-700"),
    outline && color === "dark" && (group ? "dark:text-white dark:border-white" : "dark:text-gray-400 dark:border-gray-700"),
    hasBorder() && group && "border-l-0 first:border-l",
    rounded(false),
    shadow && coloredShadowClasses[shadow],
    $$props.disabled && "cursor-not-allowed opacity-50",
    $$props.class
  );
  gradientOutlineClass = classNames("inline-flex items-center justify-center", sizeClasses[size], rounded(true), "bg-white text-gray-900 dark:bg-gray-900 dark:text-white", "transition-all duration-75 ease-in group-hover:bg-opacity-0 group-hover:text-inherit");
  return `${((tag) => {
    return tag ? `<${href ? "a" : "button"}${spread(
      [
        {
          type: escape_attribute_value(href ? void 0 : type)
        },
        { href: escape_attribute_value(href) },
        escape_object($$restProps),
        {
          class: escape_attribute_value(buttonClass)
        }
      ],
      {}
    )}>${is_void(tag) ? "" : `${outline && gradient ? `
    <span${add_attribute("class", gradientOutlineClass, 0)}>${slots.default ? slots.default({}) : ``}</span>` : `${slots.default ? slots.default({}) : ``}`}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "button")}`;
});
function createEventDispatcher() {
  const component = get_current_component();
  return (type, target, detail) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = new CustomEvent(type, { detail });
      target.dispatchEvent(event);
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
    }
  };
}
const { Object: Object_1 } = globals;
const Popper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "activeContent",
    "arrow",
    "offset",
    "placement",
    "trigger",
    "triggeredBy",
    "strategy",
    "open",
    "yOnly"
  ]);
  let { activeContent = false } = $$props;
  let { arrow = true } = $$props;
  let { offset = 8 } = $$props;
  let { placement = "top" } = $$props;
  let { trigger = "hover" } = $$props;
  let { triggeredBy = void 0 } = $$props;
  let { strategy = "absolute" } = $$props;
  let { open = false } = $$props;
  let { yOnly = false } = $$props;
  const dispatch = createEventDispatcher();
  let triggerEl;
  let contentEl;
  let popper;
  function init(node, _triggerEl) {
    popper = createPopper(_triggerEl, node, {
      placement,
      strategy,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: ({ reference, popper: popper2 }) => {
              return [
                yOnly ? popper2.width / 2 - reference.width / 2 - reference.x : 0,
                offset
              ];
            }
          }
        },
        { name: "eventListeners", enabled: open },
        { name: "flip", enabled: false }
      ]
    });
    return {
      update(_triggerEl2) {
        popper.state.elements.reference = _triggerEl2;
        popper.update();
      },
      destroy() {
        popper.destroy();
      }
    };
  }
  if ($$props.activeContent === void 0 && $$bindings.activeContent && activeContent !== void 0)
    $$bindings.activeContent(activeContent);
  if ($$props.arrow === void 0 && $$bindings.arrow && arrow !== void 0)
    $$bindings.arrow(arrow);
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0)
    $$bindings.offset(offset);
  if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0)
    $$bindings.placement(placement);
  if ($$props.trigger === void 0 && $$bindings.trigger && trigger !== void 0)
    $$bindings.trigger(trigger);
  if ($$props.triggeredBy === void 0 && $$bindings.triggeredBy && triggeredBy !== void 0)
    $$bindings.triggeredBy(triggeredBy);
  if ($$props.strategy === void 0 && $$bindings.strategy && strategy !== void 0)
    $$bindings.strategy(strategy);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.yOnly === void 0 && $$bindings.yOnly && yOnly !== void 0)
    $$bindings.yOnly(yOnly);
  {
    dispatch("show", triggerEl, open);
  }
  popper && popper.setOptions({ placement });
  return `${`<div${add_attribute("this", contentEl, 0)}></div>`}

${open && triggerEl ? `${validate_component(Frame, "Frame").$$render(
    $$result,
    Object_1.assign({ use: init }, { options: triggerEl }, { role: "tooltip" }, { tabIndex: activeContent ? -1 : void 0 }, $$restProps, {
      class: classNames("z-10 outline-none", $$props.class)
    }),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}
    ${arrow ? `<div data-popper-arrow class="${"tooltip-arrow"}"></div>` : ``}`;
      }
    }
  )}` : ``}`;
});
const Dropdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["open", "frameClass"]);
  let $$slots = compute_slots(slots);
  let { open = false } = $$props;
  let { frameClass = "" } = $$props;
  let popoverClass;
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.frameClass === void 0 && $$bindings.frameClass && frameClass !== void 0)
    $$bindings.frameClass(frameClass);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      {
        $$restProps.arrow = $$restProps.arrow ?? false;
        $$restProps.trigger = $$restProps.trigger ?? "click";
        $$restProps.placement = $$restProps.placement ?? "bottom";
        $$restProps.color = $$restProps.color ?? "dropdown";
        $$restProps.shadow = $$restProps.shadow ?? true;
        $$restProps.rounded = $$restProps.rounded ?? true;
      }
    }
    popoverClass = classNames("divide-y divide-gray-100 dark:divide-gray-600", frameClass);
    $$rendered = `${validate_component(Popper, "Popper").$$render(
      $$result,
      Object.assign({ activeContent: true }, $$restProps, { class: popoverClass }, { open }),
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${$$slots.header ? `<div class="${"py-1 overflow-hidden rounded-t"}">${slots.header ? slots.header({}) : ``}</div>` : ``}
  <ul${add_attribute("class", $$props.class ?? "py-1 w-44", 0)}>${slots.default ? slots.default({}) : ``}</ul>
  ${$$slots.footer ? `<div class="${"py-1 overflow-hidden rounded-b"}">${slots.footer ? slots.footer({}) : ``}</div>` : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Wrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["tag", "show", "use"]);
  let { tag = "div" } = $$props;
  let { show } = $$props;
  let { use = () => {
  } } = $$props;
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
    $$bindings.tag(tag);
  if ($$props.show === void 0 && $$bindings.show && show !== void 0)
    $$bindings.show(show);
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  return `${show ? `${((tag$1) => {
    return tag$1 ? `<${tag}${spread([escape_object($$restProps)], {})}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
  })(tag)}` : `${slots.default ? slots.default({}) : ``}`}`;
});
const DropdownItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["defaultClass", "href"]);
  let { defaultClass = "font-medium py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600" } = $$props;
  let { href = void 0 } = $$props;
  let liClass;
  let wrap = true;
  function init(node) {
    wrap = node.parentElement?.tagName === "UL";
  }
  if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
    $$bindings.defaultClass(defaultClass);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  liClass = classNames(defaultClass, href ? "block" : "w-full text-left", $$props.class);
  return `${validate_component(Wrapper, "Wrapper").$$render($$result, { tag: "li", show: wrap, use: init }, {}, {
    default: () => {
      return `${((tag) => {
        return tag ? `<${href ? "a" : "button"}${spread(
          [
            { href: escape_attribute_value(href) },
            escape_object($$restProps),
            { class: escape_attribute_value(liClass) }
          ],
          {}
        )}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
      })(href ? "a" : "button")}`;
    }
  })}`;
});
const groupsStore = writable(null);
const selectedGroupStore = writable(null);
const ProfileComment = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $userDataStore, $$unsubscribe_userDataStore;
  $$unsubscribe_userDataStore = subscribe(userDataStore, (value) => $userDataStore = value);
  let { commentData } = $$props;
  if ($$props.commentData === void 0 && $$bindings.commentData && commentData !== void 0)
    $$bindings.commentData(commentData);
  $$unsubscribe_userDataStore();
  return `<div class="${"grid grid-cols-12 gap-2 bg-slate-400 pt-3 pl-3 pr-3 rounded-md mb-3"}"><div class="${"col-span-12"}"><div class="${"flex gap-3"}">${commentData.user && commentData.user.profile ? `<img${add_attribute("src", commentData.user.profile, 0)} class="${"w-9 h-9 rounded-full"}" alt="${""}">` : `<div class="${"w-9 h-9 rounded-full bg-slate-600"}"></div>`}
            <div class="${"flex flex-col"}"><div class="${"flex gap-2"}"><p class="${"text-sm font-semibold"}">${escape(commentData.user && commentData.user.firstName ? commentData.user.firstName : commentData.user.email.split("@")[0])}</p></div>
                <p class="${"text-xs "}">${escape($userDataStore.id === commentData.userId ? "Owner" : "Member")} | ${escape(commentData.created_at)}</p></div></div></div>
    <div class="${"col-span-12"}"><div class="${"flex gap-3"}"><div class="${"w-9 h-9 rounded-full"}"></div>
            <p class="${"text-sm"}">${escape(commentData.comments)}</p></div></div></div>`;
});
const getGroups = async (userEmail) => {
  const { data } = await supabase.from("groups").select().eq("email", userEmail);
  groupsStore.set(data);
};
const groupsCRUDListener = async (userEmail) => {
  await supabase.channel("public:groups").on(
    "postgres_changes",
    { event: "INSERT", schema: "*", table: "groups" },
    (payload) => {
      if (payload.new.email === userEmail) {
        groupsStore.update((curr) => [...curr, payload.new]);
      }
    }
  ).on(
    "postgres_changes",
    { event: "DELETE", schema: "*", table: "groups" },
    (payload) => {
      groupsStore.update((curr) => {
        return curr.filter((group) => group.id !== payload.old.id);
      });
    }
  ).on(
    "postgres_changes",
    { event: "UPDATE", schema: "*", table: "groups" },
    (payload) => {
      groupsStore.update((curr) => {
        return curr.map((group) => {
          if (group.id === payload.new.id) {
            return payload.new;
          }
          return group;
        });
      });
    }
  ).subscribe();
};
const Modal_svelte_svelte_type_style_lang = "";
const GroupList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $userDataStore, $$unsubscribe_userDataStore;
  let $$unsubscribe_selectedGroupStore;
  let $groupsStore, $$unsubscribe_groupsStore;
  $$unsubscribe_userDataStore = subscribe(userDataStore, (value) => $userDataStore = value);
  $$unsubscribe_selectedGroupStore = subscribe(selectedGroupStore, (value) => value);
  $$unsubscribe_groupsStore = subscribe(groupsStore, (value) => $groupsStore = value);
  const getGroupsData = async () => {
    await getGroups($userDataStore.email);
  };
  const listenGetGroupsData = async () => {
    await groupsCRUDListener($userDataStore.email);
  };
  {
    {
      getGroupsData();
      listenGetGroupsData();
    }
  }
  $$unsubscribe_userDataStore();
  $$unsubscribe_selectedGroupStore();
  $$unsubscribe_groupsStore();
  return `<div class="${"col-span-2 bg-slate-400 rounded-md p-3 overflow-y-auto"}"><div class="${"text-start"}"><p class="${"border-b-4 border-slate-700 pb-2"}">Groups</p></div>
    <div class="${"text-start mt-2"}"><button class="${"border-2 border-slate-700 py-1 w-full rounded-md text-xs hover:text-slate-300 hover:border-slate-300"}">+ Add group</button></div>
    <div class="${"mt-3"}">${!$groupsStore ? `<p class="${"text-xs"}">No groups yet</p>` : `${each($groupsStore, (groupTitle) => {
    return `<div class="${"grid grid-cols-12"}">${`<button class="${"col-span-11 font-semibold py-1 hover:text-slate-300 text-start"}">${escape(groupTitle.title)}</button>
                        ${validate_component(Button, "Button").$$render(
      $$result,
      {
        size: "small",
        color: "bg-slate-500",
        class: "focus:outline-none focus-within:outline-none p-0 m-0 bg-color-400",
        outline: false
      },
      {},
      {
        default: () => {
          return `:`;
        }
      }
    )}
                        ${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
          default: () => {
            return `Edit`;
          }
        })}
                            ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
          default: () => {
            return `Delete`;
          }
        })}
                        `;
      }
    })}`}
                </div>`;
  })}`}</div></div>`;
});
const commentsStores = writable([]);
const AddMemberModal_svelte_svelte_type_style_lang = "";
const membersStore = writable([]);
const getMembers = async (groupId) => {
  const { data } = await supabase.from("groupMemberss").select().eq("groupId", groupId);
  membersStore.set(data);
};
const memberCRUDListener = async (groupId) => {
  await supabase.channel("public:groupMemberss").on(
    "postgres_changes",
    { event: "INSERT", schema: "*", table: "groupMemberss" },
    (payload) => {
      if (payload.new.groupId === groupId) {
        membersStore.update((curr) => [...curr, payload.new]);
      }
    }
  ).on(
    "postgres_changes",
    { event: "DELETE", schema: "*", table: "groupMemberss" },
    (payload) => {
      membersStore.update((curr) => {
        return curr.filter((group) => group.id !== payload.old.id);
      });
    }
  ).subscribe();
};
const MemberList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $selectedGroupStore, $$unsubscribe_selectedGroupStore;
  let $membersStore, $$unsubscribe_membersStore;
  $$unsubscribe_selectedGroupStore = subscribe(selectedGroupStore, (value) => $selectedGroupStore = value);
  $$unsubscribe_membersStore = subscribe(membersStore, (value) => $membersStore = value);
  const getMembersData = async () => {
    await getMembers($selectedGroupStore.id);
  };
  const listenGetMembersData = async () => {
    await memberCRUDListener($selectedGroupStore.id);
  };
  {
    {
      $selectedGroupStore && getMembersData();
      $selectedGroupStore && listenGetMembersData();
    }
  }
  $$unsubscribe_selectedGroupStore();
  $$unsubscribe_membersStore();
  return `<div class="${"col-span-2 bg-slate-400 rounded-md p-3 overflow-y-auto"}"><div class="${"text-start"}"><p class="${"border-b-4 border-slate-700 pb-2"}">Members</p></div>
    <div class="${"text-start mt-2"}"><button class="${"border-2 border-slate-700 py-1 w-full rounded-md text-xs hover:text-slate-300 hover:border-slate-300"}">+ Add member</button></div>
    <div class="${"mt-3"}">${!$membersStore ? `<p class="${"text-xs"}">No members yet</p>` : `${each($membersStore, (member) => {
    return `<div class="${"grid grid-cols-12"}"><button class="${"col-span-11 font-semibold py-1 hover:text-slate-300 text-start break-words"}">${escape(member.email)}</button>
                    ${validate_component(Button, "Button").$$render(
      $$result,
      {
        size: "small",
        color: "bg-slate-500",
        class: "focus:outline-none focus-within:outline-none p-0 m-0 bg-color-400",
        outline: false
      },
      {},
      {
        default: () => {
          return `:`;
        }
      }
    )}
                    ${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
          default: () => {
            return `Delete`;
          }
        })}
                    `;
      }
    })}
                </div>`;
  })}`}</div></div>`;
});
const ProfileModal_svelte_svelte_type_style_lang = "";
const getComments = async (selectedGroupStore2) => {
  selectedGroupLoading.set(true);
  const { data, error } = await supabase.from("groupComments").select("*").eq("group_Id", selectedGroupStore2.id);
  if (error) {
    toast.push(error.message, errorTheme);
    return;
  }
  if (data) {
    const proms = data.map(async (item) => {
      const { data: user } = await supabase.from("usersData").select("id, email, firstName, lastName, profile").eq("id", item.userId);
      return {
        ...item,
        user: user[0]
      };
    });
    const resp = await Promise.all(proms);
    commentsStores.set(resp);
  }
  selectedGroupLoading.set(false);
};
const supabaseCRUDListener = async () => {
  await supabase.channel("public:groupComments").on(
    "postgres_changes",
    { event: "INSERT", schema: "*", table: "groupComments" },
    async (payload) => {
      const { data: user } = await supabase.from("usersData").select("id, email, firstName, lastName, profile").eq("id", payload.new.userId);
      commentsStores.update((curr) => [
        ...curr,
        { ...payload.new, user: user[0] }
      ]);
    }
  ).on(
    "postgres_changes",
    { event: "DELETE", schema: "*", table: "groupComments" },
    (payload) => {
      commentsStores.update((curr) => {
        return curr.filter((group) => group.id !== payload.old.id);
      });
    }
  ).on(
    "postgres_changes",
    { event: "UPDATE", schema: "*", table: "groupComments" },
    (payload) => {
      commentsStores.update((curr) => {
        return curr.map((group) => {
          if (group.id === payload.new.id) {
            return payload.new;
          }
          return group;
        });
      });
    }
  ).subscribe();
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $selectedGroupStore, $$unsubscribe_selectedGroupStore;
  let $userDataStore, $$unsubscribe_userDataStore;
  let $selectedGroupLoading, $$unsubscribe_selectedGroupLoading;
  let $commentsStores, $$unsubscribe_commentsStores;
  $$unsubscribe_selectedGroupStore = subscribe(selectedGroupStore, (value) => $selectedGroupStore = value);
  $$unsubscribe_userDataStore = subscribe(userDataStore, (value) => $userDataStore = value);
  $$unsubscribe_selectedGroupLoading = subscribe(selectedGroupLoading, (value) => $selectedGroupLoading = value);
  $$unsubscribe_commentsStores = subscribe(commentsStores, (value) => $commentsStores = value);
  let currentComment;
  const handleGetComments = async () => {
    await getComments($selectedGroupStore);
  };
  const listenGetCommentsData = async () => {
    await supabaseCRUDListener();
  };
  {
    {
      $selectedGroupStore && handleGetComments();
      listenGetCommentsData();
    }
  }
  $$unsubscribe_selectedGroupStore();
  $$unsubscribe_userDataStore();
  $$unsubscribe_selectedGroupLoading();
  $$unsubscribe_commentsStores();
  return `<div class="${"flex flex-col h-screen justify-center items-center"}"><div class="${"grid grid-cols-12 mb-8 gap-4 rounded-lg xl:w-10/12 sm:w-11/12 w-12/12"}"><div class="${"col-start-3 col-span-8 text-center py-1 text-white"}"><div class="${"flex justify-between"}"><div>${$userDataStore && $userDataStore.firstName ? `<p>Hello, ${escape($userDataStore.firstName ? $userDataStore.firstName : $userDataStore.email.split("@")[0])}!
                        </p>` : `<p>Hello!</p>`}</div>
                <button class="${"rounded-md bg-blue-600 py-1 px-5 hover:bg-blue-500"}">Profile</button>
                <div class="${"col-start-6"}"><button>Logout</button></div></div></div></div>
    ${$selectedGroupStore ? `<div class="${"grid grid-cols-12 gap-4 rounded-lg xl:w-10/12 sm:w-11/12 w-12/12"}"><div class="${"col-start-3 col-span-8 text-center py-1 text-white"}">${escape("--->")}
                ${escape($selectedGroupStore.title)}
                ${escape("<---")}</div></div>` : ``}
    <div class="${"grid grid-cols-12 gap-4 rounded-lg xl:w-10/12 sm:w-11/12 w-12/12 h-4/6"}">${validate_component(GroupList, "GroupList").$$render($$result, {}, {}, {})}

        <div id="${"commentsDisplay"}" class="${"col-span-8 bg-slate-300 rounded-md p-3 overflow-y-auto"}">${!$selectedGroupLoading ? `${$selectedGroupStore ? `${$commentsStores.length < 1 ? `<p class="${"h-full w-full text-center align-middle my-auto"}">Empty
                        </p>` : `${each($commentsStores, (comment) => {
    return `${validate_component(ProfileComment, "ProfileComment").$$render($$result, { commentData: comment }, {}, {})}`;
  })}`}` : `<div class="${"flex h-full justify-center items-center"}">Please select group.
                    </div>`}` : `<div class="${"flex h-full justify-center items-center"}">${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}</div>`}</div>

        ${validate_component(MemberList, "MemberList").$$render($$result, {}, {}, {})}</div>

    <div class="${"grid grid-cols-12 gap-4 xl:w-10/12 lg:w-10/12 md:w-8/12 sm:w-10/12 w-11/12"}"><div class="${"col-start-3 col-span-8"}"><input type="${"text"}" class="${"bg-slate-300 py-2 px-3 mt-5 focus:outline-none rounded-md w-full"}" placeholder="${"Add a comment..."}"${add_attribute("value", currentComment, 0)}></div></div></div>`;
});
export {
  Page as default
};
