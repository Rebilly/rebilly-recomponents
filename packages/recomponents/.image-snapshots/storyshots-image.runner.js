/**
 *
 * Image snapshots with storybook + jest + puppeteer
 * https://github.com/storybookjs/storybook/tree/master/addons/storyshots/storyshots-puppeteer
 *
 */
const path = require('path');
const fs = require('fs');
const pkg = require('../package');

import initStoryshots from '@storybook/addon-storyshots';
import {imageSnapshot} from '@storybook/addon-storyshots-puppeteer';

// storybook output directory
const pathToStorybookStatic = path.join(__dirname, '../../../docs');
const storybookUrl = `file://${pathToStorybookStatic}`;

// we should wait for data loading in that components
const componentsWithAsyncData = [
    // TODO
    ['components-select--async-data', 2000],
];

// the loader animation made some noise
const componentsWithLoaderIcon = [
    'components-button--state',
    'components-loader--component',
    'components-loader--example',
    'components-select--async-data',
];

const getGotoOptions = () => ({waitUntil: 'networkidle0'});

const beforeScreenshot = (page, {url}) => new Promise((resolve) => {

    const [name, delay] = componentsWithAsyncData.find(([name]) => url.endsWith(`iframe.html?id=${name}`)) || [];

    if (!name) {
        resolve();
    } else {
        setTimeout(resolve, delay);
    }
});

const getMatchOptions = ({url}) => {
    if (componentsWithLoaderIcon.find(name => url.endsWith(`iframe.html?id=${name}`))) {
        return {
            failureThreshold: 0.015,
            failureThresholdType: 'percent',
        };
    }
    return {};
};

if (!fs.existsSync(pathToStorybookStatic)) {
    console.log('You are running image snapshots without having the static build of storybook. Please run "yarn run build-storybook" before running tests. path:');
    process.exit(1);
} else {
    initStoryshots({
        suite: `${pkg.name} ${pkg.version}`,
        configPath: path.join(__dirname, '../.storybook/config.js'),
        test: imageSnapshot({
            storybookUrl,
            getGotoOptions,
            getMatchOptions,
            beforeScreenshot,
        }),
    });
}
