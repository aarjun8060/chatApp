# ChatApp

## Project Description
ChatApp is a real-time messaging application built with a modern tech stack. The project consists of a frontend developed using React.js and Tailwind CSS, and a backend built with Node.js and Drizzle ORM. It provides a user-friendly interface for real-time communication, profile management, and chat participation.

## Project Structure

### Frontend

The frontend is organized as follows:

├───public

└───src

├───assets # Static assets like images, fonts, etc.

├───components # Reusable components

│ ├───icons # Icon components used throughout the app

│ └───ui # UI components (buttons, modals from SHADCN UI)

├───content # Page-specific content components
│ └───dashboard # Dashboard-related components or page contents

├───layouts # Layout components that structure the pages

├───lib # Utility functions and custom hooks

├───mocks # Mock data for testing and development

└───pages # Main pages of the application

### Backend

The backend is organized as follows:
├───config # Configuration files (database, environment variables)

├───controllers # Route controllers handling API logic

├───db # Database setup and migrations

├───models # Database models defined using Drizzle ORM

├───routes # Express routes for API endpoints

├───services # Business logic services (authentication, messaging)

└───utils # Utility functions and helpers


## Frontend Requirements and Dependencies
- React.js
- Tailwind CSS
- Socket.io-client
- React Router DOM
- Other dependencies as specified in `package.json`

## Backend Requirements and Dependencies
- Node.js
- Express.js
- PostgreSQL (or other supported by Drizzle ORM)
- Drizzle ORM
- bcryptjs (for password hashing)
- JSON Web Tokens (JWT) for authentication

## Environment Variables

### Frontend

Create a `.env` file in the root of your frontend project and add the following variable:

```env
VITE_APP_URL=http://localhost:8000
```

Backend
Create a .env file in the root of your backend project and add the following variables:
```
env
Copy code
DB_HOST=localhost
DB_USER=myusername
DB_PASSWORD=mypassword
DB_NAME=chatapp_db
JWT_SECRET=yoursecretkey
```

How to Set up and Run the Project:

###Frontend

1.Clone the frontend repository: git clone https://github.com/aarjun8060/chatApp-frontend.git

2.Navigate to the frontend directory: cd chatApp-frontend

3.Install dependencies: npm install

4.Create a .env file and add the required environment variables.

5.Start the development server: npm start

The app will be accessible at http://localhost:3000

###Backend

Clone the backend repository: git clone https://github.com/aarjun8060/chatApp-backend.git

Navigate to the backend directory: cd chatApp-backend

Install dependencies: npm install

Create a .env file and add the required environment variables.

Run database migrations: npm run migrate

Start the development server: npm start

The server will be accessible at http://localhost:8000

How to Make Use of the Project

Use the sidebar in the frontend to navigate between different sections such as Profile, Messages, and Dashboard.

Engage in real-time messaging, either one-on-one chats.

Use API endpoints from the backend for user authentication (/api/auth), messaging (/api/messages), and other functionalities.

Credits/ Appreciation

Tailwind CSS for styling.

Lucide React for icons.

ShadCN UI for UI components.

React Router for navigation.

Socket.io-client for real-time communication.

Node.js and Express.js for server-side logic.

Drizzle ORM for database interactions.

bcryptjs for password hashing.

JSON Web Tokens (JWT) for secure authentication.

How to Contribute to the Project
###Fork the repository.
Create a new branch (git checkout -b feature/awesome-feature).
Make your changes.
Commit your changes (git commit -am 'Add some feature').
Push to the branch (git push origin feature/awesome-feature).
Create a new Pull Request.
