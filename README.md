# 📚 Bookstore REST API

A RESTful API built using **Node.js**, **Express**, **JWT Authentication**, and **file-based JSON persistence**. Users can register/login, and manage a collection of books.

---

## 🚀 Features

- 🔐 JWT-based user authentication
- 📖 CRUD operations for books
- 📁 File-based persistence using JSON
- 🔍 Search books by genre
- 📄 Pagination support
- 🔐 Authorization (only the creator can update/delete their books)

---

## 🛠 Setup Instructions

# Clone the repo
git clone https://github.com/ayush7078/Book-App.git
cd Book-App


# Install dependencies
npm install

# ⚙️ Environment Variables (.env)

Create a `.env` file in the root of the project with the following content:

```env
PORT=3000
JWT_SECRET=your_jwt_secret_here
```

# Start the server
npm start
The server runs at:
📍 http://localhost:3000

# Start Server Automatically
npm run start:dev

The server runs at:
📍 http://localhost:3000


# 🔐 Authentication
All /api/books endpoints are protected and require a JWT token in the header:

Authorization: Bearer <your_token>
You can obtain a token by logging in through the /api/auth/login endpoint.

📘 API Endpoints
🧍 User Endpoints
- POST /api/auth/register
Register a new user.

Request Body:
{
  "name" : "user"
  "email": "user@example.com",
  "password": "password123"
}

Response:
{ "message": "User registered" }

- POST /api/auth/login
Authenticate a user and get a JWT token.

Request Body:
{
  "email": "user@example.com",
  "password": "password123"
}
Response:
{
  "token": ""
}

📚 Book Endpoints (JWT Token Required)
- GET /api/books
Get all books (supports pagination).

Query Parameters (optional):

page — Page number (e.g. 1)

limit — Items per page (e.g. 10)

Example:
- GET /api/books?page=1&limit=5
Response:
[
  {
    "id": "uuid",
    "title": "Book Title",
    "author": "Author Name",
    "genre": "Fiction",
    "publishedYear": 2024,
    "userId": "user_id"
  }
]

- GET /api/books/search?genre=Fiction
Filter books by genre.

- GET /api/books/:id
Fetch a book by its ID.

Example:
- GET /api/books/8af7a5ff-0735-4f33-8ef3-5b517a7b879d
POST /api/books
Add a new book (authenticated user only).

Request Body:
{
  "title": "New Book",
  "author": "Jane Doe",
  "genre": "Drama",
  "publishedYear": 2022
}
Response:
{
  "id": "uuid",
  "title": "New Book",
  "author": "Jane Doe",
  "genre": "Drama",
  "publishedYear": 2022,
}

- PUT /api/books/:id
Update a book (only by the creator).

Request Body (partial or full update):
{
  "title": "Updated Book Title"
}

Response:
{
  "id": "uuid",
  "title": "Updated Book Title",
  "author": "Jane Doe",
  "genre": "Drama",
  "publishedYear": 2022,
}

- DELETE /api/books/:id
Delete a book (only by the creator).

Response:
204 No Content

🧪 Example Requests with curl
# ✅ Register a user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name" : "Test", "email":"test@example.com", "password":"123456"}'

# ✅ Login and save the token
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com", "password":"123456"}'

# ✅ Get all books
curl -X GET http://localhost:3000/api/books \
  -H "Authorization: Bearer YOUR_TOKEN"

# ✅ Search books by genre
curl -X GET "http://localhost:3000/api/books/search?genre=Fantasy" \
  -H "Authorization: Bearer YOUR_TOKEN"

# ✅ Get a specific book by ID
curl -X GET http://localhost:3000/api/books/YOUR_BOOK_ID \
  -H "Authorization: Bearer YOUR_TOKEN"

# ✅ Create a new book
curl -X POST http://localhost:3000/api/books \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"1984","author":"George Orwell","genre":"Dystopian","publishedYear":1949}'

# ✅ Update a book by ID
curl -X PUT http://localhost:3000/api/books/YOUR_BOOK_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Animal Farm"}'

# ✅ Delete a book by ID
curl -X DELETE http://localhost:3000/api/books/YOUR_BOOK_ID \
  -H "Authorization: Bearer YOUR_TOKEN"

📁 File Storage
Data is saved locally in the data/ folder:

users.json — Stores registered users with hashed passwords.

books.json — Stores books linked to their creator (user ID).

## Postman Collection
Test the API easily using the Postman collection:
🔗 Click to open (https://crimson-moon-379311.postman.co/workspace/My-Workspace~14a2cc56-3460-40ce-83f3-e536c204e051/collection/18965910-535711e0-6644-4bd4-ad69-e2103bb78d7f?action=share&source=copy-link&creator=18965910)

Or It will contain the bookstore-api.postman_collection.json file also.

🔧 Predefined Postman Variables
Variable	Value Example
URL	http://localhost:3000
authToken	Your JWT token (after login)

👉 Set authToken after logging in to access protected routes.