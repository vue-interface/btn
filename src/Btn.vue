<template>
    <router-link
        v-if="to"
        :to="to"
        :disabled="disabled"
        :class="classes"
        role="button"
        @click="onClick">
        <slot />
    </router-link>
    <a
        v-else-if="href"
        :href="href"
        :disabled="disabled"
        :class="classes"
        role="button"
        @click="onClick">
        <slot />
    </a>
    <label v-else-if="label" :disabled="disabled" :class="classes" role="button" @click="onClick">
        <slot />
    </label>
    <button v-else :type="type" :disabled="disabled" :class="classes" @click="onClick">
        <slot />
    </button>
</template>

<script>
import { kebabCase } from '@vue-interface/utils';
import Sizeable from '@vue-interface/sizeable';
import Variant from '@vue-interface/variant';

export default {

    name: 'Btn',

    mixins: [
        Sizeable,
        Variant,
    ],

    props: {

        /**
         * Display button with active state
         *
         * @property String
         */
        active: Boolean,

        /**
         * Display button with blocked state
         *
         * @property String
         */
        block: Boolean,

        /**
         * Display button with disabled state
         *
         * @property String
         */
        disabled: Boolean,

        /**
         * If an href is passed, button is an router-link element
         *
         * @property Boolean
         */
        href: String,

        /**
         * Should use <label> as the element for the button. Used for inputs
         * wrappers (toggles).
         *
         * @property Boolean
         */
        label: Boolean,

        /**
         * Display as an outline button
         *
         * @property String
         */
        outline: Boolean,

        /**
         * If an to is passed, button is an router-link element
         *
         * @property Boolean
         */
        to: [Object, String],

        /**
         * The type attribute for the button. Not applied if an anchor
         *
         * @property String
         */
        type: String

    },

    computed: {

        variantClassPrefix() {
            return kebabCase(this.$options.name) + (this.outline ? '-outline' : '');
        },

        classes() {
            return {
                'active': this.active,
                'btn': true,
                'btn-block': this.block,
                [this.variantClass]: !!this.variantClass,
                [this.sizeableClass]: !!this.sizeableClass,
                [this.colorableClasses]: !!this.colorableClasses,
            };
        }

    },

    methods: {

        onClick(event) {
            if(!this.disabled) {
                this.$emit('click', event);
            }
            else {
                event.preventDefault();
            }
        }

    }

};
</script>
