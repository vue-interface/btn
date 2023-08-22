const variations = require('@vue-interface/variant/tailwindcss/variations');
const Color = require('color');
const colors = require('tailwindcss/colors');
const btn = require('./tailwindcss/v2.cjs');

const { contrast, darken, lighten, isDark, mix, minLightness } = require('./tailwindcss/colorize.cjs');

module.exports = {
    content: [
        './index.html'
    ],
    theme: {
        extend: {
            variations: {
                ...variations,
                primary: '#0F87FF',
                secondary: colors.neutral['700'],
                info: colors.teal['400'],
            },
            btn: {
                enableShadows: true,
                boxShadow: '0 0 1px 0 rgba(0,0,0,.3333) inset, 0 1px 0px 0px rgba(255,255,255,.3333) inset',
                // outline: '0 0 0 .25rem DEFAULT',
                outline: undefined,
                css: {
                    '.btn': {
                        border: 'none',
                        padding: '.25rem .666rem',
                        fontSize: '.85rem',
                        lineHeight: '1rem',
                        borderRadius: '.333rem',
                    },
                },
                sizes: {
                    'xs': {
                        padding: '.33rem .5rem',
                        fontSize: '.75rem',
                        borderRadius: '.333rem',
                    },
        
                    'sm': {
                        padding: '.25rem .5rem',
                        fontSize: '.875rem',
                        borderRadius: '.333rem',
                    },
        
                    'md': {
                        padding: '.375rem .75rem',
                        fontSize: '1rem',
                        borderRadius: '.333rem',
                    },
            
                    'lg': {
                        padding: '.5rem 1rem',
                        fontSize: '1.25rem',
                        borderRadius: '.333rem',
                    },
            
                    'xl': {
                        padding: '.66rem 1.25rem',
                        fontSize: '1.33rem',
                        borderRadius: '.333rem',
                    },
            
                    '2xl': {
                        padding: '.75rem 1.5rem',
                        fontSize: '1.5rem',
                        borderRadius: '.333rem',
                    },
            
                    '3xl': {
                        padding: '.85rem 1.75rem',
                        fontSize: '1.75rem',
                        borderRadius: '.333rem',
                    },
            
                    '4xl': {
                        padding: '1rem 2rem',
                        fontSize: '2rem',
                        borderRadius: '.333rem',
                    }
                }
            }
        },
    },
    plugins: [
        btn({
            styles: theme => ({
                'btn': ({ backgroundColor, borderColor, color }) => {
                    const outline = theme('btn.outline')
                        ? theme('btn.outline').replace('DEFAULT', Color(mix(color, darken(borderColor, .125), .85)).fade(.5))
                        : undefined;
                                
                    return {
                        backgroundImage: `linear-gradient(180deg, ${mix(backgroundColor, 'white', .1)}, ${mix(backgroundColor, 'black', .1)})`,
                        borderColor,
                        boxShadow: theme('btn.enableShadows') && theme('btn.boxShadow'),
                        color,
                        '&:active, &.active, .show > &.dropdown-toggle': {
                            backgroundImage: `linear-gradient(180deg, ${mix(backgroundColor, 'white', .2)}, ${mix(backgroundColor, 'white', .1)})`,
                            color,
                        },
                        '&:disabled, &.disabled': {
                            backgroundColor,
                            borderColor,
                            color,
                        }
                    };
                },
                'btn-toolbar': ({ backgroundColor, color }) => ({
                    '@apply bg-transparent inline-flex flex-col gap-0 min-w-[3.5rem] py-[.125rem] rounded-lg transition-none': {},

                    color: Color(color).darken(.25).hex(),
                    lineHeight: '1rem',
                    // fontWeight: '500',   
                    
                    '> svg': {
                        strokeWidth: 1.75
                    },

                    '&:hover': {
                        color,
                        '@apply bg-white/[.15]': {}
                    },

                    '&:active': {
                        '@apply bg-white/[.20]': {}
                    },
                    
                    '&:active:hover.active': {
                        color,
                    },

                    '&.active': {
                        '@apply bg-white/[.20]': {},
                        
                        color: minLightness(backgroundColor, .4).hex(),

                        '&:active:hover.active': {
                            color: minLightness(backgroundColor, .4).lighten(.15).saturate(1).hex(),
                        },
                    }
                })
            })
        })
    ]
};