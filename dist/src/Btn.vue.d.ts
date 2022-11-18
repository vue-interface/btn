declare const _sfc_main: {
    name: string;
    mixins: ({
        props: {
            componentPrefix: StringConstructor;
            size: StringConstructor;
            sizePrefix: StringConstructor;
        };
        computed: {
            sizeableClassPrefix(): string | undefined;
            hasSizeablePrefix(): boolean;
            sizeableClass(): string;
        };
    } | {
        props: {
            componentPrefix: StringConstructor;
            variant: StringConstructor;
            variantPrefix: StringConstructor;
        };
        computed: {
            variantClassPrefix(): string | undefined;
            hasVariantPrefix(): boolean;
            variantClass(): string;
        };
    })[];
    props: {
        /**
         * Display button with active state.
         *
         * @property {Boolean}
         */
        active: BooleanConstructor;
        /**
         * Display button with blocked state.
         *
         * @property {Boolean}
         */
        block: BooleanConstructor;
        /**
         * The component prefix.
         *
         * @property {String}
         */
        componentPrefix: {
            type: StringConstructor;
            default: string;
        };
        /**
         * Disable the button.
         *
         * @property {Boolean}
         */
        disabled: BooleanConstructor;
        /**
         * The button label.
         *
         * @property {String}
         */
        label: StringConstructor;
        /**
         * Display as an outline button.
         *
         * @property {Boolean}
         */
        outline: BooleanConstructor;
        /**
         * The HTML tag.
         *
         * @property {String}
         */
        tag: StringConstructor;
        /**
         * The button variant.
         *
         * @property {String}
         */
        variant: {
            type: StringConstructor;
            default: string;
        };
    };
    computed: {
        /**
         * Get the button classes.
         *
         * @property {string}
         */
        classes(): Array<string>;
        /**
         * Get the component tag name.
         *
         * @property {string}
         */
        component(): string;
        /**
         * The variant class prefix that accounts for outline buttons.
         *
         * @property {string}
         */
        variantClassPrefix(): string;
    };
};
export default _sfc_main;
