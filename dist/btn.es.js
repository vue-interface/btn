import { openBlock as n, createBlock as o, resolveDynamicComponent as l, mergeProps as c, withCtx as f, renderSlot as h, createTextVNode as u, toDisplayString as x } from "vue";
const p = {
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
      return this.size && !!this.size.match(
        new RegExp(`^${this.sizeableClassPrefix}`)
      );
    },
    sizeableClass() {
      return this.size ? !this.sizeableClassPrefix || this.hasSizeablePrefix ? this.size : `${this.sizeableClassPrefix}-${this.size}` : "";
    }
  }
}, P = {
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
      return this.variant && !!this.variant.match(
        new RegExp(`^${this.variantClassPrefix}`)
      );
    },
    variantClass() {
      return this.variant ? !this.variantClassPrefix || this.hasVariantPrefix ? this.variant : `${this.variantClassPrefix}-${this.variant}` : "";
    }
  }
}, b = {
  name: "Btn",
  mixins: [
    p,
    P
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
}, d = (t, i) => {
  const e = t.__vccOpts || t;
  for (const [s, r] of i)
    e[s] = r;
  return e;
};
function m(t, i, e, s, r, a) {
  return n(), o(l(a.component), c(t.$attrs, {
    disabled: e.disabled,
    class: a.classes,
    role: "button"
  }), {
    default: f(() => [
      h(t.$slots, "default", {}, () => [
        u(x(e.label), 1)
      ])
    ]),
    _: 3
  }, 16, ["disabled", "class"]);
}
const g = /* @__PURE__ */ d(b, [["render", m]]);
export {
  g as Btn
};
