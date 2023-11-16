const shades = require('@vue-interface/variant/tailwindcss/shades');
const Color = require('color');

function buttonColors(variations) {
    return Object.fromEntries(
        Object.entries(shades(variations))
            .map(([key, backgroundColor]) => {
                return [key, {
                    backgroundColor,
                    borderColor: backgroundColor,
                    color: contrast(backgroundColor),
                }];
            })
    );
};

function contrast(color, light, dark) {
    return module.exports.isDark(color) ? (dark || 'black') : (light || 'white');
};

function darken(color, ...args) {
    return Color(color).darken(...args);
};

function isDark(color) {
    try {
        return Color(color).luminosity() > .55;
    }
    catch (e) {
        return false;
    }
};

function lighten(color, ...args) {
    return Color(color).lighten(...args);
};

function minLightness(color, minValue = .5) {
    const luminosity = Color(color).luminosity();

    if(luminosity < minValue) {
        return Color(color).lighten(minValue - luminosity);

    }
    
    return Color(color);
};

function mix(color, subject, percent) {
    return Color(color).mix(Color(subject), percent);
};

module.exports = {
    buttonColors,
    contrast,
    darken,
    isDark,
    lighten,
    minLightness,
    mix,
};