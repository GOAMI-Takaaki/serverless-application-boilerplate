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
