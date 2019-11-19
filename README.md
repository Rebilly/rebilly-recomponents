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
* `packages/gridsome` Demo project with Gridsome
* `packages/nuxt` Demo project with Nuxt

## Browser support

Currently we support all modern browsers.

<details>
  <summary>Actual status</summary>
  
  <br>
  
  | Browser | Version | Status |           
  | --------|---------|--------|
  | <img src="http://icons.iconarchive.com/icons/dtafalonso/android-l/32/Chrome-icon.png" width="16"> Chrome | 78 | Main development |
  | <img src="http://icons.iconarchive.com/icons/dakirby309/simply-styled/32/Firefox-icon.png" width="16"> Firefox | 70 | Main development |
  | <img src="http://icons.iconarchive.com/icons/johanchalibert/mac-osx-yosemite/32/safari-icon.png" width="16"> Safari | 13 | Supported |
  | <img src="https://img.icons8.com/color/344/ms-edge.png" width="16"> Edge    | ? | ? |
  | <img src="http://icons.iconarchive.com/icons/tatice/cristal-intense/32/Internet-Explorer-icon.png" width="16"> Internet Explorer | 11     | Not supported |
</details>

Partial support of Internet Explorer 11 is in progress and will be added soon. Some features like [webcomponent mode](https://github.com/vuejs/vue-web-component-wrapper/issues/31) won't be supported.

## Contribute guide

This package is following the [Semantic Versioning](http://semver.org/) specification and using the [Semantic Release](https://semantic-release.gitbook.io/semantic-release/) tool. To make it work, we should keep our commit messages consistent. It's possible to create any commit type but only types below can trigger npm publish:

| Commit                                                                                | Version |           
| ------------------------------------------------------------------------------------- |--------:|
| fix(datepicker): use margin of parent component in picker allocation                  |  Patch  |
| feat(datepicker): add option to specify picker vertical alignment                     |  Minor  |
| feat(datepicker): BREAKING CHANGE migrate from vuejs-datepicker to vue-date-picker    |  Major  |

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
