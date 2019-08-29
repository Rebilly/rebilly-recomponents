module.exports = {
    outputDir: 'dist',
    configureWebpack: {
        output: {
            libraryExport: 'default',
        },
    },
    css: {
        loaderOptions: {
            sass: {
                data: `
                    @import "@/styles/variables.scss";
                    @import "@/styles/mixins.scss";
                    @import "@/styles/media.scss";
                `,
            },
        },
    },
};
