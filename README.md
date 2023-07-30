# Student Dashboard

The Student Dashboard is a web application that allows students to manage their subjects and chapters, track study time, and view progress. It provides a user-friendly interface to organize study materials and monitor academic performance.

## Features

- User Authentication: Allows users to sign up, log in, and secure access to their dashboard.
- Subject Management: Users can create, edit, and delete subjects to categorize their study materials.
- Chapter Management: Users can add chapters within each subject and track study time for each chapter.
- Progress Tracking: The dashboard displays the total number of chapters and the total study time for each subject.
- Interactive Charts: Utilizes charts to visualize the distribution of chapters across subjects.

## Demo

Youtube - https://youtu.be/lzAvQlk5UQo

## Technologies Used

The Student Dashboard application is built using the following technologies:

- Front-end: React, HTML, JavaScript, Tailwind CSS, Chart.js
- Back-end: Django, Django REST Framework, JWT
- Database: PostgreSQL

## Distinctiveness and Complexity

The Student Dashboard project stands out from other projects in CS50 Web Development due to its comprehensive approach as a full-stack web application. Unlike many other projects that focus solely on either front-end or back-end technologies, the Student Dashboard brings together the power of React for the front-end and Django REST APIs for the back-end, creating a seamless and interactive user experience.

### Front-End with React

One of the key distinctions of the Student Dashboard is its use of React as the front-end framework. React is renowned for its component-based architecture, allowing developers to build reusable UI components, making the codebase more maintainable and scalable. With React's virtual DOM, the application achieves faster rendering and provides a responsive user interface.

### Back-End with Django REST APIs

In combination with React, the Student Dashboard utilizes Django REST Framework to build powerful and flexible APIs that handle the application's data management. Django REST Framework simplifies the creation of APIs by providing built-in functionalities for authentication, serialization, and model-view-controller (MVC) architecture. The use of REST APIs enables the separation of concerns, promoting a clean and organized back-end structure.

### JWT Tokenization for Secure Authentication

Security is of utmost importance in any application, and the Student Dashboard addresses this concern by implementing JWT (JSON Web Tokens) for authentication. JWT tokenization ensures secure communication between the client and server by encoding user information in a digitally signed token. This token is used to verify the user's identity, preventing unauthorized access to sensitive data and API endpoints.

### Data Management with Redux

To maintain a consistent state across the application and manage complex data flows, the Student Dashboard employs Redux for state management. Redux serves as a centralized store that holds the application's state and allows components to access and update data efficiently. By implementing Redux, the application ensures data integrity and eliminates the need for excessive props passing between components.

### Interactive Data Visualization with Chart.js

Another notable feature of the Student Dashboard is its use of Chart.js, a JavaScript library for data visualization. Chart.js provides an extensive collection of charts and graphs, allowing users to gain insights from their study data at a glance. The interactive and visually appealing charts add depth to the user experience and enhance the presentation of study progress.

### CRUD Operations and Complex Models

The project demonstrates complexity through its use of three models in the Django back-end: Subject, Chapter, and User. Each model is associated with specific REST API endpoints, enabling Create, Read, Update, and Delete (CRUD) operations. These CRUD functionalities facilitate easy management of subjects and chapters for the users.

### Login and Logout Functionality

The Student Dashboard goes beyond simple data display and incorporates essential user functionalities, such as login and logout features. Upon successful login, the application provides users with secure access to their personalized dashboard. The logout functionality ensures that user sessions are terminated securely, enhancing the application's security measures.

### Additional Complexity

The project further exhibits complexity by implementing dynamic routing in React to render different views based on user interactions. The use of React Router enhances the application's navigational flow and allows users to move seamlessly between different sections of the dashboard.

Moreover, the application's responsive design ensures that the Student Dashboard is accessible and user-friendly on various devices, including desktops, tablets, and mobile phones.

Overall, the Student Dashboard stands as a distinct and complex full-stack web application that showcases the synergy of React and Django, emphasizes data security, and offers a rich user experience through interactive data visualization and state management with Redux. The project's multifaceted nature and attention to detail make it an exceptional addition to the CS50 Web Development portfolio.


## Installation

To run the Student Dashboard on your local machine, follow these steps:

1. Clone the GitHub repository:

```bash
git clone https://github.com/your-username/StudentDashboard.git
cd StudentDashboard
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
python3 manage.py migrate
```

3. Set up the React front-end:

```bash
cd frontend
npm install
```
4. Build the application:

```bash
cd frontend
npm run build
rm build/index.html
```
5. Run the application:

```bash
# Start the Django development server
python3 manage.py runserver

```

Access the application in your web browser at `http://localhost:8000/`.

## Contributing

We welcome contributions to the Student Dashboard project! If you encounter any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

The Student Dashboard is open-source software licensed under the [MIT License](LICENSE).

## Contact

For any questions or inquiries, please contact the project maintainers:

- Name: Jayant Kumar
- Email: jayantjayant76@gmail.com
- GitHub: [@Jayant-CS50](https://github.com/Jayant-CS50)


