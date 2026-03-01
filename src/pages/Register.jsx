import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/slices/authSlice';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { UserPlus, BookOpen, Loader2, Mail, Lock, Phone, User, Sparkles, ShieldCheck, GraduationCap } from 'lucide-react';

const Register = () => {
    const [input, setInput] = useState({
        name: "", 
        email: "", 
        mobileNo: "", 
        password: "", 
        role: "student"
    });
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.auth);

    const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success("Welcome to the family! Please login.");
                navigate("/login");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="flex min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900">
            
            {/* --- LEFT SIDE: THE INSPIRATIONAL GATEWAY --- */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="hidden lg:flex w-[40%] bg-emerald-600 items-center justify-center p-16 text-white relative overflow-hidden"
            >
                {/* Abstract Visual Elements */}
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-500 rounded-full blur-[100px] opacity-40" />
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-teal-400 rounded-full blur-[100px] opacity-30" />

                <div className="z-10 space-y-12 max-w-sm">
                    {/* Brand */}
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-white/15 rounded-[2rem] backdrop-blur-xl border border-white/20 shadow-2xl">
                            <BookOpen className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter">LibriFlow</h1>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-5xl font-medium leading-[1.1] tracking-tight">
                            Every book is a <br /> 
                            <span className="text-emerald-200 font-serif italic">new world.</span>
                        </h2>
                        <p className="text-emerald-50/80 text-lg font-medium leading-relaxed">
                            Join our community to unlock a universe of digital resources. Track your issues, manage fines, and grow your wisdom effortlessly.
                        </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-4 pt-4 border-t border-white/10">
                        {[
                            "Instant access to 10k+ books",
                            "Smart return reminders",
                            "Personalized reading history"
                        ].map((text, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm font-bold text-emerald-100/90">
                                <Sparkles size={16} className="text-emerald-300" /> {text}
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* --- RIGHT SIDE: THE REGISTRATION FORM --- */}
            <div className="w-full lg:w-[60%] flex items-center justify-center p-8 md:p-16 bg-slate-50/30 overflow-y-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-2xl space-y-10"
                >
                    <div className="text-center lg:text-left space-y-3">
                        <div className="flex items-center justify-center lg:justify-start gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                            <Sparkles size={14} /> New Member
                        </div>
                        <h2 className="text-5xl font-medium text-slate-900 tracking-tight">Join the Circle</h2>
                        <p className="text-slate-400 font-medium italic">Create your library identity to begin.</p>
                    </div>

                    <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        
                        {/* Full Name */}
                        <div className="space-y-2">
                            <Label className="text-slate-700 font-black text-[11px] uppercase tracking-widest ml-1">Full Name</Label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                                <Input 
                                    name="name" 
                                    value={input.name} 
                                    onChange={changeEventHandler} 
                                    placeholder="e.g. john" 
                                    className="h-14 pl-12 rounded-2xl border-slate-100 bg-white shadow-sm focus-visible:ring-emerald-500/20 font-bold" 
                                    required 
                                />
                            </div>
                        </div>

                        {/* Email Address */}
                        <div className="space-y-2">
                            <Label className="text-slate-700 font-black text-[11px] uppercase tracking-widest ml-1">Email</Label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                                <Input 
                                    type="email" 
                                    name="email" 
                                    value={input.email} 
                                    onChange={changeEventHandler} 
                                    placeholder="name@example.com" 
                                    className="h-14 pl-12 rounded-2xl border-slate-100 bg-white shadow-sm focus-visible:ring-emerald-500/20 font-bold" 
                                    required 
                                />
                            </div>
                        </div>

                        {/* Mobile Number */}
                        <div className="space-y-2">
                            <Label className="text-slate-700 font-black text-[11px] uppercase tracking-widest ml-1">Contact Link</Label>
                            <div className="relative group">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                                <Input 
                                    name="mobileNo" 
                                    value={input.mobileNo} 
                                    onChange={changeEventHandler} 
                                    placeholder="+91 00000 00000" 
                                    className="h-14 pl-12 rounded-2xl border-slate-100 bg-white shadow-sm focus-visible:ring-emerald-500/20 font-bold" 
                                    required 
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label className="text-slate-700 font-black text-[11px] uppercase tracking-widest ml-1">Access Key</Label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                                <Input 
                                    type="password" 
                                    name="password" 
                                    value={input.password} 
                                    onChange={changeEventHandler} 
                                    placeholder="••••••••" 
                                    className="h-14 pl-12 rounded-2xl border-slate-100 bg-white shadow-sm focus-visible:ring-emerald-500/20 font-bold" 
                                    required 
                                />
                            </div>
                        </div>

                        {/* Role Selection - Premium UI */}
                        <div className="md:col-span-2 space-y-4">
                            <Label className="text-slate-700 font-black text-[11px] uppercase tracking-widest ml-1">Your Role in our Sanctuary</Label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className={`flex flex-col items-center justify-center p-6 rounded-[2rem] border-2 transition-all cursor-pointer group/role ${input.role === 'student' ? 'border-emerald-600 bg-emerald-50 text-emerald-700 shadow-lg shadow-emerald-100' : 'border-white bg-white hover:border-emerald-200 shadow-sm'}`}>
                                    <input type="radio" name="role" value="student" checked={input.role === 'student'} onChange={changeEventHandler} className="hidden" />
                                    <GraduationCap className={`w-8 h-8 mb-2 ${input.role === 'student' ? 'text-emerald-600' : 'text-slate-300 group-hover/role:text-emerald-400'} transition-colors`} />
                                    <span className="font-black text-xs uppercase tracking-widest">Student</span>
                                </label>
                                
                                <label className={`flex flex-col items-center justify-center p-6 rounded-[2rem] border-2 transition-all cursor-pointer group/role ${input.role === 'admin' ? 'border-emerald-600 bg-emerald-50 text-emerald-700 shadow-lg shadow-emerald-100' : 'border-white bg-white hover:border-emerald-200 shadow-sm'}`}>
                                    <input type="radio" name="role" value="admin" checked={input.role === 'admin'} onChange={changeEventHandler} className="hidden" />
                                    <ShieldCheck className={`w-8 h-8 mb-2 ${input.role === 'admin' ? 'text-emerald-600' : 'text-slate-300 group-hover/role:text-emerald-400'} transition-colors`} />
                                    <span className="font-black text-xs uppercase tracking-widest">Admin</span>
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.div className="md:col-span-2 pt-4" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                            <Button 
                                type="submit" 
                                disabled={loading} 
                                className="w-full bg-emerald-600 hover:bg-slate-900 h-16 rounded-[2rem] text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-emerald-200 transition-all cursor-pointer flex items-center justify-center gap-3"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="animate-spin w-5 h-5" />
                                        <span>Recording Identity...</span>
                                    </div>
                                ) : (
                                    <>Join the Family <UserPlus className="w-5 h-5" /></>
                                )}
                            </Button>
                        </motion.div>
                    </form>

                    <div className="pt-6 border-t border-slate-100 text-center">
                        <p className="text-sm font-medium text-slate-500">
                            Already a fellow traveler? 
                            <Link to="/login" className="text-emerald-600 font-black hover:text-slate-900 transition-colors ml-2 uppercase tracking-widest text-xs">Login Instead</Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;