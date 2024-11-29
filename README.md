
# To-Do Application

This repository hosts a simple To-Do application with a **React Native (TypeScript)** front end and a **Spring Boot** back end. The application manages tasks with features like priority, due dates, and status tracking.
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
- [💡 Contribution Guidelines](#-contribution-guidelines)
- [📜 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)

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

### Task Management
- **Create a Task:**  
  `POST /api/tasks`  
  **Body:** JSON with task details.  

- **Get All Tasks:**  
  `GET /api/tasks`  

- **Get Task by ID:**  
  `GET /api/tasks/{taskId}`  

- **Update a Task:**  
  `PUT /api/tasks/{taskId}`  
  **Body:** JSON with updated task details.  

- **Delete a Task:**  
  `DELETE /api/tasks/{taskId}`  

- **Toggle Task Status:**  
  `PUT /api/tasks/toggle/{taskId}`  

### Filtering and Statistics
- **Filter Tasks:**  
  `GET /api/tasks/filter`  
  **Query Parameters:**  
  - `searchText` (optional): Filter by text.  
  - `dueDate` (optional): Filter by due date.  
  - `status` (optional): Filter by status (`completed`/`pending`).  
  - `priority` (optional): Filter by priority (`Low`, `Medium`, `High`).  

- **Get Average Time to Complete All Tasks:**  
  `GET /api/tasks/average`  

- **Get Average Time to Complete Tasks by Priority:**  
  `GET /api/tasks/average/{priority}`  

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

[WIP]

---

## 📄 Documentation Links
- [Feedback Document](https://encoradigital.sharepoint.com/:w:/s/spark2024f-mx2/EVMxhTGaS7VDh7cT2NYKnfcBJ4mGykxFw1WVIRguqpG6JQ?e=lyq5ZA)  
- [Tech Log](#) 
- [Presentation](https://www.canva.com/design/DAGXztibgns/Y0GJxCTR1crYDj4Wpo08OQ/edit?utm_content=DAGXztibgns&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton) 

---

## 🩹 Features To Be Implemented
- [ ] Front and back end tests.
- [ ] Finalize the front-end design.
- [ ] Fix back-end bugs.
- [ ] Change back-end port.
- [ ] Restructure front-end for better scalability.
- [ ] (Optional) Add Swagger documentation.

---
