declare const _default: import("vue").DefineComponent<{
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
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
}>>, {
    active: boolean;
    block: boolean;
    componentPrefix: string;
    disabled: boolean;
    outline: boolean;
}, {}>;
export default _default;
