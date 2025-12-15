# Library API

## 1. Introduction
This is a comprehensive Library API built with Node.js and Express. It provides functionality for managing accounts (readers, librarians, admins) and books (browsing, picking, returning). The system supports different database implementations (MongoDB, SQL) and robust authentication mechanisms.

## 2. Executing

### Outer Libraries
The project relies on the following key libraries:
- **express**: Web framework for Node.js.
- **mongoose**: MongoDB object modeling tool.
- **mysql2**: MySQL client for Node.js.
- **bcryptjs**: Library to hash passwords.
- **jsonwebtoken**: For implementing JWT authentication.
- **dotenv**: Loads environment variables from a `.env` file.
- **joi**: Object schema validation.
- **uuid**: For generating unique identifiers.
- **morgan**: HTTP request logger middleware.

### Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DB=<mongodb_connection_string>
ACCOUNT_DB=<account_db_name>

# SQL Configuration (if using SQL service)
SQL_HOST=<sql_host>
SQL_PORT=<sql_port>
SQL_USER=<sql_user>
SQL_PASSWORD=<sql_password>
SQL_DB_NAME=<sql_db_name>

# Authentication
JWT_SECRET=<your_jwt_secret_key>
OWNER=<supervisor_username>
OWNER_PASS=<supervisor_password>
```

### Running the Application
To start the application:

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Run in development mode:
    ```bash
    npm run dev
    ```
3.  Run in production mode:
    ```bash
    npm start
    ```

## 3. Security
The API implements two types of authentication:

1.  **Basic Authentication**:
    -   Used primarily for the `SUPERVISOR` role (defined by `OWNER` and `OWNER_PASS` in `.env`).
    -   Also supports user login via `username:password` encoding.
2.  **Bearer Token (JWT)**:
    -   Used for most authenticated requests.
    -   The token is obtained via the `/account/login` endpoint.
    -   Payload includes `sub` (userId) and `roles`.

### Roles
-   **SUPERVISOR**: System owner/admin.
-   **ADMIN**: Management role.
-   **LIBRARIAN**: Can manage books.
-   **READER**: Standard user who can pick/return books.

## 4. Endpoints

### Account Endpoints

#### POST /account
Create a new account.
-   **Body**:
    ```json
    {
        "id": 12345,
        "username": "user1",
        "email": "user@example.com",
        "password": "password",
        "birthDate": "2000-01-01"
    }
    ```
-   **Returns**: 201 Created

#### POST /account/login
Login to get a JWT token.
-   **Body**:
    ```json
    {
        "id": 12345,
        "password": "password"
    }
    ```
-   **Returns**: JWT Token (string)

#### GET /account/byId
Get account details.
-   **Parameters**: `id` (query param)
-   **Headers**: Authorization (Bearer Token)
-   **Returns**: Account object

#### PATCH /account/update
Update account information.
-   **Parameters**: `id` (query param)
-   **Body**: `{ "username": "...", "email": "..." }`
-   **Headers**: Authorization (Bearer Token)

#### PATCH /account/password
Change account password.
-   **Body**:
    ```json
    {
        "id": 12345,
        "oldPassword": "oldPass",
        "newPassword": "newPass"
    }
    ```
-   **Headers**: Authorization (Bearer Token)

#### PATCH /account/roles
Add a role to an account (Admin/Owner only).
-   **Parameters**:
    -   `id` (query param): User ID
    -   `role` (query param): Role to add (e.g., "admin", "librarian")
-   **Headers**: Authorization (Bearer Token)

#### DELETE /account
Remove an account.
-   **Parameters**: `id` (query param)

---

### Book Endpoints

#### GET /api/books
Get all books.
-   **Returns**: Array of books.

#### POST /api/books
Add a new book.
-   **Body**:
    ```json
    {
        "isbn": "978-3-16-148410-0",
        "title": "Book Title",
        "author": "Author Name",
        "quantity": 10
    }
    ```
-   **Returns**: Saved book object.

#### GET /api/books/author
Find books by author.
-   **Parameters**: `author` (query param)

#### PATCH /api/books/pick
Pick a book (reduce quantity).
-   **Parameters**: `bookId` (query param)
-   **Body**:
    ```json
    {
        "readerId": 12345,
        "readerName": "user1"
    }
    ```

#### PATCH /api/books/return
Return a book (increase quantity).
-   **Parameters**: `bookId` (query param)

#### DELETE /api/books
Remove a book.
-   **Parameters**: `bookId` (query param)

## 5. FAQ

**Q: How do I become an admin?**
A: Use the `SUPERVISOR` credentials (Basic Auth) to call the `/account/roles` endpoint and assign the 'admin' role to your user ID.

**Q: Which database is used?**
A: The system supports both MongoDB and MySQL. This is configured in `appConfig.ts` and the environment variables.

**Q: What is the format for dates?**
A: Dates (like `birthDate`) should be in `YYYY-MM-DD` format.
