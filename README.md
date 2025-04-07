# Kids Learning

The English Learning App is a web-based application designed to help children learn English through interactive tools and exercises.

## Fatures

The app provides a variety of features, including:

- Register of classes and students to help you administer quizzes by class and track class and individual performance.

- Register of questions listening, reading, and writing (speak comming soon) to compound your quizzes.

- Quiz builder with schedule period to apply to your stundent by class.

- A quiz game to help students practice their knowledge of English vocabulary and grammar.

- Report to monitor overall performance and performance by competency, as well as by student.

## Frontend

The frontend is built using Vue.js 2, which provides a responsive and user-friendly interface. The app uses Bootstrap 4.x UI components to style elements with minimal effort and quick load times.

- [Vue](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vuex](https://vuex.vuejs.org/)
- [BootstrapVue](https://bootstrap-vue.org/)
- [Typescript](https://www.typescriptlang.org/)

## Backend

The backend is built using Node.js 16.x, Express.js 4.x, and Postgres. It provides a REST API for the frontend to interact with, allowing for easy data retrieval and manipulation.

- [Node](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [Knex.js](https://knexjs.org/)

## Quick Start

To run the app locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/kids-learning.git
```

2. Running backend:

Navigate to the `api` directory and install the dependencies:

```bash
cd kids-learning/api && npm install
```

Create a `.env` file in the root directory and add the following variables:

```
AUTH_SECRET=your_secret_goes_here

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=kids_learning
DATABASE_USER=postgres
DATABASE_PASSWORD=123mudar

STORAGE_TYPE=local # local | s3
AWS_S3_BUCKET_NAME=kids_learning

```

Start the api:

```bash
npm run dev
```

The api will be accessible at `http://localhost:3000`.

3. Running the frontend:

Navigate to the `client` directory and install the dependencies:

```bash
cd kids-learning/client && npm install
```

Create a `.env` file in the root directory and add the following variables:

```
VUE_APP_API_URL = "http://localhost:3000"
```

To access the app, simply navigate to `http://localhost:8080` in your web browser.

## Configuration

Make sure to start your own `Postgres` database server, create the database (e.g. `kids_learning`) and update the following `environments variables` in the your `./src/api/.env` file.

```
DATABASE_HOST=""
DATABASE_PORT=""
DATABASE_NAME=""
DATABASE_USER=""
DATABASE_PASSWORD=""
```

## Create database schema and seed admin user

By using Knex Migrations you're able to define sets of schema changes so upgrading a database is a breeze.

```bash
npm install knex -g
```

you can create the database shcema and seed the admin user (admin@kidslearning.com, Adm@KL123) by running the following commands:

```bash
cd kids-learning/api && knex migrate:latest
```

## License

This project is licensed under a Source-Available License.

You are permitted to view and study the source code for educational and non-commercial purposes only.
Copying, modifying, distributing, or using the code in any product or service is strictly prohibited without prior written permission from the author.
