# Expense Tracker REST API

A beginner-friendly, robust **Expense Tracker REST API** built with **Node.js**, **Express.js**, **MongoDB Atlas**, and **Mongoose**.

Developed for college backend development evaluation and practical viva demonstration.

---

## 1. Technology Stack

- **Node.js**: JavaScript runtime environment for executing server-side code.
- **Express.js**: Fast, unopinionated, minimalist web framework for building RESTful APIs.
- **MongoDB Atlas**: Cloud-hosted NoSQL database cluster.
- **Mongoose**: Object Data Modeling (ODM) library providing schema validation and data modeling.
- **dotenv**: Environment variable management to keep sensitive credentials secure.
- **Postman**: API development and testing tool.
- **Git & GitHub**: Distributed version control and public repository hosting.

---

## 2. Project Architecture & Folder Structure

The project follows a clean **MVC (Model-View-Controller)** pattern for separation of concerns:

```text
expense-tracker-api/
│
├── config/
│   └── db.js                 # MongoDB Atlas connection logic using Mongoose
│
├── models/
│   └── expenseModel.js       # Mongoose Schema & validation for Expenses
│
├── controllers/
│   └── expenseController.js  # Business logic & request handling for CRUD operations
│
├── routes/
│   └── expenseRoutes.js      # Endpoint URL definitions mapped to controllers
│
├── .env                      # Environment variables (excluded from Git)
├── .env.example              # Sample environment variable template
├── .gitignore                # Specifies files and directories untracked by Git
├── package.json              # Project manifest, dependencies, and scripts
├── server.js                 # Application entry point & Express server bootstrap
└── README.md                 # Complete project documentation
```

---

## 3. Database Schema

Each expense document adheres to the following Mongoose schema:

| Field | Type | Required | Constraints / Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `title` | String | Yes | Trimmed | Title or description of the expense |
| `amount` | Number | Yes | Min: `0.01` (must be > 0) | Amount spent |
| `category` | String | Yes | Trimmed | Category (e.g., Food, Travel, Books) |
| `paymentMethod` | String | Yes | Trimmed | Payment mode (e.g., UPI, Cash, Card) |
| `date` | Date | No | Default: Current Date (`Date.now`) | Date of expense |
| `notes` | String | No | Default: `""`, Trimmed | Optional notes |
| `createdAt` | Date | Auto | Timestamps enabled | Document creation timestamp |
| `updatedAt` | Date | Auto | Timestamps enabled | Last update timestamp |

---

## 4. API Endpoints

Base URL: `http://localhost:5000/api/expenses`

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/expenses` | Create a new expense | `201 Created` |
| `GET` | `/api/expenses` | Retrieve all expenses (newest first) | `200 OK` |
| `GET` | `/api/expenses/:id` | Retrieve a single expense by MongoDB ID | `200 OK` |
| `PUT` | `/api/expenses/:id` | Update an existing expense by ID | `200 OK` |
| `DELETE` | `/api/expenses/:id` | Delete an expense by ID | `200 OK` |

---

## 5. API Testing Examples

### 1. Create Expense
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/expenses`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "title": "Lunch at college",
  "amount": 250,
  "category": "Food",
  "paymentMethod": "UPI",
  "date": "2026-11-02",
  "notes": "Lunch with friends"
}
```
- **Response (`201 Created`):**
```json
{
  "success": true,
  "message": "Expense created successfully",
  "data": {
    "_id": "6726245a4982c76e93ad1a01",
    "title": "Lunch at college",
    "amount": 250,
    "category": "Food",
    "paymentMethod": "UPI",
    "date": "2026-11-02T00:00:00.000Z",
    "notes": "Lunch with friends",
    "createdAt": "2026-11-02T12:00:00.000Z",
    "updatedAt": "2026-11-02T12:00:00.000Z"
  }
}
```

---

### 2. Get All Expenses
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/expenses`
- **Response (`200 OK`):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "6726245a4982c76e93ad1a01",
      "title": "Lunch at college",
      "amount": 250,
      "category": "Food",
      "paymentMethod": "UPI",
      "date": "2026-11-02T00:00:00.000Z",
      "notes": "Lunch with friends",
      "createdAt": "2026-11-02T12:00:00.000Z",
      "updatedAt": "2026-11-02T12:00:00.000Z"
    }
  ]
}
```

---

### 3. Get Expense by ID
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/expenses/6726245a4982c76e93ad1a01`
- **Response (`200 OK`):**
```json
{
  "success": true,
  "data": {
    "_id": "6726245a4982c76e93ad1a01",
    "title": "Lunch at college",
    "amount": 250,
    "category": "Food",
    "paymentMethod": "UPI",
    "date": "2026-11-02T00:00:00.000Z",
    "notes": "Lunch with friends"
  }
}
```

---

### 4. Update Expense
- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/expenses/6726245a4982c76e93ad1a01`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "amount": 300,
  "notes": "Lunch with friends and dessert"
}
```
- **Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Expense updated successfully",
  "data": {
    "_id": "6726245a4982c76e93ad1a01",
    "title": "Lunch at college",
    "amount": 300,
    "category": "Food",
    "paymentMethod": "UPI",
    "date": "2026-11-02T00:00:00.000Z",
    "notes": "Lunch with friends and dessert",
    "updatedAt": "2026-11-02T12:05:00.000Z"
  }
}
```

---

### 5. Delete Expense
- **Method:** `DELETE`
- **URL:** `http://localhost:5000/api/expenses/6726245a4982c76e93ad1a01`
- **Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Expense deleted successfully",
  "data": {}
}
```

---

## 6. Error Handling & HTTP Status Codes

The API implements defensive error handling:

| Scenario | HTTP Status | Example Response |
| :--- | :--- | :--- |
| Missing required fields | `400 Bad Request` | `{"success": false, "message": "Please provide all required fields: title, amount, category, paymentMethod"}` |
| Amount $\le 0$ | `400 Bad Request` | `{"success": false, "message": "Amount must be greater than zero"}` |
| Malformed ID (e.g. `123`) | `400 Bad Request` | `{"success": false, "message": "Invalid expense ID format"}` |
| Expense not found | `404 Not Found` | `{"success": false, "message": "Expense not found with id: ..."}` |
| Undefined endpoint | `404 Not Found` | `{"success": false, "message": "Route not found"}` |
| Server / DB error | `500 Internal Server Error` | `{"success": false, "message": "Server error while ...", "error": "..."}` |

---

## 7. Setup & Installation Guide

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB Atlas account

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/expense-tracker-api.git
cd expense-tracker-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/expense_tracker?retryWrites=true&w=majority
```

### 4. Start the server
- **Production mode:**
  ```bash
  npm start
  ```
- **Development mode (with auto-reload):**
  ```bash
  npm run dev
  ```

---

## 8. College Viva / Practical Evaluation Q&A

1. **Why use Express middleware like `express.json()`?**
   By default, Node.js receives HTTP request bodies as raw data streams. `express.json()` parses incoming payloads with JSON Content-Type and populates `req.body` with JavaScript objects.

2. **Why use Mongoose rather than the native MongoDB driver?**
   Mongoose provides schema validation, type casting, default values, and lifecycle hooks at the application level, ensuring data consistency in an otherwise schema-less database.

3. **What is the difference between `PUT` and `POST`?**
   - `POST` creates a new resource and is typically non-idempotent.
   - `PUT` updates an existing resource identified by a specific ID and is idempotent.

4. **Why are environment variables used instead of hardcoding credentials?**
   Hardcoding credentials in source code creates severe security vulnerabilities if the code is published to GitHub. Using `.env` keeps passwords on the local machine and out of version control.
