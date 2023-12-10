1) Npm proxy setup to run `npm install with –g`
 
a) Open the terminal and type following two lines and hit enter
```sh
npm config set http-proxy=http://myorgproxyurl.com:8080/
npm config set https-proxy=http://myorgproxyurl.com:8080/
```
 
a) Npm proxy setup is done
b) You can verify by typing `vi  ~/.npmrc`
 
2) Change global `.npmrc` location to user’s home
 
a. Make a directory for global installations:
```
mkdir ~/.npm-global
```
 
b. Configure npm to use the new directory path:
```
npm config set prefix '~/.npm-global'
```
 
Open or create a `~/.profile` file and add this line:
```sh
export PATH=~/.npm-global/bin:$PATH
```
 
d. Create a file by typing on terminal `touch ~/.profile`
 
Back on the command line, update your system variables: `source ~/.profile`
 
f. That’s it. You are done.
 
g. You can verify by typing `npm install jquery –g`
 
 
3. Git proxy setup to run git clone
 
a) Open the terminal and type the below two lines
```sh
git config --global http.proxy http://myorgproxyurl.com:8080/
git config --global https.proxy http://myorgproxyurl.com:8080/
```
 
b) That’s it. You are done.
c) You can verify by running this command
```
git clone https://github.com/ng-bootstrap/ng-bootstrap.git
```
 
4. Enable proxy for installing vscode extension
 
a) In vscode type `cmd + shift + p`
b) Type `users settings` in the search bar
c) Paste following two lines
```
"http.proxy": "http://myorgproxyurl.com:8080/",
"https.proxy": "http://myorgproxyurl.com:8080/",
```
d)     That’s it. You are done