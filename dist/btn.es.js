var Sizeable = {
  props: {
    size: String,
    sizePrefix: {
      type: String,
      default() {
        return this.$options.name && this.$options.name.toLowerCase();
      }
    }
  },
  computed: {
    sizeableClassPrefix() {
      return this.sizePrefix;
    },
    sizeableClass() {
      if (!this.size || !this.sizeableClassPrefix) {
        return "";
      }
      return `${this.sizeableClassPrefix}-${this.size}`;
    }
  }
};
var Variant = {
  props: {
    variant: String,
    variantPrefix: {
      type: String,
      default() {
        return this.$options.name && this.$options.name.toLowerCase();
      }
    }
  },
  computed: {
    variantClassPrefix() {
      return this.variantPrefix;
    },
    variantClass() {
      if (!this.variant || !this.variantClassPrefix) {
        return "";
      }
      return `${this.variantClassPrefix}-${this.variant}`;
    }
  }
};
var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.to ? _c("router-link", { class: _vm.classes, attrs: { "to": _vm.to, "disabled": _vm.disabled, "role": "button" }, on: { "click": _vm.onClick } }, [_vm._t("default")], 2) : _vm.href ? _c("a", { class: _vm.classes, attrs: { "href": _vm.href, "disabled": _vm.disabled, "role": "button" }, on: { "click": _vm.onClick } }, [_vm._t("default")], 2) : _vm.label ? _c("label", { class: _vm.classes, attrs: { "disabled": _vm.disabled, "role": "button" }, on: { "click": _vm.onClick } }, [_vm._t("default")], 2) : _c("button", { class: _vm.classes, attrs: { "type": _vm.type, "disabled": _vm.disabled }, on: { "click": _vm.onClick } }, [_vm._t("default")], 2);
};
var staticRenderFns = [];
function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render2) {
    options.render = render2;
    options.staticRenderFns = staticRenderFns2;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode ? function() {
      injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
    } : injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
const __vue2_script = {
  name: "Btn",
  mixins: [
    Sizeable,
    Variant
  ],
  props: {
    active: Boolean,
    block: Boolean,
    disabled: Boolean,
    href: String,
    label: Boolean,
    outline: Boolean,
    to: [Object, String],
    type: String
  },
  computed: {
    variantClassPrefix() {
      return this.variantPrefix + (this.outline ? "-outline" : "");
    },
    classes() {
      return [
        "btn",
        this.variantClass,
        this.sizeableClass,
        this.block ? "btn-block" : "",
        this.active ? "active" : ""
      ];
    }
  },
  methods: {
    onClick(event) {
      if (!this.disabled) {
        this.$emit("click", event);
      } else {
        event.preventDefault();
      }
    }
  }
};
const __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render, staticRenderFns, false, __vue2_injectStyles, null, null, null);
function __vue2_injectStyles(context) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
var Btn = /* @__PURE__ */ function() {
  return __component__.exports;
}();
export { Btn };