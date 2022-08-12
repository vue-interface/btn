<template>
    <component
        :is="component"
        v-bind="$attrs"
        :disabled="disabled"
        :class="classes"
        role="button">
        <slot>{{ label }}</slot>
    </component>
</template>

<script lang="ts">
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
         * The component prefix.
         * 
         * @property {String}
         */
        componentPrefix: {
            type: String,
            default: 'btn'
        },

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
        },
    },

    computed: {

        /**
         * Get the button classes.
         * 
         * @property {string}
         */
        classes(): Array<string> {
            return [
                'btn',
                this.variantClass,
                this.sizeableClass,
                this.active && 'active',
                this.block && 'btn-block',
                this.disabled && 'disabled',
            ];
        },

        /**
         * Get the component tag name.
         * 
         * @property {string}
         */
        component(): string {
            if(this.tag) {
                return this.tag;
            }

            if(this.$attrs.href) {
                return 'a';
            }

            return 'button';
        },

        /**
         * The variant class prefix that accounts for outline buttons.
         * 
         * @property {string}
         */
        variantClassPrefix(): string {
            return (this.variantPrefix || this.componentPrefix) + (this.outline ? '-outline' : '');
        }

    }

};
</script>
