---

# 📇 Contact Manager

A RESTful API built with Node.js, Express, MongoDB, and Mongoose, featuring user authentication (JWT) and CRUD operations for contacts tied to each user.

---

## 🧱 Features

* **User authentication**

  * Register with username, email & hashed password
  * Login with JWT (short-lived access token)
  * Protected routes for current user and managing contacts

* **Contacts CRUD**

  * Create, Read, Update, Delete contacts
  * Each contact is associated with the authenticated user
  * Authorization ensures users only interact with their own contacts

* **Error handling middleware**

  * Unified error responses with customizable status codes and messages

---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/caped-crusader21/contact-manager.git
cd contact-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root with at least:

```
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret
PORT=5001
```

### 4. Start the server

```bash
npm run dev
```

---

## 🔧 API Overview

### **Auth Endpoints**

* **POST** `/api/users/register`
  Register a new user
  **Body:**

  ```json
  {
    "userName": "Ayush",
    "email": "ayush@example.com",
    "password": "yourpassword"
  }
  ```

  **Response:**

  ```json
  {
    "_id": "123abc",
    "email": "ayush@example.com"
  }
  ```

* **POST** `/api/users/login`
  Authenticate a user
  **Body:**

  ```json
  {
    "email": "ayush@example.com",
    "password": "yourpassword"
  }
  ```

  **Response:**

  ```json
  {
    "acessToken": "JWT_TOKEN_HERE"
  }
  ```

* **GET** `/api/users/current`
  Fetch current user's info.
  **Header:**

  ```
  Authorization: Bearer <JWT_TOKEN_HERE>
  ```

---

### **Contacts Endpoints** *(All require valid JWT)*

#### GET `/api/contacts/`

List all your contacts

#### GET `/api/contacts/:id`

Get a specific contact by ID (only if yours)

#### POST `/api/contacts/`

Create a new contact
**Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890"
}
```

#### PUT `/api/contacts/:id`

Update your contact (name/email/phone)

#### DELETE `/api/contacts/:id`

Delete your contact

---

## 📚 Technical Overview

* **Express** sets up routing and middleware
* **Mongoose** defines schemas:

  * `User` – username, unique email, hashed password + timestamps
  * `Contact` – name, email, phone, `user_id` reference, timestamps
* **bcrypt** hashes passwords securely
* **jsonwebtoken** issues and verifies short-lived JWTs
* **async-handler** for centralized `async/await` error handling
* **validateTokenHandler** middleware:

  * Extracts and verifies JWTs from `Authorization` headers
  * Attaches `request.user` for downstream handlers

---

## ✅ Development To-Dos

* [ ] Implement **logout** / token revocation
* [ ] Use **refresh tokens** for longer sessions
* [ ] Add **Joi/express-validator** for request validation
* [ ] Improve **error messages/types** in middleware
* [ ] Expand **test coverage** (e.g., Jest + Supertest)
* [ ] Add API docs with **Swagger** or **Postman collection**

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).

---
