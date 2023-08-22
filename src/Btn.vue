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
         * The button label.
         */
        label: {
            type: String,
            default: undefined
        },

        /**
         * Display as an outline button.
         */
        outline: Boolean,

        /**
         * The HTML tag.
         */
        tag: {
            type: String,
            default: undefined
        },
    },

    computed: {

        /**
         * Get the button classes.
         */
        classes() {
            return {
                active: this.active,
                disabled: this.disabled,
            };
        },

        /**
         * Get the component tag name.
         */
        component(): string {
            if(this.tag) {
                return this.tag;
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
        :disabled="disabled"
        class="btn"
        :class="classes"
        role="button">
        <slot>{{ label }}</slot>
    </Component>
</template>
