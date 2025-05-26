# 📦 Storage Management System Backend

A secure and feature-rich file storage backend built using **Node.js**, **Express**, and **MongoDB**, supporting user authentication, file operations, secure folders, user profile management, and detailed file summaries.

---

## 🛠 Tech Stack

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

## 📁 Folder Structure

src/
├── Controllers/
│ ├── authController.js
│ ├── fileController.js
│ ├── folderController.js
│ ├── profileController.js
│ ├── secureFolderController.js
│ └── getFileSummary.js
├── Middlewares/
│ ├── authMiddleware.js
│ ├── uploadMiddleWare.js
│ └── verifySecureAccess.js
├── Models/
│ ├── User.js
│ ├── File.js
│ └── Folder.js
├── Routes/
│ ├── authRoutes.js
│ ├── fileRoutes.js
│ ├── folderRoutes.js
│ ├── profileRoutes.js
│ ├── secureFolderRoutes.js
│ └── summaryRoutes.js
├── uploads/
├── app.js
└── server.js


---

## 🧠 Features

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
| POST   | `/api/folders/create`                | Create a new folder           |
| PATCH  | `/api/folders/rename/:id`            | Rename a folder               |
| DELETE | `/api/folders/:id`                   | Delete a folder               |
| PATCH  | `/api/folders/set-secure/:id`        | Mark a folder as secure       |

---

##  Secure Folder Routes

| Method | Endpoint                             | Description                             |
|--------|--------------------------------------|-----------------------------------------|
| POST   | `/api/secure-folder/create`          | Create a password-protected folder      |
| PATCH  | `/api/profile/security-password`     | Set or update security password         |
| GET    | `/api/secure-folder/unlock/:id`      | Access secure folder using password     |

---

##  File Routes

| Method | Endpoint                                | Description                            |
|--------|------------------------------------------|----------------------------------------|
| POST   | `/api/files/upload/image`               | Upload an image file                   |
| POST   | `/api/files/upload/note`                | Upload a note file                     |
| POST   | `/api/files/upload/pdf`                 | Upload a PDF file                      |
| PATCH  | `/api/files/rename/:id`                 | Rename a file                          |
| PATCH  | `/api/files/favourite/:id`              | Mark file as favourite                 |
| PATCH  | `/api/files/copy/:id`                   | Duplicate/copy a file                  |
| DELETE | `/api/files/delete/:id`                 | Delete a file                          |
| GET    | `/api/files/recent`                     | Get recently uploaded files            |
| GET    | `/api/files/by-date?date=YYYY-MM-DD`    | Get files uploaded on a specific date  |

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

Create a `.env` file in your root directory:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

---

## API Testing with Postman

Set the Authorization header:
Bearer <your_token>
Upload files using form-data with fields:
type: one of note, pdf, image

---

## Running the Server

npm install
npm run dev
Server runs on http://localhost:5000


