/**
 *
 * Image snapshots with storybook + jest + puppeteer
 * https://github.com/storybookjs/storybook/tree/master/addons/storyshots/storyshots-puppeteer
 *
 */
const path = require('path');
const fs = require('fs');
const pkg = require('../package');

import puppeteer from 'puppeteer';
import initStoryshots from '@storybook/addon-storyshots';
import {imageSnapshot} from '@storybook/addon-storyshots-puppeteer';

// storybook output directory
const pathToStorybookStatic = path.join(__dirname, '../../../docs');
const storybookUrl = `file://${pathToStorybookStatic}`;

/**
 * Components with async functionality.
 * Please use that array to force wait before the screenshot (use 0.015)
 * for components with async data
 * Array<Array<String, Number>>
 * [
 *  ['component-frame-string-name', delay-timeout-ms],
 *  ['component-frame-string-name', delay-timeout-ms],
 *  ['component-frame-string-name', delay-timeout-ms],
 * ]
 */
const componentsWithAsyncData = [
    // TODO
    ['components-select--async-data', 2000],
];

/**
 * Components with some css animation (like loader icon)
 * The css animation makes some noise
 * so we can't to compare the screenshots with 0% difference
 * @type {string[]}
 */
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

/**
 * Custom puppeteer browser instance
 */
let BROWSER = null;

const getCustomBrowser = async () => {
    BROWSER = await puppeteer.launch({
        args: [
            '--no-sandbox ',
            '--disable-lcd-text',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
        ],
        defaultViewport: {width: 400, height: 300},
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    });
    return BROWSER;
};

if (!fs.existsSync(pathToStorybookStatic)) {
    console.log('You are running image snapshots without having the static build of storybook. Please run "yarn run build-storybook" before running tests. path:');
    process.exit(1);
} else {
    const test = imageSnapshot({
        storybookUrl,
        getCustomBrowser,
        getGotoOptions,
        getMatchOptions,
        beforeScreenshot,
    });

    const afterAll = test.afterAll;

    test.afterAll = function () {
        afterAll.apply(test);
        BROWSER.close();
    };

    initStoryshots({
        suite: `${pkg.name} ${pkg.version}`,
        configPath: path.join(__dirname, '../.storybook/config.js'),
        test,
    });
}
