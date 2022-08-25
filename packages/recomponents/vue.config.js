const path = require('path');
const sass = require('sass');
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
                implementation: sass,
                additionalData: `
                    @import "@/styles/mixins.scss";
                `,
            },
        },
    },
};
