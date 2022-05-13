const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');
const { boxShadow } = require('tailwindcss/defaultTheme');
const shades = require('@vue-interface/variant/tailwindcss/shades');
const variations = require('@vue-interface/variant/tailwindcss/variations');
const Color = require('color');

function contrast(color, light, dark) {
    return Color(color).luminosity() > .5 ? (dark || 'black') : (light || 'white');
}

function darken(color, ...args) {
    return Color(color).darken(...args).string();
}

function mix(color, subject, percent) {
    return Color(color).mix(Color(subject), percent).string();
}

module.exports = plugin(function({ addComponents, matchComponents, theme }) {
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

    addComponents({
        /**
         * Base Styles
         */
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
                color: theme('colors.slate.900', colors.slate['900']),
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
        }, 

        /**
         * Link Buttons
         */
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
        
        /**
         * Block Buttons
         */
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
    
    matchComponents({
        'btn': value => value
    }, {
        values: theme('btn.sizes')
    });
        
    matchComponents({
        'btn': ({ backgroundColor, borderColor, color }) => ({
            backgroundColor,
            backgroundImage: theme('btn.enableGradients') && theme('btn.boxShadow'),
            borderColor,
            boxShadow: theme('btn.enableShadows') && theme('btn.boxShadow'),
            color,
            '&:hover': {
                backgroundColor: darken(backgroundColor, .075),
                backgroundImage: theme('btn.enableGradients') && theme('btn.boxShadow'),
                borderColor: darken(borderColor, .1),
                color: darken(color, .1),
            },
            '&:focus, &.focus': {
                backgroundColor: darken(backgroundColor, .1),
                backgroundImage: theme('btn.enableGradients') && theme('btn.boxShadow'),
                borderColor: darken(borderColor, .125),
                boxShadow: theme('btn.enableShadows') ? `${theme('btn.boxShadow')}, ` : '' + `0 0 0 ${theme('btn.focus.width')} ${Color(mix(color, darken(borderColor, .125), .85)).fade(.5)}`,
                color,
            },
            '&:active, &.active, .show > &.dropdown-toggle': {
                backgroundColor: darken(backgroundColor, .1),
                backgroundImage: theme('btn.enableGradients') && 'none',
                borderColor: darken(borderColor, .125),
                color,
        
                '&:focus': {
                    boxShadow: theme('btn.enableShadows') ? `${theme('btn.active.boxShadow')}, ` : '' + `0 0 0 ${theme('btn.focus.width')} ${Color(mix(color, darken(borderColor, .125), .85)).fade(.5)}`
                }
            },
            '&:disabled, &.disabled': {
                backgroundColor,
                backgroundImage: theme('btn.enableGradients') && 'none',
                borderColor,
                color,
            }
        })
    }, {
        values: buttonColors
    });
    
    matchComponents({
        'btn-outline': ({ backgroundColor }) => ({
            borderColor: backgroundColor,
            color: backgroundColor,
                    
            '&:hover': {
                backgroundColor,
                borderColor: backgroundColor,
                color: contrast(backgroundColor),
            },
                  
            '&:focus, &.focus': {
                boxShadow: `0 0 0 ${theme('btn.focus.width')} ${Color(backgroundColor).fade(.5)}`
            },
                  
            '&:active, &.active, &.dropdown-toggle.show': {
                backgroundColor: backgroundColor,
                borderColor: backgroundColor,
                color: contrast(backgroundColor),
                  
                '&:focus': {
                    boxShadow: theme('btn.enableShadows') ? `${theme('btn.active.boxShadow')}), ` : '' + `0 0 0 ${theme('btn.focus.width')} ${Color(backgroundColor).fade(.5)}`
                }
            },
                  
            '&:disabled, &.disabled': {
                backgroundColor: 'transparent',
                color: backgroundColor,
            }
        })
    }, {
        values: buttonColors
    });
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
            backgroundImage: `linear-gradient(180deg, ${Color(theme('colors.white', colors.white)).fade(.15)}, ${theme('colors.white', colors.white)})`,
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
                color: theme('variations.primary', colors.blue['500']),
                textDecoration: 'none',
                fontWeight: 'normal',
                hover: {
                    color: theme('variations.primary', colors.blue['500']),
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

            variations: theme('variations', variations),

            sizes: {
                'xs': {
                    padding: '.15rem .35rem',
                    fontSize: '.75rem',
                    borderRadius: '.2rem',
                },

                'sm': {
                    padding: '.25rem .5rem',
                    fontSize: '.875rem',
                    borderRadius: '.25rem',
                },

                'base': {
                    padding: '.375rem .75rem',
                    fontSize: '1rem',
                    borderRadius: '.25rem',
                },
    
                'lg': {
                    padding: '.5rem 1rem',
                    fontSize: '1.25rem',
                    borderRadius: '.25rem',
                },
    
                'xl': {
                    padding: '.66rem 1.25rem',
                    fontSize: '1.33rem',
                    borderRadius: '.33rem',
                },
    
                '2xl': {
                    padding: '.75rem 1.5rem',
                    fontSize: '1.5rem',
                    borderRadius: '.5rem',
                },
    
                '3xl': {
                    padding: '.85rem 1.75rem',
                    fontSize: '1.75rem',
                    borderRadius: '.5rem',
                },
    
                '4xl': {
                    padding: '1rem 2rem',
                    fontSize: '2rem',
                    borderRadius: '.66rem',
                }
            }
        })
    }
});