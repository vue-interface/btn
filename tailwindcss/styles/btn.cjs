const { darken, mix } = require('../colorize.cjs');

module.exports = theme => ({ backgroundColor, borderColor, color }) => {
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
            borderColor: darken(borderColor, .125).string(),
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
};