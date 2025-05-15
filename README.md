# ICPC Website

This project is a simple ICPC (International Collegiate Programming Contest) website built using Node.js, Express, and MySQL as part of a DBMS project. The website includes features for managing achievements, alumni, contests, contributions, videos, and more related to the ICPC.

## Features

- Achievement Management
- Alumni Management
- Champion Management
- Contest Management
- Contribution Management
- Video Management

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Frontend:** HTML, CSS, JavaScript (served via public folder)
- **Views:** Handlebars or EJS (if applicable)

## Project Structure

- **controllers/**: Contains controller files for different entities (e.g., `achievementController.js`, `alumniController.js`, etc.).
- **routes/**: Contains route definitions for different entities.
- **public/**: Static assets like CSS, images, and JavaScript files.
- **views/**: Template files for rendering the frontend.
- **db.js**: Database connection setup using MySQL.
- **index.js**: Entry point of the Node.js application.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/suman1406/icpc-website.git
   ```

2. Navigate into the project directory:
   ```bash
   cd icpc-website
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up MySQL database and configure `db.js` file with your MySQL credentials:
   ```js
   const mysql = require('mysql');
   const connection = mysql.createConnection({
     host: 'localhost',
     user: 'your-username',
     password: 'your-password',
     database: 'icpc_db'
   });
   ```

5. Run the application:
   ```bash
   npm start
   ```

6. Visit the website at `http://localhost:3000`.

## Usage

Once the application is up and running, users can manage different aspects of the ICPC competition, including:

- **Achievements:** Add, edit, and delete achievements.
- **Alumni:** Manage information about ICPC alumni.
- **Champions:** Track and manage champions.
- **Contests:** View and manage upcoming and past contests.
- **Contributions:** Manage contributions made by members.
- **Videos:** Manage and showcase ICPC-related videos.

## Future Enhancements

- User authentication and roles (e.g., admin, user)
- Enhanced search functionality for alumni and champions
- Improved UI/UX for better navigation
