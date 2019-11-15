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
                data: `
                    @import "@/styles/variables.scss";
                    @import "@/styles/mixins.scss";
                    @import "@/styles/theme.scss";
                `,
            },
        },
    },
};
