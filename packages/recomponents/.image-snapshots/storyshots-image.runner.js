const path = require('path');
const fs = require('fs');

const pathToStorybookStatic = path.join(__dirname, '../../../docs');

const initStoryshots = require('@storybook/addon-storyshots').default;
const {imageSnapshot} = require('@storybook/addon-storyshots-puppeteer');

if (!fs.existsSync(pathToStorybookStatic)) {
    console.log('You are running image snapshots without having the static build of storybook. Please run "yarn run build-storybook" before running tests. path:');
    process.exit(1);
} else {
    initStoryshots({
        suite: 'Recomponents snapshots',
        configPath: path.join(__dirname, './'),
        test: imageSnapshot({
            storybookUrl: `file://${pathToStorybookStatic}`,
        }),
    });
}
