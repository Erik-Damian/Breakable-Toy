
# To-Do Application

This repository hosts a simple To-Do application with a **React (TypeScript)** front end and a **Spring Boot** back end. The application manages tasks with features like priority, due dates, and status tracking.
---
## 📜 Table of Contents

- [📂 Project Structure](#-project-structure)
- [📋 Task Model (Back-End)](#-task-model-back-end)
- [🚀 Getting Started](#-getting-started)
  - [Front-End](#front-end)
  - [Back-End](#back-end)
- [📡 API Endpoints](#-api-endpoints)
  - [Task Management](#task-management)
  - [Filtering and Statistics](#filtering-and-statistics)
- [🔧 Tests](#-tests)
- [📄 Documentation Links](#-documentation-links)
- [🩹 Features To Be Implemented](#-features-to-be-implemented)

---

## 📂 Project Structure
- **Front-End:** Located in `/front-end/to-do-front`
  - **Framework:** React Native (TypeScript)
  - **State Management:** Redux
  - **API Calls:** Axios
- **Back-End:** Located in `/back-end/BreakableToy`
  - **Framework:** Spring Boot
  - **Build Tool:** Maven
  - **Data Handling:** Java Collection managed via Service Layer.
---

## 🚀 Getting Started

### Front-End
1. Navigate to `/front-end/to-do-front`:
   ```bash
   cd front-end/to-do-front
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run start
   ```
4. Access the front end at [http://localhost:3000](http://localhost:3000).

### Back-End
1. Navigate to `/back-end/BreakableToy`:
   ```bash
   cd back-end/BreakableToy
   ```
2. Run the application:
   ```bash
   mvn spring-boot:run
   ```
3. The API server will be available at [http://localhost:8080](http://localhost:8080).

---
## 📡 API Endpoints

### Task Endpoints

- **Create a new task**
    ```
   POST /api/tasks
    ```
- **Get all tasks**
    ```
    GET /api/tasks
    ```
- **Get a task by ID**
    ```
    PUT /api/tasks/{taskId}
    ```
- **Update a task by ID**
    ```
    DELETE /api/tasks/{taskId}
    ```
- **Toggle task completion status by ID**
    ```
    PUT /api/tasks/toggle/{taskId}
    ```
### Task Stats Endpoints

- **Get average time to complete tasks**
    ```
    GET /api/tasks/stats/average
    ```
- **Get average time to complete tasks by priority**
    ```
    GET /api/tasks/stats/average/{priority}
    ```
- **Get total count of tasks**
    ```
    GET /api/tasks/stats/count
    ```
- **Get count of tasks by priority**
    ```  
    GET /api/tasks/stats/count/priority/{priority}
    ```
    

---

## 📋 Task Model (Back-End)
Each task is represented by the following attributes:
- `id`: Auto-incrementing numerical ID.
- `description`: Text (max 120 characters).
- `completed`: Boolean to reflect task status.
- `createdDate`: Auto-generated date when the task is created.
- `dueDate`: User-inputted due date.
- `completedDate`: Date auto-generated when a task is marked as completed.
- `priority`: Priority level (`Low`, `Medium`, `High`).

---

## 🔧 Tests

### Front-End Tests

We have implemented unit tests for various components using Jest and React Testing Library. These tests ensure that the components render correctly and handle user interactions as expected.

#### Components Tested:
- `TaskTable`
- `TableErrorMessage`
- `StatsTab`

#### Running Front-End Tests

To run the front-end tests, follow these steps:

1. Navigate to the front-end project directory:
   ```bash
   cd ./front-end/to-do-front
  ```

2. Install the dependencies if you haven't already:
  ```bash
  npm install
  ```

3. Run the tests:
  ```bash
  npm test
   ```

This will launch the test runner in interactive watch mode, allowing you to see the test results and any errors.

### Running Back-End Tests
To run the back-end tests, follow these steps:

#### Running Back-End Tests
To run the back-end tests, follow these steps:

1. Navigate to the back-end project directory:
  ```bash
  cd ./back-end/BreakableToy
  ```

2. Run the tests:
  ```bash
  mvn test
  ```

This will execute the unit tests and provide a summary of the test results.

---

## 📄 Documentation Links
- [Feedback Document](https://encoradigital.sharepoint.com/:w:/s/spark2024f-mx2/EVMxhTGaS7VDh7cT2NYKnfcBJ4mGykxFw1WVIRguqpG6JQ?e=lyq5ZA)  
- [Tech Log](#) 
- [Presentation](https://www.canva.com/design/DAGXztibgns/Y0GJxCTR1crYDj4Wpo08OQ/edit?utm_content=DAGXztibgns&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton) 

