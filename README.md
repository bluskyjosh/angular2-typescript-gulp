Angular2 with TypeScript and Gulp
=================================

A basic Angular2 application with Gulp as build system.

#### 1. Prerequisites
run cmd vagrant up
>vagrant up

Runs vagrant provision script. This should set up the vagrant box with all the prerequisites needed.


#### 2. Installing dependencies

Install dependencies by running the following command:

> npm install

`node_modules` directory will be created during the install.

#### 4. Building the project

Build the project by running the following command:

> npm run clean & npm run build

`build` directory will be created during the build

#### 5. Starting the application

Restart ngnix server running following command

> sudo service nginx restart

browse to localhost:8080
The application will be displayed in the browser.

Resources
---------

- [A step-by-step tutorial](http://blog.codeleak.pl/2016/03/quickstart-angular2-with-typescript-and.html)
