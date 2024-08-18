# ChatApp Backend

## Project Description
The backend of ChatApp is built with Node.js, utilizing Drizzle ORM for database interactions, providing API endpoints for user authentication, messaging, and profile management.

## Project Structure
The project is organized as follows:

├───config # Configuration files (database, environment variables)

├───controllers # Route controllers handling API logic

├───db # Database setup and migrations

├───models # Database models defined using Drizzle ORM

├───routes # Express routes for API endpoints

├───services # Business logic services (authentication, messaging)

└───utils # Utility functions and helpers

## Project Requirements and Dependencies
- Node.js
- Express.js
- PostgreSQL (or other supported by Drizzle ORM)
- Drizzle ORM
- bcryptjs (for password hashing)
- JSON Web Tokens (JWT) for authentication

## Environment Variables
Create a `.env` file in the root of your project and add the following variables:

```env
DB_HOST=localhost
DB_USER=myusername
DB_PASSWORD=mypassword
DB_NAME=chatapp_db
JWT_SECRET=yoursecretkey
```
