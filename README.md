
# 🎨 LibriFlow Frontend – The Modern Reading Experience

**LibriFlow** is a premium, 3D-inspired library management interface designed to make book discovery and management an "adventure." Inspired by high-end Dribbble aesthetics, it features a sophisticated **Emerald Green** theme, smooth micro-interactions, and a responsive layout that adapts to any device.

The frontend is built with **React 18** and **Framer Motion**, ensuring that every click feels fluid and every transition feels natural.

---

## ✨ Design Philosophy

* **Emerald Premium UI:** A clean, nature-inspired palette using Emerald-600 and Slate-50 for a professional yet calming reading environment.
* **Micro-Interactions:** Leverages **Framer Motion** for spring-physics animations, floating 3D elements, and hover-triggered transitions.
* **Glassmorphism:** Modern translucent layers with `backdrop-blur` effects for a high-end, layered depth feel.
* **Dashboard Analytics:** Interactive data visualization using **Recharts** to display borrowing trends and category distributions.

---

## 🛠️ Tech Stack

* **Framework:** React 19 (Vite)
* **Styling:** Tailwind CSS (Utility-first CSS)
* **Animations:** Framer Motion (Production-ready motion library)
* **State Management:** Redux Toolkit (Predictable state container)
* **UI Components:** Shadcn/ui & Lucide React (Icons)
* **HTTP Client:** Axios with `withCredentials` support
* **Feedback:** Sonner (Toast notifications)

---

## 🚀 Key Modules

### 🏠 Hero & Landing

A Dribbble-inspired gateway featuring floating cards, 3D book illustrations, and interactive "Get Started" flows.

### 📊 Admin Intelligence Suite

A data-heavy dashboard for admins to track user growth and book issue cycles through animated area charts and pie graphs.

### 👤 Identity Portal

A specialized profile management section allowing users to update their identity, including real-time profile picture previews and Cloudinary-synced uploads.

---

## 💻 Local Setup Instructions

### 1. Prerequisites

* [Node.js](https://nodejs.org/) (v18+)
* [Vite](https://vitejs.dev/) (Build tool)

### 2. Clone the Repository

```bash
git clone https://github.com/Ravi024tiwari/FrontendLibraryManagement
cd FrontendLibraryManagement

```

### 3. Install Dependencies

```bash
npm install

```

### 4. Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_BACKEND_URL=http://localhost:8080/api/v1

```

### 5. Project Directory Structure

```bash
src/
├── components/    # Reusable UI elements (StatCard, Navbar, etc.)
├── pages/         # Page-level components (Landing, Login, Dashboard)
├── redux/         # Auth and Admin slices (Redux Toolkit)
├── hooks/         # Custom API fetching hooks
├── assets/        # 3D Illustrations and Images
└── lib/           # Utility functions (shadcn helpers)

```

### 6. Launch Development Server

```bash
npm run dev

```

Open `http://localhost:5173` in your browser.

---

## 📱 Responsiveness Check

The application uses a mobile-first approach with Tailwind's responsive breakpoints:

* **Mobile:** Simplified single-column forms and hamburger menus.
* **Tablet:** Grid-based stat cards and expanded sidebars.
* **Desktop:** Full split-screen branding and multi-column analytics.





