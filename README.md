# Quizzes Frontend App

### Live Demo: https://meduzzen-frontend-one.vercel.app

This is a frontend application for managing quizzes.

## Tech Stack

- Angular
- TypeScript

## Requirements

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Angular CLI](https://angular.io/cli) (v12 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/d-art3m/meduzzen-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Copy the `.env.sample` file to create your `.env` file

4. Open the `.env` file and configure the following environment variables:
```bash
# The port on which the app will run (default: 4200)
NG_APP_PORT = 

# The base URL for the backend API
NG_APP_API_URL = 

# Auth0 configuration
NG_APP_AUTH0_DOMAIN = 
NG_APP_AUTH0_CLIENT_ID = 
NG_APP_AUTH0_AUDIENCE = 
```

## Development server

To start a local development server, run:

```bash
ng serve
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running the Application with Docker

### 1. Production Mode
To run the application in production mode

Build the Docker image:
```bash
docker build -t meduzzen-frontend .
```

Run the container:
```bash
docker run -p 4200:80 meduzzen-frontend
```

### 2. Development Mode

To start the application in development mode with Docker Compose

Use the provided `docker-compose.yml` file.

Start the services:

```bash
docker-compose up --build
```

To stop the application:

```bash
docker-compose down
```
