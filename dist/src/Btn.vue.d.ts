declare const _sfc_main: import("vue").DefineComponent<{
    /**
     * Display button with active state.
     */
    active: BooleanConstructor;
    /**
     * Display button with blocked state.
     */
    block: BooleanConstructor;
    /**
     * The component prefix.
     */
    componentPrefix: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Disable the button.
     */
    disabled: BooleanConstructor;
    /**
     */
    label: StringConstructor;
    /**
     * Display as an outline button.
     */
    outline: BooleanConstructor;
    /**
     * The HTML tag.
     */
    tag: StringConstructor;
    /**
     * The button variant.
     */
    variant: {
        type: StringConstructor;
        default: string;
    };
}, unknown, unknown, {
    /**
     * Get the button classes.
     */
    classes(): string | undefined[];
    /**
     * Get the component tag name.
     */
    component(): string;
    /**
     * The variant class prefix that accounts for outline buttons.
     */
    variantClassPrefix(): string;
}, {}, import("vue").DefineComponent<{
    componentPrefix: StringConstructor;
    size: StringConstructor;
    sizePrefix: StringConstructor;
}, unknown, unknown, {
    sizeableClassPrefix(): string | undefined;
    hasSizeablePrefix(): boolean;
    sizeableClass(): string;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    componentPrefix: StringConstructor;
    size: StringConstructor;
    sizePrefix: StringConstructor;
}>>, {}> | {
    props: {
        componentPrefix: StringConstructor;
        variant: StringConstructor;
        variantPrefix: StringConstructor; /**
         * The component prefix.
         */
    };
    computed: {
        variantClassPrefix(): string | undefined;
        hasVariantPrefix(): boolean;
        variantClass(): string;
    };
}, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Display button with active state.
     */
    active: BooleanConstructor;
    /**
     * Display button with blocked state.
     */
    block: BooleanConstructor;
    /**
     * The component prefix.
     */
    componentPrefix: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Disable the button.
     */
    disabled: BooleanConstructor;
    /**
     */
    label: StringConstructor;
    /**
     * Display as an outline button.
     */
    outline: BooleanConstructor;
    /**
     * The HTML tag.
     */
    tag: StringConstructor;
    /**
     * The button variant.
     */
    variant: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    componentPrefix: string;
    active: boolean;
    block: boolean;
    disabled: boolean;
    outline: boolean;
    variant: string;
}>;
export default _sfc_main;
