This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
You can find the most recent version of Create React App guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

# Instalation #
* `$ git clone https://github.com/Hyperkid123/umbrela-starter-kit.git project-name`
* `$ cd project-name`
* `$ <sudo > rm -rf .git`
* create new repostiory reference
# Commands #
* `$ yarn` install depedencies
* `$ yarn start` start local development server
* `$ yarn build` build production version of application
  * files after build are located in `build` folder
* `$ yarn test` run tests

# Code splitting #
This repository is prepared to split code based on multiple entry points and build the into multiple bundles. Vendor and common files are also in separate bundle.

Code splitting is static so far, and if you want to add more, you will have to do it inside webpack.config.dev.js and in webpack.config.prod.js.
