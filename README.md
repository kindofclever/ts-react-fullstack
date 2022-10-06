# Happy-Puppy-App

## Current Situation 

I still have problems in the deployed version, even though locally everything works as expected. It may take a while to lad the puppies from the db. I think i should implement a "Loading..." component.

## Fullstack app created with typeScript, NodeJS, express and React.

React Puppies app and Puppies API with Typescript
In this exercise I created a puppy API with Express and Typescript. 
The goal was to get familiar with Typescript and how to use it in Node.js and React.js

## The backend task
My task was to create a RESTful API with the following endpoints:

GET: api/puppies. This should return a list of all puppies in JSON-format.
GET: api/puppies/:id. This should return one puppy in JSON-format.
POST: api/puppies. This should create and return the newly added puppy.
PUT: api/puppies/:id. This should put one puppy down (jk, just update the specific puppy).
DELETE: api/puppies/:id. This should actually put one puppy down aka delete it.
The database for this task can just be a local array or a real database, it is up to you.

Each puppy should have at least the following attributes: - id - breed - name - birth date 

## The frontend task
I created a frontend to the API that I created the other.

Requirements for the UI:

It should display the initial puppies that exist in the DB on first load.
It should have the possibility to add a new puppy.
It should have the possibility to update an existing puppy.
It should display details when clicking on a selected puppy.
It should be able to delete a puppy from the DB.

## Extra challenge added
Fetch an image from Unsplash API (or similar) and aggregate the data in the API to include the image with the rest of the puppy information.

## TypeScript
I tried to use the provided types in Express, MonogDB and React.js

## Try it out yourself 

If you want to try out my code locally, don't forget to create a .env file in the backend directory. It should contain a variable called MONGO_USERNAME and one called MONGO_PASSWORD, as well as a PORT variable. To get valid credentials you need an account on mongodb.com and my permisson to the db. Just send me a message.
