
# Quizrr

Quizrr is a project that leverages Go, Prisma, PostgreSQL, and Next.js to create a quiz platform. This README will guide you through the setup and installation process for both the backend and frontend.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/palveVaishnav/newQuizrr.git
cd newQuizrr
```

---

## Database Setup

PostgreSQL database using Docker:

```bash
docker run --name quizrr \
   -e POSTGRES_USER=postgres \
   -e POSTGRES_PASSWORD=password \
   -e POSTGRES_DB=quizrr-new \
   -p 5432:5432 \
   -d postgres
```

DB URL:

```bash
docker exec -it quizrr psql -U postgres -d quizrr-new
```

### Prisma ORM and Database Migration

Whenever you make changes to the Prisma schema, you need to migrate your database and re-generate the Prisma Go client.

1. **Set the `.env` file for the backend**:
   ```bash
   DATABASE_URL="postgresql://postgres:password@localhost:5432/quizrr-new"
   ```

2. **Prisma Commands**:
   - To re-generate the Go client:
     ```bash
     go run github.com/steebchen/prisma-client-go generate
     ```
   - To sync the database with your schema for development:
     ```bash
     go run github.com/steebchen/prisma-client-go db push
     ```
   - To create a Prisma schema from your existing database:
     ```bash
     go run github.com/steebchen/prisma-client-go db pull
     ```
   - For production, create a migration:
     ```bash
     go run github.com/steebchen/prisma-client-go migrate dev
     ```
   - To sync your production database with your migrations:
     ```bash
     go run github.com/steebchen/prisma-client-go migrate deploy
     ```

---

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies and tidy up modules:
   ```bash
   go mod tidy
   ```

3. Start the backend server:
   ```bash
   cd cmd
   air # or go run main.go
   ```

### Seeding the Database

To seed the database, send a `GET` request to the `/seed` route:

```bash
http://127.0.0.1:8080/seed
```
---

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

### Environment Variables

Create a `.env` file in the `frontend` directory with the following content:

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=password_nextauth

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
NEXT_PUBLIC_API="http://127.0.0.1:8080"
```

---

## Progress

- **Home page**: Placeholder page, not functional.
- **Packs and Results**: Fully working.
- **Tests**: Pixel-perfect design with functional testing and result viewing.
- **Profile**: Uses sessions, not yet connected to the database (under development).
- **Timer**: Currently not implemented.
- **Final Question**: On the last question of the last section, click "Submit" instead of "Save and Next" (fix planned for next PR).
- **No Payment Gateway**: Not implemented yet.
