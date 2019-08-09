module.exports = function({ config }) {
    /**
     * Add source loader
     */
    config.module.rules.push({
      test: /\.story\.js?$/,
      loaders: [
        {
          loader: require.resolve('@storybook/addon-storysource/loader'),
          options: { parser: 'typescript' },
        },
      ],
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
            'sass-loader',
            {
                loader: 'sass-resources-loader',
                options: {
                    resources: [
                        require.resolve('../src/styles/variables.scss'),
                        require.resolve('../src/styles/media.scss'),
                        require.resolve('../src/styles/theme.scss'),
                    ],
                },
            }
        ],
    });

    return config;
  };
