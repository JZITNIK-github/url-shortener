# URL Shortener
Lightweight URL Shortener build with node-js.
# Installation
1. Clone this repository
```
git clone <this repo>
```
2. Go to the folder
```
cd url-shortener
```
3. Install required dependencies
```
npm install
```
4. Configure the config file.
More info [here](#configuration)
4. Start the server
```
npm start
```

## Configuration

Config file is config.js
1. port

This is the port of the server
2. path

This is the path where will be shorted url located. If you generate some url, it will be in this folder.
If you set path to "/url" the generated url will look something like this: **/url**/hAuBs

3. password

Password is used to login to the website.