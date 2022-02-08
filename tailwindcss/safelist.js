const reduce = require('@vue-interface/variant/tailwindcss/reduce');

module.exports = function safelist(subject, filter) {
    subject = Object.assign(subject || {},
        require('@vue-interface/variant/tailwindcss/variations')
    );

    const filtered = Object.keys(subject)
        .filter(typeof filter === 'function' ? filter : key => {
            return Array.isArray(filter) ? filter.indexOf(key) > -1 : true;
        })
        .map(key => {
            return [key, subject[key]];
        });
    
    return Object.entries(reduce(filtered))
        .reduce((carry, [key]) => {
            return [...carry, ...[
                `btn-${key}`,
                `btn-outline-${key}`
            ]];
        }, [
            'btn',
            'btn-block',
            'btn-inline',
            'btn-link',
            ...Object.keys(require('./sizes')).map(size => `btn-${size}`)
        ]);
};