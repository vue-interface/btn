const Color = require('color');
const btn = require('./tailwindcss');

const { minLightness } = require('./tailwindcss/colorize.cjs');

module.exports = {
    content: [
        './index.html'
    ],
    plugins: [
        btn({
            styles: theme => ({
                'btn-toolbar': ({ backgroundColor, color }) => ({
                    '@apply bg-transparent inline-flex flex-col items-center gap-0 min-w-[3.5rem] py-[.125rem] rounded-lg transition-none': {},

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