# 📦 Storage Management System Backend

A secure and feature-rich file storage backend built using **Node.js**, **Express**, and **MongoDB**, supporting user authentication, file operations, secure folders, user profile management, and detailed file summaries.

---

## 🚀 Tech Stack

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
│ └── authMiddleware.js
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

yaml
Copy
Edit

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

## 🔐 Authentication Routes

| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| POST   | `/api/auth/register`  | Register a new user          |
| POST   | `/api/auth/login`     | Login and receive JWT        |

---

## 📄 File Routes

| Method | Endpoint                 | Description                         |
|--------|--------------------------|-------------------------------------|
| POST   | `/api/files/upload`      | Upload a file (note/pdf/image)      |
| GET    | `/api/files/:id`         | Get single file by ID               |
| PATCH  | `/api/files/rename/:id`  | Rename a file                       |
| DELETE | `/api/files/delete/:id`  | Delete a file                       |
| GET    | `/api/files/by-date?date=YYYY-MM-DD` | Get files uploaded on a specific date |

---

## 📁 Folder Routes

| Method | Endpoint                 | Description                 |
|--------|--------------------------|-----------------------------|
| POST   | `/api/folders/create`    | Create a new folder         |
| GET    | `/api/folders`           | Get all folders             |
| PATCH  | `/api/folders/rename/:id`| Rename a folder             |
| DELETE | `/api/folders/:id`       | Delete a folder             |

---

## 🔐 Secure Folder Routes

| Method | Endpoint                            | Description                          |
|--------|-------------------------------------|--------------------------------------|
| POST   | `/api/secure-folder/create`         | Create a password-protected folder   |
| GET    | `/api/secure-folder/unlock/:id`     | Access secure folder with password   |

---

## 📊 File Summary Routes

| Method | Endpoint                        | Description                                  |
|--------|----------------------------------|----------------------------------------------|
| GET    | `/api/summary/notes-summary`     | Get note files count and total size          |
| GET    | `/api/summary/pdf-summary`       | Get PDF files count and total size           |
| GET    | `/api/summary/images-summary`    | Get image files count and total size         |
| GET    | `/api/summary/overall-summary`   | Get total storage used and remaining         |

---

## 👤 Profile Routes

| Method | Endpoint                                | Description                          |
|--------|------------------------------------------|--------------------------------------|
| GET    | `/api/profile/me`                        | Get current user profile             |
| PATCH  | `/api/profile/update`                    | Update profile info                  |
| PATCH  | `/api/profile/security-password`         | Set/update security password         |
| DELETE | `/api/profile/delete-account`            | Delete user account                  |

---

## 📌 Environment Variables

Create a `.env` file at the root and add:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
🧪 API Testing with Postman
Set the Authorization header:

php-template
Copy
Edit
Bearer <your_token>
Upload files using form-data with fields:

file: (the file)

type: one of note, pdf, image

🚦 Running the Server
bash
Copy
Edit
npm install
npm run dev
Server runs on http://localhost:5000

📝 License
This project is for learning and demo purposes only. All rights reserved by the author.

