### To-zo Backend 

Welcome to our  To-do List To-zo backend repository! This project serves as the backend for our task management application. It handles communication with a MySQL database for storing user information, tasks, tags, and categories. The backend is developed using Node.js and Express.js, providing robust routing capabilities for both the application and authentication processes.

#### Technologies Used:
- Node.js
- Express.js
- MySQL database

#### Setup:
1. Copy the `example.env` file and create a new `.env` file with the necessary variables filled out to connect to your MySQL database.
2. Open your terminal.
3. Navigate to the project directory.
4. Run `npm i` to install all dependencies.
5. If it's the first time running the backend and the tables haven't been created yet, you need to ensure that the tables are created. You can do this by:
   - Opening the `server.js` file.
   - Locating the `init()` function.
   - In the `init()` function, find the line `await sequelize.sync({ force: false })` and set the value of `force` to `true`. This will force Sequelize to drop the existing tables and recreate them.
6. After making this change, run `node main.js` to start the server.

#### Features:
- Communication with MySQL database for storing user information, tasks, tags, and categories.
- Handles routing for both the application and authentication processes.

Ensure you have Node.js and npm installed on your system before proceeding with the setup.
