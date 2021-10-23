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
npm install aws-cdk
npx cdk init app --language typescript
```
