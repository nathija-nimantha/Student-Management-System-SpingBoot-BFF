
# Student Management System

A web-based application to manage student records, including adding, editing, viewing, and deleting student details. The project utilizes a **Spring Boot** backend with a **layered architecture** and a frontend interface using **HTML**, **CSS**, and **JavaScript**.

The project also supports image handling (student profile images) and basic form validation. It stores student information such as name, date of birth, guardian's name, CRN, and profile pictures.

## Features

- **CRUD Operations**: Add, update, delete, and view students.
- **Profile Image Handling**: Supports uploading a profile image, with a default image used if none is uploaded.
- **Validation**: Ensures all required fields are filled before submitting, except for the image field.
- **REST API**: Uses Spring Boot to expose RESTful APIs for handling student data.
- **Base64 Image Encoding**: Converts images to Base64 before sending them to the server.
- **Layered Architecture**: The project follows a clean architecture separating concerns into layers (Controller, Service, Repository).

## Tech Stack

### Backend
- **Spring Boot**: Backend framework for creating REST APIs.
- **JPA/Hibernate**: ORM for database interaction.
- **H2 Database (for development)**: Lightweight, in-memory database.
- **MySQL/PostgreSQL (optional for production)**: Relational database for production.
  
### Frontend
- **HTML/CSS/JavaScript**: Basic front-end components.
- **Bootstrap**: For styling and responsive design.
  
### Tools & Build System
- **Maven**: Build automation tool.
- **Java 11+**: Required JDK for running the application.

## Prerequisites

- **JDK 11 or higher** installed on your machine.
- **Maven** for building the project.
- **Spring Boot CLI** (optional) for faster local development.
- **Node.js** (optional) for frontend package management (if needed).
  
## Getting Started

### Clone the Repository

\`\`\`bash
git clone https://github.com/nathija-nimantha/Student-Management-System-SpingBoot-BFF.git
cd student-management
\`\`\`

### Running the Backend

1. Navigate to the `src/main/resources/application.properties` and configure your database settings (optional for production).

2. Build and run the application:

\`\`\`bash
mvn clean install
mvn spring-boot:run
\`\`\`

### Running the Frontend

- The frontend is a basic HTML/JS interface served via Spring Boot. Open `http://localhost:8080` after running the backend server.

### API Endpoints

| Method | Endpoint              | Description                       |
|--------|-----------------------|----------------------------------- |
| GET    | `/get-student`         | Get all students                  |
| GET    | `/get-student/{id}`    | Get a student by ID               |
| POST   | `/add-student`         | Add a new student                 |
| PUT    | `/update-student`      | Update student information        |
| DELETE | `/delete-student/{id}` | Delete a student                  |

## Frontend: Student Management UI

- The student management system includes:
    - A form for adding or updating student details.
    - A table to view all students and perform edit/delete operations.
    - A "Clear" button to reset all input fields in the form.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---
