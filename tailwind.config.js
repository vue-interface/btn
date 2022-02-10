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
        ...require('./tailwindcss/safelist')()
    ]
};