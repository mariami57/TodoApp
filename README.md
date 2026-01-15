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

- Running the app in production (Neon):
  
  This project now uses [Neon](https://neon.com/) for hosting PostgreSQL in production. You can get your connection string from the Neon dashboard and add it to your .env:
  <pre>
      DATABASE_URL=postgresql://neon_user:neon_password@neon_host:neon_port/neon_db
  </pre>

  Then apply migrations to the Neon database:
  <pre>
       python manage.py migrate
  </pre>

### 5. Create a superuser (optional, for admin access):
<pre>
  python manage.py createsuperuser
</pre>

### 6. Run the development server:
<pre>
  python manage.py runserver
</pre>

### 7. Open the app in your browser:
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
This app is deployed on Azure. The database in production is PostgreSQL on Azure.
Here’s an overview of the deployment setup:

A) Connection is configured via the environment variable DATABASE_URL:
   <pre>
    postgresql://<DB_USER>:<PASSWORD>@<SERVER_NAME>.postgres.database.azure.com:5432/<DB_NAME>?sslmode=require
   </pre>
  - Notes:
     
    ○ All special characters in the password must be URL-encoded.

    ○ sslmode=require is mandatory for Azure.

    ○ Ensure the Azure PostgreSQL server allows access from your App Service (enable "Allow Azure services and resources to access this server") or add firewall rules for your SSH/client IP.
    
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

 D) Static & Media Files: collected by Django’s collectstatic and served by WhiteNoise

E) Environment Variables:
<br>
This project uses a .env file to manage secrets and environment configuration.
A template.env file is included in the repository – you can copy it and rename it to .env before running the project

- SECRET_KEY – Django secret key

- DEBUG – Set to False in production

- ALLOWED_HOSTS – Your domain or IP

- CSRF_TRUSTED_ORIGINS - ensures Django accepts form submissions from your deployed domains

## Live Demo

Check out the live version here:
[To do App](https://todonotes-azhygteggrhfcyek.italynorth-01.azurewebsites.net/accounts/login/)


## License

This project is licensed under the MIT License – see the LICENSE
 file for details.
