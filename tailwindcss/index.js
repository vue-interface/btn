const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');
const { boxShadow } = require('tailwindcss/defaultTheme');
const variations = require('@vue-interface/variant/tailwindcss/variations');
const reduce = require('@vue-interface/variant/tailwindcss/reduce');
const Color = require('color');

function contrast(color, light, dark) {
    return Color(color).luminosity() > .5 ? (dark || 'black') : (light || 'white');
}

function darken(color, ...args) {
    return Color(color).darken(...args).hex();
}

function mix(color, subject, percent) {
    return Color(color).mix(Color(subject), percent).hex();
}

module.exports = plugin(function({ addComponents, theme }) {
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
            [`--btn-${key}-focus-box-shadow`]: `0 0 0 var(--btn-focus-width) rgba(${mix(color, darken(borderColor, .125), .85)}, .5)`
        });

        Object.assign(component, {
            [`.btn-${key}`]: {
                color,
                borderColor,
                backgroundColor,
                boxShadow: theme('btn.enableShadows') ? 'var(--btn-box-shadow)' : null,
                backgroundImage: theme('btn.enableGradients') ? `linear-gradient(180deg, rgba(${theme('colors.white', colors.white)}, .15), rgba(${theme('colors.white', colors.white)}, 0))` : undefined,
        
                '&:hover': {
                    color: `var(--btn-${key}-hover-color)`,
                    backgroundColor: `var(--btn-${key}-hover-background-color)`,
                    backgroundImage: theme('btn.enableGradients') ? `linear-gradient(180deg, rgba(${theme('colors.white', colors.white)}, .15), rgba(${theme('colors.white', colors.white)}, 0))` : undefined,
                    borderColor: `var(--btn-${key}-hover-border-color)`
                },

                '&:focus, &.focus': {
                    color: `var(--btn-${key}-active-color)`,
                    backgroundColor: `var(--btn-${key}-active-background-color)`,
                    backgroundImage: theme('btn.enableGradients') ? `linear-gradient(180deg, rgba(${theme('colors.white', colors.white)}, .15), rgba(${theme('colors.white', colors.white)}, 0))` : undefined,
                    borderColor: `var(--btn-${key}-active-border-color)`,
                    boxShadow: theme('btn.enableShadows') ? 'var(--btn-box-shadow), ' : '' + `var(--btn-${key}-focus-box-shadow)`,
                },

                '&:active, &.active, .show > &.dropdown-toggle': {
                    color: `var(--btn-${key}-active-color)`,
                    backgroundColor: `var(--btn-${key}-active-background-color)`,
                    backgroundImage: theme('btn.enableGradients') ? 'none' : undefined,
                    borderColor: `var(--btn-${key}-active-border-color)`,

                    '&:focus': {
                        boxShadow: theme('btn.enableShadows') ? 'var(--btn-active-box-shadow), ' : '' + `var(--btn-${key}-focus-box-shadow)`
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
            [`--btn-outline-${key}-focus-box-shadow`]: `0 0 0 var(--btn-focus-width) rgba(${color}, .5)`
        });
        
        Object.assign(component, {
            [`.btn-outline-${key}`]: {
                color,
                borderColor: color,
            
                '&:hover': {
                    color: `var(--btn-outline-${key}-hover-color)`,
                    backgroundColor: `var(--btn-outline-${key}-active-background-color)`,
                    borderColor: `var(--btn-outline-${key}-active-border-color)`
                },
          
                '&:focus, &.focus': {
                    boxShadow: `0 0 0 var(--btn-focus-width) rgba(${color}, .5)`
                },
          
                '&:active, &.active, &.dropdown-toggle.show': {
                    color: `var(--btn-outline-${key}-active-color)`,
                    backgroundColor: `var(--btn-outline-${key}-active-background-color)`,
                    bordercolor: `var(--btn-outline-${key}-active-border-color)`,
          
                    '&:focus': {
                        boxShadow: theme('btn.enableShadows') ? 'var(--btn-active-box-shadow), ' : '' + `var(--btn-outline-${key}-focus-box-shadow)`
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
            '--btn-display': theme('btn.display'),
            '--btn-color': theme('btn.color'),
            '--btn-padding-y': theme('btn.paddingY'),
            '--btn-padding-x': theme('btn.paddingX'),
            '--btn-background-color': theme('btn.backgroundColor'),
            '--btn-border-radius': theme('btn.borderRadius'),
            '--btn-font-family': theme('btn.fontFamily'),
            '--btn-font-size':  theme('btn.fontSize'),
            '--btn-text-align': theme('btn.textAlign'),
            '--btn-text-decoration': theme('btn.textDecoration'),
            '--btn-line-height': `${theme('btn.lineHeight')}`,
            '--btn-white-space': theme('btn.whiteSpace'),
            '--btn-vertical-align': theme('btn.verticalAlign'),
            '--btn-user-select': theme('btn.userSelect'),
            '--btn-background-color': theme('btn.backgroundColor'),
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
            '--btn-focus-box-shadow': `0 0 0 var(--btn-focus-width) rgba(${mix('#fff', variations.primary, .85)}, .5)`,
            '--btn-focus-outline': `${theme('btn.focus.outline')}`,

            '--btn-hover-text-decoration': theme('btn.hover.textDecoration'),

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
            display: 'var(--btn-display)',
            padding: 'var(--btn-padding-y) var(--btn-padding-x)',
            fontSize: 'var(--btn-font-size)',
            fontFamily: 'var(--btn-font-family)',
            fontWeight: 'var(--btn-font-weight)',
            lineHeight: 'var(--btn-line-height)',
            color: 'var(--btn-color)',
            textAlign: 'var(--btn-text-align)',
            textDecoration: 'var(--btn-text-decoration)',
            whiteSpace: 'var(--btn-white-space)',
            verticalAlign: 'var(--btn-vertical-align)',
            cursor: theme('enablePointers') ? 'var(--btn-cursor)' : null,
            userSelect: 'var(--btn-user-select)',
            backgroundColor: 'var(--btn-background-color)',
            border: `var(--btn-border-width) solid transparent`,
            borderRadius: 'var(--btn-border-radius)',
            transition: 'var(--btn-transition)',
            boxShadow: theme('btn.enableShadows') ? 'var(--btn-box-shadow)' : null,

            '&:hover': {
                color: theme('colors.gray.900', colors.gray[900]),
                textDecoration: 'var(--btn-hover-text-decoration)',
            },
        
            '&:focus, &.focus': {
                outline: 'var(--btn-focus-outline)',
                boxShadow: (theme('btn.enableShadows') ? 'var(--btn-box-shadow), ' : '') + `var(--btn-focus-box-shadow)`
            },
        
            '&:active, &.active': {
                boxShadow: theme('btn.enabledShadows') ? 'var(--btn-active-box-shadow)' : null,
            
                '&:focus': {
                    boxShadow: `var(--btn-focus-box-shadow), ${theme('btn.enabledShadows') ? 'var(--btn-active-box-shadow)' : null}`
                }
            },
        
            '&:disabled, &.disabled, fieldset:disabled &': { // stylelint-disable-line selector-no-qualifying-type
                pointerEvents: 'none',
                opacity: 'var(--btn-disabled-opacity)',
                boxShadow: 'none'
            }
        }
    };
    
    Object.entries(theme('variations', variations))
        .forEach(([key, value]) => {
            variant(key, value);
            outlineVariant(key, value);
        });

    Object.entries(reduce(theme('colors', colors)))
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
            fontWeight: 'var(--btn-link-font-weight)',
            color: 'var(--btn-link-color)',
            textDecoration: 'var(--btn-link-text-decoration)',
        
            '&:hover': {
                color: 'var(--btn-link-hover-color)',
                textDecoration: 'var(--btn-link-hover-text-decoration)'
            },
        
            '&:focus, &.focus': {
                textDecoration: 'var(--btn-link-focus-text-decoration)'
            },
        
            '&:disabled, &.disabled': {
                color: 'var(--btn-link-disabled-color)'
            }
        },

        //
        // Block button
        //
        '.btn-block': {
            display: 'var(--btn-block-display)',
            width: 'var(--btn-block-width)',
        
            // Vertically space out multiple block buttons
            '+ .btn-block': {
                marginTop: 'var(--btn-block-margin-top)'
            }
        },
  
        //
        // Button Sizes
        //  
        '.btn-sm': {
            padding: 'var(--btn-sm-padding-y) var(--btn-sm-padding-x)',
            border: 'var(--btn-sm-border-radius)',
            fontSize: 'var(--btn-sm-font-size)',
        },

        '.btn-lg': {
            padding: 'var(--btn-lg-padding-y) var(--btn-lg-padding-x)',
            border: 'var(--btn-lg-border-radius)',
            fontSize: 'var(--btn-lg-font-size)',
        }
    });

    addComponents(component);
}, {
    theme: {
        btn: theme => ({
            enablePointers: true,
            enableGradients: false,
            enableShadows: false,
            display: 'inline-block',
            color: 'inherit',
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
            boxShadow: `inset 0 1px 0 rgba(${theme('colors.white', colors.white)}, .15), 0 1px 1px rgba(${theme('colors.black', colors.black)}, .075)`,
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

            hover: {
                textDecoration: 'none'
            },

            disabled: {
                opacity: .65
            },
            
            active: {
                boxShadow: `inset 0 3px 5px rgba(${theme('colors.black', colors.black)}, .125)`,
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
                    color: `var(--btn-link-color)`,
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