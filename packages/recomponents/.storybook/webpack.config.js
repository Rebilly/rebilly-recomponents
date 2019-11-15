const path = require('path');

module.exports = function({ config }) {
    /**
     * Add source loader
     */
    config.module.rules.push({
        test: /\.story\.js?$/,
        loaders: [{
            loader: require.resolve('@storybook/addon-storysource/loader'),
            options: {
                parser: 'typescript'
            },
        }],
        enforce: 'pre',
    });

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
                    data: `
                        @import "src/styles/variables.scss";
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
