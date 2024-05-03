# Blogging Platform

This is a web application for a blogging platform that allows users to create, read, update, and delete (CRUD) blog posts, categories, and tags. The application also supports user authentication and authorization, as well as commenting features.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Tech Stack

### Backend

- Node.js
- Express.js
- JSON Web Tokens (JWT) for authentication
- MongoDB for database

### Frontend

- React.js

## Features

- CRUD operations on blog posts, categories, and tags.
- User authentication and authorization using JWT.
- Commenting system for blog posts.
- Client-side form validation for input fields.
- Consuming backend API to perform CRUD operations.
- Basic security measures implemented.

## Setup

To run this project locally, follow these steps:

1. Clone the repository:

```bash
git clone <repository_url>
cd <project_folder>
```

2. Install dependencies for both backend and frontend:

```bash
cd server
npm install

cd client
npm install
```

3. Set up MongoDB database:

   - Install MongoDB if not already installed.
   - Start MongoDB service.

4. Set up environment variables:

   - Create a `.env` file in the `backend` folder.
   - Define the following variables:
     ```
     PORT=<port_number>
     JWT_SECRET=<jwt_secret_key>
     MONGODB_URI=<mongodb_connection_string>
     ```

5. Run the backend server:

```bash
cd backend
npm start
```

6. Run the frontend server:

```bash
cd frontend
npm start
```

## Usage

Once the backend and frontend servers are running, you can access the application by visiting `http://localhost:3000` in your web browser.
