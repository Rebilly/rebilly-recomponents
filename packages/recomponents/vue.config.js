const path = require('path');

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
