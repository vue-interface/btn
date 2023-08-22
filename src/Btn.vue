<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

    props: {
        /**
         * Display button with active state.
         */
        active: Boolean,

        /**
         * Display button with blocked state.
         */
        block: Boolean,

        /**
         * The component prefix.
         */
        componentPrefix: {
            type: String,
            default: 'btn'
        },

        /**
         * Disable the button.
         */
        disabled: Boolean,

        /**
         */
        label: String,

        /**
         * Display as an outline button.
         */
        outline: Boolean,

        /**
         * The HTML tag.
         */
        tag: String
    },

    computed: {

        /**
         * Get the button classes.
         */
        classes(): string|undefined[] {
            return [
                'btn',
                this.active && 'active',
                this.disabled && 'disabled',
            ];
        },

        /**
         * Get the component tag name.
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
         */
        variantClassPrefix(): string {
            return (this.variantPrefix || this.componentPrefix) + (this.outline ? '-outline' : '');
        }

    }

});
</script>

<template>
    <Component
        :is="component"
        v-bind="$attrs"
        :disabled="disabled"
        :class="classes"
        role="button">
        <slot>{{ label }}</slot>
    </Component>
</template>
