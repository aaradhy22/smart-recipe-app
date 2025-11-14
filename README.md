Culinary Creator 🧑‍🍳

This is a smart recipe generator that uses Artificial Intelligence to create custom recipes based on the ingredients you have, your preferred cuisine, and any dietary restrictions.

This project is built with a Spring Boot backend (for the AI logic) and a React frontend (for the user interface).

(To add a screenshot: Take a picture of your app running, go to a site like imgur.com to upload it, get the link, and paste it inside the () above. Or, just drag your image file onto this page when you edit it on GitHub.)

🛠️ Tech Stack

This project is built using two main parts:

Backend (Spring Boot)

Java: The programming language

Spring Boot: Framework for creating the API

Spring AI: A special Spring module to connect to OpenAI

Maven: For managing the Java project's parts

Frontend (React)

React: A JavaScript library for building the user interface

Vite: A fast tool for running the React app

CSS-in-JS: All styling is handled inside the App.jsx file

🚀 How to Run This Project

To run this project, you will need to run both the backend and the frontend at the same time in two separate terminals.

Prerequisites

Java (JDK 17 or newer): To run the backend.

Node.js and npm: To run the frontend.

An OpenAI API Key: The AI will not work without this.

Step 1: Run the Backend (Spring Boot)

Open your first terminal and navigate to the project's root folder (the one with pom.xml).

Set Your API Key: Before you can run the app, you MUST provide your OpenAI API key.

On Mac/Linux:

export MY_APP_KEY="sk-your-real-openai-api-key-here"


On Windows (Command Prompt):

set MY_APP_KEY="sk-your-real-openai-api-key-here"


Run the App: Use Maven to start the server.

mvn spring-boot:run


✅ The backend is now running on http://localhost:8080.

Step 2: Run the Frontend (React)

Open a new terminal window. (Leave the first one running!)

Navigate into the frontend folder:

cd frontend


Install the dependencies (you only need to do this once):

npm install


Start the app:

npm run dev


✅ The frontend is now running. Your terminal will give you a URL (usually http://localhost:5173).

Step 3: View the App
<img width="464" height="488" alt="Screenshot 2025-11-15 at 12 27 14 AM" src="https://github.com/user-attachments/assets/65b8bbf7-1246-43a1-ba1e-dca8796c70dd" />

Open the frontend URL (e.g., http://localhost:5173) in your web browser. You can now use the app!
