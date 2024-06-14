```
# User Management and PDF Generation API

This is a backend application built using NestJS that provides user management and PDF generation functionalities.

## Features

* User Service: Manages user data (Name, Email, Phone Number, Address) with methods for adding, updating, deleting, and retrieving users.
* API Endpoints: Provides RESTful API endpoints to interact with the user data service.
* PDF Generation: Implements a route to dynamically generate a PDF document based on the user data.
* PDF Retrieval: Implements a route to retrieve the generated PDF document.

## Installation

1. Clone this repository:
```
git clone <repository-url>
```
2. Install dependencies:
```
npm install
```
3. Set up a database (SQLite in this case) and configure the connection in `ormconfig.json`.
4. Run the application:
```
npm run start
```

## Usage

Use the provided API endpoints to manage users and generate PDFs.

### API Endpoints

* `POST /api/users`: Create a new user.
* `GET /api/users`: Get all users.
* `GET /api/users/:id`: Get a user by ID.
* `PUT /api/users/:id`: Update a user by ID.
* `DELETE /api/users/:id`: Delete a user by ID.
* `GET /api/pdf`: Generate and download a PDF document with user data.

## Technologies Used

* NestJS
* TypeORM
* jspdf
* Express

## Author

Your Name
Amreliya sejal vaibhav
