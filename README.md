# CampusHire 🎓💼

CampusHire is a **modern job portal** designed for **students and freshers** to explore, apply, and manage job opportunities. Employers can post jobs and review candidates. The application is built using **React (Vite) + TypeScript + Tailwind CSS**, and it simulates a backend using **localStorage**.

---

## 🚀 Features

### 👥 Authentication & Roles
- Register & Login (Role-based: `Job Seeker` or `Employer`)
- Logout & Session tracking
- Profile management (Resume, Skills, Experience, Company Info)

### 🧑‍💻 Job Seeker Capabilities
- Browse job listings
- Filter/search by location, skill, experience
- Apply for jobs
- Track submitted applications

### 🏢 Employer Capabilities
- Post new jobs
- View applicants for each job post
- Shortlist / Reject applicants
- Edit company profile

### 📊 Dashboard Views
- Seeker Dashboard: Recent jobs, application status
- Employer Dashboard: Posted jobs, candidate list

---

## 🧰 Tech Stack

| Tech            | Usage                              |
|-----------------|-------------------------------------|
| React + Vite    | Frontend Framework & Dev Tooling    |
| TypeScript      | Type Safety                         |
| Tailwind CSS    | Modern utility-first CSS framework  |
| localStorage    | Mock backend for authentication     |

---

## 📁 Folder Structure

```
src/
│
├── components/         # Reusable UI (Header, Footer, Jobs, etc.)
├── contexts/           # Auth context for login/register/profile
├── data/               # Mock job listing data
├── pages/              # Main views (Login, Register, Jobs, Profile)
├── types/              # TypeScript interfaces & types
├── App.tsx             # Main component wrapper
├── main.tsx            # Entry point
└── index.css           # Tailwind & global styles
```

---

## 🛠️ Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/YOUR-USERNAME/CampusHire.git
cd CampusHire
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Locally
```bash
npm run dev
```

### 4. Open in Browser
Visit: [http://localhost:5173](http://localhost:5173)

---

## ⚙️ Notes

> 🔐 This project uses `localStorage` to simulate user registration, login, and job application tracking. **No real backend/database** is connected.

> 🛠️ Ideal for demonstration or portfolio showcase purposes.

---

## 📸 Screenshots

> _(Add screenshots or Loom video here)_

---

## 👨‍💻 Developer

**Vijay Kalidas Pawar**  
📧 vijukp9999@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/vijay-pawar-0542432b2/?originalSubdomain=in)

---

## ⭐ GitHub Tip

If pushing this project to GitHub:
- Rename this file as `README.md`
- Add a GitHub repo description + tags
- Consider adding a video walkthrough

---

## 📃 License

This project is open source and free to use.
