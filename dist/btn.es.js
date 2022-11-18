import { openBlock as n, createBlock as o, resolveDynamicComponent as l, mergeProps as h, withCtx as c, renderSlot as f, createTextVNode as x, toDisplayString as p } from "vue";
const u = {
  props: {
    componentPrefix: String,
    size: String,
    sizePrefix: String
  },
  computed: {
    sizeableClassPrefix() {
      return this.sizePrefix || this.componentPrefix;
    },
    hasSizeablePrefix() {
      return this.size === void 0 ? !1 : !!this.size.match(new RegExp(`^${this.sizeableClassPrefix}`));
    },
    sizeableClass() {
      return this.size ? !this.sizeableClassPrefix || this.hasSizeablePrefix ? this.size : `${this.sizeableClassPrefix}-${this.size}` : "";
    }
  }
}, d = {
  props: {
    componentPrefix: String,
    variant: String,
    variantPrefix: String
  },
  computed: {
    variantClassPrefix() {
      return this.variantPrefix || this.componentPrefix;
    },
    hasVariantPrefix() {
      return this.variant === void 0 ? !1 : !!this.variant.match(new RegExp(`^${this.variantClassPrefix}`));
    },
    variantClass() {
      return this.variant ? !this.variantClassPrefix || this.hasVariantPrefix ? this.variant : `${this.variantClassPrefix}-${this.variant}` : "";
    }
  }
}, v = {
  name: "Btn",
  mixins: [
    u,
    d
  ],
  props: {
    active: Boolean,
    block: Boolean,
    componentPrefix: {
      type: String,
      default: "btn"
    },
    disabled: Boolean,
    label: String,
    outline: Boolean,
    tag: String,
    variant: {
      type: String,
      default: "primary"
    }
  },
  computed: {
    classes() {
      return [
        "btn",
        this.variantClass,
        this.sizeableClass,
        this.active && "active",
        this.block && "btn-block",
        this.disabled && "disabled"
      ];
    },
    component() {
      return this.tag ? this.tag : this.$attrs.href ? "a" : "button";
    },
    variantClassPrefix() {
      return (this.variantPrefix || this.componentPrefix) + (this.outline ? "-outline" : "");
    }
  }
}, P = (t, i) => {
  const e = t.__vccOpts || t;
  for (const [s, a] of i)
    e[s] = a;
  return e;
};
function b(t, i, e, s, a, r) {
  return n(), o(l(r.component), h(t.$attrs, {
    disabled: e.disabled,
    class: r.classes,
    role: "button"
  }), {
    default: c(() => [
      f(t.$slots, "default", {}, () => [
        x(p(e.label), 1)
      ])
    ]),
    _: 3
  }, 16, ["disabled", "class"]);
}
const g = /* @__PURE__ */ P(v, [["render", b]]);
export {
  g as Btn
};
