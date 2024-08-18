# ChatApp Frontend

## Project Description
The frontend of ChatApp is built with React.js, providing a user-friendly interface for real-time messaging, profile management chat participation.

## Project Structure
The project is organized as follows:

├───public

└───src

├───assets # Static assets like images, fonts, etc.

├───components # Reusable components
   
   ----├───icons # Icon components used throughout the app

   ---└───ui # UI components (buttons, modals from SHADCN UI)

├───content # Page-specific content components

   └───dashboard # Dashboard-related components  or page contents
   
├───layouts # Layout components that structure the pages 

├───lib # Utility functions and custom hooks

├───mocks # Mock data for testing and development

└───pages # Main pages of the application



## Project Requirements and Dependencies
- React.js
- Tailwind CSS
- Socket.io-client
- React Router DOM
- Other dependencies as specified in `package.json`

## Environment Variables
Create a `.env` file in the root of your project and add the following variable:

```env
VITE_APP_URL=http://localhost:8000
```
## How to Set up and Run the Project
1. Clone the repository: `git clone https://github.com/aarjun8060/chatApp-frontend.git`
2. Navigate to the frontend directory: `cd chatApp-frontend`
3. Install dependencies: `npm install`
4. Create a .env file and add the required environment variables.
5. Start the development server: `npm start`
   - The app will be accessible at `http://localhost:3000`

## How to Make Use of the Project
- Use the sidebar to navigate between different sections such as Profile, Messages, and Dashboard.
- Engage in real-time messaging, either one-on-one chats.

## Credits/ Appreciation
- Tailwind CSS for styling.
- Lucide React for icons.
- ShadCN UI for UI components.
- React Router for navigation.
- Socket.io-client for real-time communication.

## How to Contribute to the Project
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/awesome-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin feature/awesome-feature`).
6. Create a new Pull Request.


