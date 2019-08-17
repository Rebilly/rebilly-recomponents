module.exports = {
    outputDir: '.dist',
    css: {
        loaderOptions: {
            sass: {
                data: `
                    @import "@/styles/variables.scss";
                    @import "@/styles/media.scss";
                    @import "@/styles/theme.scss";
                `,
            },
        },
    },
};
