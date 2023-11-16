const variations = require('@vue-interface/variant/tailwindcss/variations');
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');
const flattenColorPalette = require('tailwindcss/src/util/flattenColorPalette');
const { contrast } = require('./colorize.cjs');
const sizes = require('./sizes.cjs');

function transform(backgroundColor) {
    return {
        backgroundColor,
        borderColor: backgroundColor,
        color: contrast(backgroundColor),
    };
}

module.exports = function(options = {}) {
    return plugin(({ addComponents, matchComponents, theme }) => {
        const styles = {
            btn: require('./styles/btn.cjs')(theme),
            btnOutline: require('./styles/btn-outline.cjs')(theme)
        };
    
        addComponents(theme('btn.css'));
    
        matchComponents({
            'btn': value => styles.btn(transform(value)),
            'btn-outline': value => styles.btnOutline(transform(value)),
            ...(
                typeof options.styles === 'function'
                    ? options.styles(theme)
                    : options.styles
            )
        }, {
            type: 'color',
            values: {
                ...flattenColorPalette(theme('btn.variations')),
                ...flattenColorPalette(theme('colors'))
            }
        });
        
        matchComponents({
            'btn': value => value
        }, {
            values: theme('btn.sizes')
        });
    }, {
        theme: {
            btn: theme => ({
                variations: theme('variations', variations),
                
                outline: `0 0 0 ${theme('form.focus.width', '.25rem')} DEFAULT`,
                
                sizes,

                css: {
                    /**
                     * Base Styles
                     */
                    '.btn' : {
                        display: 'inline-flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '.25rem',
                        padding: `${theme('form.paddingY', '.375rem')} ${theme('form.paddingX', '.375rem')}`,
                        fontSize: `${theme('form.fontSize', '1rem')}`,
                        fontFamily: theme('form.fontFamily', 'inherit'),
                        fontWeight: theme('form.fontWeight', 'normal'),
                        lineHeight: `${theme('form.lineHeight', 1.5)}`,
                        color: 'inherit',
                        textAlign: 'center',
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                        verticalAlign: 'middle',
                        cursor: 'pointer',
                        userSelect: 'none',
                        backgroundColor: 'transparent',
                        border: `${theme('form.borderWidth', '1px')} solid transparent`,
                        borderRadius: theme('form.borderRadius', '.25rem'),
                        transition: 'color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out',
                        outline: 'none',
                            
                        // '&:hover': {
                        //     color: theme('colors.slate.900', colors.slate['900']),
                        //     textDecoration: 'none',
                        // },
                        
                        '&:focus, &.focus': {
                            outline: '0',
                        },
                        
                        '&:disabled, &.disabled, fieldset:disabled &': {
                            pointerEvents: 'none',
                            opacity: '.65',
                            boxShadow: 'none'
                        }
                    },
            
                    /**
                     * Link Buttons
                     */
                    '.btn-link': {
                        fontWeight: 'normal',
                        color: theme('variations.primary', colors.blue['500']),
                        textDecoration: 'none',
                            
                        '&:hover, &:active': {
                            color: theme('variations.primary', colors.blue['500']),
                            textDecoration: 'underline'
                        },
                            
                        '&:focus, &.focus': {
                            boxShadow: 'none',
                            textDecoration: 'underline'
                        },
                            
                        '&:disabled, &.disabled': {
                            color: theme('colors.gray.600', colors.gray[600]),
                        }
                    },
                                
                    /**
                     * Block Buttons
                     */
                    '.btn-block': {
                        display: 'block',
                        textAlign: 'center',
                        width: '100%',
                    },
                    
                    /**
                     * Inline Buttons
                     */
                    '.btn-inline': {
                        display: 'inline',
                        width: 'auto'
                    }
                }
            })
        }
    });
};