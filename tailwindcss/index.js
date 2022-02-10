const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');
const { boxShadow } = require('tailwindcss/defaultTheme');
const variations = require('@vue-interface/variant/tailwindcss/variations');
const reduce = require('@vue-interface/variant/tailwindcss/reduce');
const Color = require('color');
const paramCase = require('param-case');

function contrast(color, light, dark) {
    return Color(color).luminosity() > .5 ? (dark || 'black') : (light || 'white');
}

function darken(color, ...args) {
    return Color(color).darken(...args).string();
}

function mix(color, subject, percent) {
    return Color(color).mix(Color(subject), percent).string();
}

module.exports = plugin(function({ addComponents, theme }) {
    function variant(key, backgroundColor, borderColor, color) {
        borderColor = borderColor || backgroundColor;
        color = color || contrast(backgroundColor);

        // Object.assign(component['*, ::before, ::after'], {
        //     [`--btn-${key}-background-color`]: backgroundColor,
        //     [`--btn-${key}-border-color`]: borderColor,
        //     [`--btn-${key}-color`]: color,
        //     [`--btn-${key}-hover-background-color`]: darken(backgroundColor, .075),
        //     [`--btn-${key}-hover-border-color`]: darken(borderColor, .1),
        //     [`--btn-${key}-hover-color`]: darken(color, .1),
        //     [`--btn-${key}-active-background-color`]: darken(backgroundColor, .1),
        //     [`--btn-${key}-active-border-color`]: darken(borderColor, .125),
        //     [`--btn-${key}-active-color`]: color,
        //     [`--btn-${key}-focus-box-shadow`]: `0 0 0 ${theme('btn.focus.width')} rgba(${mix(color, darken(borderColor, .125), .85)}, .5)`
        // });

        Object.assign(component, {
            [`.btn-${key}`]: {
                color,
                borderColor,
                backgroundColor,
                boxShadow: theme('btn.enableShadows') ? theme('btn.boxShadow') : null,
                backgroundImage: theme('btn.enableGradients') ? `linear-gradient(180deg, ${Color(theme('colors.white', colors.white)).fade(.15)}, ${theme('colors.white', colors.white)})` : undefined,
        
                '&:hover': {
                    color: darken(color, .1),
                    backgroundColor: darken(backgroundColor, .075),
                    backgroundImage: theme('btn.enableGradients') ? `linear-gradient(180deg, ${Color(theme('colors.white', colors.white)).fade(.15)}, ${theme('colors.white', colors.white)})` : undefined,
                    borderColor: darken(borderColor, .1)
                },

                '&:focus, &.focus': {
                    color,
                    backgroundColor: darken(backgroundColor, .1),
                    backgroundImage: theme('btn.enableGradients') ? `linear-gradient(180deg, ${Color(theme('colors.white', colors.white)).fade(.15)}, ${theme('colors.white', colors.white)})` : undefined,
                    borderColor: darken(borderColor, .125),
                    boxShadow: theme('btn.enableShadows') ? `${theme('btn.boxShadow')}, ` : '' + `0 0 0 ${theme('btn.focus.width')} ${Color(mix(color, darken(borderColor, .125), .85)).fade(.5)}`,
                },

                '&:active, &.active, .show > &.dropdown-toggle': {
                    color,
                    backgroundColor: darken(backgroundColor, .1),
                    backgroundImage: theme('btn.enableGradients') ? 'none' : undefined,
                    borderColor: darken(borderColor, .125),

                    '&:focus': {
                        boxShadow: theme('btn.enableShadows') ? `${theme('btn.active.boxShadow')}, ` : '' + `0 0 0 ${theme('btn.focus.width')} ${Color(mix(color, darken(borderColor, .125), .85)).fade(.5)}`
                    }
                },

                '&:disabled, &.disabled': {
                    color,
                    backgroundColor,
                    borderColor,
                    backgroundImage: theme('btn.enableGradients') ? 'none' : undefined,
                }
            }
        });
    }

    function outlineVariant(key, color) {
        // Object.assign(component['*, ::before, ::after'], {
        //     [`--btn-outline-${key}-color`]: color,
        //     [`--btn-outline-${key}-border-color`]: color,
        //     [`--btn-outline-${key}-hover-color`]: contrast(color),
        //     [`--btn-outline-${key}-active-background-color`]: color,
        //     [`--btn-outline-${key}-active-border-color`]: color,
        //     [`--btn-outline-${key}-active-color`]: contrast(color),
        //     [`--btn-outline-${key}-focus-box-shadow`]: `0 0 0 ${theme('btn.focus.width')} rgba(${color}, .5)`
        // });
        
        Object.assign(component, {
            [`.btn-outline-${key}`]: {
                color,
                borderColor: color,
            
                '&:hover': {
                    color: contrast(color),
                    backgroundColor: color,
                    borderColor: color
                },
          
                '&:focus, &.focus': {
                    boxShadow: `0 0 0 ${theme('btn.focus.width')} ${Color(color).fade(.5)}`
                },
          
                '&:active, &.active, &.dropdown-toggle.show': {
                    color: contrast(color),
                    backgroundColor: color,
                    bordercolor: color,
          
                    '&:focus': {
                        boxShadow: theme('btn.enableShadows') ? `${theme('btn.active.boxShadow')}), ` : '' + `0 0 0 ${theme('btn.focus.width')} ${Color(color).fade(.5)}`
                    }
                },
          
                '&:disabled, &.disabled': {
                    color,
                    backgroundColor: 'transparent'
                }
            }
        });
    }

    const vars = Object.assign({
        // '--btn-display': theme('btn.display'),
        // '--btn-color': theme('btn.color'),
        // '--btn-padding-y': theme('btn.paddingY'),
        // '--btn-padding-x': theme('btn.paddingX'),
        // '--btn-background-color': theme('btn.backgroundColor'),
        // '--btn-border-radius': theme('btn.borderRadius'),
        // '--btn-font-family': theme('btn.fontFamily'),
        // '--btn-font-size': theme('btn.fontSize'),
        // '--btn-text-align': theme('btn.textAlign'),
        // '--btn-text-decoration': theme('btn.textDecoration'),
        // '--btn-line-height': `${theme('btn.lineHeight')}`,
        // '--btn-white-space': theme('btn.whiteSpace'),
        // '--btn-vertical-align': theme('btn.verticalAlign'),
        // '--btn-user-select': theme('btn.userSelect'),
        // '--btn-border-width': theme('btn.borderWidth'),
        // '--btn-font-weight': theme('btn.fontWeight'),
        // '--btn-box-shadow': theme('btn.boxShadow'),
        // '--btn-block-spacing-y': theme('btn.blockSpacingY'),
        // '--btn-transition': theme('btn.transition'),

        // '--btn-sm-padding-y': theme('btn.sm.paddingY'),
        // '--btn-sm-padding-x': theme('btn.sm.paddingX'),
        // '--btn-sm-font-size': theme('btn.sm.fontSize'),
        // '--btn-sm-border-radius': theme('btn.sm.borderRadius'),

        // '--btn-lg-padding-y': theme('btn.lg.paddingY'),
        // '--btn-lg-padding-x': theme('btn.lg.paddingX'),
        // '--btn-lg-font-size': theme('btn.lg.fontSize'),
        // '--btn-lg-border-radius': theme('btn.lg.borderRadius'),

        // '--btn-focus-width': `${theme('btn.focus.width')}`,
        // '--btn-focus-box-shadow': `0 0 0 ${theme('btn.focus.width')} ${Color(mix('#fff', variations.primary, .85)).fade(.5)}`,
        // '--btn-focus-outline': `${theme('btn.focus.outline')}`,

        // '--btn-hover-text-decoration': theme('btn.hover.textDecoration'),

        // '--btn-disabled-opacity': `${theme('btn.disabled.opacity')}`,


        // '--btn-active-box-shadow': theme('btn.active.boxShadow'),

        // '--btn-link-color': theme('btn.link.color'),
        // '--btn-link-hover-color': theme('btn.link.hover.color'),
        // '--btn-link-hover-text-decoration': theme('btn.link.hover.textDecoration'),
        // '--btn-link-focus-text-decoration': theme('btn.link.hover.textDecoration'),
        // '--btn-link-disabled-color': theme('btn.link.disabled.color'),
        // '--btn-link-text-decoration': theme('btn.link.textDecoration'),
        // '--btn-link-font-weight': theme('btn.link.fontWeight'),

        // '--btn-block-display': theme('btn.block.display'),
        // '--btn-block-width': theme('btn.block.width'),
        // '--btn-block-margin-top': theme('btn.block.marginTop'),
    });

    // Object.entries(theme('btn.sizes'))
    //     .reduce((carry, [size, props]) => {
    //         return Object.entries(props)
    //             .filter(([key]) => {
    //                 return ['paddingX', 'paddingY'].indexOf(key) === -1;
    //             })
    //             .reduce((carry, [prop, value]) => {
    //                 return Object.assign(carry, {
    //                     [`--btn-${size}-${kebabCase(prop)}`]: value
    //                 });
    //             }, carry);
    //     }, vars);
    
    const component = {
        '*, ::before, ::after': vars,

        //
        // Base styles
        //
        '.btn': {
            display: theme('btn.display'),
            padding: `${theme('btn.paddingY')} ${theme('btn.paddingX')}`,
            fontSize: `${theme('btn.fontSize')}`,
            fontFamily: theme('btn.fontFamily'),
            fontWeight: theme('btn.fontWeight'),
            lineHeight: `${theme('btn.lineHeight')}`,
            color: theme('btn.color'),
            textAlign: theme('btn.textAlign'),
            textDecoration: theme('btn.textDecoration'),
            whiteSpace: theme('btn.whiteSpace'),
            verticalAlign: theme('btn.verticalAlign'),
            cursor: theme('enablePointers') ? theme('btn.cursor') : null,
            userSelect: theme('btn.userSelect'),
            backgroundColor: theme('btn.backgroundColor'),
            border: `${theme('btn.borderWidth')} solid transparent`,
            borderRadius: theme('btn.borderRadius'),
            transition: theme('btn.transition'),
            boxShadow: theme('btn.enableShadows') ? theme('btn.boxShadow') : null,

            '&:hover': {
                color: theme('colors.gray.900', colors.gray[900]),
                textDecoration: theme('btn.hover.textDecoration'),
            },
        
            '&:focus, &.focus': {
                outline: `${theme('btn.focus.outline')}`,
                boxShadow: (theme('btn.enableShadows') ? `${theme('btn.boxShadow')}, ` : '') + `0 0 0 ${theme('btn.focus.width')} ${Color(mix('#fff', variations.primary, .85)).fade(.5)}`
            },
        
            '&:active, &.active': {
                boxShadow: theme('btn.enabledShadows') ? theme('btn.active.boxShadow') : null,
            
                '&:focus': {
                    boxShadow: `0 0 0 ${theme('btn.focus.width')} ${Color(mix('#fff', variations.primary, .85)).fade(.5)}, ${theme('btn.enabledShadows') ? theme('btn.active.boxShadow') : null}`
                }
            },
        
            '&:disabled, &.disabled, fieldset:disabled &': { // stylelint-disable-line selector-no-qualifying-type
                pointerEvents: 'none',
                opacity: `${theme('btn.disabled.opacity')}`,
                boxShadow: 'none'
            }
        }
    };
    
    Object.entries(theme('btn.variations', variations))
        .forEach(([key, value]) => {
            variant(key, value);
            outlineVariant(key, value);
        });

    Object.entries(reduce(theme('btn.colors', [])))
        .forEach(([key, value]) => {
            try {
                variant(key, value);
                outlineVariant(key, value);
            }
            catch (e) {
                // Ignore the error
            }
        });
   
    Object.assign(component, {
        //
        // Link buttons
        //
        // Make a button look and behave like a link
        '.btn-link': {
            fontWeight: theme('btn.link.fontWeight'),
            color: theme('btn.link.color'),
            textDecoration: theme('btn.link.textDecoration'),
        
            '&:hover': {
                color: theme('btn.link.hover.color'),
                textDecoration: theme('btn.link.hover.textDecoration')
            },
        
            '&:focus, &.focus': {
                textDecoration: theme('btn.link.hover.textDecoration')
            },
        
            '&:disabled, &.disabled': {
                color: theme('btn.link.disabled.color')
            }
        },

        //
        // Block button
        //
        '.btn-block': {
            display: theme('btn.block.display'),
            width: theme('btn.block.width'),
        
            // Vertically space out multiple block buttons
            '+ .btn-block': {
                marginTop: theme('btn.block.marginTop')
            }
        },

        '.btn-inline': {
            display: theme('btn.display'),
            width: 'auto'
        }
    });

    Object.entries(theme('btn.sizes')) .reduce((carry, [size, props]) => {
        return Object.assign(carry, {
            [`.btn-${size}`]: Object.fromEntries(
                Object.entries(props).filter(([key]) => {
                    return ['paddingX', 'paddingY'].indexOf(key) === -1;
                })
            )
        });
    }, component);

    addComponents(component);
}, {
    theme: {
        btn: theme => Object.assign({
            enablePointers: true,
            enableGradients: false,
            enableShadows: false,
            display: 'inline-block',
            color: 'inherit',
            cursor: 'pointer',
            paddingY: theme('form.paddingY', '.375rem'),
            paddingX: theme('form.paddingX', '.75rem'),
            fontFamily:  theme('form.fontFamily', 'inherit'),
            fontSize: theme('form.fontSize', '1rem'),
            textAlign: 'center',
            textDecoration: 'none',
            lineHeight: theme('form.fontSize', 1.5),
            whiteSpace: theme('form.whiteSpace', 'nowrap'), // Set to `nowrap` to prevent text wrapping
            backgroundColor: 'transparent',
            verticalAlign: 'middle',
            userSelect: 'none',
            borderWidth: theme('form.borderWidth', '1px'),
            fontWeight: theme('form.fontWeight', 'normal'),
            boxShadow: `inset 0 1px 0 ${Color(theme('colors.white', colors.white)).fade(.15)}, 0 1px 1px ${Color(theme('colors.black', colors.black)).fade(.075)}`,
            borderRadius: theme('form.borderRadius', '.25rem'),
            blockSpacingY: '.5rem',
            transition: 'color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out',

            hover: {
                textDecoration: 'none'
            },

            disabled: {
                opacity: .65
            },
            
            active: {
                boxShadow: `inset 0 3px 5px ${Color(theme('colors.black', colors.black)).fade(.125)}`,
            },

            focus: {
                width: theme('form.focus.width', '.25rem'),
                outline: 0,
                boxShadow
            },

            link: {
                color: '#0d6efd',
                textDecoration: 'none',
                fontWeight: 'normal',
                hover: {
                    color: '#0d6efd',
                    textDecoration: 'underline'
                },
                focus: {
                    textDecoration: 'none'
                },
                disabled: {
                    color: theme('colors.gray.600', colors.gray[600]),
                }
            },

            block: {
                display: 'block',
                width: '100%',
                marginTop: '.5rem'
            },

            variations,

            colors: {}
        }, {
            sizes: Object.fromEntries(
                Object.entries(require('./sizes')).map(([size, props]) => {
                    props = Object.entries(props).reduce((carry, [prop, value]) => {
                        return Object.assign(carry, {
                            [prop]: theme(`form.${size}.${prop}`, value)
                        });
                    }, {
                        padding: `${props.paddingY} ${props.paddingX}`
                    });
                    
                    return [size, props];
                })
            )
        })
    }
});