# 🏥 Doctor Appointment Booking System https://medi-connect-doc.vercel.app

A full-stack **Doctor Appointment Booking Platform** where users can book appointments with doctors, doctors can manage schedules and appointments, and admins control the platform.

Built using the **MERN Stack** with secure authentication, role-based access, and real-world business logic.

---

## 🚀 Features

### 👤 User
- User registration & login (JWT authentication)
- Browse doctors by speciality
- Book appointment slots
- View appointment status (Active / Fulfilled / Cancelled)
- Secure payment tracking

### 👨‍⚕️ Doctor
- Doctor authentication & protected routes
- Doctor dashboard with statistics
- View and manage appointments
- Appointment status tracking (Paid / Unpaid, Active / Fulfilled)
- Edit profile details (fees, availability, address, image)
- Cloudinary image upload

### 🛠️ Admin
- Admin authentication
- Manage doctors
- View all appointments
- Monitor payments and appointment statuses

---

## 🧱 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- Context API
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Bcrypt.js
- Multer
- Cloudinary

---

## 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based access control:
  - User
  - Doctor
  - Admin
- Axios interceptors for auto token attachment
- Secure protected backend routes using middleware

---

## 📁 Project Structure
```
Appointment-Booking/
│
├── admin/                     # Admin panel (Vite + React)
│   ├── public/
│   ├── src/
│   │   ├── components/        # Admin UI components
│   │   ├── pages/             # Admin pages (Dashboard, Doctors, Appointments)
│   │   ├── context/           # Admin authentication context
│   │   └── api/               # Axios services
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/                   # Backend (Node.js + Express)
│   ├── config/                # DB & Cloudinary configuration
│   ├── controllers/           # Request handlers (User, Doctor, Admin)
│   ├── middleware/            # Auth middleware (JWT)
│   ├── models/                # Mongoose schemas
│   ├── routes/                # API routes
│   ├── service/               # Utility services
│   ├── .env
│   ├── server.js              # Backend entry point
│   └── package.json
│
├── frontend/                  # User-facing app (Vite + React)
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # User pages (Login, Profile, Appointments)
│   │   ├── context/           # User & Doctor auth context
│   │   └── api/               # Axios instances
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## ☁️ Image Upload (Cloudinary)

- Image upload handled using **Multer**
- Images stored on **Cloudinary**
- Secure image URLs saved in MongoDB

---

## ⚙️ Environment Variables

Create a `.env` file in the backend:

```env
# database connectivity
MONGO_URI=""
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=


# razorpay credentials public api
RAZORPAY_TEST_API_KEY=
RAZORPAY_TEST_KEY_SECRET=
CURRENCY=INR

# frontend-url
CLIENT_URL=https://medi-connect-doc.vercel.app

```
## Backend
-cd backend
-npm install
-npm run dev

## Frontend
-cd frontend
-npm install
-npm run dev
