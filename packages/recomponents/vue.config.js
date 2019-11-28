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
        loaderOptions: {
            sass: {
                prependData: `
                    @import "@/styles/variables.scss";
                    @import "@/styles/mixins.scss";
                    @import "@/styles/theme.scss";
                `,
            },
        },
    },
};
