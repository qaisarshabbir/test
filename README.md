# Gecko Web

## Getting Started

Clone the repo

```git clone git@github.com:zipline/Gecko-Web.git```

Install bower and npm dependencies

```npm install
bower install
```

Start the server 

```node server.js```

Run gulp with watch task

```gulp```


### Api Tests

To set up your API tests, run the following from the root of the project:

```sh
npm install
npm install -g mocha
```

Then to run the tests, go into the api-tests folder and run the following:
```sh
mocha -t 12000 *
```

