### Solita farms frontend
This is a vue app created to be the frontend for the Solita Dev Academy pre-assignment. The project was created using Vue CLI and runs locally.

I chose to use vue as it is a language I am familiar with and it is convenient to use with pre-existing components and libraries using NPM.

[The backend of the project is located here](https://github.com/jasonpa301/farms-backend)

#### Requirements
-node (created with node v16.13.1)
-npm  (created with npm v8.1.2)

#### Project setup

Clone the repo, then install dependencies:
```
npm install
```
A .env file must be added with variables as shown in the .env.example file. The backend will run at http://localhost:80/ by default, if for some reason you are using a different backend URL, it should be changed here. My mapbox API key will be provided or you can use your own if you choose to.

#### Running the application
The following command will run the application locally at http://localhost:8080 by default.
```
npm run serve
```
The application has been developed and tested on Windows 10, with Firefox and Chrome.

#### Unit tests

Tests can be run with the following command:
```
npm run test:unit
```