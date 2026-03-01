import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '@/redux/slices/authSlice';
import { 
    BookOpen, 
    Menu, 
    LogOut, 
    User as UserIcon, 
    Bell, 
    ChevronDown, 
    LogIn, 
    UserPlus,
    Sparkles
} from 'lucide-react';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from 'sonner';

const Navbar = ({ setIsSidebarOpen }) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser());
        toast.success("Safe travels! Logged out successfully");
        navigate("/login");
    };

    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-xl border-b border-slate-100 z-100 flex items-center justify-between px-4 md:px-10">
            
            <div className="flex items-center gap-4">
                {user && (
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="lg:hidden p-2.5 hover:bg-emerald-50 rounded-xl transition-all cursor-pointer group"
                    >
                        <Menu className="w-6 h-6 text-emerald-600 group-active:scale-90 transition-transform" />
                    </button>
                )}
                
                <Link to="/" className="flex items-center gap-2.5 cursor-pointer group">
                    <motion.div 
                        whileHover={{ rotate: -12, scale: 1.1 }}
                        className="p-2 bg-emerald-600 rounded-xl shadow-lg shadow-emerald-200"
                    >
                        <BookOpen className="w-5 h-5 text-white" />
                    </motion.div>
                    <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tighter">
                        Libri<span className="text-emerald-600">Flow</span>
                    </h1>
                </Link>
            </div>

            {/* --- RIGHT SIDE: ACTIONS & PROFILE --- */}
            <div className="flex items-center gap-3 md:gap-6">
                
                <AnimatePresence mode="wait">
                    {!user ? (
                        /* CASE A: GUEST (Landing Page State) */
                        <motion.div 
                            key="guest"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex items-center gap-3"
                        >
                            <Link to="/login">
                                <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-sm font-black text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all cursor-pointer uppercase tracking-widest">
                                    <LogIn className="w-4 h-4" /> Login
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className="flex items-center gap-2 px-6 py-2.5 text-sm font-black bg-slate-900 text-white hover:bg-emerald-600 rounded-2xl shadow-xl shadow-slate-200 transition-all cursor-pointer uppercase tracking-widest">
                                    <UserPlus className="w-4 h-4" /> Join
                                </button>
                            </Link>
                        </motion.div>
                    ) : (
                        /* CASE B: LOGGED IN */
                        <motion.div 
                            key="user"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center gap-3 md:gap-5"
                        >
                            {/* Notification Bell */}
                            <button className="relative p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all cursor-pointer group">
                                <Bell className="w-5 h-5 group-active:rotate-12 transition-transform" />
                                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
                            </button>

                            {/* Profile Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
                                    <div className="flex items-center gap-2.5 p-1 pr-3 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100 group">
                                        <Avatar className="h-9 w-9 border-2 border-emerald-100 shadow-sm transition-transform group-hover:scale-105">
                                            <AvatarImage src={user?.image} alt={user?.name} className="object-cover" />
                                            <AvatarFallback className="bg-emerald-600 text-white font-black text-xs">
                                                {user?.name?.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="hidden md:block text-left">
                                            <p className="text-[11px] font-black text-slate-900 leading-none uppercase tracking-tight">{user?.name}</p>
                                            <div className="flex items-center gap-1 mt-1">
                                                <Sparkles className="w-2.5 h-2.5 text-emerald-500" />
                                                <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">{user?.role}</p>
                                            </div>
                                        </div>
                                        <ChevronDown className="w-4 h-4 text-slate-300 hidden md:block group-hover:text-emerald-500 transition-colors" />
                                    </div>
                                </DropdownMenuTrigger>
                                
                                <DropdownMenuContent align="end" className="w-60 p-2 mt-3 shadow-2xl border-slate-100 rounded-[1.5rem] bg-white/95 backdrop-blur-xl">
                                    <DropdownMenuLabel className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 px-4 py-3">Account Center</DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-slate-50" />
                                    
                                    <DropdownMenuItem 
                                        onClick={() => navigate("/profile")} 
                                        className="flex items-center gap-3 p-3.5 cursor-pointer rounded-xl hover:bg-emerald-50 text-slate-600 focus:text-emerald-700 focus:bg-emerald-50 transition-all mb-1"
                                    >
                                        <div className="p-2 bg-slate-50 rounded-lg group-focus:bg-white">
                                            <UserIcon className="w-4 h-4" />
                                        </div>
                                        <span className="font-bold text-sm">View Profile</span>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem 
                                        onClick={handleLogout} 
                                        className="flex items-center gap-3 p-3.5 cursor-pointer rounded-xl hover:bg-rose-50 text-rose-500 focus:text-rose-700 focus:bg-rose-50 transition-all"
                                    >
                                        <div className="p-2 bg-rose-50 rounded-lg group-focus:bg-white">
                                            <LogOut className="w-4 h-4" />
                                        </div>
                                        <span className="font-bold text-sm">Sign Out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;