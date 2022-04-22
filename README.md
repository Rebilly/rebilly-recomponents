![Rebilly Recomponents](https://image.prntscr.com/image/mxh9gRFvTb23DEwn29chAQ.png)

<p align="center">
    <a href="https://travis-ci.org/Rebilly/rebilly-recomponents">
        <img alt="Travis" src="https://img.shields.io/travis/Rebilly/rebilly-recomponents.svg">
    </a>
    <a href="https://github.com/Rebilly/rebilly-recomponents/releases">
        <img alt="Release" src="https://img.shields.io/github/v/release/Rebilly/rebilly-recomponents.svg">
    </a>
    <a href="https://github.com/semantic-release/semantic-release">
        <img alt="Semantic Release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
    </a>
</p>

# Rebilly Recomponents

As the number of Web Apps developed at Rebilly grows larger, it has become apparent that we need a way to share UI components across projects. Recomponents offers similar levels of customization to projects like Twitter Bootstrap, but comes default with the familiar look and feel. This library also delivers consistency of implementation and usage to Rebilly developers (and in the future, the greater Vue community).

[View the storybook](https://recomponents.rebilly.com/)

## Repository structure

* `packages/recomponents` Recomponents project
* `packages/nuxt` Demo project with Nuxt


We use [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) to make development easier and efficient. Workspaces allow developers to check how the latest **local build** of Recomponents work within an application created with Gridsome or Nuxt **without needing to release that version**.
Running your application (Gridsome/Nuxt/others) against a local version of recomponents allows manually detecting issues that are not covered by unit tests with SSR support before releasing.
If you would like to setup a similar workflow with your own project, [Yarn Link](https://classic.yarnpkg.com/en/docs/cli/link/) could provide same functionality.

### Development workflow

When you run Recomponents in developer mode, any update in Recomponents will automatically trigger the rebuild of Recomponents and that also will trigger the rebuild of the end client application. In result, **you can check local Recompomnent's updates in your application immediately**.

### Enabling workspaces

First step is running yarn from `project's root` to enable workspaces

* `yarn`

Then, with workspaces you can choose running any npm script from inside of `packages/recomponents` or from the `project's root`.

#### Running Recomponents in developer mode from `/packages/recomponents`

* `yarn dev`

#### Running Recomponents in developer mode from `project's root`:

* `yarn workspace @rebilly/recomponents dev`

With workspaces there is no need to install dependencies inside of each folder - single run of `yarn` inside of project root is enough.

## Browser support

Currently we support all modern browsers.

<details>
  <summary>Actual status</summary>

  <br>

| Browser                                                                                                                          | Version    | Status           |
  |-------------------------------------------------------------------------------------------------------------------------------------|------------|------------------|
| <img src="http://icons.iconarchive.com/icons/dtafalonso/android-l/32/Chrome-icon.png" width="16"> Chrome                         | 78         | Main development |
| <img src="http://icons.iconarchive.com/icons/dakirby309/simply-styled/32/Firefox-icon.png" width="16"> Firefox                   | 70         | Main development |
| <img src="http://icons.iconarchive.com/icons/johanchalibert/mac-osx-yosemite/32/safari-icon.png" width="16"> Safari              | 13         | Supported        |
| <img src="https://img.icons8.com/color/344/ms-edge.png" width="16"> Edge                                                         | ?          | ?                |
| <img src="http://icons.iconarchive.com/icons/tatice/cristal-intense/32/Internet-Explorer-icon.png" width="16"> Internet Explorer | 11         | Not supported    |
</details>

Partial support of Internet Explorer 11 is in progress and will be added soon. Some features like [webcomponent mode](https://github.com/vuejs/vue-web-component-wrapper/issues/31) won't be supported.

## Contribution guide

This package is following the [Semantic Versioning](http://semver.org/) specification and using the [Semantic Release](https://semantic-release.gitbook.io/semantic-release/) tool. To make it work, we should keep our commit messages consistent. It's possible to create any commit type but only types below can trigger npm publish:

| Commit                                                                             |                    Version |           
|------------------------------------------------------------------------------------|---------------------------:|
| perf(datepicker): ...                                                              |              Patch release |
| fix(datepicker): use margin of parent component in picker allocation               |              Patch release |
| feat(datepicker): add option to specify picker vertical alignment                  |  ~~Minor~~ Feature release |
| feat(datepicker): BREAKING CHANGE migrate from vuejs-datepicker to vue-date-picker | ~~Major~~ Breaking release |

Other types like `docs`, `test` doesn't affect components build itself so there is no need to perform publish.

There are several ways to follow this convention:

<details>
  <summary>Use a console application like <a href="https://github.com/commitizen/cz-cli">Commitizen</a></summary>

  <div><br><img src="https://media.giphy.com/media/QWLJmI2eMTND1em2wJ/giphy.gif"></div>
</details>

<details>
  <summary>Use a plugin for Webstorm like <a href="https://plugins.jetbrains.com/plugin/9861-git-commit-template">Git Commit Template</a></summary>

  <div><br><img src="https://media.giphy.com/media/QvFbItmr8cuJXQmjAl/giphy.gif"></div>
</details>

<details>
  <summary>Use an extension for Visual Studio Code like <a href="https://marketplace.visualstudio.com/items?itemName=KnisterPeter.vscode-commitizen">Visual Studio Code Commitizen Support</a></summary>

  <div><br><img src="https://media.giphy.com/media/Ifs3YZ3kipnTDlpRAK/giphy.gif"></div>
</details>

<details>
  <summary>Or create commits manually</summary>

  <div><br><img src="https://media3.giphy.com/media/UqZ4imFIoljlr5O2sM/giphy.gif"></div>
</details>
