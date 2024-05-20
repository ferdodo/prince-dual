(() => {
  // ../core/node_modules/svelte/src/runtime/internal/utils.js
  function noop() {
  }
  function run(fn) {
    return fn();
  }
  function blank_object() {
    return /* @__PURE__ */ Object.create(null);
  }
  function run_all(fns) {
    fns.forEach(run);
  }
  function is_function(thing) {
    return typeof thing === "function";
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
  }
  function is_empty(obj) {
    return Object.keys(obj).length === 0;
  }

  // ../core/node_modules/svelte/src/runtime/internal/globals.js
  var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : (
    // @ts-ignore Node typings have this
    global
  );

  // ../core/node_modules/svelte/src/runtime/internal/ResizeObserverSingleton.js
  var ResizeObserverSingleton = class {
    /**
     * @private
     * @readonly
     * @type {WeakMap<Element, import('./private.js').Listener>}
     */
    _listeners = "WeakMap" in globals ? /* @__PURE__ */ new WeakMap() : void 0;
    /**
     * @private
     * @type {ResizeObserver}
     */
    _observer = void 0;
    /** @type {ResizeObserverOptions} */
    options;
    /** @param {ResizeObserverOptions} options */
    constructor(options) {
      this.options = options;
    }
    /**
     * @param {Element} element
     * @param {import('./private.js').Listener} listener
     * @returns {() => void}
     */
    observe(element2, listener) {
      this._listeners.set(element2, listener);
      this._getObserver().observe(element2, this.options);
      return () => {
        this._listeners.delete(element2);
        this._observer.unobserve(element2);
      };
    }
    /**
     * @private
     */
    _getObserver() {
      return this._observer ?? (this._observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          ResizeObserverSingleton.entries.set(entry.target, entry);
          this._listeners.get(entry.target)?.(entry);
        }
      }));
    }
  };
  ResizeObserverSingleton.entries = "WeakMap" in globals ? /* @__PURE__ */ new WeakMap() : void 0;

  // ../core/node_modules/svelte/src/runtime/internal/dom.js
  var is_hydrating = false;
  function start_hydrating() {
    is_hydrating = true;
  }
  function end_hydrating() {
    is_hydrating = false;
  }
  function append(target2, node) {
    target2.appendChild(node);
  }
  function append_styles(target2, style_sheet_id, styles) {
    const append_styles_to = get_root_for_style(target2);
    if (!append_styles_to.getElementById(style_sheet_id)) {
      const style = element("style");
      style.id = style_sheet_id;
      style.textContent = styles;
      append_stylesheet(append_styles_to, style);
    }
  }
  function get_root_for_style(node) {
    if (!node)
      return document;
    const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    if (root && /** @type {ShadowRoot} */
    root.host) {
      return (
        /** @type {ShadowRoot} */
        root
      );
    }
    return node.ownerDocument;
  }
  function append_stylesheet(node, style) {
    append(
      /** @type {Document} */
      node.head || node,
      style
    );
    return style.sheet;
  }
  function insert(target2, node, anchor) {
    target2.insertBefore(node, anchor || null);
  }
  function detach(node) {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }
  function element(name) {
    return document.createElement(name);
  }
  function text(data) {
    return document.createTextNode(data);
  }
  function space() {
    return text(" ");
  }
  function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
  }
  function attr(node, attribute, value) {
    if (value == null)
      node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
      node.setAttribute(attribute, value);
  }
  function children(element2) {
    return Array.from(element2.childNodes);
  }
  function set_data(text2, data) {
    data = "" + data;
    if (text2.data === data)
      return;
    text2.data = /** @type {string} */
    data;
  }
  function set_input_value(input, value) {
    input.value = value == null ? "" : value;
  }
  function set_style(node, key, value, important) {
    if (value == null) {
      node.style.removeProperty(key);
    } else {
      node.style.setProperty(key, value, important ? "important" : "");
    }
  }
  function get_custom_elements_slots(element2) {
    const result = {};
    element2.childNodes.forEach(
      /** @param {Element} node */
      (node) => {
        result[node.slot || "default"] = true;
      }
    );
    return result;
  }

  // ../core/node_modules/svelte/src/runtime/internal/lifecycle.js
  var current_component;
  function set_current_component(component) {
    current_component = component;
  }
  function get_current_component() {
    if (!current_component)
      throw new Error("Function called outside component initialization");
    return current_component;
  }
  function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
  }
  function getContext(key) {
    return get_current_component().$$.context.get(key);
  }

  // ../core/node_modules/svelte/src/runtime/internal/scheduler.js
  var dirty_components = [];
  var binding_callbacks = [];
  var render_callbacks = [];
  var flush_callbacks = [];
  var resolved_promise = /* @__PURE__ */ Promise.resolve();
  var update_scheduled = false;
  function schedule_update() {
    if (!update_scheduled) {
      update_scheduled = true;
      resolved_promise.then(flush);
    }
  }
  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }
  var seen_callbacks = /* @__PURE__ */ new Set();
  var flushidx = 0;
  function flush() {
    if (flushidx !== 0) {
      return;
    }
    const saved_component = current_component;
    do {
      try {
        while (flushidx < dirty_components.length) {
          const component = dirty_components[flushidx];
          flushidx++;
          set_current_component(component);
          update(component.$$);
        }
      } catch (e) {
        dirty_components.length = 0;
        flushidx = 0;
        throw e;
      }
      set_current_component(null);
      dirty_components.length = 0;
      flushidx = 0;
      while (binding_callbacks.length)
        binding_callbacks.pop()();
      for (let i = 0; i < render_callbacks.length; i += 1) {
        const callback = render_callbacks[i];
        if (!seen_callbacks.has(callback)) {
          seen_callbacks.add(callback);
          callback();
        }
      }
      render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
  }
  function update($$) {
    if ($$.fragment !== null) {
      $$.update();
      run_all($$.before_update);
      const dirty = $$.dirty;
      $$.dirty = [-1];
      $$.fragment && $$.fragment.p($$.ctx, dirty);
      $$.after_update.forEach(add_render_callback);
    }
  }
  function flush_render_callbacks(fns) {
    const filtered = [];
    const targets = [];
    render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
    targets.forEach((c) => c());
    render_callbacks = filtered;
  }

  // ../core/node_modules/svelte/src/runtime/internal/transitions.js
  var outroing = /* @__PURE__ */ new Set();
  function transition_in(block, local) {
    if (block && block.i) {
      outroing.delete(block);
      block.i(local);
    }
  }

  // ../core/node_modules/svelte/src/shared/boolean_attributes.js
  var _boolean_attributes = (
    /** @type {const} */
    [
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "inert",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ]
  );
  var boolean_attributes = /* @__PURE__ */ new Set([..._boolean_attributes]);

  // ../core/node_modules/svelte/src/runtime/internal/Component.js
  function mount_component(component, target2, anchor) {
    const { fragment, after_update } = component.$$;
    fragment && fragment.m(target2, anchor);
    add_render_callback(() => {
      const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
      if (component.$$.on_destroy) {
        component.$$.on_destroy.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
      flush_render_callbacks($$.after_update);
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching);
      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }
  function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
      dirty_components.push(component);
      schedule_update();
      component.$$.dirty.fill(0);
    }
    component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
  }
  function init(component, options, instance3, create_fragment3, not_equal, props, append_styles2 = null, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
      fragment: null,
      ctx: [],
      // state
      props,
      update: noop,
      not_equal,
      bound: blank_object(),
      // lifecycle
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
      // everything else
      callbacks: blank_object(),
      dirty,
      skip_bound: false,
      root: options.target || parent_component.$$.root
    };
    append_styles2 && append_styles2($$.root);
    let ready = false;
    $$.ctx = instance3 ? instance3(component, options.props || {}, (i, ret, ...rest) => {
      const value = rest.length ? rest[0] : ret;
      if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
        if (!$$.skip_bound && $$.bound[i])
          $$.bound[i](value);
        if (ready)
          make_dirty(component, i);
      }
      return ret;
    }) : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    $$.fragment = create_fragment3 ? create_fragment3($$.ctx) : false;
    if (options.target) {
      if (options.hydrate) {
        start_hydrating();
        const nodes = children(options.target);
        $$.fragment && $$.fragment.l(nodes);
        nodes.forEach(detach);
      } else {
        $$.fragment && $$.fragment.c();
      }
      if (options.intro)
        transition_in(component.$$.fragment);
      mount_component(component, options.target, options.anchor);
      end_hydrating();
      flush();
    }
    set_current_component(parent_component);
  }
  var SvelteElement;
  if (typeof HTMLElement === "function") {
    SvelteElement = class extends HTMLElement {
      /** The Svelte component constructor */
      $$ctor;
      /** Slots */
      $$s;
      /** The Svelte component instance */
      $$c;
      /** Whether or not the custom element is connected */
      $$cn = false;
      /** Component props data */
      $$d = {};
      /** `true` if currently in the process of reflecting component props back to attributes */
      $$r = false;
      /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
      $$p_d = {};
      /** @type {Record<string, Function[]>} Event listeners */
      $$l = {};
      /** @type {Map<Function, Function>} Event listener unsubscribe functions */
      $$l_u = /* @__PURE__ */ new Map();
      constructor($$componentCtor, $$slots, use_shadow_dom) {
        super();
        this.$$ctor = $$componentCtor;
        this.$$s = $$slots;
        if (use_shadow_dom) {
          this.attachShadow({ mode: "open" });
        }
      }
      addEventListener(type, listener, options) {
        this.$$l[type] = this.$$l[type] || [];
        this.$$l[type].push(listener);
        if (this.$$c) {
          const unsub = this.$$c.$on(type, listener);
          this.$$l_u.set(listener, unsub);
        }
        super.addEventListener(type, listener, options);
      }
      removeEventListener(type, listener, options) {
        super.removeEventListener(type, listener, options);
        if (this.$$c) {
          const unsub = this.$$l_u.get(listener);
          if (unsub) {
            unsub();
            this.$$l_u.delete(listener);
          }
        }
      }
      async connectedCallback() {
        this.$$cn = true;
        if (!this.$$c) {
          let create_slot = function(name) {
            return () => {
              let node;
              const obj = {
                c: function create() {
                  node = element("slot");
                  if (name !== "default") {
                    attr(node, "name", name);
                  }
                },
                /**
                 * @param {HTMLElement} target
                 * @param {HTMLElement} [anchor]
                 */
                m: function mount(target2, anchor) {
                  insert(target2, node, anchor);
                },
                d: function destroy(detaching) {
                  if (detaching) {
                    detach(node);
                  }
                }
              };
              return obj;
            };
          };
          await Promise.resolve();
          if (!this.$$cn || this.$$c) {
            return;
          }
          const $$slots = {};
          const existing_slots = get_custom_elements_slots(this);
          for (const name of this.$$s) {
            if (name in existing_slots) {
              $$slots[name] = [create_slot(name)];
            }
          }
          for (const attribute of this.attributes) {
            const name = this.$$g_p(attribute.name);
            if (!(name in this.$$d)) {
              this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, "toProp");
            }
          }
          for (const key in this.$$p_d) {
            if (!(key in this.$$d) && this[key] !== void 0) {
              this.$$d[key] = this[key];
              delete this[key];
            }
          }
          this.$$c = new this.$$ctor({
            target: this.shadowRoot || this,
            props: {
              ...this.$$d,
              $$slots,
              $$scope: {
                ctx: []
              }
            }
          });
          const reflect_attributes = () => {
            this.$$r = true;
            for (const key in this.$$p_d) {
              this.$$d[key] = this.$$c.$$.ctx[this.$$c.$$.props[key]];
              if (this.$$p_d[key].reflect) {
                const attribute_value = get_custom_element_value(
                  key,
                  this.$$d[key],
                  this.$$p_d,
                  "toAttribute"
                );
                if (attribute_value == null) {
                  this.removeAttribute(this.$$p_d[key].attribute || key);
                } else {
                  this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
                }
              }
            }
            this.$$r = false;
          };
          this.$$c.$$.after_update.push(reflect_attributes);
          reflect_attributes();
          for (const type in this.$$l) {
            for (const listener of this.$$l[type]) {
              const unsub = this.$$c.$on(type, listener);
              this.$$l_u.set(listener, unsub);
            }
          }
          this.$$l = {};
        }
      }
      // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
      // and setting attributes through setAttribute etc, this is helpful
      attributeChangedCallback(attr2, _oldValue, newValue) {
        if (this.$$r)
          return;
        attr2 = this.$$g_p(attr2);
        this.$$d[attr2] = get_custom_element_value(attr2, newValue, this.$$p_d, "toProp");
        this.$$c?.$set({ [attr2]: this.$$d[attr2] });
      }
      disconnectedCallback() {
        this.$$cn = false;
        Promise.resolve().then(() => {
          if (!this.$$cn && this.$$c) {
            this.$$c.$destroy();
            this.$$c = void 0;
          }
        });
      }
      $$g_p(attribute_name) {
        return Object.keys(this.$$p_d).find(
          (key) => this.$$p_d[key].attribute === attribute_name || !this.$$p_d[key].attribute && key.toLowerCase() === attribute_name
        ) || attribute_name;
      }
    };
  }
  function get_custom_element_value(prop, value, props_definition, transform) {
    const type = props_definition[prop]?.type;
    value = type === "Boolean" && typeof value !== "boolean" ? value != null : value;
    if (!transform || !props_definition[prop]) {
      return value;
    } else if (transform === "toAttribute") {
      switch (type) {
        case "Object":
        case "Array":
          return value == null ? null : JSON.stringify(value);
        case "Boolean":
          return value ? "" : null;
        case "Number":
          return value == null ? null : value;
        default:
          return value;
      }
    } else {
      switch (type) {
        case "Object":
        case "Array":
          return value && JSON.parse(value);
        case "Boolean":
          return value;
        case "Number":
          return value != null ? +value : value;
        default:
          return value;
      }
    }
  }
  var SvelteComponent = class {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    $$ = void 0;
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    $$set = void 0;
    /** @returns {void} */
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    /**
     * @template {Extract<keyof Events, string>} K
     * @param {K} type
     * @param {((e: Events[K]) => void) | null | undefined} callback
     * @returns {() => void}
     */
    $on(type, callback) {
      if (!is_function(callback)) {
        return noop;
      }
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1)
          callbacks.splice(index, 1);
      };
    }
    /**
     * @param {Partial<Props>} props
     * @returns {void}
     */
    $set(props) {
      if (this.$$set && !is_empty(props)) {
        this.$$.skip_bound = true;
        this.$$set(props);
        this.$$.skip_bound = false;
      }
    }
  };

  // ../core/node_modules/svelte/src/shared/version.js
  var PUBLIC_VERSION = "4";

  // ../core/src/compute-indication.ts
  function computeIndication(myCharacter, game) {
    if (myCharacter === null) {
      return "";
    }
    if (game === null) {
      return "";
    }
    switch (game.state) {
      case "WaitingPlayerB" /* WaitingPlayerB */:
        return "Attente d'un deuxieme joueur";
      case "Matte" /* Matte */:
        switch (myCharacter) {
          case "PlayerA" /* PlayerA */:
          case "PlayerB" /* PlayerB */:
            return "Attendez...";
          default:
            return "";
        }
      case "AWins" /* AWins */:
        switch (myCharacter) {
          case "PlayerA" /* PlayerA */:
            return "Vous gagnez !";
          case "PlayerB" /* PlayerB */:
            return "Vous perdez !";
          default:
            return "";
        }
      case "BWins" /* BWins */:
        switch (myCharacter) {
          case "PlayerA" /* PlayerA */:
            return "Vous perdez !";
          case "PlayerB" /* PlayerB */:
            return "Vous gagnez !";
          default:
            return "";
        }
      case "AWinsByFault" /* AWinsByFault */:
        switch (myCharacter) {
          case "PlayerA" /* PlayerA */:
            return "Gagn\xE9 ! L'adversaire a frapp\xE9 trop t\xF4t !";
          case "PlayerB" /* PlayerB */:
            return "Perdu ! vous frappez trop t\xF4t !";
          default:
            return "";
        }
      case "BWinsByFault" /* BWinsByFault */:
        switch (myCharacter) {
          case "PlayerA" /* PlayerA */:
            return "Perdu ! vous frappez trop t\xF4t !";
          case "PlayerB" /* PlayerB */:
            return "Gagn\xE9 ! L'adversaire a frapp\xE9 trop t\xF4t !";
          default:
            return "";
        }
      default:
        return "";
    }
  }

  // ../core/node_modules/tslib/tslib.es6.mjs
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }
  function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1)
        throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f)
        throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _)
        try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  }
  function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m)
      return m.call(o);
    if (o && typeof o.length === "number")
      return {
        next: function() {
          if (o && i >= o.length)
            o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  }
  function __spreadArray(to, from2, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from2.length, ar; i < l; i++) {
        if (ar || !(i in from2)) {
          if (!ar)
            ar = Array.prototype.slice.call(from2, 0, i);
          ar[i] = from2[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from2));
  }
  function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
  }
  function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
      return this;
    }, i;
    function verb(n) {
      if (g[n])
        i[n] = function(v) {
          return new Promise(function(a, b) {
            q.push([n, v, a, b]) > 1 || resume(n, v);
          });
        };
    }
    function resume(n, v) {
      try {
        step(g[n](v));
      } catch (e) {
        settle(q[0][3], e);
      }
    }
    function step(r) {
      r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
      resume("next", value);
    }
    function reject(value) {
      resume("throw", value);
    }
    function settle(f, v) {
      if (f(v), q.shift(), q.length)
        resume(q[0][0], q[0][1]);
    }
  }
  function __asyncValues(o) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
      return this;
    }, i);
    function verb(n) {
      i[n] = o[n] && function(v) {
        return new Promise(function(resolve, reject) {
          v = o[n](v), settle(resolve, reject, v.done, v.value);
        });
      };
    }
    function settle(resolve, reject, d, v) {
      Promise.resolve(v).then(function(v2) {
        resolve({ value: v2, done: d });
      }, reject);
    }
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/isFunction.js
  function isFunction(value) {
    return typeof value === "function";
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js
  function createErrorClass(createImpl) {
    var _super = function(instance3) {
      Error.call(instance3);
      instance3.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js
  var UnsubscriptionError = createErrorClass(function(_super) {
    return function UnsubscriptionErrorImpl(errors) {
      _super(this);
      this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
        return i + 1 + ") " + err.toString();
      }).join("\n  ") : "";
      this.name = "UnsubscriptionError";
      this.errors = errors;
    };
  });

  // ../core/node_modules/rxjs/dist/esm5/internal/util/arrRemove.js
  function arrRemove(arr, item) {
    if (arr) {
      var index = arr.indexOf(item);
      0 <= index && arr.splice(index, 1);
    }
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/Subscription.js
  var Subscription = function() {
    function Subscription6(initialTeardown) {
      this.initialTeardown = initialTeardown;
      this.closed = false;
      this._parentage = null;
      this._finalizers = null;
    }
    Subscription6.prototype.unsubscribe = function() {
      var e_1, _a, e_2, _b;
      var errors;
      if (!this.closed) {
        this.closed = true;
        var _parentage = this._parentage;
        if (_parentage) {
          this._parentage = null;
          if (Array.isArray(_parentage)) {
            try {
              for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                var parent_1 = _parentage_1_1.value;
                parent_1.remove(this);
              }
            } catch (e_1_1) {
              e_1 = { error: e_1_1 };
            } finally {
              try {
                if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return))
                  _a.call(_parentage_1);
              } finally {
                if (e_1)
                  throw e_1.error;
              }
            }
          } else {
            _parentage.remove(this);
          }
        }
        var initialFinalizer = this.initialTeardown;
        if (isFunction(initialFinalizer)) {
          try {
            initialFinalizer();
          } catch (e) {
            errors = e instanceof UnsubscriptionError ? e.errors : [e];
          }
        }
        var _finalizers = this._finalizers;
        if (_finalizers) {
          this._finalizers = null;
          try {
            for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
              var finalizer = _finalizers_1_1.value;
              try {
                execFinalizer(finalizer);
              } catch (err) {
                errors = errors !== null && errors !== void 0 ? errors : [];
                if (err instanceof UnsubscriptionError) {
                  errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                } else {
                  errors.push(err);
                }
              }
            }
          } catch (e_2_1) {
            e_2 = { error: e_2_1 };
          } finally {
            try {
              if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return))
                _b.call(_finalizers_1);
            } finally {
              if (e_2)
                throw e_2.error;
            }
          }
        }
        if (errors) {
          throw new UnsubscriptionError(errors);
        }
      }
    };
    Subscription6.prototype.add = function(teardown) {
      var _a;
      if (teardown && teardown !== this) {
        if (this.closed) {
          execFinalizer(teardown);
        } else {
          if (teardown instanceof Subscription6) {
            if (teardown.closed || teardown._hasParent(this)) {
              return;
            }
            teardown._addParent(this);
          }
          (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
        }
      }
    };
    Subscription6.prototype._hasParent = function(parent) {
      var _parentage = this._parentage;
      return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
    };
    Subscription6.prototype._addParent = function(parent) {
      var _parentage = this._parentage;
      this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription6.prototype._removeParent = function(parent) {
      var _parentage = this._parentage;
      if (_parentage === parent) {
        this._parentage = null;
      } else if (Array.isArray(_parentage)) {
        arrRemove(_parentage, parent);
      }
    };
    Subscription6.prototype.remove = function(teardown) {
      var _finalizers = this._finalizers;
      _finalizers && arrRemove(_finalizers, teardown);
      if (teardown instanceof Subscription6) {
        teardown._removeParent(this);
      }
    };
    Subscription6.EMPTY = function() {
      var empty = new Subscription6();
      empty.closed = true;
      return empty;
    }();
    return Subscription6;
  }();
  var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
  function isSubscription(value) {
    return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
  }
  function execFinalizer(finalizer) {
    if (isFunction(finalizer)) {
      finalizer();
    } else {
      finalizer.unsubscribe();
    }
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/config.js
  var config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false
  };

  // ../core/node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js
  var timeoutProvider = {
    setTimeout: function(handler, timeout) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      var delegate = timeoutProvider.delegate;
      if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
        return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout], __read(args)));
      }
      return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
    },
    clearTimeout: function(handle) {
      var delegate = timeoutProvider.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: void 0
  };

  // ../core/node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js
  function reportUnhandledError(err) {
    timeoutProvider.setTimeout(function() {
      var onUnhandledError = config.onUnhandledError;
      if (onUnhandledError) {
        onUnhandledError(err);
      } else {
        throw err;
      }
    });
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/noop.js
  function noop2() {
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/NotificationFactories.js
  var COMPLETE_NOTIFICATION = function() {
    return createNotification("C", void 0, void 0);
  }();
  function errorNotification(error) {
    return createNotification("E", void 0, error);
  }
  function nextNotification(value) {
    return createNotification("N", value, void 0);
  }
  function createNotification(kind, value, error) {
    return {
      kind,
      value,
      error
    };
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/errorContext.js
  var context = null;
  function errorContext(cb) {
    if (config.useDeprecatedSynchronousErrorHandling) {
      var isRoot = !context;
      if (isRoot) {
        context = { errorThrown: false, error: null };
      }
      cb();
      if (isRoot) {
        var _a = context, errorThrown = _a.errorThrown, error = _a.error;
        context = null;
        if (errorThrown) {
          throw error;
        }
      }
    } else {
      cb();
    }
  }
  function captureError(err) {
    if (config.useDeprecatedSynchronousErrorHandling && context) {
      context.errorThrown = true;
      context.error = err;
    }
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/Subscriber.js
  var Subscriber = function(_super) {
    __extends(Subscriber3, _super);
    function Subscriber3(destination) {
      var _this = _super.call(this) || this;
      _this.isStopped = false;
      if (destination) {
        _this.destination = destination;
        if (isSubscription(destination)) {
          destination.add(_this);
        }
      } else {
        _this.destination = EMPTY_OBSERVER;
      }
      return _this;
    }
    Subscriber3.create = function(next, error, complete) {
      return new SafeSubscriber(next, error, complete);
    };
    Subscriber3.prototype.next = function(value) {
      if (this.isStopped) {
        handleStoppedNotification(nextNotification(value), this);
      } else {
        this._next(value);
      }
    };
    Subscriber3.prototype.error = function(err) {
      if (this.isStopped) {
        handleStoppedNotification(errorNotification(err), this);
      } else {
        this.isStopped = true;
        this._error(err);
      }
    };
    Subscriber3.prototype.complete = function() {
      if (this.isStopped) {
        handleStoppedNotification(COMPLETE_NOTIFICATION, this);
      } else {
        this.isStopped = true;
        this._complete();
      }
    };
    Subscriber3.prototype.unsubscribe = function() {
      if (!this.closed) {
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
        this.destination = null;
      }
    };
    Subscriber3.prototype._next = function(value) {
      this.destination.next(value);
    };
    Subscriber3.prototype._error = function(err) {
      try {
        this.destination.error(err);
      } finally {
        this.unsubscribe();
      }
    };
    Subscriber3.prototype._complete = function() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    };
    return Subscriber3;
  }(Subscription);
  var _bind = Function.prototype.bind;
  function bind(fn, thisArg) {
    return _bind.call(fn, thisArg);
  }
  var ConsumerObserver = function() {
    function ConsumerObserver3(partialObserver) {
      this.partialObserver = partialObserver;
    }
    ConsumerObserver3.prototype.next = function(value) {
      var partialObserver = this.partialObserver;
      if (partialObserver.next) {
        try {
          partialObserver.next(value);
        } catch (error) {
          handleUnhandledError(error);
        }
      }
    };
    ConsumerObserver3.prototype.error = function(err) {
      var partialObserver = this.partialObserver;
      if (partialObserver.error) {
        try {
          partialObserver.error(err);
        } catch (error) {
          handleUnhandledError(error);
        }
      } else {
        handleUnhandledError(err);
      }
    };
    ConsumerObserver3.prototype.complete = function() {
      var partialObserver = this.partialObserver;
      if (partialObserver.complete) {
        try {
          partialObserver.complete();
        } catch (error) {
          handleUnhandledError(error);
        }
      }
    };
    return ConsumerObserver3;
  }();
  var SafeSubscriber = function(_super) {
    __extends(SafeSubscriber3, _super);
    function SafeSubscriber3(observerOrNext, error, complete) {
      var _this = _super.call(this) || this;
      var partialObserver;
      if (isFunction(observerOrNext) || !observerOrNext) {
        partialObserver = {
          next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
          error: error !== null && error !== void 0 ? error : void 0,
          complete: complete !== null && complete !== void 0 ? complete : void 0
        };
      } else {
        var context_1;
        if (_this && config.useDeprecatedNextContext) {
          context_1 = Object.create(observerOrNext);
          context_1.unsubscribe = function() {
            return _this.unsubscribe();
          };
          partialObserver = {
            next: observerOrNext.next && bind(observerOrNext.next, context_1),
            error: observerOrNext.error && bind(observerOrNext.error, context_1),
            complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
          };
        } else {
          partialObserver = observerOrNext;
        }
      }
      _this.destination = new ConsumerObserver(partialObserver);
      return _this;
    }
    return SafeSubscriber3;
  }(Subscriber);
  function handleUnhandledError(error) {
    if (config.useDeprecatedSynchronousErrorHandling) {
      captureError(error);
    } else {
      reportUnhandledError(error);
    }
  }
  function defaultErrorHandler(err) {
    throw err;
  }
  function handleStoppedNotification(notification, subscriber) {
    var onStoppedNotification = config.onStoppedNotification;
    onStoppedNotification && timeoutProvider.setTimeout(function() {
      return onStoppedNotification(notification, subscriber);
    });
  }
  var EMPTY_OBSERVER = {
    closed: true,
    next: noop2,
    error: defaultErrorHandler,
    complete: noop2
  };

  // ../core/node_modules/rxjs/dist/esm5/internal/symbol/observable.js
  var observable = function() {
    return typeof Symbol === "function" && Symbol.observable || "@@observable";
  }();

  // ../core/node_modules/rxjs/dist/esm5/internal/util/identity.js
  function identity2(x) {
    return x;
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/pipe.js
  function pipeFromArray(fns) {
    if (fns.length === 0) {
      return identity2;
    }
    if (fns.length === 1) {
      return fns[0];
    }
    return function piped(input) {
      return fns.reduce(function(prev, fn) {
        return fn(prev);
      }, input);
    };
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/Observable.js
  var Observable = function() {
    function Observable10(subscribe) {
      if (subscribe) {
        this._subscribe = subscribe;
      }
    }
    Observable10.prototype.lift = function(operator) {
      var observable3 = new Observable10();
      observable3.source = this;
      observable3.operator = operator;
      return observable3;
    };
    Observable10.prototype.subscribe = function(observerOrNext, error, complete) {
      var _this = this;
      var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
      errorContext(function() {
        var _a = _this, operator = _a.operator, source = _a.source;
        subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
      });
      return subscriber;
    };
    Observable10.prototype._trySubscribe = function(sink) {
      try {
        return this._subscribe(sink);
      } catch (err) {
        sink.error(err);
      }
    };
    Observable10.prototype.forEach = function(next, promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var subscriber = new SafeSubscriber({
          next: function(value) {
            try {
              next(value);
            } catch (err) {
              reject(err);
              subscriber.unsubscribe();
            }
          },
          error: reject,
          complete: resolve
        });
        _this.subscribe(subscriber);
      });
    };
    Observable10.prototype._subscribe = function(subscriber) {
      var _a;
      return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable10.prototype[observable] = function() {
      return this;
    };
    Observable10.prototype.pipe = function() {
      var operations = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        operations[_i] = arguments[_i];
      }
      return pipeFromArray(operations)(this);
    };
    Observable10.prototype.toPromise = function(promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var value;
        _this.subscribe(function(x) {
          return value = x;
        }, function(err) {
          return reject(err);
        }, function() {
          return resolve(value);
        });
      });
    };
    Observable10.create = function(subscribe) {
      return new Observable10(subscribe);
    };
    return Observable10;
  }();
  function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
  }
  function isObserver(value) {
    return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
  }
  function isSubscriber(value) {
    return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/lift.js
  function hasLift(source) {
    return isFunction(source === null || source === void 0 ? void 0 : source.lift);
  }
  function operate(init2) {
    return function(source) {
      if (hasLift(source)) {
        return source.lift(function(liftedSource) {
          try {
            return init2(liftedSource, this);
          } catch (err) {
            this.error(err);
          }
        });
      }
      throw new TypeError("Unable to lift unknown Observable type");
    };
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js
  function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
  }
  var OperatorSubscriber = function(_super) {
    __extends(OperatorSubscriber3, _super);
    function OperatorSubscriber3(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
      var _this = _super.call(this, destination) || this;
      _this.onFinalize = onFinalize;
      _this.shouldUnsubscribe = shouldUnsubscribe;
      _this._next = onNext ? function(value) {
        try {
          onNext(value);
        } catch (err) {
          destination.error(err);
        }
      } : _super.prototype._next;
      _this._error = onError ? function(err) {
        try {
          onError(err);
        } catch (err2) {
          destination.error(err2);
        } finally {
          this.unsubscribe();
        }
      } : _super.prototype._error;
      _this._complete = onComplete ? function() {
        try {
          onComplete();
        } catch (err) {
          destination.error(err);
        } finally {
          this.unsubscribe();
        }
      } : _super.prototype._complete;
      return _this;
    }
    OperatorSubscriber3.prototype.unsubscribe = function() {
      var _a;
      if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
        var closed_1 = this.closed;
        _super.prototype.unsubscribe.call(this);
        !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
      }
    };
    return OperatorSubscriber3;
  }(Subscriber);

  // ../core/node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js
  var ObjectUnsubscribedError = createErrorClass(function(_super) {
    return function ObjectUnsubscribedErrorImpl() {
      _super(this);
      this.name = "ObjectUnsubscribedError";
      this.message = "object unsubscribed";
    };
  });

  // ../core/node_modules/rxjs/dist/esm5/internal/Subject.js
  var Subject = function(_super) {
    __extends(Subject3, _super);
    function Subject3() {
      var _this = _super.call(this) || this;
      _this.closed = false;
      _this.currentObservers = null;
      _this.observers = [];
      _this.isStopped = false;
      _this.hasError = false;
      _this.thrownError = null;
      return _this;
    }
    Subject3.prototype.lift = function(operator) {
      var subject = new AnonymousSubject(this, this);
      subject.operator = operator;
      return subject;
    };
    Subject3.prototype._throwIfClosed = function() {
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      }
    };
    Subject3.prototype.next = function(value) {
      var _this = this;
      errorContext(function() {
        var e_1, _a;
        _this._throwIfClosed();
        if (!_this.isStopped) {
          if (!_this.currentObservers) {
            _this.currentObservers = Array.from(_this.observers);
          }
          try {
            for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
              var observer = _c.value;
              observer.next(value);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_c && !_c.done && (_a = _b.return))
                _a.call(_b);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
        }
      });
    };
    Subject3.prototype.error = function(err) {
      var _this = this;
      errorContext(function() {
        _this._throwIfClosed();
        if (!_this.isStopped) {
          _this.hasError = _this.isStopped = true;
          _this.thrownError = err;
          var observers = _this.observers;
          while (observers.length) {
            observers.shift().error(err);
          }
        }
      });
    };
    Subject3.prototype.complete = function() {
      var _this = this;
      errorContext(function() {
        _this._throwIfClosed();
        if (!_this.isStopped) {
          _this.isStopped = true;
          var observers = _this.observers;
          while (observers.length) {
            observers.shift().complete();
          }
        }
      });
    };
    Subject3.prototype.unsubscribe = function() {
      this.isStopped = this.closed = true;
      this.observers = this.currentObservers = null;
    };
    Object.defineProperty(Subject3.prototype, "observed", {
      get: function() {
        var _a;
        return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
      },
      enumerable: false,
      configurable: true
    });
    Subject3.prototype._trySubscribe = function(subscriber) {
      this._throwIfClosed();
      return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject3.prototype._subscribe = function(subscriber) {
      this._throwIfClosed();
      this._checkFinalizedStatuses(subscriber);
      return this._innerSubscribe(subscriber);
    };
    Subject3.prototype._innerSubscribe = function(subscriber) {
      var _this = this;
      var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
      if (hasError || isStopped) {
        return EMPTY_SUBSCRIPTION;
      }
      this.currentObservers = null;
      observers.push(subscriber);
      return new Subscription(function() {
        _this.currentObservers = null;
        arrRemove(observers, subscriber);
      });
    };
    Subject3.prototype._checkFinalizedStatuses = function(subscriber) {
      var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
      if (hasError) {
        subscriber.error(thrownError);
      } else if (isStopped) {
        subscriber.complete();
      }
    };
    Subject3.prototype.asObservable = function() {
      var observable3 = new Observable();
      observable3.source = this;
      return observable3;
    };
    Subject3.create = function(destination, source) {
      return new AnonymousSubject(destination, source);
    };
    return Subject3;
  }(Observable);
  var AnonymousSubject = function(_super) {
    __extends(AnonymousSubject3, _super);
    function AnonymousSubject3(destination, source) {
      var _this = _super.call(this) || this;
      _this.destination = destination;
      _this.source = source;
      return _this;
    }
    AnonymousSubject3.prototype.next = function(value) {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject3.prototype.error = function(err) {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject3.prototype.complete = function() {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject3.prototype._subscribe = function(subscriber) {
      var _a, _b;
      return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject3;
  }(Subject);

  // ../core/node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js
  var dateTimestampProvider = {
    now: function() {
      return (dateTimestampProvider.delegate || Date).now();
    },
    delegate: void 0
  };

  // ../core/node_modules/rxjs/dist/esm5/internal/scheduler/Action.js
  var Action = function(_super) {
    __extends(Action2, _super);
    function Action2(scheduler, work) {
      return _super.call(this) || this;
    }
    Action2.prototype.schedule = function(state, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      return this;
    };
    return Action2;
  }(Subscription);

  // ../core/node_modules/rxjs/dist/esm5/internal/scheduler/intervalProvider.js
  var intervalProvider = {
    setInterval: function(handler, timeout) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      var delegate = intervalProvider.delegate;
      if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
        return delegate.setInterval.apply(delegate, __spreadArray([handler, timeout], __read(args)));
      }
      return setInterval.apply(void 0, __spreadArray([handler, timeout], __read(args)));
    },
    clearInterval: function(handle) {
      var delegate = intervalProvider.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
    },
    delegate: void 0
  };

  // ../core/node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js
  var AsyncAction = function(_super) {
    __extends(AsyncAction2, _super);
    function AsyncAction2(scheduler, work) {
      var _this = _super.call(this, scheduler, work) || this;
      _this.scheduler = scheduler;
      _this.work = work;
      _this.pending = false;
      return _this;
    }
    AsyncAction2.prototype.schedule = function(state, delay) {
      var _a;
      if (delay === void 0) {
        delay = 0;
      }
      if (this.closed) {
        return this;
      }
      this.state = state;
      var id = this.id;
      var scheduler = this.scheduler;
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, delay);
      }
      this.pending = true;
      this.delay = delay;
      this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay);
      return this;
    };
    AsyncAction2.prototype.requestAsyncId = function(scheduler, _id, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction2.prototype.recycleAsyncId = function(_scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      if (delay != null && this.delay === delay && this.pending === false) {
        return id;
      }
      if (id != null) {
        intervalProvider.clearInterval(id);
      }
      return void 0;
    };
    AsyncAction2.prototype.execute = function(state, delay) {
      if (this.closed) {
        return new Error("executing a cancelled action");
      }
      this.pending = false;
      var error = this._execute(state, delay);
      if (error) {
        return error;
      } else if (this.pending === false && this.id != null) {
        this.id = this.recycleAsyncId(this.scheduler, this.id, null);
      }
    };
    AsyncAction2.prototype._execute = function(state, _delay) {
      var errored = false;
      var errorValue;
      try {
        this.work(state);
      } catch (e) {
        errored = true;
        errorValue = e ? e : new Error("Scheduled action threw falsy error");
      }
      if (errored) {
        this.unsubscribe();
        return errorValue;
      }
    };
    AsyncAction2.prototype.unsubscribe = function() {
      if (!this.closed) {
        var _a = this, id = _a.id, scheduler = _a.scheduler;
        var actions = scheduler.actions;
        this.work = this.state = this.scheduler = null;
        this.pending = false;
        arrRemove(actions, this);
        if (id != null) {
          this.id = this.recycleAsyncId(scheduler, id, null);
        }
        this.delay = null;
        _super.prototype.unsubscribe.call(this);
      }
    };
    return AsyncAction2;
  }(Action);

  // ../core/node_modules/rxjs/dist/esm5/internal/Scheduler.js
  var Scheduler = function() {
    function Scheduler2(schedulerActionCtor, now2) {
      if (now2 === void 0) {
        now2 = Scheduler2.now;
      }
      this.schedulerActionCtor = schedulerActionCtor;
      this.now = now2;
    }
    Scheduler2.prototype.schedule = function(work, delay, state) {
      if (delay === void 0) {
        delay = 0;
      }
      return new this.schedulerActionCtor(this, work).schedule(state, delay);
    };
    Scheduler2.now = dateTimestampProvider.now;
    return Scheduler2;
  }();

  // ../core/node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js
  var AsyncScheduler = function(_super) {
    __extends(AsyncScheduler2, _super);
    function AsyncScheduler2(SchedulerAction, now2) {
      if (now2 === void 0) {
        now2 = Scheduler.now;
      }
      var _this = _super.call(this, SchedulerAction, now2) || this;
      _this.actions = [];
      _this._active = false;
      return _this;
    }
    AsyncScheduler2.prototype.flush = function(action) {
      var actions = this.actions;
      if (this._active) {
        actions.push(action);
        return;
      }
      var error;
      this._active = true;
      do {
        if (error = action.execute(action.state, action.delay)) {
          break;
        }
      } while (action = actions.shift());
      this._active = false;
      if (error) {
        while (action = actions.shift()) {
          action.unsubscribe();
        }
        throw error;
      }
    };
    return AsyncScheduler2;
  }(Scheduler);

  // ../core/node_modules/rxjs/dist/esm5/internal/scheduler/async.js
  var asyncScheduler = new AsyncScheduler(AsyncAction);
  var async = asyncScheduler;

  // ../core/node_modules/rxjs/dist/esm5/internal/observable/empty.js
  var EMPTY = new Observable(function(subscriber) {
    return subscriber.complete();
  });

  // ../core/node_modules/rxjs/dist/esm5/internal/util/isScheduler.js
  function isScheduler(value) {
    return value && isFunction(value.schedule);
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/args.js
  function last(arr) {
    return arr[arr.length - 1];
  }
  function popResultSelector(args) {
    return isFunction(last(args)) ? args.pop() : void 0;
  }
  function popScheduler(args) {
    return isScheduler(last(args)) ? args.pop() : void 0;
  }
  function popNumber(args, defaultValue) {
    return typeof last(args) === "number" ? args.pop() : defaultValue;
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js
  var isArrayLike = function(x) {
    return x && typeof x.length === "number" && typeof x !== "function";
  };

  // ../core/node_modules/rxjs/dist/esm5/internal/util/isPromise.js
  function isPromise(value) {
    return isFunction(value === null || value === void 0 ? void 0 : value.then);
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js
  function isInteropObservable(input) {
    return isFunction(input[observable]);
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js
  function isAsyncIterable(obj) {
    return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js
  function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/symbol/iterator.js
  function getSymbolIterator() {
    if (typeof Symbol !== "function" || !Symbol.iterator) {
      return "@@iterator";
    }
    return Symbol.iterator;
  }
  var iterator = getSymbolIterator();

  // ../core/node_modules/rxjs/dist/esm5/internal/util/isIterable.js
  function isIterable(input) {
    return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js
  function readableStreamLikeToAsyncGenerator(readableStream) {
    return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
      var reader, _a, value, done;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            reader = readableStream.getReader();
            _b.label = 1;
          case 1:
            _b.trys.push([1, , 9, 10]);
            _b.label = 2;
          case 2:
            if (false)
              return [3, 8];
            return [4, __await(reader.read())];
          case 3:
            _a = _b.sent(), value = _a.value, done = _a.done;
            if (!done)
              return [3, 5];
            return [4, __await(void 0)];
          case 4:
            return [2, _b.sent()];
          case 5:
            return [4, __await(value)];
          case 6:
            return [4, _b.sent()];
          case 7:
            _b.sent();
            return [3, 2];
          case 8:
            return [3, 10];
          case 9:
            reader.releaseLock();
            return [7];
          case 10:
            return [2];
        }
      });
    });
  }
  function isReadableStreamLike(obj) {
    return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js
  function innerFrom(input) {
    if (input instanceof Observable) {
      return input;
    }
    if (input != null) {
      if (isInteropObservable(input)) {
        return fromInteropObservable(input);
      }
      if (isArrayLike(input)) {
        return fromArrayLike(input);
      }
      if (isPromise(input)) {
        return fromPromise(input);
      }
      if (isAsyncIterable(input)) {
        return fromAsyncIterable(input);
      }
      if (isIterable(input)) {
        return fromIterable(input);
      }
      if (isReadableStreamLike(input)) {
        return fromReadableStreamLike(input);
      }
    }
    throw createInvalidObservableTypeError(input);
  }
  function fromInteropObservable(obj) {
    return new Observable(function(subscriber) {
      var obs = obj[observable]();
      if (isFunction(obs.subscribe)) {
        return obs.subscribe(subscriber);
      }
      throw new TypeError("Provided object does not correctly implement Symbol.observable");
    });
  }
  function fromArrayLike(array) {
    return new Observable(function(subscriber) {
      for (var i = 0; i < array.length && !subscriber.closed; i++) {
        subscriber.next(array[i]);
      }
      subscriber.complete();
    });
  }
  function fromPromise(promise) {
    return new Observable(function(subscriber) {
      promise.then(function(value) {
        if (!subscriber.closed) {
          subscriber.next(value);
          subscriber.complete();
        }
      }, function(err) {
        return subscriber.error(err);
      }).then(null, reportUnhandledError);
    });
  }
  function fromIterable(iterable) {
    return new Observable(function(subscriber) {
      var e_1, _a;
      try {
        for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
          var value = iterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return;
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return))
            _a.call(iterable_1);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
      subscriber.complete();
    });
  }
  function fromAsyncIterable(asyncIterable) {
    return new Observable(function(subscriber) {
      process(asyncIterable, subscriber).catch(function(err) {
        return subscriber.error(err);
      });
    });
  }
  function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
  }
  function process(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function() {
      var value, e_2_1;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 5, 6, 11]);
            asyncIterable_1 = __asyncValues(asyncIterable);
            _b.label = 1;
          case 1:
            return [4, asyncIterable_1.next()];
          case 2:
            if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done))
              return [3, 4];
            value = asyncIterable_1_1.value;
            subscriber.next(value);
            if (subscriber.closed) {
              return [2];
            }
            _b.label = 3;
          case 3:
            return [3, 1];
          case 4:
            return [3, 11];
          case 5:
            e_2_1 = _b.sent();
            e_2 = { error: e_2_1 };
            return [3, 11];
          case 6:
            _b.trys.push([6, , 9, 10]);
            if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return)))
              return [3, 8];
            return [4, _a.call(asyncIterable_1)];
          case 7:
            _b.sent();
            _b.label = 8;
          case 8:
            return [3, 10];
          case 9:
            if (e_2)
              throw e_2.error;
            return [7];
          case 10:
            return [7];
          case 11:
            subscriber.complete();
            return [2];
        }
      });
    });
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js
  function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
    if (delay === void 0) {
      delay = 0;
    }
    if (repeat === void 0) {
      repeat = false;
    }
    var scheduleSubscription = scheduler.schedule(function() {
      work();
      if (repeat) {
        parentSubscription.add(this.schedule(null, delay));
      } else {
        this.unsubscribe();
      }
    }, delay);
    parentSubscription.add(scheduleSubscription);
    if (!repeat) {
      return scheduleSubscription;
    }
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/operators/observeOn.js
  function observeOn(scheduler, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return operate(function(source, subscriber) {
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        return executeSchedule(subscriber, scheduler, function() {
          return subscriber.next(value);
        }, delay);
      }, function() {
        return executeSchedule(subscriber, scheduler, function() {
          return subscriber.complete();
        }, delay);
      }, function(err) {
        return executeSchedule(subscriber, scheduler, function() {
          return subscriber.error(err);
        }, delay);
      }));
    });
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js
  function subscribeOn(scheduler, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return operate(function(source, subscriber) {
      subscriber.add(scheduler.schedule(function() {
        return source.subscribe(subscriber);
      }, delay));
    });
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js
  function scheduleObservable(input, scheduler) {
    return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js
  function schedulePromise(input, scheduler) {
    return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js
  function scheduleArray(input, scheduler) {
    return new Observable(function(subscriber) {
      var i = 0;
      return scheduler.schedule(function() {
        if (i === input.length) {
          subscriber.complete();
        } else {
          subscriber.next(input[i++]);
          if (!subscriber.closed) {
            this.schedule();
          }
        }
      });
    });
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js
  function scheduleIterable(input, scheduler) {
    return new Observable(function(subscriber) {
      var iterator3;
      executeSchedule(subscriber, scheduler, function() {
        iterator3 = input[iterator]();
        executeSchedule(subscriber, scheduler, function() {
          var _a;
          var value;
          var done;
          try {
            _a = iterator3.next(), value = _a.value, done = _a.done;
          } catch (err) {
            subscriber.error(err);
            return;
          }
          if (done) {
            subscriber.complete();
          } else {
            subscriber.next(value);
          }
        }, 0, true);
      });
      return function() {
        return isFunction(iterator3 === null || iterator3 === void 0 ? void 0 : iterator3.return) && iterator3.return();
      };
    });
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js
  function scheduleAsyncIterable(input, scheduler) {
    if (!input) {
      throw new Error("Iterable cannot be null");
    }
    return new Observable(function(subscriber) {
      executeSchedule(subscriber, scheduler, function() {
        var iterator3 = input[Symbol.asyncIterator]();
        executeSchedule(subscriber, scheduler, function() {
          iterator3.next().then(function(result) {
            if (result.done) {
              subscriber.complete();
            } else {
              subscriber.next(result.value);
            }
          });
        }, 0, true);
      });
    });
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js
  function scheduleReadableStreamLike(input, scheduler) {
    return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js
  function scheduled(input, scheduler) {
    if (input != null) {
      if (isInteropObservable(input)) {
        return scheduleObservable(input, scheduler);
      }
      if (isArrayLike(input)) {
        return scheduleArray(input, scheduler);
      }
      if (isPromise(input)) {
        return schedulePromise(input, scheduler);
      }
      if (isAsyncIterable(input)) {
        return scheduleAsyncIterable(input, scheduler);
      }
      if (isIterable(input)) {
        return scheduleIterable(input, scheduler);
      }
      if (isReadableStreamLike(input)) {
        return scheduleReadableStreamLike(input, scheduler);
      }
    }
    throw createInvalidObservableTypeError(input);
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/observable/from.js
  function from(input, scheduler) {
    return scheduler ? scheduled(input, scheduler) : innerFrom(input);
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/EmptyError.js
  var EmptyError = createErrorClass(function(_super) {
    return function EmptyErrorImpl() {
      _super(this);
      this.name = "EmptyError";
      this.message = "no elements in sequence";
    };
  });

  // ../core/node_modules/rxjs/dist/esm5/internal/firstValueFrom.js
  function firstValueFrom(source, config3) {
    var hasConfig = typeof config3 === "object";
    return new Promise(function(resolve, reject) {
      var subscriber = new SafeSubscriber({
        next: function(value) {
          resolve(value);
          subscriber.unsubscribe();
        },
        error: reject,
        complete: function() {
          if (hasConfig) {
            resolve(config3.defaultValue);
          } else {
            reject(new EmptyError());
          }
        }
      });
      source.subscribe(subscriber);
    });
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/isDate.js
  function isValidDate(value) {
    return value instanceof Date && !isNaN(value);
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/operators/map.js
  function map(project, thisArg) {
    return operate(function(source, subscriber) {
      var index = 0;
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        subscriber.next(project.call(thisArg, value, index++));
      }));
    });
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js
  var isArray = Array.isArray;
  function callOrApply(fn, args) {
    return isArray(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
  }
  function mapOneOrManyArgs(fn) {
    return map(function(args) {
      return callOrApply(fn, args);
    });
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/argsArgArrayOrObject.js
  var isArray2 = Array.isArray;
  var getPrototypeOf = Object.getPrototypeOf;
  var objectProto = Object.prototype;
  var getKeys = Object.keys;
  function argsArgArrayOrObject(args) {
    if (args.length === 1) {
      var first_1 = args[0];
      if (isArray2(first_1)) {
        return { args: first_1, keys: null };
      }
      if (isPOJO(first_1)) {
        var keys = getKeys(first_1);
        return {
          args: keys.map(function(key) {
            return first_1[key];
          }),
          keys
        };
      }
    }
    return { args, keys: null };
  }
  function isPOJO(obj) {
    return obj && typeof obj === "object" && getPrototypeOf(obj) === objectProto;
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/createObject.js
  function createObject(keys, values) {
    return keys.reduce(function(result, key, i) {
      return result[key] = values[i], result;
    }, {});
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/observable/combineLatest.js
  function combineLatest() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var scheduler = popScheduler(args);
    var resultSelector = popResultSelector(args);
    var _a = argsArgArrayOrObject(args), observables = _a.args, keys = _a.keys;
    if (observables.length === 0) {
      return from([], scheduler);
    }
    var result = new Observable(combineLatestInit(observables, scheduler, keys ? function(values) {
      return createObject(keys, values);
    } : identity2));
    return resultSelector ? result.pipe(mapOneOrManyArgs(resultSelector)) : result;
  }
  function combineLatestInit(observables, scheduler, valueTransform) {
    if (valueTransform === void 0) {
      valueTransform = identity2;
    }
    return function(subscriber) {
      maybeSchedule(scheduler, function() {
        var length = observables.length;
        var values = new Array(length);
        var active = length;
        var remainingFirstValues = length;
        var _loop_1 = function(i2) {
          maybeSchedule(scheduler, function() {
            var source = from(observables[i2], scheduler);
            var hasFirstValue = false;
            source.subscribe(createOperatorSubscriber(subscriber, function(value) {
              values[i2] = value;
              if (!hasFirstValue) {
                hasFirstValue = true;
                remainingFirstValues--;
              }
              if (!remainingFirstValues) {
                subscriber.next(valueTransform(values.slice()));
              }
            }, function() {
              if (!--active) {
                subscriber.complete();
              }
            }));
          }, subscriber);
        };
        for (var i = 0; i < length; i++) {
          _loop_1(i);
        }
      }, subscriber);
    };
  }
  function maybeSchedule(scheduler, execute, subscription) {
    if (scheduler) {
      executeSchedule(subscription, scheduler, execute);
    } else {
      execute();
    }
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js
  function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
    var buffer = [];
    var active = 0;
    var index = 0;
    var isComplete = false;
    var checkComplete = function() {
      if (isComplete && !buffer.length && !active) {
        subscriber.complete();
      }
    };
    var outerNext = function(value) {
      return active < concurrent ? doInnerSub(value) : buffer.push(value);
    };
    var doInnerSub = function(value) {
      expand && subscriber.next(value);
      active++;
      var innerComplete = false;
      innerFrom(project(value, index++)).subscribe(createOperatorSubscriber(subscriber, function(innerValue) {
        onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
        if (expand) {
          outerNext(innerValue);
        } else {
          subscriber.next(innerValue);
        }
      }, function() {
        innerComplete = true;
      }, void 0, function() {
        if (innerComplete) {
          try {
            active--;
            var _loop_1 = function() {
              var bufferedValue = buffer.shift();
              if (innerSubScheduler) {
                executeSchedule(subscriber, innerSubScheduler, function() {
                  return doInnerSub(bufferedValue);
                });
              } else {
                doInnerSub(bufferedValue);
              }
            };
            while (buffer.length && active < concurrent) {
              _loop_1();
            }
            checkComplete();
          } catch (err) {
            subscriber.error(err);
          }
        }
      }));
    };
    source.subscribe(createOperatorSubscriber(subscriber, outerNext, function() {
      isComplete = true;
      checkComplete();
    }));
    return function() {
      additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
    };
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js
  function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) {
      concurrent = Infinity;
    }
    if (isFunction(resultSelector)) {
      return mergeMap(function(a, i) {
        return map(function(b, ii) {
          return resultSelector(a, b, i, ii);
        })(innerFrom(project(a, i)));
      }, concurrent);
    } else if (typeof resultSelector === "number") {
      concurrent = resultSelector;
    }
    return operate(function(source, subscriber) {
      return mergeInternals(source, subscriber, project, concurrent);
    });
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/operators/mergeAll.js
  function mergeAll(concurrent) {
    if (concurrent === void 0) {
      concurrent = Infinity;
    }
    return mergeMap(identity2, concurrent);
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/observable/timer.js
  function timer(dueTime, intervalOrScheduler, scheduler) {
    if (dueTime === void 0) {
      dueTime = 0;
    }
    if (scheduler === void 0) {
      scheduler = async;
    }
    var intervalDuration = -1;
    if (intervalOrScheduler != null) {
      if (isScheduler(intervalOrScheduler)) {
        scheduler = intervalOrScheduler;
      } else {
        intervalDuration = intervalOrScheduler;
      }
    }
    return new Observable(function(subscriber) {
      var due = isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
      if (due < 0) {
        due = 0;
      }
      var n = 0;
      return scheduler.schedule(function() {
        if (!subscriber.closed) {
          subscriber.next(n++);
          if (0 <= intervalDuration) {
            this.schedule(void 0, intervalDuration);
          } else {
            subscriber.complete();
          }
        }
      }, due);
    });
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/observable/merge.js
  function merge() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var scheduler = popScheduler(args);
    var concurrent = popNumber(args, Infinity);
    var sources = args;
    return !sources.length ? EMPTY : sources.length === 1 ? innerFrom(sources[0]) : mergeAll(concurrent)(from(sources, scheduler));
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/operators/filter.js
  function filter(predicate, thisArg) {
    return operate(function(source, subscriber) {
      var index = 0;
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        return predicate.call(thisArg, value, index++) && subscriber.next(value);
      }));
    });
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/operators/tap.js
  function tap(observerOrNext, error, complete) {
    var tapObserver = isFunction(observerOrNext) || error || complete ? { next: observerOrNext, error, complete } : observerOrNext;
    return tapObserver ? operate(function(source, subscriber) {
      var _a;
      (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
      var isUnsub = true;
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        var _a2;
        (_a2 = tapObserver.next) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, value);
        subscriber.next(value);
      }, function() {
        var _a2;
        isUnsub = false;
        (_a2 = tapObserver.complete) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
        subscriber.complete();
      }, function(err) {
        var _a2;
        isUnsub = false;
        (_a2 = tapObserver.error) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, err);
        subscriber.error(err);
      }, function() {
        var _a2, _b;
        if (isUnsub) {
          (_a2 = tapObserver.unsubscribe) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
        }
        (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
      }));
    }) : identity2;
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/operators/throttle.js
  function throttle(durationSelector, config3) {
    return operate(function(source, subscriber) {
      var _a = config3 !== null && config3 !== void 0 ? config3 : {}, _b = _a.leading, leading = _b === void 0 ? true : _b, _c = _a.trailing, trailing = _c === void 0 ? false : _c;
      var hasValue = false;
      var sendValue = null;
      var throttled = null;
      var isComplete = false;
      var endThrottling = function() {
        throttled === null || throttled === void 0 ? void 0 : throttled.unsubscribe();
        throttled = null;
        if (trailing) {
          send();
          isComplete && subscriber.complete();
        }
      };
      var cleanupThrottling = function() {
        throttled = null;
        isComplete && subscriber.complete();
      };
      var startThrottle = function(value) {
        return throttled = innerFrom(durationSelector(value)).subscribe(createOperatorSubscriber(subscriber, endThrottling, cleanupThrottling));
      };
      var send = function() {
        if (hasValue) {
          hasValue = false;
          var value = sendValue;
          sendValue = null;
          subscriber.next(value);
          !isComplete && startThrottle(value);
        }
      };
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        hasValue = true;
        sendValue = value;
        !(throttled && !throttled.closed) && (leading ? send() : startThrottle(value));
      }, function() {
        isComplete = true;
        !(trailing && hasValue && throttled && !throttled.closed) && subscriber.complete();
      }));
    });
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/operators/throttleTime.js
  function throttleTime(duration, scheduler, config3) {
    if (scheduler === void 0) {
      scheduler = asyncScheduler;
    }
    var duration$ = timer(duration, scheduler);
    return throttle(function() {
      return duration$;
    }, config3);
  }

  // ../core/node_modules/uid/dist/index.mjs
  var IDX = 256;
  var HEX = [];
  var SIZE = 256;
  var BUFFER;
  while (IDX--)
    HEX[IDX] = (IDX + 256).toString(16).substring(1);
  function uid(len) {
    var i = 0, tmp = len || 11;
    if (!BUFFER || IDX + tmp > SIZE * 2) {
      for (BUFFER = "", IDX = 0; i < SIZE; i++) {
        BUFFER += HEX[Math.random() * 256 | 0];
      }
    }
    return BUFFER.substring(IDX, IDX++ + tmp);
  }

  // ../core/src/create-client-connection.ts
  function createClientConnection(context4) {
    if (context4.config.offlineMode) {
      context4.offlineModeGameStorage = createGameStorage2();
      const [createConnection, serverConnection$] = context4.createRtcConnection();
      initiateBackendHandlers2(context4.offlineModeGameStorage, serverConnection$);
      return createConnection();
    } else {
      return context4.createWsClientConnection(
        context4.config.wsProtocol,
        context4.config.wsPort,
        context4.config.webDomain
      );
    }
  }

  // ../core/src/create-game-storage.ts
  function createGameStorage2() {
    let game = {
      state: "WaitingPlayerA" /* WaitingPlayerA */
    };
    const _game$ = new Subject();
    return {
      read() {
        return { ...game };
      },
      save(update2) {
        game = {
          ...game,
          ...update2
        };
        _game$.next(game);
      },
      watch() {
        return _game$.asObservable();
      }
    };
  }

  // ../core/node_modules/svelte/src/runtime/internal/disclose-version/index.js
  if (typeof window !== "undefined")
    (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION);

  // ../core/src/manual-rtc.svelte.js
  function add_css(target2) {
    append_styles(target2, "svelte-1r147i5", ".container.svelte-1r147i5{padding:1rem;border:1px solid black;margin:1rem}");
  }
  function create_if_block_2(ctx) {
    let div;
    let textarea;
    let t0;
    let button0;
    let t2;
    let button1;
    let mounted;
    let dispose;
    return {
      c() {
        div = element("div");
        textarea = element("textarea");
        t0 = space();
        button0 = element("button");
        button0.textContent = "Initier la connexion WebRTC";
        t2 = space();
        button1 = element("button");
        button1.textContent = "Accepter la connextion WebRTC";
        attr(textarea, "placeholder", "Entrez les serveurs STUN");
        attr(div, "class", "container svelte-1r147i5");
      },
      m(target2, anchor) {
        insert(target2, div, anchor);
        append(div, textarea);
        set_input_value(
          textarea,
          /*stunServer*/
          ctx[0]
        );
        append(div, t0);
        append(div, button0);
        append(div, t2);
        append(div, button1);
        if (!mounted) {
          dispose = [
            listen(
              textarea,
              "input",
              /*textarea_input_handler*/
              ctx[11]
            ),
            listen(
              button0,
              "click",
              /*initiateConnection*/
              ctx[8]
            ),
            listen(
              button1,
              "click",
              /*acceptConnection*/
              ctx[7]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty & /*stunServer*/
        1) {
          set_input_value(
            textarea,
            /*stunServer*/
            ctx2[0]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block_1(ctx) {
    let div;
    let button;
    let mounted;
    let dispose;
    return {
      c() {
        div = element("div");
        button = element("button");
        button.textContent = "Copier le message de signalement";
        attr(div, "class", "container svelte-1r147i5");
      },
      m(target2, anchor) {
        insert(target2, div, anchor);
        append(div, button);
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*copySignalingEventToClipBoard*/
            ctx[10]
          );
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_if_block(ctx) {
    let div;
    let textarea;
    let mounted;
    let dispose;
    return {
      c() {
        div = element("div");
        textarea = element("textarea");
        attr(textarea, "placeholder", "Recevoir un message du partenaire.");
        attr(div, "class", "container svelte-1r147i5");
      },
      m(target2, anchor) {
        insert(target2, div, anchor);
        append(div, textarea);
        set_input_value(
          textarea,
          /*receivedSignalingEvents*/
          ctx[5]
        );
        if (!mounted) {
          dispose = [
            listen(
              textarea,
              "change",
              /*receiveSignalingEvents*/
              ctx[9]
            ),
            listen(
              textarea,
              "input",
              /*textarea_input_handler_1*/
              ctx[12]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty & /*receivedSignalingEvents*/
        32) {
          set_input_value(
            textarea,
            /*receivedSignalingEvents*/
            ctx2[5]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_fragment(ctx) {
    let div;
    let h1;
    let t0;
    let t1;
    let t2;
    let t3;
    let t4;
    let t5;
    let if_block0 = !/*type*/
    ctx[6] && create_if_block_2(ctx);
    let if_block1 = (
      /*offer*/
      (ctx[1] || /*answer*/
      ctx[2] || /*iceCandidates*/
      ctx[4].length) && create_if_block_1(ctx)
    );
    let if_block2 = (
      /*type*/
      ctx[6] && /*connectionState*/
      ctx[3] !== "connected" && create_if_block(ctx)
    );
    return {
      c() {
        div = element("div");
        h1 = element("h1");
        t0 = text("Connexion RTC manuelle (");
        t1 = text(
          /*connectionState*/
          ctx[3]
        );
        t2 = text(")");
        t3 = space();
        if (if_block0)
          if_block0.c();
        t4 = space();
        if (if_block1)
          if_block1.c();
        t5 = space();
        if (if_block2)
          if_block2.c();
        set_style(div, "background-color", "white");
      },
      m(target2, anchor) {
        insert(target2, div, anchor);
        append(div, h1);
        append(h1, t0);
        append(h1, t1);
        append(h1, t2);
        append(div, t3);
        if (if_block0)
          if_block0.m(div, null);
        append(div, t4);
        if (if_block1)
          if_block1.m(div, null);
        append(div, t5);
        if (if_block2)
          if_block2.m(div, null);
      },
      p(ctx2, [dirty]) {
        if (dirty & /*connectionState*/
        8)
          set_data(
            t1,
            /*connectionState*/
            ctx2[3]
          );
        if (!/*type*/
        ctx2[6]) {
          if (if_block0) {
            if_block0.p(ctx2, dirty);
          } else {
            if_block0 = create_if_block_2(ctx2);
            if_block0.c();
            if_block0.m(div, t4);
          }
        } else if (if_block0) {
          if_block0.d(1);
          if_block0 = null;
        }
        if (
          /*offer*/
          ctx2[1] || /*answer*/
          ctx2[2] || /*iceCandidates*/
          ctx2[4].length
        ) {
          if (if_block1) {
            if_block1.p(ctx2, dirty);
          } else {
            if_block1 = create_if_block_1(ctx2);
            if_block1.c();
            if_block1.m(div, t5);
          }
        } else if (if_block1) {
          if_block1.d(1);
          if_block1 = null;
        }
        if (
          /*type*/
          ctx2[6] && /*connectionState*/
          ctx2[3] !== "connected"
        ) {
          if (if_block2) {
            if_block2.p(ctx2, dirty);
          } else {
            if_block2 = create_if_block(ctx2);
            if_block2.c();
            if_block2.m(div, null);
          }
        } else if (if_block2) {
          if_block2.d(1);
          if_block2 = null;
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        if (if_block0)
          if_block0.d();
        if (if_block1)
          if_block1.d();
        if (if_block2)
          if_block2.d();
      }
    };
  }
  function instance($$self, $$props, $$invalidate) {
    var __awaiter3 = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    let stunServer;
    let peerConnection;
    let offer;
    let answer;
    let connectionState;
    let iceCandidates = [];
    let receivedSignalingEvents;
    let sendChannel;
    let type;
    function acceptConnection() {
      $$invalidate(6, type = "b");
      if (peerConnection) {
        peerConnection.close();
      }
      $$invalidate(1, offer = void 0);
      $$invalidate(2, answer = void 0);
      $$invalidate(3, connectionState = void 0);
      $$invalidate(4, iceCandidates = []);
      sendChannel = void 0;
      peerConnection = new RTCPeerConnection(stunServer && { iceServers: [{ urls: stunServer }] });
      sendChannel = peerConnection.createDataChannel("sendDataChannel");
      peerConnection.addEventListener("connectionstatechange", function() {
        $$invalidate(3, connectionState = peerConnection.connectionState);
        if (connectionState === "connected") {
          setTimeout(
            function() {
              sendChannel.send("Ping!");
            },
            200
          );
        }
      });
      peerConnection.onicecandidate = (event) => {
        var _a;
        const candidate = (_a = event === null || event === void 0 ? void 0 : event.candidate) === null || _a === void 0 ? void 0 : _a.toJSON();
        if (candidate) {
          $$invalidate(4, iceCandidates = [...iceCandidates, candidate]);
        }
      };
      peerConnection.ondatachannel = function receiveChannelCallback(event) {
        event.channel.onmessage = function(event2) {
          console.log("Received Message: " + event2.data);
          setTimeout(
            function() {
              sendChannel.send(event2.data === "Ping!" ? "Pong!" : "Ping!");
            },
            10
          );
        };
      };
    }
    function initiateConnection() {
      return __awaiter3(this, void 0, void 0, function* () {
        $$invalidate(6, type = "a");
        if (peerConnection) {
          peerConnection.close();
        }
        $$invalidate(1, offer = void 0);
        $$invalidate(2, answer = void 0);
        $$invalidate(3, connectionState = void 0);
        $$invalidate(4, iceCandidates = []);
        sendChannel = void 0;
        peerConnection = new RTCPeerConnection(stunServer && { iceServers: [{ urls: stunServer }] });
        peerConnection.onicecandidate = (event) => {
          var _a;
          const candidate = (_a = event === null || event === void 0 ? void 0 : event.candidate) === null || _a === void 0 ? void 0 : _a.toJSON();
          if (candidate) {
            $$invalidate(4, iceCandidates = [...iceCandidates, candidate]);
          }
        };
        sendChannel = peerConnection.createDataChannel("sendDataChannel");
        peerConnection.ondatachannel = function receiveChannelCallback(event) {
          event.channel.onmessage = function(event2) {
            console.log("Received Message: " + event2.data);
            setTimeout(
              function() {
                sendChannel.send(event2.data === "Ping!" ? "Pong!" : "Ping!");
              },
              10
            );
          };
        };
        peerConnection.addEventListener("connectionstatechange", function() {
          $$invalidate(3, connectionState = peerConnection.connectionState);
          if (connectionState === "connected") {
            setTimeout(
              function() {
                sendChannel.send("Ping!");
              },
              200
            );
          }
        });
        $$invalidate(1, offer = yield peerConnection.createOffer());
        yield peerConnection.setLocalDescription(offer);
      });
    }
    function receiveSignalingEvents() {
      return __awaiter3(this, void 0, void 0, function* () {
        for (const signalingEvent of JSON.parse(receivedSignalingEvents)) {
          if (type === "b" && !answer && signalingEvent.offer) {
            yield peerConnection.setRemoteDescription(signalingEvent.offer);
          }
          if (type === "a" && signalingEvent.answer) {
            yield peerConnection.setRemoteDescription(signalingEvent.answer);
          }
        }
        for (const signalingEvent of JSON.parse(receivedSignalingEvents)) {
          if (signalingEvent.candidate) {
            yield peerConnection.addIceCandidate(signalingEvent.candidate);
          }
          if (type === "b" && !answer && signalingEvent.offer) {
            $$invalidate(2, answer = yield peerConnection.createAnswer());
            yield peerConnection.setLocalDescription(answer);
          }
        }
        $$invalidate(5, receivedSignalingEvents = void 0);
      });
    }
    function createSignalingEvents() {
      const signalingEvents = [
        ...iceCandidates.map((candidate) => ({ candidate })),
        ...offer ? [{ offer }] : [],
        ...answer ? [{ answer }] : []
      ];
      $$invalidate(1, offer = void 0);
      $$invalidate(2, answer = void 0);
      $$invalidate(4, iceCandidates = []);
      return signalingEvents;
    }
    function copySignalingEventToClipBoard() {
      const signalingEvents = createSignalingEvents();
      navigator.clipboard.writeText(JSON.stringify(signalingEvents, null, 4));
    }
    function textarea_input_handler() {
      stunServer = this.value;
      $$invalidate(0, stunServer);
    }
    function textarea_input_handler_1() {
      receivedSignalingEvents = this.value;
      $$invalidate(5, receivedSignalingEvents);
    }
    return [
      stunServer,
      offer,
      answer,
      connectionState,
      iceCandidates,
      receivedSignalingEvents,
      type,
      acceptConnection,
      initiateConnection,
      receiveSignalingEvents,
      copySignalingEventToClipBoard,
      textarea_input_handler,
      textarea_input_handler_1
    ];
  }
  var Manual_rtc = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance, create_fragment, safe_not_equal, {}, add_css);
    }
  };
  var manual_rtc_svelte_default = Manual_rtc;

  // ../core/src/playground.svelte.js
  function create_if_block_13(ctx) {
    let p;
    return {
      c() {
        p = element("p");
        p.textContent = "Disconnected from server.";
        attr(p, "class", "disconnectedFromServer");
      },
      m(target2, anchor) {
        insert(target2, p, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(p);
        }
      }
    };
  }
  function create_if_block_12(ctx) {
    let p;
    return {
      c() {
        p = element("p");
        p.textContent = "Attente d'une connexion.";
        attr(p, "class", "disconnectedFromServer");
      },
      m(target2, anchor) {
        insert(target2, p, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(p);
        }
      }
    };
  }
  function create_if_block_11(ctx) {
    let div;
    return {
      c() {
        div = element("div");
        attr(div, "aria-label", "title");
        attr(div, "class", "title");
      },
      m(target2, anchor) {
        insert(target2, div, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
      }
    };
  }
  function create_if_block2(ctx) {
    let div1;
    let div0;
    let t0;
    let t1;
    let t2;
    let t3;
    let t4;
    let t5;
    let t6;
    let t7;
    let t8;
    let t9;
    let p;
    let t10;
    let if_block0 = (
      /*game*/
      ctx[2].playerA && !/*aWins*/
      ctx[6] && !/*bWins*/
      ctx[5] && create_if_block_10(ctx)
    );
    let if_block1 = (
      /*game*/
      ctx[2].playerB && !/*aWins*/
      ctx[6] && !/*bWins*/
      ctx[5] && create_if_block_9(ctx)
    );
    let if_block2 = (
      /*game*/
      ctx[2].playerA && /*aWins*/
      ctx[6] && create_if_block_8(ctx)
    );
    let if_block3 = (
      /*game*/
      ctx[2].playerB && /*aWins*/
      ctx[6] && create_if_block_7(ctx)
    );
    let if_block4 = (
      /*game*/
      ctx[2].playerA && /*bWins*/
      ctx[5] && create_if_block_6(ctx)
    );
    let if_block5 = (
      /*game*/
      ctx[2].playerB && /*bWins*/
      ctx[5] && create_if_block_5(ctx)
    );
    let if_block6 = (
      /*game*/
      ctx[2].state === "Hajime" /* Hajime */ && create_if_block_4(ctx)
    );
    let if_block7 = (
      /*myCharacter*/
      ctx[1] === "PlayerA" /* PlayerA */ && create_if_block_3(ctx)
    );
    let if_block8 = (
      /*myCharacter*/
      ctx[1] === "PlayerB" /* PlayerB */ && create_if_block_22(ctx)
    );
    let if_block9 = (
      /*myCharacter*/
      ctx[1] === "None" /* None */ && create_if_block_14(ctx)
    );
    return {
      c() {
        div1 = element("div");
        div0 = element("div");
        if (if_block0)
          if_block0.c();
        t0 = space();
        if (if_block1)
          if_block1.c();
        t1 = space();
        if (if_block2)
          if_block2.c();
        t2 = space();
        if (if_block3)
          if_block3.c();
        t3 = space();
        if (if_block4)
          if_block4.c();
        t4 = space();
        if (if_block5)
          if_block5.c();
        t5 = space();
        if (if_block6)
          if_block6.c();
        t6 = space();
        if (if_block7)
          if_block7.c();
        t7 = space();
        if (if_block8)
          if_block8.c();
        t8 = space();
        if (if_block9)
          if_block9.c();
        t9 = space();
        p = element("p");
        t10 = text(
          /*indication*/
          ctx[4]
        );
        attr(div0, "aria-label", "player");
        attr(div0, "class", "vue-player");
        attr(p, "aria-label", "indication");
        attr(p, "class", "indication");
        attr(div1, "aria-label", "arena");
        attr(div1, "class", "arena");
      },
      m(target2, anchor) {
        insert(target2, div1, anchor);
        append(div1, div0);
        if (if_block0)
          if_block0.m(div0, null);
        append(div0, t0);
        if (if_block1)
          if_block1.m(div0, null);
        append(div0, t1);
        if (if_block2)
          if_block2.m(div0, null);
        append(div0, t2);
        if (if_block3)
          if_block3.m(div0, null);
        append(div0, t3);
        if (if_block4)
          if_block4.m(div0, null);
        append(div0, t4);
        if (if_block5)
          if_block5.m(div0, null);
        append(div1, t5);
        if (if_block6)
          if_block6.m(div1, null);
        append(div1, t6);
        if (if_block7)
          if_block7.m(div1, null);
        append(div1, t7);
        if (if_block8)
          if_block8.m(div1, null);
        append(div1, t8);
        if (if_block9)
          if_block9.m(div1, null);
        append(div1, t9);
        append(div1, p);
        append(p, t10);
      },
      p(ctx2, dirty) {
        if (
          /*game*/
          ctx2[2].playerA && !/*aWins*/
          ctx2[6] && !/*bWins*/
          ctx2[5]
        ) {
          if (if_block0) {
          } else {
            if_block0 = create_if_block_10(ctx2);
            if_block0.c();
            if_block0.m(div0, t0);
          }
        } else if (if_block0) {
          if_block0.d(1);
          if_block0 = null;
        }
        if (
          /*game*/
          ctx2[2].playerB && !/*aWins*/
          ctx2[6] && !/*bWins*/
          ctx2[5]
        ) {
          if (if_block1) {
          } else {
            if_block1 = create_if_block_9(ctx2);
            if_block1.c();
            if_block1.m(div0, t1);
          }
        } else if (if_block1) {
          if_block1.d(1);
          if_block1 = null;
        }
        if (
          /*game*/
          ctx2[2].playerA && /*aWins*/
          ctx2[6]
        ) {
          if (if_block2) {
          } else {
            if_block2 = create_if_block_8(ctx2);
            if_block2.c();
            if_block2.m(div0, t2);
          }
        } else if (if_block2) {
          if_block2.d(1);
          if_block2 = null;
        }
        if (
          /*game*/
          ctx2[2].playerB && /*aWins*/
          ctx2[6]
        ) {
          if (if_block3) {
          } else {
            if_block3 = create_if_block_7(ctx2);
            if_block3.c();
            if_block3.m(div0, t3);
          }
        } else if (if_block3) {
          if_block3.d(1);
          if_block3 = null;
        }
        if (
          /*game*/
          ctx2[2].playerA && /*bWins*/
          ctx2[5]
        ) {
          if (if_block4) {
          } else {
            if_block4 = create_if_block_6(ctx2);
            if_block4.c();
            if_block4.m(div0, t4);
          }
        } else if (if_block4) {
          if_block4.d(1);
          if_block4 = null;
        }
        if (
          /*game*/
          ctx2[2].playerB && /*bWins*/
          ctx2[5]
        ) {
          if (if_block5) {
          } else {
            if_block5 = create_if_block_5(ctx2);
            if_block5.c();
            if_block5.m(div0, null);
          }
        } else if (if_block5) {
          if_block5.d(1);
          if_block5 = null;
        }
        if (
          /*game*/
          ctx2[2].state === "Hajime" /* Hajime */
        ) {
          if (if_block6) {
          } else {
            if_block6 = create_if_block_4(ctx2);
            if_block6.c();
            if_block6.m(div1, t6);
          }
        } else if (if_block6) {
          if_block6.d(1);
          if_block6 = null;
        }
        if (
          /*myCharacter*/
          ctx2[1] === "PlayerA" /* PlayerA */
        ) {
          if (if_block7) {
          } else {
            if_block7 = create_if_block_3(ctx2);
            if_block7.c();
            if_block7.m(div1, t7);
          }
        } else if (if_block7) {
          if_block7.d(1);
          if_block7 = null;
        }
        if (
          /*myCharacter*/
          ctx2[1] === "PlayerB" /* PlayerB */
        ) {
          if (if_block8) {
          } else {
            if_block8 = create_if_block_22(ctx2);
            if_block8.c();
            if_block8.m(div1, t8);
          }
        } else if (if_block8) {
          if_block8.d(1);
          if_block8 = null;
        }
        if (
          /*myCharacter*/
          ctx2[1] === "None" /* None */
        ) {
          if (if_block9) {
          } else {
            if_block9 = create_if_block_14(ctx2);
            if_block9.c();
            if_block9.m(div1, t9);
          }
        } else if (if_block9) {
          if_block9.d(1);
          if_block9 = null;
        }
        if (dirty & /*indication*/
        16)
          set_data(
            t10,
            /*indication*/
            ctx2[4]
          );
      },
      d(detaching) {
        if (detaching) {
          detach(div1);
        }
        if (if_block0)
          if_block0.d();
        if (if_block1)
          if_block1.d();
        if (if_block2)
          if_block2.d();
        if (if_block3)
          if_block3.d();
        if (if_block4)
          if_block4.d();
        if (if_block5)
          if_block5.d();
        if (if_block6)
          if_block6.d();
        if (if_block7)
          if_block7.d();
        if (if_block8)
          if_block8.d();
        if (if_block9)
          if_block9.d();
      }
    };
  }
  function create_if_block_10(ctx) {
    let div;
    return {
      c() {
        div = element("div");
        attr(div, "aria-label", "playerA");
        attr(div, "class", "playerA");
      },
      m(target2, anchor) {
        insert(target2, div, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
      }
    };
  }
  function create_if_block_9(ctx) {
    let div;
    return {
      c() {
        div = element("div");
        attr(div, "aria-label", "playerB");
        attr(div, "class", "playerB");
      },
      m(target2, anchor) {
        insert(target2, div, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
      }
    };
  }
  function create_if_block_8(ctx) {
    let div;
    return {
      c() {
        div = element("div");
        attr(div, "class", "playerAwins");
      },
      m(target2, anchor) {
        insert(target2, div, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
      }
    };
  }
  function create_if_block_7(ctx) {
    let div;
    return {
      c() {
        div = element("div");
        attr(div, "class", "playerBloses");
      },
      m(target2, anchor) {
        insert(target2, div, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
      }
    };
  }
  function create_if_block_6(ctx) {
    let div;
    return {
      c() {
        div = element("div");
        attr(div, "class", "playerAloses");
      },
      m(target2, anchor) {
        insert(target2, div, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
      }
    };
  }
  function create_if_block_5(ctx) {
    let div;
    return {
      c() {
        div = element("div");
        attr(div, "class", "playerBwins");
      },
      m(target2, anchor) {
        insert(target2, div, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
      }
    };
  }
  function create_if_block_4(ctx) {
    let p;
    return {
      c() {
        p = element("p");
        p.textContent = "!!";
        attr(p, "aria-label", "exclamationPoints");
        attr(p, "class", "exclamationPoints");
      },
      m(target2, anchor) {
        insert(target2, p, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(p);
        }
      }
    };
  }
  function create_if_block_3(ctx) {
    let p;
    return {
      c() {
        p = element("p");
        p.textContent = "Joueur 1";
        attr(p, "class", "playerADisplay");
      },
      m(target2, anchor) {
        insert(target2, p, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(p);
        }
      }
    };
  }
  function create_if_block_22(ctx) {
    let p;
    return {
      c() {
        p = element("p");
        p.textContent = "Joueur 2";
        attr(p, "class", "playerBDisplay");
      },
      m(target2, anchor) {
        insert(target2, p, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(p);
        }
      }
    };
  }
  function create_if_block_14(ctx) {
    let p;
    return {
      c() {
        p = element("p");
        p.textContent = "Spectateur";
        attr(p, "class", "spectatorDisplay");
      },
      m(target2, anchor) {
        insert(target2, p, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(p);
        }
      }
    };
  }
  function create_fragment2(ctx) {
    let div;
    let t0;
    let t1;
    let t2;
    let mounted;
    let dispose;
    let if_block0 = (
      /*disconnected*/
      ctx[3] && create_if_block_13(ctx)
    );
    let if_block1 = !/*disconnected*/
    ctx[3] && !/*game*/
    ctx[2] && create_if_block_12(ctx);
    let if_block2 = (
      /*showTitle*/
      ctx[7] && /*game*/
      ctx[2] && create_if_block_11(ctx)
    );
    let if_block3 = !/*showTitle*/
    ctx[7] && create_if_block2(ctx);
    return {
      c() {
        div = element("div");
        if (if_block0)
          if_block0.c();
        t0 = space();
        if (if_block1)
          if_block1.c();
        t1 = space();
        if (if_block2)
          if_block2.c();
        t2 = space();
        if (if_block3)
          if_block3.c();
        attr(div, "class", "main");
        attr(
          div,
          "data-testid",
          /*dataTestid*/
          ctx[0]
        );
      },
      m(target2, anchor) {
        insert(target2, div, anchor);
        if (if_block0)
          if_block0.m(div, null);
        append(div, t0);
        if (if_block1)
          if_block1.m(div, null);
        append(div, t1);
        if (if_block2)
          if_block2.m(div, null);
        append(div, t2);
        if (if_block3)
          if_block3.m(div, null);
        if (!mounted) {
          dispose = [
            listen(
              div,
              "click",
              /*click_handler*/
              ctx[10]
            ),
            listen(
              div,
              "keydown",
              /*keydown_handler*/
              ctx[11]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (
          /*disconnected*/
          ctx2[3]
        ) {
          if (if_block0) {
          } else {
            if_block0 = create_if_block_13(ctx2);
            if_block0.c();
            if_block0.m(div, t0);
          }
        } else if (if_block0) {
          if_block0.d(1);
          if_block0 = null;
        }
        if (!/*disconnected*/
        ctx2[3] && !/*game*/
        ctx2[2]) {
          if (if_block1) {
          } else {
            if_block1 = create_if_block_12(ctx2);
            if_block1.c();
            if_block1.m(div, t1);
          }
        } else if (if_block1) {
          if_block1.d(1);
          if_block1 = null;
        }
        if (
          /*showTitle*/
          ctx2[7] && /*game*/
          ctx2[2]
        ) {
          if (if_block2) {
          } else {
            if_block2 = create_if_block_11(ctx2);
            if_block2.c();
            if_block2.m(div, t2);
          }
        } else if (if_block2) {
          if_block2.d(1);
          if_block2 = null;
        }
        if (!/*showTitle*/
        ctx2[7]) {
          if (if_block3) {
            if_block3.p(ctx2, dirty);
          } else {
            if_block3 = create_if_block2(ctx2);
            if_block3.c();
            if_block3.m(div, null);
          }
        } else if (if_block3) {
          if_block3.d(1);
          if_block3 = null;
        }
        if (dirty & /*dataTestid*/
        1) {
          attr(
            div,
            "data-testid",
            /*dataTestid*/
            ctx2[0]
          );
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        if (if_block0)
          if_block0.d();
        if (if_block1)
          if_block1.d();
        if (if_block2)
          if_block2.d();
        if (if_block3)
          if_block3.d();
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function instance2($$self, $$props, $$invalidate) {
    let showTitle;
    let aWins;
    let bWins;
    let indication;
    let { contextId = defaultContextId } = $$props;
    let { dataTestid = void 0 } = $$props;
    const context4 = getContext(contextId);
    const connection = createClientConnection(context4);
    let myCharacter = null;
    let game = null;
    let disconnected = false;
    const sub = combineLatest(merge(from(getGame(connection)), observeGame(connection)), merge(from(getMyCharacter(connection)), observeMyCharacter(connection))).pipe(throttleTime(15, void 0, { leading: true, trailing: true })).subscribe(function([_game, _myCharacter]) {
      $$invalidate(2, game = _game);
      $$invalidate(1, myCharacter = _myCharacter);
    });
    const connexionSub = connection.messages$.subscribe({
      error: () => $$invalidate(3, disconnected = true),
      complete: () => $$invalidate(3, disconnected = true)
    });
    const interaction$ = new Subject();
    const controlsSub = interaction$.subscribe(function() {
      if (game) {
        interact(connection).catch(console.error);
      }
    });
    onDestroy(function() {
      sub.unsubscribe();
      connexionSub.unsubscribe();
      controlsSub.unsubscribe();
    });
    const click_handler = () => interaction$.next(void 0);
    const keydown_handler = () => interaction$.next(void 0);
    $$self.$$set = ($$props2) => {
      if ("contextId" in $$props2)
        $$invalidate(9, contextId = $$props2.contextId);
      if ("dataTestid" in $$props2)
        $$invalidate(0, dataTestid = $$props2.dataTestid);
    };
    $$self.$$.update = () => {
      if ($$self.$$.dirty & /*myCharacter, game*/
      6) {
        $:
          $$invalidate(7, showTitle = isTitleShown(myCharacter, game));
      }
      if ($$self.$$.dirty & /*game*/
      4) {
        $:
          $$invalidate(6, aWins = game !== null && (game.state === "AWins" /* AWins */ || game.state === "AWinsByFault" /* AWinsByFault */));
      }
      if ($$self.$$.dirty & /*game*/
      4) {
        $:
          $$invalidate(5, bWins = game !== null && (game.state === "BWins" /* BWins */ || game.state === "BWinsByFault" /* BWinsByFault */));
      }
      if ($$self.$$.dirty & /*myCharacter, game*/
      6) {
        $:
          $$invalidate(4, indication = computeIndication(myCharacter, game));
      }
    };
    return [
      dataTestid,
      myCharacter,
      game,
      disconnected,
      indication,
      bWins,
      aWins,
      showTitle,
      interaction$,
      contextId,
      click_handler,
      keydown_handler
    ];
  }
  var Playground = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance2, create_fragment2, safe_not_equal, { contextId: 9, dataTestid: 0 });
    }
  };
  var playground_svelte_default = Playground;

  // ../core/src/default-context-id.ts
  var defaultContextId = "prince-duals-context";

  // ../core/src/game-state.ts
  var GameState = /* @__PURE__ */ ((GameState2) => {
    GameState2["WaitingPlayerA"] = "WaitingPlayerA";
    GameState2["WaitingPlayerB"] = "WaitingPlayerB";
    GameState2["Matte"] = "Matte";
    GameState2["Hajime"] = "Hajime";
    GameState2["AWins"] = "AWins";
    GameState2["BWins"] = "BWins";
    GameState2["AWinsByFault"] = "AWinsByFault";
    GameState2["BWinsByFault"] = "BWinsByFault";
    GameState2["PlayerADisconnected"] = "PlayerADisconnected";
    GameState2["PlayerBDisconnected"] = "PlayerBDisconnected";
    return GameState2;
  })(GameState || {});

  // ../core/src/get-game.ts
  async function getGame(connection) {
    const requestId = uid();
    const response$ = connection.messages$.pipe(
      map((m) => m.getGameResponse),
      filter(Boolean),
      filter((response2) => response2.requestId === requestId)
    );
    const response = firstValueFrom(response$);
    const request = { getGameRequest: { requestId } };
    await connection.send(request);
    const game = (await response).game;
    return game;
  }

  // ../core/src/get-game-handle.ts
  function getGameHandle(gameStorage, connexions$) {
    return connexions$.subscribe(function(connection) {
      const subscription = connection.messages$.pipe(
        map((m) => m.getGameRequest),
        filter(Boolean)
      ).subscribe({
        next(request) {
          const response = {
            getGameResponse: {
              requestId: request.requestId,
              game: gameStorage.read()
            }
          };
          connection.send(response);
        },
        complete() {
          subscription.unsubscribe();
        }
      });
    });
  }

  // ../core/src/get-my-character.ts
  async function getMyCharacter(connection) {
    const requestId = uid();
    const response$ = connection.messages$.pipe(
      map((m) => m.getMyCharacterResponse),
      filter(Boolean),
      filter((r) => r.requestId === requestId)
    );
    const response = firstValueFrom(response$);
    const request = { getMyCharacterRequest: { requestId } };
    await connection.send(request);
    return (await response).character;
  }

  // ../core/src/get-my-character-handle.ts
  function getMyCharacterHandle(gameStorage, connexions$) {
    return connexions$.pipe(
      mergeMap((connection) => connection.messages$.pipe(
        map((m) => m.getMyCharacterRequest),
        filter(Boolean),
        tap(function(request) {
          connection.send({
            getMyCharacterResponse: {
              requestId: request.requestId,
              character: resolveMyCharacter(gameStorage, connection)
            }
          });
        })
      ))
    ).subscribe();
  }

  // ../core/src/initiate-backend-handlers.ts
  function initiateBackendHandlers2(gameStorage, connexion$) {
    interactHandle(gameStorage, connexion$);
    getGameHandle(gameStorage, connexion$);
    observeGameHandle(gameStorage, connexion$);
    getMyCharacterHandle(gameStorage, connexion$);
    observeMyCharacterHandle(gameStorage, connexion$);
  }

  // ../core/src/interact.ts
  async function interact(connection) {
    const message = { interactEmit: {} };
    await connection.send(message);
  }

  // ../core/src/interact-handle.ts
  var {
    WaitingPlayerA,
    WaitingPlayerB,
    Matte,
    Hajime,
    AWins,
    BWins,
    AWinsByFault,
    BWinsByFault,
    PlayerADisconnected,
    PlayerBDisconnected
  } = GameState;
  var hajimeTimeout;
  function interactHandle(gameStorage, connexions$) {
    return connexions$.subscribe(function(connection) {
      const messageSub = connection.messages$.pipe(filter((message) => Boolean(message.interactEmit))).subscribe({
        next() {
          const game = gameStorage.read();
          switch (game.state) {
            case AWins:
            case BWins:
            case AWinsByFault:
            case BWinsByFault:
              game.state = WaitingPlayerA;
              game.playerA = void 0;
              game.playerB = void 0;
              break;
            case PlayerADisconnected:
            case PlayerBDisconnected:
            case WaitingPlayerA:
              game.playerA = connection.id;
              game.state = WaitingPlayerB;
              break;
            case WaitingPlayerB:
              if (game.playerA !== connection.id) {
                game.playerB = connection.id;
                game.state = Matte;
                hajimeTimeout = setTimeout(function() {
                  game.state = Hajime;
                  gameStorage.save(game);
                }, 2e3 + Math.random() * 4e3);
              } else {
                return;
              }
              break;
            case Matte:
              if (connection.id === game.playerA) {
                clearTimeout(hajimeTimeout);
                game.state = BWinsByFault;
              } else if (connection.id === game.playerB) {
                clearTimeout(hajimeTimeout);
                game.state = AWinsByFault;
              }
              break;
            case Hajime:
              if (connection.id === game.playerA) {
                game.state = AWins;
              } else if (connection.id === game.playerB) {
                game.state = BWins;
              }
              break;
            default:
              return;
          }
          gameStorage.save(game);
        },
        complete() {
          const game = gameStorage.read();
          switch (connection.id) {
            case game.playerA:
              clearTimeout(hajimeTimeout);
              game.playerA = void 0;
              game.playerB = void 0;
              game.state = PlayerADisconnected;
              break;
            case game.playerB:
              clearTimeout(hajimeTimeout);
              game.playerA = void 0;
              game.playerB = void 0;
              game.state = PlayerBDisconnected;
              break;
            default:
              return;
          }
          gameStorage.save(game);
          messageSub.unsubscribe();
        }
      });
    });
  }

  // ../core/src/is-title-shown.ts
  function isTitleShown(myCharacter, game) {
    if (game == null) {
      return true;
    }
    if (myCharacter == null) {
      return true;
    }
    switch (game.state) {
      case "WaitingPlayerA" /* WaitingPlayerA */:
      case "PlayerADisconnected" /* PlayerADisconnected */:
      case "PlayerBDisconnected" /* PlayerBDisconnected */:
        return true;
      case "WaitingPlayerB" /* WaitingPlayerB */:
        return myCharacter !== "PlayerA" /* PlayerA */;
      default:
        return false;
    }
  }

  // ../core/src/observe-game.ts
  function observeGame(connection) {
    return new Observable(function(subscriber) {
      const subscription = connection.messages$.pipe(
        map((m) => m.observeGameBroadcast),
        filter(Boolean)
      ).subscribe({
        next(broadcast) {
          subscriber.next(broadcast.game);
        },
        complete() {
          subscription.unsubscribe();
        }
      });
    });
  }

  // ../core/src/observe-game-handle.ts
  function observeGameHandle(gameStorage, connexions$) {
    return connexions$.subscribe(function(connection) {
      const subscription = gameStorage.watch().subscribe(function(game) {
        connection.send({
          observeGameBroadcast: { game }
        });
      });
      const messageSubscription = connection.messages$.subscribe({
        complete() {
          subscription.unsubscribe();
          messageSubscription.unsubscribe();
        }
      });
    });
  }

  // ../core/src/observe-my-character.ts
  function observeMyCharacter(connection) {
    return connection.messages$.pipe(
      map((m) => m.observeMyCharacterBroadcast?.character),
      filter(Boolean)
    );
  }

  // ../core/src/observe-my-character-handle.ts
  function observeMyCharacterHandle(gameStorage, connexions$) {
    return connexions$.subscribe(function(connection) {
      const subscription = gameStorage.watch().subscribe(function() {
        connection.send({
          observeMyCharacterBroadcast: {
            character: resolveMyCharacter(gameStorage, connection)
          }
        });
      });
      const messageSubscription = connection.messages$.subscribe({
        complete() {
          subscription.unsubscribe();
          messageSubscription.unsubscribe();
        }
      });
    });
  }

  // ../core/src/resolve-my-character.ts
  function resolveMyCharacter(gameStorage, connection) {
    const game = gameStorage.read();
    switch (connection.id) {
      case game.playerA:
        return "PlayerA" /* PlayerA */;
      case game.playerB:
        return "PlayerB" /* PlayerB */;
      default:
        return "None" /* None */;
    }
  }

  // node_modules/tslib/tslib.es6.mjs
  var extendStatics2 = function(d, b) {
    extendStatics2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics2(d, b);
  };
  function __extends2(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics2(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  function __awaiter2(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }
  function __generator2(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1)
        throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f)
        throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _)
        try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  }
  function __values2(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m)
      return m.call(o);
    if (o && typeof o.length === "number")
      return {
        next: function() {
          if (o && i >= o.length)
            o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read2(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  }
  function __spreadArray2(to, from2, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from2.length, ar; i < l; i++) {
        if (ar || !(i in from2)) {
          if (!ar)
            ar = Array.prototype.slice.call(from2, 0, i);
          ar[i] = from2[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from2));
  }
  function __await2(v) {
    return this instanceof __await2 ? (this.v = v, this) : new __await2(v);
  }
  function __asyncGenerator2(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
      return this;
    }, i;
    function verb(n) {
      if (g[n])
        i[n] = function(v) {
          return new Promise(function(a, b) {
            q.push([n, v, a, b]) > 1 || resume(n, v);
          });
        };
    }
    function resume(n, v) {
      try {
        step(g[n](v));
      } catch (e) {
        settle(q[0][3], e);
      }
    }
    function step(r) {
      r.value instanceof __await2 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
      resume("next", value);
    }
    function reject(value) {
      resume("throw", value);
    }
    function settle(f, v) {
      if (f(v), q.shift(), q.length)
        resume(q[0][0], q[0][1]);
    }
  }
  function __asyncValues2(o) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values2 === "function" ? __values2(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
      return this;
    }, i);
    function verb(n) {
      i[n] = o[n] && function(v) {
        return new Promise(function(resolve, reject) {
          v = o[n](v), settle(resolve, reject, v.done, v.value);
        });
      };
    }
    function settle(resolve, reject, d, v) {
      Promise.resolve(v).then(function(v2) {
        resolve({ value: v2, done: d });
      }, reject);
    }
  }

  // node_modules/rxjs/dist/esm5/internal/util/isFunction.js
  function isFunction2(value) {
    return typeof value === "function";
  }

  // node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js
  function createErrorClass2(createImpl) {
    var _super = function(instance3) {
      Error.call(instance3);
      instance3.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
  }

  // node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js
  var UnsubscriptionError2 = createErrorClass2(function(_super) {
    return function UnsubscriptionErrorImpl(errors) {
      _super(this);
      this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
        return i + 1 + ") " + err.toString();
      }).join("\n  ") : "";
      this.name = "UnsubscriptionError";
      this.errors = errors;
    };
  });

  // node_modules/rxjs/dist/esm5/internal/util/arrRemove.js
  function arrRemove2(arr, item) {
    if (arr) {
      var index = arr.indexOf(item);
      0 <= index && arr.splice(index, 1);
    }
  }

  // node_modules/rxjs/dist/esm5/internal/Subscription.js
  var Subscription5 = function() {
    function Subscription6(initialTeardown) {
      this.initialTeardown = initialTeardown;
      this.closed = false;
      this._parentage = null;
      this._finalizers = null;
    }
    Subscription6.prototype.unsubscribe = function() {
      var e_1, _a, e_2, _b;
      var errors;
      if (!this.closed) {
        this.closed = true;
        var _parentage = this._parentage;
        if (_parentage) {
          this._parentage = null;
          if (Array.isArray(_parentage)) {
            try {
              for (var _parentage_1 = __values2(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                var parent_1 = _parentage_1_1.value;
                parent_1.remove(this);
              }
            } catch (e_1_1) {
              e_1 = { error: e_1_1 };
            } finally {
              try {
                if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return))
                  _a.call(_parentage_1);
              } finally {
                if (e_1)
                  throw e_1.error;
              }
            }
          } else {
            _parentage.remove(this);
          }
        }
        var initialFinalizer = this.initialTeardown;
        if (isFunction2(initialFinalizer)) {
          try {
            initialFinalizer();
          } catch (e) {
            errors = e instanceof UnsubscriptionError2 ? e.errors : [e];
          }
        }
        var _finalizers = this._finalizers;
        if (_finalizers) {
          this._finalizers = null;
          try {
            for (var _finalizers_1 = __values2(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
              var finalizer = _finalizers_1_1.value;
              try {
                execFinalizer2(finalizer);
              } catch (err) {
                errors = errors !== null && errors !== void 0 ? errors : [];
                if (err instanceof UnsubscriptionError2) {
                  errors = __spreadArray2(__spreadArray2([], __read2(errors)), __read2(err.errors));
                } else {
                  errors.push(err);
                }
              }
            }
          } catch (e_2_1) {
            e_2 = { error: e_2_1 };
          } finally {
            try {
              if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return))
                _b.call(_finalizers_1);
            } finally {
              if (e_2)
                throw e_2.error;
            }
          }
        }
        if (errors) {
          throw new UnsubscriptionError2(errors);
        }
      }
    };
    Subscription6.prototype.add = function(teardown) {
      var _a;
      if (teardown && teardown !== this) {
        if (this.closed) {
          execFinalizer2(teardown);
        } else {
          if (teardown instanceof Subscription6) {
            if (teardown.closed || teardown._hasParent(this)) {
              return;
            }
            teardown._addParent(this);
          }
          (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
        }
      }
    };
    Subscription6.prototype._hasParent = function(parent) {
      var _parentage = this._parentage;
      return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
    };
    Subscription6.prototype._addParent = function(parent) {
      var _parentage = this._parentage;
      this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription6.prototype._removeParent = function(parent) {
      var _parentage = this._parentage;
      if (_parentage === parent) {
        this._parentage = null;
      } else if (Array.isArray(_parentage)) {
        arrRemove2(_parentage, parent);
      }
    };
    Subscription6.prototype.remove = function(teardown) {
      var _finalizers = this._finalizers;
      _finalizers && arrRemove2(_finalizers, teardown);
      if (teardown instanceof Subscription6) {
        teardown._removeParent(this);
      }
    };
    Subscription6.EMPTY = function() {
      var empty = new Subscription6();
      empty.closed = true;
      return empty;
    }();
    return Subscription6;
  }();
  var EMPTY_SUBSCRIPTION2 = Subscription5.EMPTY;
  function isSubscription2(value) {
    return value instanceof Subscription5 || value && "closed" in value && isFunction2(value.remove) && isFunction2(value.add) && isFunction2(value.unsubscribe);
  }
  function execFinalizer2(finalizer) {
    if (isFunction2(finalizer)) {
      finalizer();
    } else {
      finalizer.unsubscribe();
    }
  }

  // node_modules/rxjs/dist/esm5/internal/config.js
  var config2 = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false
  };

  // node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js
  var timeoutProvider2 = {
    setTimeout: function(handler, timeout) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      var delegate = timeoutProvider2.delegate;
      if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
        return delegate.setTimeout.apply(delegate, __spreadArray2([handler, timeout], __read2(args)));
      }
      return setTimeout.apply(void 0, __spreadArray2([handler, timeout], __read2(args)));
    },
    clearTimeout: function(handle) {
      var delegate = timeoutProvider2.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: void 0
  };

  // node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js
  function reportUnhandledError2(err) {
    timeoutProvider2.setTimeout(function() {
      var onUnhandledError = config2.onUnhandledError;
      if (onUnhandledError) {
        onUnhandledError(err);
      } else {
        throw err;
      }
    });
  }

  // node_modules/rxjs/dist/esm5/internal/util/noop.js
  function noop3() {
  }

  // node_modules/rxjs/dist/esm5/internal/NotificationFactories.js
  var COMPLETE_NOTIFICATION2 = function() {
    return createNotification2("C", void 0, void 0);
  }();
  function errorNotification2(error) {
    return createNotification2("E", void 0, error);
  }
  function nextNotification2(value) {
    return createNotification2("N", value, void 0);
  }
  function createNotification2(kind, value, error) {
    return {
      kind,
      value,
      error
    };
  }

  // node_modules/rxjs/dist/esm5/internal/util/errorContext.js
  var context2 = null;
  function errorContext2(cb) {
    if (config2.useDeprecatedSynchronousErrorHandling) {
      var isRoot = !context2;
      if (isRoot) {
        context2 = { errorThrown: false, error: null };
      }
      cb();
      if (isRoot) {
        var _a = context2, errorThrown = _a.errorThrown, error = _a.error;
        context2 = null;
        if (errorThrown) {
          throw error;
        }
      }
    } else {
      cb();
    }
  }
  function captureError2(err) {
    if (config2.useDeprecatedSynchronousErrorHandling && context2) {
      context2.errorThrown = true;
      context2.error = err;
    }
  }

  // node_modules/rxjs/dist/esm5/internal/Subscriber.js
  var Subscriber2 = function(_super) {
    __extends2(Subscriber3, _super);
    function Subscriber3(destination) {
      var _this = _super.call(this) || this;
      _this.isStopped = false;
      if (destination) {
        _this.destination = destination;
        if (isSubscription2(destination)) {
          destination.add(_this);
        }
      } else {
        _this.destination = EMPTY_OBSERVER2;
      }
      return _this;
    }
    Subscriber3.create = function(next, error, complete) {
      return new SafeSubscriber2(next, error, complete);
    };
    Subscriber3.prototype.next = function(value) {
      if (this.isStopped) {
        handleStoppedNotification2(nextNotification2(value), this);
      } else {
        this._next(value);
      }
    };
    Subscriber3.prototype.error = function(err) {
      if (this.isStopped) {
        handleStoppedNotification2(errorNotification2(err), this);
      } else {
        this.isStopped = true;
        this._error(err);
      }
    };
    Subscriber3.prototype.complete = function() {
      if (this.isStopped) {
        handleStoppedNotification2(COMPLETE_NOTIFICATION2, this);
      } else {
        this.isStopped = true;
        this._complete();
      }
    };
    Subscriber3.prototype.unsubscribe = function() {
      if (!this.closed) {
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
        this.destination = null;
      }
    };
    Subscriber3.prototype._next = function(value) {
      this.destination.next(value);
    };
    Subscriber3.prototype._error = function(err) {
      try {
        this.destination.error(err);
      } finally {
        this.unsubscribe();
      }
    };
    Subscriber3.prototype._complete = function() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    };
    return Subscriber3;
  }(Subscription5);
  var _bind2 = Function.prototype.bind;
  function bind2(fn, thisArg) {
    return _bind2.call(fn, thisArg);
  }
  var ConsumerObserver2 = function() {
    function ConsumerObserver3(partialObserver) {
      this.partialObserver = partialObserver;
    }
    ConsumerObserver3.prototype.next = function(value) {
      var partialObserver = this.partialObserver;
      if (partialObserver.next) {
        try {
          partialObserver.next(value);
        } catch (error) {
          handleUnhandledError2(error);
        }
      }
    };
    ConsumerObserver3.prototype.error = function(err) {
      var partialObserver = this.partialObserver;
      if (partialObserver.error) {
        try {
          partialObserver.error(err);
        } catch (error) {
          handleUnhandledError2(error);
        }
      } else {
        handleUnhandledError2(err);
      }
    };
    ConsumerObserver3.prototype.complete = function() {
      var partialObserver = this.partialObserver;
      if (partialObserver.complete) {
        try {
          partialObserver.complete();
        } catch (error) {
          handleUnhandledError2(error);
        }
      }
    };
    return ConsumerObserver3;
  }();
  var SafeSubscriber2 = function(_super) {
    __extends2(SafeSubscriber3, _super);
    function SafeSubscriber3(observerOrNext, error, complete) {
      var _this = _super.call(this) || this;
      var partialObserver;
      if (isFunction2(observerOrNext) || !observerOrNext) {
        partialObserver = {
          next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
          error: error !== null && error !== void 0 ? error : void 0,
          complete: complete !== null && complete !== void 0 ? complete : void 0
        };
      } else {
        var context_1;
        if (_this && config2.useDeprecatedNextContext) {
          context_1 = Object.create(observerOrNext);
          context_1.unsubscribe = function() {
            return _this.unsubscribe();
          };
          partialObserver = {
            next: observerOrNext.next && bind2(observerOrNext.next, context_1),
            error: observerOrNext.error && bind2(observerOrNext.error, context_1),
            complete: observerOrNext.complete && bind2(observerOrNext.complete, context_1)
          };
        } else {
          partialObserver = observerOrNext;
        }
      }
      _this.destination = new ConsumerObserver2(partialObserver);
      return _this;
    }
    return SafeSubscriber3;
  }(Subscriber2);
  function handleUnhandledError2(error) {
    if (config2.useDeprecatedSynchronousErrorHandling) {
      captureError2(error);
    } else {
      reportUnhandledError2(error);
    }
  }
  function defaultErrorHandler2(err) {
    throw err;
  }
  function handleStoppedNotification2(notification, subscriber) {
    var onStoppedNotification = config2.onStoppedNotification;
    onStoppedNotification && timeoutProvider2.setTimeout(function() {
      return onStoppedNotification(notification, subscriber);
    });
  }
  var EMPTY_OBSERVER2 = {
    closed: true,
    next: noop3,
    error: defaultErrorHandler2,
    complete: noop3
  };

  // node_modules/rxjs/dist/esm5/internal/symbol/observable.js
  var observable2 = function() {
    return typeof Symbol === "function" && Symbol.observable || "@@observable";
  }();

  // node_modules/rxjs/dist/esm5/internal/util/identity.js
  function identity3(x) {
    return x;
  }

  // node_modules/rxjs/dist/esm5/internal/util/pipe.js
  function pipeFromArray2(fns) {
    if (fns.length === 0) {
      return identity3;
    }
    if (fns.length === 1) {
      return fns[0];
    }
    return function piped(input) {
      return fns.reduce(function(prev, fn) {
        return fn(prev);
      }, input);
    };
  }

  // node_modules/rxjs/dist/esm5/internal/Observable.js
  var Observable8 = function() {
    function Observable10(subscribe) {
      if (subscribe) {
        this._subscribe = subscribe;
      }
    }
    Observable10.prototype.lift = function(operator) {
      var observable3 = new Observable10();
      observable3.source = this;
      observable3.operator = operator;
      return observable3;
    };
    Observable10.prototype.subscribe = function(observerOrNext, error, complete) {
      var _this = this;
      var subscriber = isSubscriber2(observerOrNext) ? observerOrNext : new SafeSubscriber2(observerOrNext, error, complete);
      errorContext2(function() {
        var _a = _this, operator = _a.operator, source = _a.source;
        subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
      });
      return subscriber;
    };
    Observable10.prototype._trySubscribe = function(sink) {
      try {
        return this._subscribe(sink);
      } catch (err) {
        sink.error(err);
      }
    };
    Observable10.prototype.forEach = function(next, promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor2(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var subscriber = new SafeSubscriber2({
          next: function(value) {
            try {
              next(value);
            } catch (err) {
              reject(err);
              subscriber.unsubscribe();
            }
          },
          error: reject,
          complete: resolve
        });
        _this.subscribe(subscriber);
      });
    };
    Observable10.prototype._subscribe = function(subscriber) {
      var _a;
      return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable10.prototype[observable2] = function() {
      return this;
    };
    Observable10.prototype.pipe = function() {
      var operations = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        operations[_i] = arguments[_i];
      }
      return pipeFromArray2(operations)(this);
    };
    Observable10.prototype.toPromise = function(promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor2(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var value;
        _this.subscribe(function(x) {
          return value = x;
        }, function(err) {
          return reject(err);
        }, function() {
          return resolve(value);
        });
      });
    };
    Observable10.create = function(subscribe) {
      return new Observable10(subscribe);
    };
    return Observable10;
  }();
  function getPromiseCtor2(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config2.Promise) !== null && _a !== void 0 ? _a : Promise;
  }
  function isObserver2(value) {
    return value && isFunction2(value.next) && isFunction2(value.error) && isFunction2(value.complete);
  }
  function isSubscriber2(value) {
    return value && value instanceof Subscriber2 || isObserver2(value) && isSubscription2(value);
  }

  // node_modules/rxjs/dist/esm5/internal/util/lift.js
  function hasLift2(source) {
    return isFunction2(source === null || source === void 0 ? void 0 : source.lift);
  }
  function operate2(init2) {
    return function(source) {
      if (hasLift2(source)) {
        return source.lift(function(liftedSource) {
          try {
            return init2(liftedSource, this);
          } catch (err) {
            this.error(err);
          }
        });
      }
      throw new TypeError("Unable to lift unknown Observable type");
    };
  }

  // node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js
  function createOperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize);
  }
  var OperatorSubscriber2 = function(_super) {
    __extends2(OperatorSubscriber3, _super);
    function OperatorSubscriber3(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
      var _this = _super.call(this, destination) || this;
      _this.onFinalize = onFinalize;
      _this.shouldUnsubscribe = shouldUnsubscribe;
      _this._next = onNext ? function(value) {
        try {
          onNext(value);
        } catch (err) {
          destination.error(err);
        }
      } : _super.prototype._next;
      _this._error = onError ? function(err) {
        try {
          onError(err);
        } catch (err2) {
          destination.error(err2);
        } finally {
          this.unsubscribe();
        }
      } : _super.prototype._error;
      _this._complete = onComplete ? function() {
        try {
          onComplete();
        } catch (err) {
          destination.error(err);
        } finally {
          this.unsubscribe();
        }
      } : _super.prototype._complete;
      return _this;
    }
    OperatorSubscriber3.prototype.unsubscribe = function() {
      var _a;
      if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
        var closed_1 = this.closed;
        _super.prototype.unsubscribe.call(this);
        !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
      }
    };
    return OperatorSubscriber3;
  }(Subscriber2);

  // node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js
  var ObjectUnsubscribedError2 = createErrorClass2(function(_super) {
    return function ObjectUnsubscribedErrorImpl() {
      _super(this);
      this.name = "ObjectUnsubscribedError";
      this.message = "object unsubscribed";
    };
  });

  // node_modules/rxjs/dist/esm5/internal/Subject.js
  var Subject2 = function(_super) {
    __extends2(Subject3, _super);
    function Subject3() {
      var _this = _super.call(this) || this;
      _this.closed = false;
      _this.currentObservers = null;
      _this.observers = [];
      _this.isStopped = false;
      _this.hasError = false;
      _this.thrownError = null;
      return _this;
    }
    Subject3.prototype.lift = function(operator) {
      var subject = new AnonymousSubject2(this, this);
      subject.operator = operator;
      return subject;
    };
    Subject3.prototype._throwIfClosed = function() {
      if (this.closed) {
        throw new ObjectUnsubscribedError2();
      }
    };
    Subject3.prototype.next = function(value) {
      var _this = this;
      errorContext2(function() {
        var e_1, _a;
        _this._throwIfClosed();
        if (!_this.isStopped) {
          if (!_this.currentObservers) {
            _this.currentObservers = Array.from(_this.observers);
          }
          try {
            for (var _b = __values2(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
              var observer = _c.value;
              observer.next(value);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_c && !_c.done && (_a = _b.return))
                _a.call(_b);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
        }
      });
    };
    Subject3.prototype.error = function(err) {
      var _this = this;
      errorContext2(function() {
        _this._throwIfClosed();
        if (!_this.isStopped) {
          _this.hasError = _this.isStopped = true;
          _this.thrownError = err;
          var observers = _this.observers;
          while (observers.length) {
            observers.shift().error(err);
          }
        }
      });
    };
    Subject3.prototype.complete = function() {
      var _this = this;
      errorContext2(function() {
        _this._throwIfClosed();
        if (!_this.isStopped) {
          _this.isStopped = true;
          var observers = _this.observers;
          while (observers.length) {
            observers.shift().complete();
          }
        }
      });
    };
    Subject3.prototype.unsubscribe = function() {
      this.isStopped = this.closed = true;
      this.observers = this.currentObservers = null;
    };
    Object.defineProperty(Subject3.prototype, "observed", {
      get: function() {
        var _a;
        return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
      },
      enumerable: false,
      configurable: true
    });
    Subject3.prototype._trySubscribe = function(subscriber) {
      this._throwIfClosed();
      return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject3.prototype._subscribe = function(subscriber) {
      this._throwIfClosed();
      this._checkFinalizedStatuses(subscriber);
      return this._innerSubscribe(subscriber);
    };
    Subject3.prototype._innerSubscribe = function(subscriber) {
      var _this = this;
      var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
      if (hasError || isStopped) {
        return EMPTY_SUBSCRIPTION2;
      }
      this.currentObservers = null;
      observers.push(subscriber);
      return new Subscription5(function() {
        _this.currentObservers = null;
        arrRemove2(observers, subscriber);
      });
    };
    Subject3.prototype._checkFinalizedStatuses = function(subscriber) {
      var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
      if (hasError) {
        subscriber.error(thrownError);
      } else if (isStopped) {
        subscriber.complete();
      }
    };
    Subject3.prototype.asObservable = function() {
      var observable3 = new Observable8();
      observable3.source = this;
      return observable3;
    };
    Subject3.create = function(destination, source) {
      return new AnonymousSubject2(destination, source);
    };
    return Subject3;
  }(Observable8);
  var AnonymousSubject2 = function(_super) {
    __extends2(AnonymousSubject3, _super);
    function AnonymousSubject3(destination, source) {
      var _this = _super.call(this) || this;
      _this.destination = destination;
      _this.source = source;
      return _this;
    }
    AnonymousSubject3.prototype.next = function(value) {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject3.prototype.error = function(err) {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject3.prototype.complete = function() {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject3.prototype._subscribe = function(subscriber) {
      var _a, _b;
      return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION2;
    };
    return AnonymousSubject3;
  }(Subject2);

  // node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js
  var isArrayLike2 = function(x) {
    return x && typeof x.length === "number" && typeof x !== "function";
  };

  // node_modules/rxjs/dist/esm5/internal/util/isPromise.js
  function isPromise2(value) {
    return isFunction2(value === null || value === void 0 ? void 0 : value.then);
  }

  // node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js
  function isInteropObservable2(input) {
    return isFunction2(input[observable2]);
  }

  // node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js
  function isAsyncIterable2(obj) {
    return Symbol.asyncIterator && isFunction2(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
  }

  // node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js
  function createInvalidObservableTypeError2(input) {
    return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
  }

  // node_modules/rxjs/dist/esm5/internal/symbol/iterator.js
  function getSymbolIterator2() {
    if (typeof Symbol !== "function" || !Symbol.iterator) {
      return "@@iterator";
    }
    return Symbol.iterator;
  }
  var iterator2 = getSymbolIterator2();

  // node_modules/rxjs/dist/esm5/internal/util/isIterable.js
  function isIterable2(input) {
    return isFunction2(input === null || input === void 0 ? void 0 : input[iterator2]);
  }

  // node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js
  function readableStreamLikeToAsyncGenerator2(readableStream) {
    return __asyncGenerator2(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
      var reader, _a, value, done;
      return __generator2(this, function(_b) {
        switch (_b.label) {
          case 0:
            reader = readableStream.getReader();
            _b.label = 1;
          case 1:
            _b.trys.push([1, , 9, 10]);
            _b.label = 2;
          case 2:
            if (false)
              return [3, 8];
            return [4, __await2(reader.read())];
          case 3:
            _a = _b.sent(), value = _a.value, done = _a.done;
            if (!done)
              return [3, 5];
            return [4, __await2(void 0)];
          case 4:
            return [2, _b.sent()];
          case 5:
            return [4, __await2(value)];
          case 6:
            return [4, _b.sent()];
          case 7:
            _b.sent();
            return [3, 2];
          case 8:
            return [3, 10];
          case 9:
            reader.releaseLock();
            return [7];
          case 10:
            return [2];
        }
      });
    });
  }
  function isReadableStreamLike2(obj) {
    return isFunction2(obj === null || obj === void 0 ? void 0 : obj.getReader);
  }

  // node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js
  function innerFrom2(input) {
    if (input instanceof Observable8) {
      return input;
    }
    if (input != null) {
      if (isInteropObservable2(input)) {
        return fromInteropObservable2(input);
      }
      if (isArrayLike2(input)) {
        return fromArrayLike2(input);
      }
      if (isPromise2(input)) {
        return fromPromise2(input);
      }
      if (isAsyncIterable2(input)) {
        return fromAsyncIterable2(input);
      }
      if (isIterable2(input)) {
        return fromIterable2(input);
      }
      if (isReadableStreamLike2(input)) {
        return fromReadableStreamLike2(input);
      }
    }
    throw createInvalidObservableTypeError2(input);
  }
  function fromInteropObservable2(obj) {
    return new Observable8(function(subscriber) {
      var obs = obj[observable2]();
      if (isFunction2(obs.subscribe)) {
        return obs.subscribe(subscriber);
      }
      throw new TypeError("Provided object does not correctly implement Symbol.observable");
    });
  }
  function fromArrayLike2(array) {
    return new Observable8(function(subscriber) {
      for (var i = 0; i < array.length && !subscriber.closed; i++) {
        subscriber.next(array[i]);
      }
      subscriber.complete();
    });
  }
  function fromPromise2(promise) {
    return new Observable8(function(subscriber) {
      promise.then(function(value) {
        if (!subscriber.closed) {
          subscriber.next(value);
          subscriber.complete();
        }
      }, function(err) {
        return subscriber.error(err);
      }).then(null, reportUnhandledError2);
    });
  }
  function fromIterable2(iterable) {
    return new Observable8(function(subscriber) {
      var e_1, _a;
      try {
        for (var iterable_1 = __values2(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
          var value = iterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return;
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return))
            _a.call(iterable_1);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
      subscriber.complete();
    });
  }
  function fromAsyncIterable2(asyncIterable) {
    return new Observable8(function(subscriber) {
      process2(asyncIterable, subscriber).catch(function(err) {
        return subscriber.error(err);
      });
    });
  }
  function fromReadableStreamLike2(readableStream) {
    return fromAsyncIterable2(readableStreamLikeToAsyncGenerator2(readableStream));
  }
  function process2(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return __awaiter2(this, void 0, void 0, function() {
      var value, e_2_1;
      return __generator2(this, function(_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 5, 6, 11]);
            asyncIterable_1 = __asyncValues2(asyncIterable);
            _b.label = 1;
          case 1:
            return [4, asyncIterable_1.next()];
          case 2:
            if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done))
              return [3, 4];
            value = asyncIterable_1_1.value;
            subscriber.next(value);
            if (subscriber.closed) {
              return [2];
            }
            _b.label = 3;
          case 3:
            return [3, 1];
          case 4:
            return [3, 11];
          case 5:
            e_2_1 = _b.sent();
            e_2 = { error: e_2_1 };
            return [3, 11];
          case 6:
            _b.trys.push([6, , 9, 10]);
            if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return)))
              return [3, 8];
            return [4, _a.call(asyncIterable_1)];
          case 7:
            _b.sent();
            _b.label = 8;
          case 8:
            return [3, 10];
          case 9:
            if (e_2)
              throw e_2.error;
            return [7];
          case 10:
            return [7];
          case 11:
            subscriber.complete();
            return [2];
        }
      });
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/filter.js
  function filter2(predicate, thisArg) {
    return operate2(function(source, subscriber) {
      var index = 0;
      source.subscribe(createOperatorSubscriber2(subscriber, function(value) {
        return predicate.call(thisArg, value, index++) && subscriber.next(value);
      }));
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/share.js
  function share(options) {
    if (options === void 0) {
      options = {};
    }
    var _a = options.connector, connector = _a === void 0 ? function() {
      return new Subject2();
    } : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
    return function(wrapperSource) {
      var connection;
      var resetConnection;
      var subject;
      var refCount = 0;
      var hasCompleted = false;
      var hasErrored = false;
      var cancelReset = function() {
        resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
        resetConnection = void 0;
      };
      var reset = function() {
        cancelReset();
        connection = subject = void 0;
        hasCompleted = hasErrored = false;
      };
      var resetAndUnsubscribe = function() {
        var conn = connection;
        reset();
        conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
      };
      return operate2(function(source, subscriber) {
        refCount++;
        if (!hasErrored && !hasCompleted) {
          cancelReset();
        }
        var dest = subject = subject !== null && subject !== void 0 ? subject : connector();
        subscriber.add(function() {
          refCount--;
          if (refCount === 0 && !hasErrored && !hasCompleted) {
            resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
          }
        });
        dest.subscribe(subscriber);
        if (!connection && refCount > 0) {
          connection = new SafeSubscriber2({
            next: function(value) {
              return dest.next(value);
            },
            error: function(err) {
              hasErrored = true;
              cancelReset();
              resetConnection = handleReset(reset, resetOnError, err);
              dest.error(err);
            },
            complete: function() {
              hasCompleted = true;
              cancelReset();
              resetConnection = handleReset(reset, resetOnComplete);
              dest.complete();
            }
          });
          innerFrom2(source).subscribe(connection);
        }
      })(wrapperSource);
    };
  }
  function handleReset(reset, on) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    if (on === true) {
      reset();
      return;
    }
    if (on === false) {
      return;
    }
    var onSubscriber = new SafeSubscriber2({
      next: function() {
        onSubscriber.unsubscribe();
        reset();
      }
    });
    return innerFrom2(on.apply(void 0, __spreadArray2([], __read2(args)))).subscribe(onSubscriber);
  }

  // src/create-ws-client-connection.ts
  function* idGenerator() {
    while (true) {
      for (let id = 1; id < 99999999; id++) {
        yield id;
      }
    }
  }
  var idIterator = idGenerator();
  function createWsClientConnection(wsProtocol, wsPort, webDomain) {
    const showPort = wsProtocol === "ws" && wsPort != 80 || wsProtocol === "wss" && wsPort != 443;
    const wsUrl = `${wsProtocol}://${webDomain}${showPort ? ":" + wsPort : ""}/ws`;
    const socket = new WebSocket(wsUrl);
    const waitDisconnected = new Promise(function(resolve) {
      socket.onclose = () => resolve(void 0);
    });
    const waitConnected = new Promise(function(resolve, reject) {
      socket.onopen = () => resolve(void 0);
      waitDisconnected.finally(reject);
    });
    const messages$ = new Observable8(function(subscriber) {
      socket.onmessage = function(event) {
        const deserialized = JSON.parse(event.data);
        subscriber.next(deserialized);
      };
      waitDisconnected.finally(() => subscriber.complete());
    }).pipe(share());
    let keepAliveInteval;
    waitConnected.then(function() {
      keepAliveInteval = setInterval(() => socket.send("KEEP_ALIVE"), 25e3);
      return waitDisconnected;
    }).finally(() => clearInterval(keepAliveInteval));
    return {
      id: idIterator.next().value,
      messages$,
      async send(message) {
        await waitConnected;
        const serialized = JSON.stringify(message);
        socket.send(serialized);
      }
    };
  }

  // src/signaling.ts
  var signaling = new BroadcastChannel("webrtc");
  var signalingMessage$ = new Subject2();
  signaling.onmessage = function(e) {
    const data = e?.data;
    signalingMessage$.next(data);
  };
  function broadcastSignalToOtherTabs(signal) {
    signaling.postMessage(signal);
  }
  var signalIncomingFromOtherTabs$ = signalingMessage$.asObservable();

  // src/create-rtc-connection.ts
  function createRtcConnection() {
    const broadcastToServer$ = new Subject2();
    const broadcastToCurrentTabFromServer$ = new Subject2();
    const broadcastToWebRTC$ = new Subject2();
    const broadcastFromWebRTC$ = new Subject2();
    const _offlineServer$ = new Subject2();
    const waitServerPrepare = new Promise((r) => setTimeout(r, 150));
    let tabIsServer = false;
    let acceptedAnswer = false;
    const currentTabServerConnection = {
      id: 1,
      messages$: broadcastToServer$.asObservable(),
      send(message) {
        broadcastToCurrentTabFromServer$.next(message);
      }
    };
    const peerServerConnection = {
      id: 2,
      messages$: broadcastFromWebRTC$.asObservable(),
      send(message) {
        broadcastToWebRTC$.next(message);
      }
    };
    const peerConnection = new RTCPeerConnection();
    let iceCandidateSent = false;
    let clearCandidateSent = false;
    peerConnection.onicecandidate = function(e) {
      const { candidate } = e;
      if (candidate && !iceCandidateSent) {
        iceCandidateSent = false;
        broadcastSignalToOtherTabs({
          candidate: candidate.toJSON()
        });
      } else if (clearCandidateSent) {
        clearCandidateSent = false;
        broadcastSignalToOtherTabs({ clearCandidate: true });
      }
    };
    const signalingSubscription = signalIncomingFromOtherTabs$.subscribe({
      next(signalingEvent) {
        if (signalingEvent.offer) {
          handleOffer(peerConnection, signalingEvent.offer).then(() => acceptedAnswer = false).catch(console.error);
        }
        if (signalingEvent.answer) {
          handleAnswer(peerConnection, signalingEvent.answer).then(() => acceptedAnswer = true).catch(console.error);
        }
        if (signalingEvent.candidate) {
          handleCandidate(peerConnection, signalingEvent.candidate).catch(console.error);
        }
        if (signalingEvent.clearCandidate) {
          handleClearCandidate(peerConnection).catch(console.error);
        }
      },
      error(error) {
        console.error(error);
      }
    });
    async function sendOffers() {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      broadcastSignalToOtherTabs({ offer });
    }
    sendOffers().catch(console.error);
    peerConnection.ondatachannel = function receiveChannelCallback(event) {
      event.channel.onmessage = function(event2) {
        const message = JSON.parse(event2.data);
        broadcastFromWebRTC$.next(message);
      };
    };
    peerConnection.addEventListener("connectionstatechange", function() {
      switch (peerConnection.connectionState) {
        case "connecting":
          break;
        case "connected":
          tabIsServer = acceptedAnswer;
          if (tabIsServer) {
            _offlineServer$.next(currentTabServerConnection);
            _offlineServer$.next(peerServerConnection);
          }
          break;
        case "closed":
        case "disconnected":
        case "failed":
          signalingSubscription.unsubscribe();
          _offlineServer$.complete();
          break;
        default:
          throw new Error("Unhandled state change !");
      }
    });
    const sendChannel = peerConnection.createDataChannel("sendDataChannel");
    async function sendWhenConnected(m) {
      while (peerConnection.connectionState !== "connected") {
        await new Promise((r) => setTimeout(r, 50));
      }
      await waitServerPrepare;
      sendChannel.send(JSON.stringify(m));
    }
    const subscriptionToSendToWebRTC = broadcastToWebRTC$.subscribe({
      next: sendWhenConnected,
      error(error) {
        console.error(error);
      }
    });
    function createClientConnection2() {
      return {
        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
        messages$: new Observable8(function(subscriber) {
          const connMessagesSub1 = broadcastToCurrentTabFromServer$.pipe(filter2(() => tabIsServer)).subscribe({
            next(message) {
              subscriber.next(message);
            },
            error(error) {
              console.error(error);
            }
          });
          const connMessagesSub2 = broadcastFromWebRTC$.pipe(filter2(() => !tabIsServer)).subscribe({
            next(message) {
              subscriber.next(message);
            },
            error(error) {
              console.error(error);
            }
          });
          peerConnection.addEventListener("connectionstatechange", function() {
            switch (peerConnection.connectionState) {
              case "connecting":
              case "connected":
                break;
              case "closed":
              case "disconnected":
              case "failed":
                connMessagesSub1.unsubscribe();
                connMessagesSub2.unsubscribe();
                subscriptionToSendToWebRTC.unsubscribe();
                subscriber.complete();
                break;
              default:
                throw new Error("Unhandled state !");
            }
          });
        }).pipe(share()),
        send(message) {
          if (tabIsServer) {
            broadcastToServer$.next(message);
          } else {
            sendWhenConnected(message).catch(console.error);
          }
        }
      };
    }
    return [
      createClientConnection2,
      _offlineServer$.asObservable()
    ];
  }
  async function handleOffer(peerConnection, offer) {
    await peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();
    broadcastSignalToOtherTabs({ answer });
    await peerConnection.setLocalDescription(answer);
  }
  async function handleAnswer(peerConnection, answer) {
    await peerConnection.setRemoteDescription(answer);
  }
  async function handleCandidate(peerConnection, candidate) {
    await peerConnection.addIceCandidate(candidate);
  }
  async function handleClearCandidate(peerConnection) {
    await peerConnection.addIceCandidate();
  }

  // src/index.ts
  var _context = {
    config: {
      webProtocol: "http",
      webDomain: "localhost",
      webPort: 3377,
      wsProtocol: "ws",
      wsPort: 3377,
      offlineMode: false
    },
    createRtcConnection,
    createWsClientConnection
  };
  var context3 = (/* @__PURE__ */ new Map()).set(defaultContextId, _context);
  var target = document.getElementById("game-mount-point");
  if (target) {
    new playground_svelte_default({ target, context: context3 });
  }
  var connTarget = document.getElementById("connection-mount-point");
  if (connTarget) {
    new manual_rtc_svelte_default({ target: connTarget });
  }
})();
