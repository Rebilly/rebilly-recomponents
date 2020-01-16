const path = require('path');

module.exports = function({ config }) {
    /**
     * Add info addon loader
     */
    config.module.rules.push({
        test: /\.vue$/,
        loader: 'storybook-addon-vue-info/loader',
        enforce: 'post'
    })

    /**
     * Add sass loader
     */
    config.module.rules.push({
        test: /\.scss$/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'sass-loader',
                options: {
                    prependData: `
                        @import "src/styles/mixins.scss";
                    `,
                }
            },
        ],
    });

    /**
     * Add @ alias to storybook scripts and styles
     */
    config.resolve.alias['@'] = path.resolve(__dirname, '../src');

    return config;
};
