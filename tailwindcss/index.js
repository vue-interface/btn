
const Color = require('color');
const hexToRgba = require('hex-to-rgba');
const plugin = require('tailwindcss/plugin');
const { colors, boxShadow } = require('tailwindcss/defaultTheme');
const defaultVariations = require('@vue-interface/variant/tailwindcss/defaultVariations');

function darken(color, ...args) {
    return Color(color).darken(...args).hex();
}

function contrast(color, light, dark) {
    return Color(color).luminosity() > .5 ? (dark || 'black') : (light || 'white');
}

function mix(color, subject, percent) {
    return Color(color).mix(Color(subject), percent).hex();
}

function rgba(color, percent) {
    return hexToRgba(color, percent);
}

module.exports = plugin(function({ addComponents, theme, postcss }) {
    function variant(key, backgroundColor, borderColor, color) {
        borderColor = borderColor || backgroundColor;
        color = color || contrast(backgroundColor);

        Object.assign(component[':root'], {
            [`--btn-${key}-background-color`]: backgroundColor,
            [`--btn-${key}-border-color`]: borderColor,
            [`--btn-${key}-color`]: color,
            [`--btn-${key}-hover-background-color`]: darken(backgroundColor, .075),
            [`--btn-${key}-hover-border-color`]: darken(borderColor, .1),
            [`--btn-${key}-hover-color`]: darken(color, .1),
            [`--btn-${key}-active-background-color`]: darken(backgroundColor, .1),
            [`--btn-${key}-active-border-color`]: darken(borderColor, .125),
            [`--btn-${key}-active-color`]: color,
            [`--btn-${key}-focus-box-shadow`]: `0 0 0 ${theme('btn.focus.width')} ${rgba(mix(color, darken(borderColor, .125), .85), .5)}`
        });

        Object.assign(component, {
            [`.btn-${key}`]: {
                color,
                borderColor,
                backgroundColor,
                boxShadow: theme('btn.enableShadows') ? theme('btn.boxShadow') : null,
                backgroundImage: theme('btn.enableGradients') ? `linear-gradient(180deg, ${rgba(theme('colors.white', colors.white), .15)}, ${rgba(theme('colors.white', colors.white), 0)})` : undefined,
        
                '&:hover': {
                    color: darken(color, .1),
                    backgroundColor: darken(backgroundColor, .075),
                    backgroundImage: theme('btn.enableGradients') ? `linear-gradient(180deg, ${rgba(theme('colors.white', colors.white), .15)}, ${rgba(theme('colors.white', colors.white), 0)})` : undefined,
                    borderColor: darken(borderColor, .1)
                },

                '&:focus, &.focus': {
                    color,
                    backgroundColor: darken(backgroundColor, .1),
                    backgroundImage: theme('btn.enableGradients') ? `linear-gradient(180deg, ${rgba(theme('colors.white', colors.white), .15)}, ${rgba(theme('colors.white', colors.white), 0)})` : undefined,
                    borderColor: darken(borderColor, .125),
                    boxShadow: theme('btn.enableShadows') ? `${theme('btn.boxShadow')}, ` : '' + `0 0 0 ${theme('btn.focus.width')} ${rgba(mix(color, darken(borderColor, .125), .85), .5)}`,
                },

                '&:active, &.active, .show > &.dropdown-toggle': {
                    color,
                    backgroundColor: darken(backgroundColor, .1),
                    backgroundImage: theme('btn.enableGradients') ? 'none' : undefined,
                    borderColor: darken(borderColor, .125),

                    '&:focus': {
                        boxShadow: theme('btn.enableShadows') ? `${theme('btn.active.boxShadow')}, ` : '' + `0 0 0 ${theme('btn.focus.width')} ${rgba(mix(color, darken(borderColor, .125), .85), .5)}`
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
        Object.assign(component[':root'], {
            [`--btn-outline-${key}-color`]: color,
            [`--btn-outline-${key}-border-color`]: color,
            [`--btn-outline-${key}-hover-color`]: contrast(color),
            [`--btn-outline-${key}-active-background-color`]: color,
            [`--btn-outline-${key}-active-border-color`]: color,
            [`--btn-outline-${key}-active-color`]: contrast(color),
            [`--btn-outline-${key}-focus-box-shadow`]: `0 0 0 ${theme('btn.focus.width')} ${rgba(color, .5)}`
        });
        
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
                    boxShadow: `0 0 0 ${theme('btn.focus.width')} ${rgba(color, .5)}`
                },
          
                '&:active, &.active, &.dropdown-toggle.show': {
                    color: contrast(color),
                    backgroundColor: color,
                    borderColor: color,
          
                    '&:focus': {
                        boxShadow: theme('btn.enableShadows') ? `${theme('btn.active.boxShadow')}, ` : '' + `0 0 0 ${theme('btn.focus.width')} ${rgba(color, .5)}`
                    }
                },
          
                '&:disabled, &.disabled': {
                    color,
                    backgroundColor: 'transparent'
                }
            }
        });
    }

    const component = {
        ':root': {
            '--btn-color': theme('btn.color'),
            '--btn-padding-y': theme('btn.paddingY'),
            '--btn-padding-x': theme('btn.paddingX'),
            '--btn-background-color': theme('btn.backgroundColor'),
            '--btn-border-radius': theme('btn.borderRadius'),
            '--btn-font-family': theme('btn.fontFamily'),
            '--btn-font-size':  theme('btn.fontSize'),
            '--btn-line-height': `${theme('btn.lineHeight')}`,
            '--btn-white-space': theme('btn.whiteSpace'),
            '--btn-border-width': theme('btn.borderWidth'),
            '--btn-font-weight': theme('btn.fontWeight'),
            '--btn-box-shadow': theme('btn.boxShadow'),
            '--btn-block-spacing-y': theme('btn.blockSpacingY'),
            '--btn-transition': theme('btn.transition'),

            '--btn-sm-padding-y': theme('btn.sm.paddingY'),
            '--btn-sm-padding-x': theme('btn.sm.paddingX'),
            '--btn-sm-font-size': theme('btn.sm.fontSize'),
            '--btn-sm-border-radius': theme('btn.sm.borderRadius'),

            '--btn-lg-padding-y': theme('btn.lg.paddingY'),
            '--btn-lg-padding-x': theme('btn.lg.paddingX'),
            '--btn-lg-font-size': theme('btn.lg.fontSize'),
            '--btn-lg-border-radius': theme('btn.lg.borderRadius'),

            '--btn-focus-width': `${theme('btn.focus.width')}`,
            '--btn-focus-box-shadow': `0 0 0 ${theme('btn.focus.width')} ${rgba(mix('#fff', defaultVariations.primary, .85), .5)}`,
            '--btn-focus-outline': `${theme('btn.focus.outline')}`,

            '--btn-disabled-opacity': `${theme('btn.disabled.opacity')}`,


            '--btn-active-box-shadow': theme('btn.active.boxShadow'),

            '--btn-link-color': theme('btn.link.color'),
            '--btn-link-hover-color': theme('btn.link.hover.color'),
            '--btn-link-hover-text-decoration': theme('btn.link.hover.textDecoration'),
            '--btn-link-focus-text-decoration': theme('btn.link.hover.textDecoration'),
            '--btn-link-disabled-color': theme('btn.link.disabled.color'),
            '--btn-link-text-decoration': theme('btn.link.textDecoration'),
            '--btn-link-font-weight': theme('btn.link.fontWeight'),

            '--btn-block-display': theme('btn.block.display'),
            '--btn-block-width': theme('btn.block.width'),
            '--btn-block-margin-top': theme('btn.block.marginTop'),
        },

        //
        // Base styles
        //
        '.btn': {
            display: 'inline-block',
            padding: `${theme('btn.paddingY')} ${theme('btn.paddingX')}`,
            fontSize: theme('btn.fontSize'),
            fontFamily: theme('btn.fontFamily'),
            fontWeight: theme('btn.fontWeight'),
            lineHeight: theme('btn.lineHeight'),
            color: theme('btn.color'),
            textAlign: 'center',
            textDecoration: 'none',
            whiteSpace: theme('btn.whiteSpace'),
            verticalAlign: 'middle',
            cursor: theme('enablePointers') ? 'pointer' : null,
            userSelect: 'none',
            backgroundColor: 'transparent',
            border: `${theme('btn.borderWidth')} solid transparent`,
            borderRadius: theme('btn.borderRadius'),
            transition: theme('btn.transition'),
            // boxShadow: null,

            '&:hover': {
                color: theme('colors.gray.900', colors.gray[900]),
                textDecoration: 'none',
            },
        
            '&:focus, &.focus': {
                outline: 0,
                boxShadow: (theme('btn.enableShadows') ? `${theme('btn.boxShadow')}, ` : '') + `0 0 0 ${theme('btn.focus.width')} ${rgba(mix('#fff', defaultVariations.primary, .85), .5)}`
            },
        
            '&:active, &.active': {
                boxShadow: theme('btn.enabledShadows') ? theme('btn.active.boxShadow') : null,
            
                '&:focus': {
                    boxShadow: `0 0 0 ${theme('btn.focus.width')} ${rgba(mix('#fff', defaultVariations.primary, .85), .5)}, ${theme('btn.enabledShadows') ? theme('btn.active.boxShadow') : null}`
                }
            },
        
            '&:disabled, &.disabled, fieldset:disabled &': {
                pointerEvents: 'none',
                opacity: theme('btn.disabled.opacity'),
                boxShadow: 'none'
            }
        }
    };
    
    Object.entries(theme('variations', defaultVariations))
        .forEach(([key, value]) => {
            variant(key, value);
            outlineVariant(key, value);
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
                textDecoration: theme('btn.link.focus.textDecoration')
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
  
        //
        // Button Sizes
        //  
        '.btn-sm': {
            padding: `${theme('btn.sm.paddingY')} ${theme('btn.sm.paddingX')}`,
            borderRadius: theme('btn.sm.borderRadius'),
            fontSize: theme('btn.sm.fontSize'),
        },

        '.btn-lg': {
            padding: `${theme('btn.lg.paddingY')} ${theme('btn.lg.paddingX')}`,
            borderRadius: theme('btn.lg.borderRadius'),
            fontSize: theme('btn.lg.fontSize'),
        }
    });

    addComponents(component);
}, {
    theme: {
        btn: theme => ({
            enablePointers: true,
            enableGradients: false,
            enableShadows: false,
            color: 'inherit',
            paddingY: theme('form.paddingY', '.375rem'),
            paddingX: theme('form.paddingX', '.75rem'),
            fontFamily:  theme('form.fontFamily', 'inherit'),
            fontSize: theme('form.fontSize', '1rem'),
            lineHeight: theme('form.fontSize', 1.5),
            whiteSpace: theme('form.whiteSpace', 'nowrap'), // Set to `nowrap` to prevent text wrapping
            borderWidth: theme('form.borderWidth', '1px'),
            fontWeight: theme('form.fontWeight', 'normal'),
            boxShadow: `inset 0 1px 0 ${rgba(theme('colors.white', colors.white), .15)}, 0 1px 1px ${rgba(theme('colors.black', colors.black), .075)}`,
            borderRadius: theme('form.borderRadius', '.25rem'),
            blockSpacingY: '.5rem',
            transition: 'color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out',

            sm: {
                paddingY: theme('form.sm.paddingY', '.25rem'),
                paddingX: theme('form.sm.paddingX', '.5rem'),
                fontSize: theme('form.sm.fontSize', '.875rem'),
                borderRadius: theme('form.sm.borderRadius', '.25rem'),
            },
            
            lg: {
                paddingY: theme('form.lg.paddingY', '.5rem'),
                paddingX: theme('form.lg.paddingX', '1rem'),
                fontSize: theme('form.lg.fontSize', '1.25rem'),
                borderRadius: theme('form.lg.borderRadius', '.25rem'),
            },

            disabled: {
                opacity: .65
            },
            
            active: {
                boxShadow: `inset 0 3px 5px ${rgba(theme('colors.black', colors.black), .125)}`,
            },

            focus: {
                width: theme('form.focus.width', '.25rem'),
                boxShadow
            },

            link: {
                color: '#0d6efd',
                textDecoration: 'none',
                fontWeight: 'normal',
                hover: {
                    color: darken('#0d6efd', .15),
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
            }
        })
    }
});