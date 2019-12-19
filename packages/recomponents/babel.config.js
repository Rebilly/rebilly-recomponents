module.exports = {
    presets: [
        '@vue/app',
    ],
    plugins: ['@babel/plugin-proposal-class-properties'],
    env: {
        test: {
            presets: [
                '@vue/app',
                [
                    '@babel/preset-env',
                    {
                        targets: {
                            node: 'current',
                        },
                    },
                ],
            ],
            plugins: [
                'babel-plugin-require-context-hook',
            ],
        },
    },
};
