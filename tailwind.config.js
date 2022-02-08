const safelist = require('./tailwindcss/safelist');

module.exports = {
    content: [
        "./index.html"
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('./tailwindcss')
    ],
    safelist: [
        ...safelist()
    ]
};