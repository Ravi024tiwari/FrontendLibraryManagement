import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { logoutUser } from '@/redux/slices/authSlice';
import { 
    LayoutDashboard, 
    Library, 
    BookPlus, 
    Users, 
    History, 
    RotateCcw, 
    BookCheck, 
    IndianRupee, 
    LogOut, 
    X,
    ChevronRight,
    BookOpenCheck 
} from 'lucide-react';
import { toast } from 'sonner';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // --- NAVIGATION LINKS LOGIC ---
    const adminLinks = [
        { name: "Dashboard", path: "/", icon: LayoutDashboard },
        { name: "Manage Books", path: "/admin/books", icon: BookPlus },
        { name: "Manage Students", path: "/admin/students", icon: Users },
        { name: "Transactions", path: "/admin/transactions", icon: History },
    ];

    const studentLinks = [
        { name: "My Dashboard", path: "/", icon: LayoutDashboard },
        { name: "Explore Books", path: "/student/explore", icon: Library },
        { name: "My Issued Books", path: "/student/current-issue/books", icon: BookCheck },
        { name: "Previous Issue", path: "/previous/issues", icon:BookOpenCheck  },
    ];

    const links = user?.role === 'admin' ? adminLinks : studentLinks;

    const handleLogout = () => {
        dispatch(logoutUser());
        toast.success("Logged out successfully");
        navigate("/login");
    };

    return (
        <>
            {/* MOBILE OVERLAY (Blur background when sidebar is open on mobile) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-60 lg:hidden cursor-pointer"
                    />
                )}
            </AnimatePresence>

            {/* SIDEBAR CONTAINER */}
            <motion.aside 
                className={`fixed top-0 left-0 h-full bg-white border-r border-slate-100 z-70 w-64 shadow-2xl lg:shadow-none transition-all duration-300 transform 
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
            >
                <div className="flex flex-col h-full py-6">
                    
                    {/* SIDEBAR HEADER (Mobile Close Button) */}
                    <div className="flex items-center justify-between px-6 mb-8 lg:hidden">
                        <span className="text-blue-600 font-black text-xl">LibriFlow</span>
                        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg cursor-pointer transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* LINKS SECTION */}
                    <div className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                        <p className="px-4 text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">
                            Main Menu
                        </p>
                        
                        {links.map((link, index) => (
                            <NavLink
                                key={index}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) => `
                                    group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 cursor-pointer
                                    ${isActive 
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                                        : 'text-slate-500 hover:bg-blue-50 hover:text-blue-600'}
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <link.icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110`} />
                                    <span className="font-bold tracking-tight">{link.name}</span>
                                </div>
                                <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2.5 group-hover:translate-x-0`} />
                            </NavLink>
                        ))}
                    </div>

                    {/* SIDEBAR FOOTER (User Info & Logout) */}
                    <div className="px-4 pt-4 mt-4 border-t border-slate-50">
                        <div className="bg-slate-50 rounded-2xl p-4 mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-sm font-black text-slate-900 truncate">{user?.name}</p>
                                    <p className="text-[10px] font-bold text-blue-500 uppercase">{user?.role}</p>
                                </div>
                            </div>
                        </div>

                        <motion.button 
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3.5 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-all cursor-pointer group"
                        >
                            <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            <span>Logout</span>
                        </motion.button>
                    </div>
                </div>
            </motion.aside>
        </>
    );
};

export default Sidebar;