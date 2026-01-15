# ToDo App
A simple Django-based ToDo application with user authentication, profile management, and task tracking.

## Features

🔑 User Authentication (Register, Login, Logout)

👤 User Profiles (View, Edit, Delete)

✅ Task Management

- Create tasks

- Edit tasks

- Mark tasks as complete (AJAX support)

- Delete tasks

📊 Task Dashboard

- Pending tasks

- Completed tasks

🔒 Access Control – Only task owners can manage their tasks

## Tech Stack

- Backend: Django

- Frontend: HTML, CSS (Django Templates)

- Database: PostgreSQL on Neon  
    

- Authentication: Django’s built-in user model with custom forms

## Project Structure
<pre>
accounts/       # User authentication and profile management
tasks/          # Task models, views, forms, templates
common/         # Shared templates (home, base)
templates/      # HTML templates
static/         # Static files (CSS, JS, Images)
</pre>  

## Installation

### 1. Clone the repository:
<pre>
  git clone https://github.com/mariami57/TodoApp.git
  cd todo-app
</pre>

### 2. Create a virtual environment:
<pre>
  python -m venv venv
  source venv/bin/activate   # On Windows: venv\Scripts\activate
</pre>

### 3. Install dependencies:
<pre>
  pip install -r requirements.txt
</pre>

### 4. Apply migrations:
This app uses PostgreSQL. Depending on where you are running the app, the steps differ slightly:

- Running the app locally (development):

    For local development, it’s recommended to use a local PostgreSQL database rather than the production database.
    
    Example .env or local DATABASE_URL:
    
    <pre>
    DATABASE_URL=postgresql://local_user:local_password@localhost:5432/tododb
    </pre>
    
    Apply migrations to your local database:
    
    <pre>
    python manage.py migrate
    </pre>

    This ensures you can test your app without affecting production data.

- Running the app in production: see the [Deployment](#deployment) section for setup and migration instructions.
  
### 5. Run the development server:
<pre>
  python manage.py runserver
</pre>

### 6. Open in browser:
<pre>
  http://127.0.0.1:8000/
</pre>

## Contributing

Contributions are welcome! To contribute:

- Fork the repository

- Create a feature branch (git checkout -b feature/your-feature)

- Commit your changes (git commit -m "Add new feature")

- Push to the branch (git push origin feature/your-feature)

 - Open a Pull Request

## Deployment

This app is deployed on Azure.
Here’s an overview of the deployment setup:

A) Connection is configured via the environment variable DATABASE_URL

   <pre>
    DATABASE_URL=postgresql://NEON_USER:NEON_PASSWORD@NEON_HOST:NEON_PORT/NEON_DB
   </pre>
  - Notes:
     
    ○ All special characters in the password must be URL-encoded.

    ○ Ensure your app can access the Neon database (Neon provides connection details and authentication).
    
B) Dependencies

   - Required packages for PostgreSQL support (Installed via requirements.txt):
     
     psycopg2-binary
     
     dj-database-url
     
C) Running Migrations

   Run Django migrations via SSH after verifying database connectivity:
   <pre>
      python manage.py migrate
   </pre>
   Ensure migrations complete before starting the app to avoid startup timeouts.


D Environment Variables

This project uses a .env file to manage secrets and environment configuration. A template.env file is included in the repository – you can copy it and rename it to .env before running the project

## Live Demo

Check out the live version here:
[To do App](https://todonotes-azhygteggrhfcyek.italynorth-01.azurewebsites.net/accounts/login/)


## License

This project is licensed under the MIT License – see the LICENSE
 file for details.
