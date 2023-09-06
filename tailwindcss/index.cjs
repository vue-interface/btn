const variations = require('@vue-interface/variant/tailwindcss/variations');
const shades = require('@vue-interface/variant/tailwindcss/shades');
const Color = require('color');
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');
const { contrast, darken, mix } = require('./colorize.cjs');
const sizes = require('./sizes.cjs');

module.exports = function(options = {}) {
    return plugin(({ addComponents, matchComponents, theme }) => {
        const styles = Object.assign({
            'btn': ({ backgroundColor, borderColor, color }) => {
                const outline = theme('btn.outline')
                    ? theme('btn.outline').replace('DEFAULT', mix(color, darken(borderColor, .125), .85).fade(.5).string())
                    : undefined;
                            
                return {
                    ...(theme('btn.css')['.btn'] ?? {}),
                    
                    backgroundColor,
                    backgroundImage: theme('btn.enableGradients') && theme('btn.boxShadow'),
                    borderColor,
                    boxShadow: theme('btn.enableShadows') && theme('btn.boxShadow'),
                    color,

                    '&:hover': {
                        backgroundColor: darken(backgroundColor, .075).string(),
                        backgroundImage: theme('btn.enableGradients') && theme('btn.boxShadow'),
                        borderColor: darken(borderColor, .1).string(),
                        color: darken(color, .1).string(),
                    },
                    '&:focus, &.focus': {
                        backgroundColor: darken(backgroundColor, .1).string(),
                        backgroundImage: theme('btn.enableGradients') && theme('btn.boxShadow'),
                        borderColor: darken(borderColor, .125.string()),
                        boxShadow: (theme('btn.enableShadows') ? `${theme('btn.boxShadow')}, ` : '') + outline,
                        color,
                    },
                    '&:active, &.active, .show > &.dropdown-toggle': {
                        backgroundColor: darken(backgroundColor, .1).string(),
                        backgroundImage: theme('btn.enableGradients') && 'none',
                        borderColor: darken(borderColor, .125).string(),
                        color,
                    
                        '&:focus': {
                            boxShadow: (theme('btn.enableShadows') ? `${theme('btn.boxShadow')}, ` : '') + outline
                        }
                    },
                    '&:disabled, &.disabled, fieldset:disabled &': {
                        pointerEvents: 'none',
                        opacity: '.65',
                        boxShadow: 'none',
                        backgroundColor,
                        backgroundImage: theme('btn.enableGradients') && 'none',
                        borderColor,
                        color,
                    }
                };
            },
            'btn-outline': ({ backgroundColor, color }) => {
                const outline = theme('btn.outline')
                    ? theme('btn.outline').replace('DEFAULT', Color(backgroundColor).fade(.5))
                    : undefined;
        
                return {
                    ...(theme('btn.css')['.btn'] ?? {}),

                    borderColor: backgroundColor,
                    color: backgroundColor,
                    boxShadow: theme('btn.enableShadows') && theme('btn.boxShadow'),
                                
                    '&:hover': {
                        backgroundColor,
                        borderColor: backgroundColor,
                        color: contrast(backgroundColor),
                    },
                            
                    '&:focus, &.focus': {
                        boxShadow: (theme('btn.enableShadows') ? `${theme('btn.boxShadow')}, ` : '') + outline,
                    },
                            
                    '&:active, &.active, &.dropdown-toggle.show': {
                        backgroundColor: backgroundColor,
                        borderColor: backgroundColor,
                        color: contrast(backgroundColor),
                            
                        '&:focus': {
                            boxShadow: (theme('btn.enableShadows') ? `${theme('btn.boxShadow')}, ` : '') + outline,
                        }
                    },
                            
                    '&:disabled, &.disabled': {
                        backgroundColor: 'transparent',
                        color: backgroundColor
                    }
                };
            }
        }, typeof options.styles === 'function' ? options.styles(theme) : options.styles);
    
        const buttonColors = Object.fromEntries(
            Object.entries(shades(theme('btn.variations')))
                .map(([key, backgroundColor]) => {
                    return [key, {
                        backgroundColor,
                        borderColor: backgroundColor,
                        color: contrast(backgroundColor),
                    }];
                })
        );

        addComponents(theme('btn.css'));
    
        matchComponents(styles, {
            values: buttonColors
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
                        justifyItems: 'center',
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