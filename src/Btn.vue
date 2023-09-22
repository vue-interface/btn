<script setup lang="ts">
import { computed } from 'vue';

export type BtnProps = {
    active?: boolean,
    block?: boolean,
    disabled?: boolean,
    label?: string,
    outline?: boolean,
    size?: string,
    tag?: string,
    variant?: string,
}

const props = defineProps<BtnProps>();

const classes = computed(() => ({
    btn: true,
    active: props.active,
    disabled: props.disabled,
    [props.size]: !!props.size,
    [props.variant]: !!props.variant,
    ['btn-block']: props.block,
}));

const component = computed(() => props.tag ?? 'button');
</script>

<template>
    <Component
        :is="component"
        :class="classes"
        :disabled="disabled"
        role="button">
        <slot>{{ label }}</slot>
    </Component>
</template>
