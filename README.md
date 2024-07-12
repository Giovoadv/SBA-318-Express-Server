                                                                            Express TODO App


This is a simple TODO application built using Node.js and Express framework.

*Features*

    -Static Files: Serving static CSS and JS files for styling and client-side scripting.
    -Template Engine: Using Pug (formerly Jade) as the template engine to render dynamic views.
    -RESTful API: Exposes CRUD operations for tasks through RESTful routes.
    -Error Handling: Custom error handling for 404 and server errors.
    -Middleware: Includes middleware for request logging and body parsing.


*Prerequisites*

Make sure you have the following installed:

-Node.js
-npm (Node Package Manager)

*Getting Started*

1. Clone the repository:


Copy code
git clone https://github.com/Giovoadv/SBA-318-Express-Server.git

2. Install dependencies:

npm install

3. Run the application:

npm start

The application will start running on http://localhost:3000.

*Project Structure*

/routes/tasks.js: Contains route definitions for tasks.
/styles: Directory for CSS files.
/views: Directory for Pug templates (index.pug, help.pug, contact.pug).
/README.md: Documentation file providing information about the project.
app.js: Main application file defining middleware, routes, and error handling.
package.json: Contains project metadata and dependencies.

*Available Routes*

GET /: Renders the main TODO page.
GET /help: Renders the help page.
GET /contact: Renders the contact page.
GET /tasks: Serves a static HTML file for tasks.
GET /api/tasks: Retrieves all tasks.
POST /api/tasks: Creates a new task.
GET /api/tasks/:id: Retrieves a specific task by ID.
PUT /api/tasks/:id: Updates a specific task by ID.
DELETE /api/tasks/:id: Deletes a specific task by ID.

