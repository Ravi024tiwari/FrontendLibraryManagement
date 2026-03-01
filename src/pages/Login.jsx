import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading } from '../redux/slices/authSlice';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { LogIn, BookOpen, Loader2, Lock, Mail, Sparkles, Quote } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.auth);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(`Welcome back, ${res.data.user.name}!`);
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid credentials");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="flex min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900">
            
            {/* --- LEFT SIDE: THE DREAMY LIBRARY VIBE --- */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="hidden lg:flex w-[55%] bg-emerald-600 items-center justify-center p-20 text-white relative overflow-hidden"
            >
                {/* Background Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-[120px] opacity-40 -mr-48 -mt-48" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-400 rounded-full blur-[100px] opacity-30 -ml-48 -mb-48" />

                <div className="z-10 space-y-10 max-w-lg">
                    {/* Brand Logo */}
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-4"
                    >
                        <div className="bg-white/15 p-4 rounded-[2rem] backdrop-blur-xl border border-white/20 shadow-2xl">
                            <BookOpen className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter">LibriFlow</h1>
                    </motion.div>

                    {/* Interactive Text */}
                    <div className="space-y-6">
                        <motion.h2 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-6xl font-medium leading-[1.1] tracking-tight"
                        >
                            Your next great <br /> 
                            <span className="text-emerald-200 font-serif italic">adventure</span> starts here.
                        </motion.h2>
                        
                        <p className="text-emerald-50/80 text-xl font-medium leading-relaxed">
                            Log in to access your personalized bookshelf, track your reading progress, and discover thousands of new stories waiting for you.
                        </p>
                    </div>

                    {/* Minimalist Quote Card */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 }}
                        className="bg-emerald-700/40 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/10 flex gap-4"
                    >
                        <Quote className="text-emerald-300 shrink-0" size={24} />
                        <p className="text-sm font-bold italic text-emerald-100/90 leading-relaxed">
                            "A library is not a luxury but one of the necessities of life."
                            <span className="block mt-2 not-italic font-black text-[10px] uppercase tracking-widest text-emerald-300">— Henry Ward Beecher</span>
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {/* --- RIGHT SIDE: THE MODERN FORM --- */}
            <div className="w-full lg:w-[45%] flex items-center justify-center p-8 sm:p-16 bg-slate-50/30">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md space-y-10"
                >
                    <div className="space-y-3 text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                            <Sparkles size={14} /> Welcome Back
                        </div>
                        <h2 className="text-5xl font-medium text-slate-900 tracking-tight">Sign In</h2>
                        <p className="text-slate-400 font-medium">Please enter your credentials to access your shelf.</p>
                    </div>

                    <form onSubmit={loginHandler} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label className="text-slate-700 font-black text-[11px] uppercase tracking-widest ml-1">Email Address</Label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                                <Input 
                                    type="email" 
                                    name="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. read@libriflow.com" 
                                    className="pl-12 h-14 rounded-2xl border-slate-100 bg-white shadow-sm focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500/50 transition-all font-bold text-slate-700"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <Label className="text-slate-700 font-black text-[11px] uppercase tracking-widest">Secret Key</Label>
                                <a href="#" className="text-[10px] font-black text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-widest">Forgot?</a>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                                <Input 
                                    type="password" 
                                    name="password"
                                    value={input.password}
                                    onChange={changeEventHandler}
                                    placeholder="••••••••" 
                                    className="pl-12 h-14 rounded-2xl border-slate-100 bg-white shadow-sm focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500/50 transition-all font-bold text-slate-700"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-emerald-600 hover:bg-slate-900 h-16 rounded-[2rem] text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-emerald-200 transition-all cursor-pointer flex items-center justify-center gap-3"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin w-5 h-5" />
                                ) : (
                                    <>Open Your Shelf <LogIn size={18} /></>
                                )}
                            </Button>
                        </motion.div>
                    </form>

                    {/* Footer Link */}
                    <div className="pt-6 border-t border-slate-100 text-center">
                        <p className="text-sm font-medium text-slate-500">
                            New to our sanctuary? 
                            <Link to="/register" className="text-emerald-600 font-black hover:text-slate-900 transition-colors ml-2 uppercase tracking-widest text-xs">Create Account</Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;