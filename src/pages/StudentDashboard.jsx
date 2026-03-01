import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
    BookOpen, Clock, IndianRupee, Sparkles, 
    TrendingUp, Calendar, ArrowUpRight 
} from 'lucide-react';
import useGetStudentStats from '../hooks/useGetStudentDashboard.js';

// Custom Tooltip for the Graph to make it more interactive
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-emerald-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <p className="text-sm font-black text-slate-800">
                        {payload[0].value} Books Issued
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

const StudentDashboard = () => {
    const { user } = useSelector((state) => state.auth);
    useGetStudentStats(); 
    const { stats, chartData, loading } = useSelector((state) => state.student);

    const cards = [
        {
            title: "Total Borrowed",
            value: stats.totalLifetimeIssued,
            icon: BookOpen,
            color: "emerald",
            shadow: "shadow-emerald-100"
        },
        {
            title: "Active Issues",
            value: stats.currentlyIssued,
            icon: Clock,
            color: "amber",
            shadow: "shadow-amber-100"
        },
        {
            title: "Total Fine",
            value: `₹${stats.totalFine}`,
            icon: IndianRupee,
            color: "rose",
            shadow: "shadow-rose-100"
        }
    ];

    if (loading) return (
        <div className="h-[80vh] flex flex-col items-center justify-center gap-4">
            <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full"
            />
            <p className="font-black text-slate-300 uppercase tracking-[0.3em] text-xs">Syncing Library Data</p>
        </div>
    );

    return (
        <div className="space-y-6 md:space-y-8 p-2 pb-12 max-w-[1400px] mx-auto">
            
            {/* --- TOP HEADER --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-50 pb-6">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="text-emerald-500 w-4 h-4" />
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Active Member</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-medium text-slate-800 tracking-tight">
                        Welcome, <span className="text-emerald-600 font-serif italic">{user?.name}</span>!
                    </h1>
                </motion.div>

                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
                    <Calendar className="text-slate-400 w-4 h-4" />
                    <span className="text-xs font-bold text-slate-500">{new Date().toDateString()}</span>
                </div>
            </div>

            {/* --- COMPACT INTERACTIVE CARDS --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {cards.map((card, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:${card.shadow} hover:shadow-2xl transition-all duration-300 cursor-pointer group`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl bg-${card.color}-50 text-${card.color}-600 group-hover:bg-${card.color}-500 group-hover:text-white transition-colors duration-500`}>
                                <card.icon size={20} />
                            </div>
                            <ArrowUpRight className="text-slate-200 group-hover:text-emerald-500 transition-colors" size={18} />
                        </div>
                        <div>
                            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">{card.title}</p>
                            <h3 className="text-2xl font-black text-slate-800">{card.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* --- ENHANCED GRAPH SECTION --- */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-4 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
            >
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 rounded-lg">
                            <TrendingUp className="text-emerald-600 w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 tracking-tight">Issuing Activity</h3>
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Updates</span>
                    </div>
                </div>

                <div className="h-[250px] md:h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorBooks" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis 
                                dataKey="month" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}}
                                dy={10}
                            />
                            <YAxis hide />
                            <Tooltip content={<CustomTooltip />} cursor={{stroke: '#10b981', strokeWidth: 2}} />
                            <Area 
                                type="monotone" 
                                dataKey="books" 
                                stroke="#10b981" 
                                strokeWidth={4} 
                                fillOpacity={1} 
                                fill="url(#colorBooks)" 
                                animationDuration={2000}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </div>
    );
};

export default StudentDashboard;