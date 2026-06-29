# Vendor Quotations System

A full-stack **Vendor Quotations System** built with **Laravel REST API** for the backend and **HTML, CSS, Bootstrap, and JavaScript** for the frontend. The application helps manage vendors and their quotations through a secure authentication system and an easy-to-use dashboard.

---

## 📌 Project Overview

The Vendor Quotations System is designed to simplify vendor and quotation management. It provides a secure platform where users can authenticate, manage vendors, create quotations, track quotation statuses, and monitor recent activities through a dashboard.

The project follows a **separate frontend and backend architecture**, where the frontend communicates with the Laravel backend through REST APIs.

---

## 🚀 Features

### 🔐 Authentication

- User Login
- Secure Authentication using Laravel Sanctum
- Protected API Routes
- Logout Functionality

### 📊 Dashboard

- Dashboard Statistics
- Total Vendors
- Active Quotations
- Pending Quotations
- Approved Quotations
- Recent Activities

### 👥 Vendor Management

- Add New Vendor
- View Vendor List
- Update Vendor Information
- Delete Vendor
- Form Validation

### 📝 Quotation Management

- Create New Quotation
- View All Quotations
- View Quotation Details
- Edit Quotations
- Delete Quotations

### 📌 Quotation Status

- Pending
- Active
- Approved

### 🔄 REST API

- Clean RESTful API Architecture
- JSON Responses
- API Authentication using Sanctum
- CRUD Operations

---

# 🛠️ Tech Stack

## Frontend

- HTML5
- CSS3
- Bootstrap 5
- JavaScript (ES6)
- Axios

## Backend

- Laravel
- Laravel Sanctum
- REST API

## Database

- MySQL

---

# 📂 Project Structure

```
Vendor-Quotations-System
│
├── frontend/
│   ├── HTML
│   ├── CSS
│   ├── Bootstrap
│   ├── JavaScript
│   └── Axios API Calls
│
└── backend/
    ├── Laravel
    ├── Controllers
    ├── Models
    ├── Routes
    ├── Middleware
    └── REST API
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/your-username/vendor-quotations-system.git
```

---

## Backend Setup

Navigate to backend folder

```bash
cd backend
```

Install dependencies

```bash
composer install
```

Copy environment file

```bash
cp .env.example .env
```

Generate application key

```bash
php artisan key:generate
```

Configure your MySQL database in the `.env` file.

Run migrations

```bash
php artisan migrate
```

Start the Laravel server

```bash
php artisan serve
```

Backend will run on:

```
http://localhost:8000
```

---

## Frontend Setup

Navigate to frontend folder

```bash
cd frontend
```

Open the project using your preferred local server (such as XAMPP, Laragon, or VS Code Live Server).

Make sure the Laravel backend is running before using the frontend.

---

# 🔑 Authentication

This project uses **Laravel Sanctum** for API authentication.

After successful login, the authentication token is stored on the client side and sent with every protected API request using the Authorization header.

Example:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

# 📡 API Features

- User Authentication
- Vendor CRUD
- Quotation CRUD
- Dashboard Statistics
- Protected Routes
- JSON Responses

---

# 📊 Dashboard Statistics

The dashboard displays:

- Total Vendors
- Active Quotations
- Pending Quotations
- Approved Quotations

---

# 🗄️ Database

Database used:

- MySQL

Main Tables:

- users
- vendors
- quotations

---

# 🎯 Project Objectives

- Manage Vendors
- Manage Quotations
- Track Quotation Status
- Secure API Authentication
- Practice REST API Development
- Separate Frontend & Backend Architecture

---

# 🔒 Security

- Laravel Sanctum Authentication
- Protected API Routes
- Request Validation
- Authentication Middleware
- Secure Token-Based Access

---

# 🚀 Future Improvements

- Search & Filtering
- Pagination
- Email Notifications
- PDF Quotation Export
- Role-Based Access Control (Admin/User)
- Reports & Analytics
- File Upload Support

---

# 👨‍💻 Author

**Abdul Rafay**

GitHub:
https://github.com/AbdulRafay901

---

# 📄 License

This project is open-source and available for learning and educational purposes.

---

## ⭐ If you found this project helpful, consider giving it a Star on GitHub.
