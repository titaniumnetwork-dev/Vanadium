# Vanadium
A traditional proxy site for use in combating web filters.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/titaniumnetwork-dev/Vanadium/tree/main)

## Setup

```sh
git clone https://github.com/titaniumnetwork-dev/Vanadium
cd Vanadium
npm start
```

## Config example

`"port": "8080"` = Sets HTTP server port of web proxy.

`"ssl": "false"` = Sets HTTP server SSL.

`"prefix": "/search/"` = Sets the prefix of the web proxy.

`"localAddresses": [ "0.0.0.0" ]` = Allows you to choose which IP to make the request from. If there are multiple IP's then the IP chosen will be randomized.

`"blockedHostnames": [ "example.com", "example.org" ]` = If the hostname of the proxy URL matches any of the URL hostnames listed in the array, the request to the server will be cancelled.

## Features

- Fully functional Omnibox! Search, URL entry, and search suggestions all in one place.'

- A simplistic, no-frills design that is easy for anyone to pick up and use.

- A mobile-responsive design makes this frontend usable on both mobile devices and traditional computers.

- A work-in-progress arcade featuring classic Adobe Flash games, all working thanks to Ruffle.rs.


## Copyright Takedown Requests

Simply create an issue on this repository and we will assist you as soon as possible. If that doesn't suit you, then send an e-mail to nullnvoid@mailfence.com and I can work with you directly.
