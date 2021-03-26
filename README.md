<p align="center">
  <a href="https://jonco-lab.web.app">
    <img src="https://avatars.githubusercontent.com/u/56368860?s=400&u=aa7edea5a28f983c0545552952757715ee9e660c&v=4" alt="Jonco Lab logo"/>
  </a>
</p>

# JoncoLab/codewars <br /> [![Buy Me A Coffee](https://img.shields.io/badge/buy%20me%20a%20coffee-donate-blue.svg)](https://buymeacoffee.com/joncolab) [![node](https://img.shields.io/node/v/vite.svg)](https://nodejs.org/en/about/releases/)

The idea of the project is to create a node package to manage your code for [Codewars](www.codewars.com/r/Hmq3Ew)' katas and potentially integrate it with some IDEs.

This package is at an early development state.

## Installation

For now cloning this repo is the only way to use/contribute:

### Use [gh](https://cli.github.com/) package:

    gh repo clone joncolab/codewars

### Or [git](https://git-scm.com/):

    git clone https://github.com/JoncoLab/codewars

After cloning the repo you will need to install dependencies.
This project uses [Yarn](https://yarnpkg.com/) as a package manager

    cd /path/to/repo
    yarn

After publishing first release the package installation will be available via [npm](https://www.npmjs.com/) and [GitHub Packages](https://github.com/features/packages)

## Usage

### Available scripts

- ### `yarn start <kata name> <options>`

  Runs main script.

  Actually executes:

      yarn ts-node ./

- ### `yarn lint`

  Manually run a linter for project files. Uses [ESLint](https://eslint.org/)

  Actually executes:

      yarn eslint '{*/**/,/}*.@(js|ts)' --fix

- ### `yarn format`

  Format project files to support consistent code styling. Uses [Prettier](https://prettier.io/).

  Actually executes:

      yarn prettier --write \"@(*/**/*.@(js|ts)|*.@(js|ts))\"

- ### `yarn dev <kata name> <options>`

  Development mode. Starts a [nodemon](https://nodemon.io/) proccess listening for changes in all project files and runs main script.

  Actually executes:

      yarn lint && yarn format && nodemon --

## Arguments and options

- ### `<kata name>`

  Pass kata name as a first argument for script to run it automatically.

  If you don't pass any name, you will be asked to select a kata you want to run from the list of your katas

- ### `<options>`
  - `--kataName` - the same as passing a kata name as an argument
  - **[WIP]** `--test` - run [Jest](https://jestjs.io/) tests instead of kata code itself

## Folder structure

```
/
├── katas
│   ├──// your kata files
│   └──// examples
├── scripts
│   └──// package scripts
├── test
│   └──// auto tests for your katas
├── .eslintrc.yml // Eslint config
├── .prettierrc.yml // Prettier config
├── index.d.ts // package types declaration files
├── index.ts // main script
├── nodemon.json // Nodemon config
├── package.json // package config
└── tsconfig.json // TypeScript config
```
