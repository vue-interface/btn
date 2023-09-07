const Color = require('color');
const { contrast } = require('../colorize.cjs');

module.exports = theme => ({ backgroundColor }) => {
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
};