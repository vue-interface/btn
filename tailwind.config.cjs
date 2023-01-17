module.exports = {
    content: [
        './index.html'
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('./tailwindcss/index.cjs')
    ],
    safelist: [
        ...require('./tailwindcss/safelist.cjs')()
    ]
};