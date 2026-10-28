# Student registration API

The API persists students in MySQL and exposes:

- `POST /api/students/register` with `{ "name": "...", "course": "..." }`
- `GET /api/students`

## Setup

1. Install MySQL and start the MySQL server.
2. Create the database once:

   ```sql
   CREATE DATABASE student_registration;
   ```

3. Copy `.env.example` to `.env` and set `MYSQL_HOST`, `MYSQL_PORT`,
   `MYSQL_USER`, `MYSQL_PASSWORD`, and `MYSQL_DATABASE` for your MySQL account.
   The API creates the `students` table automatically at startup.
4. In the frontend project, copy `.env.example` to `.env` if the API is not
   running at the default URL `http://localhost:5000/api/students`. Set
   `VITE_API_URL` to the API's `/api/students` URL.
5. Install and start the API:

   ```sh
   npm install
   npm run dev
   ```

The API listens on port `5000` by default. Set `FRONTEND_ORIGIN` if the frontend
uses a different origin; multiple origins can be comma-separated. The default
allows both `localhost:5173` and `127.0.0.1:5173`.
