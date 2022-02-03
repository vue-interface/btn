const safelist = require('./tailwindcss/safelist');

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('./tailwindcss')
    ],
    safelist: [
        ...safelist(Object.assign({},
            require('@vue-interface/variant/tailwindcss/variations'),
            require('@vue-interface/variant/tailwindcss/colors'),
        )),
        ...Object.keys(require('./tailwindcss/sizes')).map(size => `btn-${size}`)
    ]
};