# Hollywood Actresses CRUD App

![still from the film "Whatever Happened to Baby Jane?"](https://images.bauerhosting.com/legacy/empire-tmdb/films/10242/images/bjDmIeNj9g42sXfuE6AxePjraZO.jpg?ar=16%3A9&fit=crop&crop=top&auto=format&w=1440&q=80)

A simple CRUD application to manage a collection of actresses 

## Features
- View a list of all actresses in the database
- Add new actresses to the database
- Edit details of existing actresses
- Delete actresses from the database

## Technologies Used
- Node.js
- Express.js
- MongoDB / Mongoose
- Morgan
- Method-Override
- dotenv
- Path
- EJS
- CSS for basic styling

## Routes
- `GET /` - Home page.
- `GET /actresses` - View all actresses.
- `GET /actresses/new` - Form to add a new actress.
- `POST /actresses` - Add a new actress.
- `GET /actresses/:actressId` - View details of a single actress.
- `DELETE /actresses/:actressId` - Delete an actress.
- `GET /actresses/:actressId/edit` - Form to edit an actress.
- `PUT /actresses/:actressId` - Update an actress.