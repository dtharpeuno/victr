# victr

## Assesement Given:

1. Use the GitHub API to retrieve the most starred public Python projects.  Store the list of repositories in a database table. The table must contain the  repository ID, name, URL, created date, last push date, description, and  number of stars. This process should be able to be run repeatedly and  update the table each time. 
Useful links from the GitHub API documentation: 
https://developer.github.com/v3/ 
https://developer.github.com/v3/search/ 
2. Using the data in the table created in step 1, create a web application that  displays a list of the GitHub repositories and allows the user to click  through to view details on each one. Be sure to include all of the fields in  step 1 – displayed in either the list or detailed view. 
3. Create a README file with a description of your architecture and notes on  installation of your application. You are free to use any Python, JavaScript,  or CSS frameworks as you see fit.

## Overview of stack:

Technologies leveraged: 
`Docker`
`create-react-app`
`Flask`
`Postgres`
`SQLAlchemy`
`React`
`Material UI`
`JSS`
`Python`

## Layers in application:

**`db`**

This is a general postgres instance.

**`backend`**

Docker container => `victr_backend_1`

The `api` folder is the main `Flask` application that leverges the entire backend, which mainly funcitons as an API for the front-end app.

**`frontend`**

Docker container => `victr_frontend_1`

The `app` folder is the main front-end application for the project that is built with `Material UI`, `create-react-app` boilerplate, and leverages Web API's like `fetch` for API/backend layer interaction as well as `JSS` for general styling of front end components.

## Running environment

- `backend` - Port 5000
- `db` - Port 5432
- `frontend` - Port 3000

1. Clone repo
2. `cd` in project root/app => where `package.json` lives 
3. run `npm i` to install missing node modules dir
4. `cd` back to project root
5. run `docker-compose up` and wait for all docker builds to run and all services to start, (`frontend_1` in terminal out will say that `localhost:3000` is ready and that should denote finish of docker build)
6. Navigate to  `localhost:5000` to  view back end health check
7. Navigate to  `localhost:3000` to  view front end app

Docker container => `victr_db_1` => `db`
Docker container => `victr_backend_1` => `backend`
Docker container => `victr_frontend_1` => `frontend`