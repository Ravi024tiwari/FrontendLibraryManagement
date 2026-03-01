import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
    BookOpen, Search, ShieldCheck, Zap, 
    ArrowRight, Star, Users, Library 
} from 'lucide-react';
import { Button } from "@/components/ui/button";

const LandingPage = () => {
    const navigate = useNavigate();

    // Animation Variants
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const floating = {
        animate: {
            y: [0, -20, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className="min-h-screen bg-white overflow-x-hidden">
            
            {/* --- NAV BAR --- */}
            <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-50 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                        <Library size={22} />
                    </div>
                    <span className="text-xl font-black text-slate-800 tracking-tighter">LibriFlow</span>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-bold text-slate-500 uppercase tracking-widest">
                    <a href="#features" className="hover:text-emerald-600 transition-colors">Features</a>
                    <a href="#explore" className="hover:text-emerald-600 transition-colors">Explore</a>
                    <a href="#about" className="hover:text-emerald-600 transition-colors">About</a>
                </div>
                <div className="flex gap-4">
                    <Button variant="ghost" onClick={() => navigate('/login')} className="font-bold text-slate-600 cursor-pointer">Login</Button>
                    <Button onClick={() => navigate('/register')} className="bg-slate-900 hover:bg-emerald-600 text-white rounded-xl px-6 font-bold shadow-xl shadow-slate-200 cursor-pointer transition-all">Get Started</Button>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 space-y-8 text-center lg:text-left"
                >
                    <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                        <Star size={14} fill="currentColor" /> The Future of Digital Libraries
                    </div>
                    <h1 className="text-5xl md:text-7xl font-medium text-slate-900 tracking-tight leading-[1.1]">
                        Read more, <br /> 
                        <span className="text-emerald-600 font-serif italic">dream bigger.</span>
                    </h1>
                    <p className="text-lg text-slate-400 font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
                        Experience a library system that’s fast, smart, and interactive. Borrow books, track fines, and explore knowledge with one click.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Button 
                            onClick={() => navigate('/register')}
                            className="h-16 px-10 bg-emerald-600 hover:bg-slate-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all shadow-2xl shadow-emerald-200 gap-3 group cursor-pointer"
                        >
                            Start Your Journey <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <div className="flex -space-x-3 items-center justify-center">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                                </div>
                            ))}
                            <p className="ml-4 text-xs font-bold text-slate-400">Join 10,000+ Readers</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    variants={floating}
                    animate="animate"
                    className="flex-1 relative w-full max-w-125"
                >
                    <div className="relative aspect-square bg-linear-to-br from-emerald-100 to-blue-50 rounded-[4rem] flex items-center justify-center overflow-hidden shadow-inner">
                        <motion.div 
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 6, repeat: Infinity }}
                            className="p-12"
                        >
                            <BookOpen size={200} className="text-emerald-600 opacity-20" />
                        </motion.div>
                        
                        <motion.div 
                            drag
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            className="absolute top-10 right-10 bg-white/80 backdrop-blur-md p-4 rounded-3xl shadow-2xl border border-white/50 cursor-grab active:cursor-grabbing"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center"><Zap size={16} /></div>
                                <p className="text-[10px] font-black uppercase text-slate-400">Fast Return</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* --- FEATURES SECTION --- */}
            <section id="features" className="py-24 bg-slate-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-4xl font-black text-slate-800 tracking-tight">Everything you <span className="text-emerald-600 font-serif italic">actually</span> need.</h2>
                        <p className="text-slate-400 font-medium">Smart tools for the modern library experience.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Smart Search", desc: "Find any book in seconds with our advanced filtering.", icon: Search, color: "blue" },
                            { title: "Real-time Tracking", desc: "Live updates on your issued books and due dates.", icon: Zap, color: "emerald" },
                            { title: "Secure Profile", desc: "Manage your library identity with high-level security.", icon: ShieldCheck, color: "rose" }
                        ].map((f, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ y: -10 }}
                                className="bg-white p-10 rounded-[3rem] border border-slate-100 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all group"
                            >
                                <div className={`w-14 h-14 bg-${f.color}-50 text-${f.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-${f.color}-500 group-hover:text-white transition-colors`}>
                                    <f.icon size={28} />
                                </div>
                                <h3 className="text-xl font-black text-slate-800 mb-3">{f.title}</h3>
                                <p className="text-sm text-slate-400 font-medium leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;