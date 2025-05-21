const variations = require('@vue-interface/variant/tailwindcss/variations');
const Color = require('color');
const colors = require('tailwindcss/colors');
const btn = require('./tailwindcss');

const { contrast, darken, lighten, isDark, mix, minLightness } = require('./tailwindcss/colorize.cjs');

module.exports = {
    content: [
        './index.html'
    ],
    plugins: [
        btn()
    ]
};