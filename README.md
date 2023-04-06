# URL Shortener
Lightweight URL Shortener build with node-js.
# Installation
## Docker (recommended)
You need to have Docker and Docker Compose  installed.
1. Clone this repository
```
git clone https://github.com/JZITNIK-github/url-shortener
```
2. Go to the folder
```
cd url-shortener
```
3. Configure your server

You need to configure your server. Config for your docker installation is [here](#docker).

4. Run the server in a background.
If the computer reboots, the server will start automatically.
```
docker-compose up -d
```

## Manual
1. Clone this repository
```
git clone https://github.com/JZITNIK-github/url-shortener
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
More info [here](#manual)
4. Start the server
```
npm start
```

# Configuration
## Docker
Config file is docker-compose.yml
1. Setup the port
You want different webserver port than you need to change setting that is a ports section.

You will probably see something like this

```
...
    ports:
        - 80:3000
...
```

Change that "80" in the ports section to your own port.

2. Go down to environment section
You will probably see somthing like this

```
...
    environment:
      urlShortenerPath: "/url"
      urlShortenerPassword: "some-password"
...
```
Here change "some-password" to your own password. This password will be used to login to your webserver.

3. And that's it! Now you can start your server with docker.

## Manual
Config file is config.json

1. port

This is the port of the server

2. path

This is the path where will be shorted url located. If you generate some url, it will be in this folder.
If you set path to "/url" the generated url will look something like this: **/url**/hAuBs

3. password

Password is used to login to the website.