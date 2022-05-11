<template>
    <component
        :is="component"
        v-bind="$attrs"
        :disabled="disabled"
        :class="classes"
        role="button"
        @click="!disabled && $emit('click', $event)">
        <slot>{{ label }}</slot>
    </component>
</template>

<script>
import { Sizeable } from '@vue-interface/sizeable';
import { Variant } from '@vue-interface/variant';

export default {

    name: 'Btn',

    mixins: [
        Sizeable,
        Variant,
    ],

    props: {
        /**
         * Display button with active state.
         *
         * @property {Boolean}
         */
        active: Boolean,

        /**
         * Display button with blocked state.
         *
         * @property {Boolean}
         */
        block: Boolean,

        /**
         * Disable the button.
         *
         * @property {Boolean}
         */
        disabled: Boolean,

        /**
         * The button label.
         *
         * @property {String}
         */
        label: String,

        /**
         * Display as an outline button.
         *
         * @property {Boolean}
         */
        outline: Boolean,

        /**
         * The HTML tag.
         *
         * @property {String}
         */
        tag: String,

        /**
         * The button variant.
         * 
         * @property {String}
         */
        variant: {
            type: String,
            default: 'primary'
        }
    },

    computed: {

        classes() {
            return [
                'btn',
                this.variantClass,
                this.sizeableClass,
                this.active && 'active',
                this.block && 'btn-block',
                this.disabled && 'disabled',
            ];
        },

        component() {
            if(this.tag) {
                return this.tag;
            }

            if(this.$attrs.to) {
                return 'router-link';
            }

            if(this.$attrs.href) {
                return 'a';
            }

            return 'button';
        },

        variantClassPrefix() {
            return this.variantPrefix + (this.outline ? '-outline' : '');
        },

    }

};
</script>
