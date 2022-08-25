const path = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
    outputDir: 'dist',
    configureWebpack: {
        output: {
            libraryExport: 'default',
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                // Deduplicate any moment imports, otherwise we end up with
                // it included in the bundle twice, even though we only have
                // 1 version of moment.
                moment: path.resolve(__dirname, 'node_modules/moment'),
            },
        },
        plugins: [
            // By default moment bundles all the locales with it, we do not
            // support different locales for any of the projects that use recomponents
            // so we can remove these huge files
            new MomentLocalesPlugin({
                localesToKeep: ['es-us'],
            }),
        ],
    },
    css: {
        extract: true,
        loaderOptions: {
            sass: {
                prependData: `
                    @import "@/styles/mixins.scss";
                `,
            },
        },
    },
};
