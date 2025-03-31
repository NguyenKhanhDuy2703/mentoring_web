# MENTORING - A Platform Connecting Mentors and Students

## 1. Introduction

### 1.1. Project Description

**MENTORING** is an online platform that connects **Mentors** (experts, lecturers, alumni) with **Students/Mentees** (students or individuals seeking career guidance). The project aims to **support learning, scientific research, skill development**, and **team management**.

### 1.2. Key Features

- **Connect Mentors and Students/Mentees** based on expertise.
- **Q&A Forum System** to support academic discussions and IT research.
- **Resource Sharing & Group Project Management**.
- **Personalized Learning Roadmaps** based on Mentor recommendations.
- **Direct Chat & Communication** between Mentors and Students.

---

## 2. Installation Guide

### 2.1. System Requirements

- **Node.js** >= 22.11.0
- **NPM** >= 10.9.1
- **Database:** MySQL (pre-configured with schema name `mentoringplatform`)

### 2.2. Installation

```sh
# Clone repository
git clone https://github.com/NguyenKhanhDuy2703/mentoring_web.git

# Run the frontend
cd client 
# Install dependencies
npm install 

# Run the backend
cd server 
# Install dependencies
npm install 
```

### 2.3. Running the Project

#### Start the Frontend
```sh
npm run dev
```

#### Setup Database
```sh
# Step 1: Access src/config/configs.js 
# Step 2: Enter your username, password, and host
# Step 3: Run the database migration
npx sequelize-cli db:migrate
```

#### Start the Server
```sh
npm start 
```

---

## 3. Usage & Examples

- **Create an account & log in** to access the platform.
- **Find Mentors/Mentees** by field, project, or skills.
- **Participate in forums** to ask questions and share knowledge.
- **Manage personal projects** with team collaboration tools.

---

## 4. Dependencies

### 4.1. Frontend Dependencies:
- React
- React DOM
- React Router DOM
- TailwindCSS
- Axios
- Framer Motion
- Lucide React
- React Toastify
- Socket.io-client

### 4.2. Backend Dependencies:
- Express.js
- MySQL2
- Sequelize
- Firebase Admin
- JSON Web Token (JWT)
- Cloudinary
- Multer
- Bcrypt
- Socket.io

---

## 5. Support

- **Email:** snguyenkhanhduy270304@gmail.com

---

## 6. References

- [Node.js Documentation](https://nodejs.org/docs/latest/api/)
- [Sequelize Documentation](https://sequelize.org/)
- [React Documentation](https://react.dev/)
- [Socket.io Documentation](https://socket.io/docs/v4/tutorial/introduction)

---

## 7. Changelog

- **v1.0.0:** Initial release with core features.
- **v1.1.0:** UI improvements.
- **v1.2.0:** Authentication updates, added post and question creation features.
- **v1.3.0:** UI optimizations.
- **v1.4.0:** Search functionality for articles by tags.
- **v1.5.0:** Added UI for comments and backend handling.

---

## 8. Known Issues

- Some UI glitches on Safari.
- Search performance may be slow with a high number of users.

---

## 9. Badges

*(Insert project status badges if available)*

