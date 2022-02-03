const Color = require('color');

module.exports = {
    plugins: [
        require('postcss-nested'),
        require('tailwindcss'),
        // require('postcss-css-variables')({
        //     preserve: 'computed'
        // }),
        require('postcss-functions')({
            functions: {
                darken(color, ...args) {
                    return Color(color).darken(...args);
                },
                lighten(color, ...args) {
                    return Color(color).lighten(...args);
                },
                contrast(color, light, dark) {
                    return Color(color).luminosity() > .5 ? (dark || 'black') : (light || 'white');
                },
                mix(color, subject, percent) {
                    return Color(color).mix(Color(subject), percent).hex();
                }
            }
        }),
        require('postcss-hexrgba'),
        require('autoprefixer')
    ]
};