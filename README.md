#  Storage Management System Backend

A secure and feature-riched file storage backend built using **Node.js**, **Express**, and **MongoDB**, supporting user authentication, file operations, secure folders, user profile management, and detailed file summaries.

---

## LIve API link

```bash
https://storage-management-system-backend.onrender.com
```

---

##  Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (Mongoose ODM)
- **JWT Authentication**
- **Zod** (for input validation)
- **Multer** (for file uploads)
- **bcryptjs** (for password hashing)
- **dotenv**
- **cors**

---

##  Folder Structure

```
src/
|__ Controllers/
|__ Middlewares/
|__ Models/
|__ Routes/
|__ uploads/
|__ app.js
server.js
.env
```

---

##  Features

- ✅ User registration & login (JWT-based)
- ✅ Upload notes, PDFs, and images
- ✅ Rename, delete, share files
- ✅ View summary reports by file type
- ✅ Date-wise file filtering
- ✅ Secure folder management
- ✅ Profile update, security password
- ✅ Delete account
- ✅ Token verification middleware
- ✅ Public/private file access

---

##  Authentication Routes

| Method | Endpoint                        | Description                      |
|--------|----------------------------------|----------------------------------|
| POST   | `/api/auth/register`            | Register a new user              |
| POST   | `/api/auth/login`               | Login and receive JWT token      |
| POST   | `/api/auth/forgot-password`     | Request password reset link      |
| POST   | `/api/auth/reset-password`      | Reset password using token       |

---

##  Folder Routes

| Method | Endpoint                             | Description                   |
|--------|--------------------------------------|-------------------------------|
| POST   | `/api/folders`                       | Create a new folder           |
| PATCH  | `/api/folders/:id/secure`            | Mark a folder as secure       |

---

##  Secure Folder Routes

| Method | Endpoint                             | Description                             |
|--------|--------------------------------------|-----------------------------------------|
| PATCH  | `/api/profile/security-password`     | Set or update security password         |
| GET    | `/api/secure-folder/secure`          | Access secure folder using password     |

---

##  Api Endpoints

| Method | Endpoint                                         | Description                            |
|--------|--------------------------------------------------|----------------------------------------|
| POST   | `/api/files`                                     | Upload an image file                   |
| POST   | `/api/files`                                     | Upload a note file                     |
| POST   | `/api/files`                                     | Upload a PDF file                      |
| PATCH  | `/api/files/:id/rename`                          | Rename a file                          |
| PATCH  | `/api/files/:id/favourite`                       | Mark file as favourite                 |
| PATCH  | `/api/files/:id/copy`                            | Duplicate/copy a file                  |
| DELETE | `/api/files/:id`                                 | Delete a file                          |
| GET    | `/api/files/recent`                              | Get recently uploaded files            |
| GET    | `/api/summary/files-by-date?date=YYYY-MM-DD`     | Get files uploaded on a specific date  |

---

##  File Categories

| Method | Endpoint             | Description                    |
|--------|----------------------|--------------------------------|
| GET    | `/api/files/notes`   | Get all uploaded note files    |
| GET    | `/api/files/pdfs`    | Get all uploaded PDF files     |
| GET    | `/api/files/images`  | Get all uploaded image files   |

---

##  File Summary Routes

| Method | Endpoint                        | Description                            |
|--------|----------------------------------|----------------------------------------|
| GET    | `/api/summary/notes-summary`     | Note files count and total size        |
| GET    | `/api/summary/pdf-summary`       | PDF files count and total size         |
| GET    | `/api/summary/images-summary`    | Image files count and total size       |
| GET    | `/api/summary/overall-summary`   | Total storage used and remaining       |

---

##  Profile Routes

| Method | Endpoint                          | Description                  |
|--------|------------------------------------|------------------------------|
| GET    | `/api/profile/me`                 | Get current user profile     |
| PATCH  | `/api/profile/update`             | Update profile info          |
| DELETE | `/api/profile/delete-account`     | Delete user account          |

---

##  Environment Variables

Create a `.env` file in your root directory and add the following:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
---

## API Testing with Postman

```bash
Set the Authorization header:
Bearer <your_token>
Upload files using form-data with fields:
type: one of this note, pdf, image
```

---

## Running the Server

```bash
npm install
npm run dev
Server runs on http://localhost:5000
```


