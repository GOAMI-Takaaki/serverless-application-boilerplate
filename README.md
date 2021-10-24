# serverless-application-boilerplate

## setup

### asdf 

https://github.com/asdf-vm/asdf

```sh
git clone https://github.com/asdf-vm/asdf.git ~/.asdf
echo -e '\n. $HOME/.asdf/asdf.sh' >> ~/.profile
echo -e '\n. $HOME/.asdf/completions/asdf.bash' >> ~/.bashrc
source ~/.profile
exec $SHELL
asdf --version
```

#### asdf-nodejs

https://github.com/asdf-vm/asdf-nodejs

```sh
asdf plugin-add nodejs
asdf list-all nodejs
```

### nodejs

```sh
asdf install nodejs 14.18.1
asdf local nodejs 14.18.1
node --version
```

## Installed

### typescript

```sh
npm install typescript
```

### cdk

```
mkdir server
npm install aws-cdk
npx cdk init app --language typescript
```

### vue

```
mkdir client
npm install @vue/cli
npx vue create app
```

#### vue options

```
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, TS, PWA, Router, Vuex, CSS Pre-processors, Linter, Unit, E2E
? Choose a version of Vue.js that you want to start the project with 3.x
? Use class-style component syntax? No
? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? Yes
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with dart-sass)
? Pick a linter / formatter config: Prettier
? Pick additional lint features: Lint on save
? Pick a unit testing solution: Jest
? Pick an E2E testing solution: Cypress
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? No]
```