const Color = require('color');

module.exports.contrast = function contrast(color, light, dark) {
    return module.exports.isDark(color) ? (dark || 'black') : (light || 'white');
};

module.exports.darken = function darken(color, ...args) {
    return Color(color).darken(...args);
};

module.exports.isDark = function isDark(color, light, dark) {
    return Color(color).luminosity() > .55;
};

module.exports.lighten = function lighten(color, ...args) {
    return Color(color).lighten(...args);
};

module.exports.minLightness = function lighten(color, minValue = .5) {
    const luminosity = Color(color).luminosity();

    if(luminosity < minValue) {
        return Color(color).lighten(minValue - luminosity);

    }
    
    return Color(color);
};

module.exports.mix = function mix(color, subject, percent) {
    return Color(color).mix(Color(subject), percent);
};
