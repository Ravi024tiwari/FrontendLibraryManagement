import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// --- PAGES ---
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import ManageBooks from './components/books/ManageBooks'; // Admin Inventory Page
import BookDetails from './components/books/BookDetail';
import AllotmentModal from './components/books/AllotmentModel.jsx';
import ManageStudents from './components/admin/ManageStudent';
import ManageTransactions from './components/admin/ManageTransection';
import ExploreBooks from './components/books/StudentExploreBook';

// --- PLACEHOLDERS (Inhe hum agle steps mein real pages se replace karenge) ---
import StudentDashboard from './pages/StudentDashboard';
import MyCurrentIssueBooks from './pages/StudentsCurrentIssueBooks';
import StudentPreviousTrasactionHistory from './pages/StudentPrevTrasactions.jsx';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';



// --- COMPONENTS ---
import Navbar from './components/shared/Navbar';
import Sidebar from './components/shared/Sidebar';
import LandingPage from './pages/LandingPage';


// --- ROUTE PROTECTION HELPERS ---

// 1. Common Protected Route (User must be logged in)
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user ? children : <Navigate to="/login" replace />;
};

// 2. Admin Only Access
const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user?.role === 'admin' ? children : <Navigate to="/" replace />
};

// 3. Student Only Access
const StudentRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user?.role === 'student' ? children : <Navigate to="/" replace />;
};


const PublicRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user ? <Navigate to="/" replace /> : children;
};

function App() {
  const { user } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#fafbfc] selection:bg-blue-100 selection:text-blue-700">
        
        {/* Global Navbar */}
        <Navbar setIsSidebarOpen={setIsSidebarOpen} />

        <div className="flex">
          {/* Sidebar: Role-based links inside handle automatically */}
          {user && <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}

          {/* Main Layout Container */}
          <main className={`flex-1 transition-all duration-300 min-h-screen pt-16 ${user ? 'lg:pl-64' : ''}`}>
            <div className="p-4 md:p-8 max-w-400 mx-auto">
              <Routes>
                
                {/* --- 1. AUTH ROUTES --- */}
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                <Route path="/" element={!user ? <LandingPage /> : <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} />} />

                {/* --- 2. BASE REDIRECT --- */}
                <Route path="/" element={
                  <ProtectedRoute>
                    {user?.role === 'admin' ? <Navigate to="/admin/dashboard" /> : <Navigate to="/student/dashboard" />}
                  </ProtectedRoute>
                } />

                {/* --- 3. ADMIN PRIVILEGED ROUTES --- */}
                <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                <Route path="/admin/books" element={<AdminRoute><ManageBooks /></AdminRoute>} />
                <Route path="/admin/students" element={<AdminRoute><ManageStudents /></AdminRoute>} />
                <Route path="/admin/transactions" element={<AdminRoute><ManageTransactions /></AdminRoute>} />
                <Route path="/admin/book/:id" element={<AdminRoute><BookDetails /></AdminRoute>} />     

                {/* --- 4. STUDENT PRIVILEGED ROUTES --- */}
                <Route path="/student/dashboard" element={<StudentRoute><StudentDashboard /></StudentRoute>} />
                <Route path="/student/current-issue/books" element={<StudentRoute><MyCurrentIssueBooks /></StudentRoute>} />
                <Route path="/student/book/:id" element={<StudentRoute><BookDetails /></StudentRoute>} />
                <Route path="/student/explore" element={<StudentRoute><ExploreBooks /></StudentRoute>} />
                <Route path='/previous/issues' element={<StudentRoute><StudentPreviousTrasactionHistory/></StudentRoute>} />

                {/* --- 5. COMMON PROTECTED ROUTES --- */}
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/profile/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />

                {/* --- 6. FALLBACK (404) --- */}
                <Route path="*" element={<Navigate to="/" replace />} />

              </Routes>
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;