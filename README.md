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

- Database: SQLite (default, but can be switched to PostgreSQL/MySQL)

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
This app is deployed on Azure.
Here’s an overview of the deployment setup:

○ Database in Production: SQLite

○ Static & Media Files: collected by Django’s collectstatic and served by WhiteNoise

○ Environment Variables:
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


## Demo reset
If the demo database gets corrupted or reset:

<pre>
 python manage.py migrate
 python manage.py loaddata demo_data.json
</pre>

## License

This project is licensed under the MIT License – see the LICENSE
 file for details.
