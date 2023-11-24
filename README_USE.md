# React 项目

## 项目搭建

**项目创建**

```shell
# 方式1.根据提示按需选择
npm create vite@latest

# 方式2.命令直接生成
npm create vite@latest my-vue-app -- --template vue

```

**安装依赖**

```shell
npm install
```

**启动项目**

```shell
npm run dev
```

**上传仓库**

```shell
git init
git add README.md
git commit -m "初始化项目"
git branch -M main
git remote add origin git@github.com:xxx.git
git push -u origin main
```

## 常用工具

### ESLint

ESLint 是一个在 JavaScript 代码中进行静态代码分析的工具，它可以帮助你捕捉并修复代码中的潜在问题、强制执行编码规范，并提供可扩展的配置选项。以下是使用 ESLint 的一般步骤：

1. 在项目中安装 ESLint：
   ```shell
   npm install eslint --save-dev
   ```

2. 在项目的根目录下创建一个名为 `.eslintrc` 的文件（也可以在 `package.json` 文件中的 `"eslintConfig"` 字段中进行配置）。

3. 在 `.eslintrc` 文件中定义你的 ESLint 配置。这些配置将决定哪些规则被启用、规则的严重级别以及其他相关选项。你可以选择使用一些预定义的规则集（如 "eslint:recommended"），或自定义规则。以下是一个示例配置文件：
   ```json
   {
     "env": {
       "browser": true,
       "node": true
     },
     "extends": "eslint:recommended",
     "rules": {
       "no-console": "warn",
       "indent": ["error", 2],
       "quotes": ["error", "single"]
     }
   }
   ```

   上述配置定义了环境为浏览器和 Node.js，继承了 ESLint 推荐的规则集，并自定义了一些规则。例如，禁用了对 `console` 的使用，要求使用两个空格进行缩进，要求使用单引号而非双引号。

4. 在需要进行代码检查的文件或目录中，运行以下命令：
   ```shell
   npx eslint .
   ```

   上述命令将会检查指定文件或目录中的 JavaScript 代码，并给出相应的警告和错误信息。

除了命令行之外，你还可以在编辑器中集成 ESLint。大多数常用的代码编辑器，如 VS Code、Sublime Text、Atom 等，都有相应的 ESLint 插件可供安装和配置。这样，当你在编辑器中编写代码时，ESLint 将会实时检查代码并提供反馈。

通过使用 ESLint，你可以确保代码的质量和一致性，提高代码可读性，并避免常见的错误和潜在问题。你还可以根据项目的需求，自定义和扩展 ESLint 的配置，以满足团队的编码规范和要求。

### Prettier

Prettier 是一个代码格式化工具，它可以帮助你自动格式化代码，使其符合统一的编码风格。以下是使用 Prettier 的一般步骤：

1. 在项目中安装 Prettier：
   ```shell
   npm install prettier --save-dev
   ```

2. 在项目的根目录下创建一个名为 `.prettierrc` 的文件（也可以在 `package.json` 文件中的 `"prettier"` 字段中进行配置）。

3. 在 `.prettierrc` 文件中定义你的代码格式化规则。这些规则将决定 Prettier 如何格式化你的代码。以下是一个示例配置文件：
   ```json
   {
     "semi": true,
     "singleQuote": true,
     "tabWidth": 2,
     "trailingComma": "es5"
   }
   ```

   上述配置表示使用分号结束语句，使用单引号而非双引号，使用两个空格作为缩进，以 ES5 规范结尾。

4. 在需要格式化的代码文件中，运行以下命令格式化代码：
   ```shell
   npx prettier --write .
   ```

   上述命令将格式化项目中的所有文件。

你还可以将 Prettier 集成到其他工具中，例如编辑器、lint-staged 等，以便在保存文件或提交代码时自动运行格式化。

如果你使用编辑器插件，如 VS Code、Sublime Text、Atom 等，可以在插件市场中搜索 Prettier 插件并安装它们。安装完成后，Prettier 将会自动格式化你的代码。

总结起来，Prettier 可以通过统一的格式化规则，提高代码的可读性和一致性，使团队合作更加高效，并减少代码风格方面的争议。

### lint-staged

`lint-staged` 是一个用于在提交代码之前运行 lint 检查的工具。它可以帮助团队在代码提交前自动运行各种静态代码分析工具，例如
ESLint、Prettier、Stylelint 等，以确保代码的质量和一致性。

要使用 `lint-staged`，你需要按照以下步骤进行设置：

1. 在项目中安装 lint-staged：
   ```shell
   npm install lint-staged --save-dev
   ```

2. 在项目的根目录下创建一个名为 `.lintstagedrc` 的文件（也可以在 `package.json` 文件中的 `"lint-staged"` 字段中进行配置）。

3. 在 `.lintstagedrc` 文件中，定义你希望在提交代码之前运行的 lint 检查和格式化命令。以下是一个示例配置文件：
   ```json
   {
     "*.js": [
       "eslint --fix",
       "prettier --write"
     ],
     "*.css": [
       "stylelint --fix",
       "prettier --write"
     ]
   }
   ```

   上述配置表示对于所有的 `.js` 文件，先运行 ESLint 进行代码检查和自动修复，然后再运行 Prettier 进行代码格式化。对于所有的 `.css` 文件，先运行
   Stylelint 进行代码检查和自动修复，然后再运行 Prettier 进行格式化。

4. 在 `package.json` 文件中的 `"scripts"` 字段中，添加一个 `"lint-staged"` 命令：
   ```json
   {
     "scripts": {
       "lint-staged": "lint-staged"
     }
   }
   ```

5. 在提交代码之前，运行 `npm run lint-staged` 命令，lint-staged 将会检查并自动修复你的代码。

你可以根据项目的需要，自定义 lint-staged 的配置。通过合理配置 lint-staged，你可以确保代码质量和风格的统一，并避免一些常见的问题在代码库中存在。


## 开始项目

**添加依赖**

```shell
# UI 框架
npm i @douyinfe/semi-ui

# 国际化
npm i react-intl

# 路由
npm i react-router-dom

# 状态管理（按需安装）
npm i zustand

# 
npm install node --save-dev
```
