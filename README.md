# Student Dashboard

The Student Dashboard is a web application that allows students to manage their subjects and chapters, track study time, and view progress. It provides a user-friendly interface to organize study materials and monitor academic performance.

## Features

- User Authentication: Allows users to sign up, log in, and secure access to their dashboard.
- Subject Management: Users can create, edit, and delete subjects to categorize their study materials.
- Chapter Management: Users can add chapters within each subject and track study time for each chapter.
- Progress Tracking: The dashboard displays the total number of chapters and the total study time for each subject.
- Interactive Charts: Utilizes charts to visualize the distribution of chapters across subjects.

## Demo

Provide a link to a live demo or a GIF/image showcasing the application's main features.

## Technologies Used

The Student Dashboard application is built using the following technologies:

- Front-end: React, HTML, Tailwind CSS, Chart.js
- Back-end: Django, Django REST Framework
- Database: PostgreSQL

## Installation

To run the Student Dashboard on your local machine, follow these steps:

1. Clone the GitHub repository:

```bash
git clone https://github.com/your-username/student-dashboard.git
cd student-dashboard
```

2. Set up the Django environment and database:

```bash
# Install virtualenv (if not already installed)
pip install virtualenv

# Create a virtual environment
virtualenv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS and Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create the database tables
python manage.py migrate
```

3. Set up the React front-end:

```bash
cd frontend
npm install
```

4. Run the application:

```bash
# Start the Django development server
python manage.py runserver

# Start the React development server
npm start
```

Access the application in your web browser at `http://localhost:3000/`.

## Contributing

We welcome contributions to the Student Dashboard project! If you encounter any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

The Student Dashboard is open-source software licensed under the [MIT License](LICENSE).

## Contact

For any questions or inquiries, please contact the project maintainers:

- Name: Jayant Kumar
- Email: jayantjayant76@gmail.com
- GitHub: [@Jayant-CS50](https://github.com/Jayant-CS50)


