(function(r,a){typeof exports=="object"&&typeof module!="undefined"?a(exports):typeof define=="function"&&define.amd?define(["exports"],a):(r=typeof globalThis!="undefined"?globalThis:r||self,a(r.Btn={}))})(this,function(r){"use strict";var a={props:{size:String,sizePrefix:{type:String,default(){return this.$options.name&&this.$options.name.toLowerCase()}}},computed:{sizeableClassPrefix(){return this.sizePrefix},sizeableClass(){return!this.size||!this.sizeableClassPrefix?"":`${this.sizeableClassPrefix}-${this.size}`}}},v={props:{variant:String,variantPrefix:{type:String,default(){return this.$options.name&&this.$options.name.toLowerCase()}}},computed:{variantClassPrefix(){return this.variantPrefix},variantClass(){return!this.variant||!this.variantClassPrefix?"":`${this.variantClassPrefix}-${this.variant}`}}},p=function(){var e=this,s=e.$createElement,l=e._self._c||s;return l(e.component,{tag:"component",class:e.classes,attrs:{disabled:e.disabled,role:"button"},on:{click:function(f){!e.disabled&&e.$emit("click",f)}}},[e._t("default",function(){return[e._v(e._s(e.label))]})],2)},b=[];function m(e,s,l,f,o,d,h,S){var t=typeof e=="function"?e.options:e;s&&(t.render=s,t.staticRenderFns=l,t._compiled=!0),f&&(t.functional=!0),d&&(t._scopeId="data-v-"+d);var n;if(h?(n=function(i){i=i||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!i&&typeof __VUE_SSR_CONTEXT__!="undefined"&&(i=__VUE_SSR_CONTEXT__),o&&o.call(this,i),i&&i._registeredComponents&&i._registeredComponents.add(h)},t._ssrRegister=n):o&&(n=S?function(){o.call(this,(t.functional?this.parent:this).$root.$options.shadowRoot)}:o),n)if(t.functional){t._injectStyles=n;var z=t.render;t.render=function(y,_){return n.call(_),z(y,_)}}else{var c=t.beforeCreate;t.beforeCreate=c?[].concat(c,n):[n]}return{exports:e,options:t}}const C={name:"Btn",mixins:[a,v],props:{active:Boolean,block:Boolean,disabled:Boolean,label:String,outline:Boolean,tag:String,variant:{type:String,default:"primary"}},computed:{classes(){return["btn",this.variantClass,this.sizeableClass,this.active&&"active",this.block&&"btn-block",this.disabled&&"disabled"]},component(){return this.tag?this.tag:this.$attrs.to?"router-link":this.$attrs.href?"a":"button"},variantClassPrefix(){return this.variantPrefix+(this.outline?"-outline":"")}}},u={};var $=m(C,p,b,!1,g,null,null,null);function g(e){for(let s in u)this[s]=u[s]}var P=function(){return $.exports}();r.Btn=P,Object.defineProperty(r,"__esModule",{value:!0}),r[Symbol.toStringTag]="Module"});
