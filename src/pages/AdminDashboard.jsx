import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import useGetDashboardStats from '@/hooks/useGetAdminDashboardStats.js';
import { Book, Users, BookmarkCheck, AlertCircle, Loader2, Sparkles, Calendar } from 'lucide-react';

// Sub-Components
import StatCard from '@/components/admin/StatCard';
import BorrowingTrendChart from '@/components/admin/BorrowingTrendChart';
import InventoryPieChart from '@/components/admin/InventoryPieChart';
import RecentActivityTable from '@/components/admin/RecentActivityTable';

const AdminDashboard = () => {
    useGetDashboardStats(); // Global hook to fetch and set stats in Redux
    const { stats, loading } = useSelector((state) => state.admin);

    if (loading && !stats) {
        return (
            <div className="flex h-[80vh] flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Crunching Data...</p>
            </div>
        );
    }

    const statItems = [
        { title: "Total Books", value: stats?.totalBooks || 0, icon: Book, color: "text-emerald-600", bg: "bg-emerald-50", label: "Inventory" },
        { title: "Students", value: stats?.totalUsers || 0, icon: Users, color: "text-teal-600", bg: "bg-teal-50", label: "Members" },
        { title: "Issued Now", value: stats?.currentlyIssued || 0, icon: BookmarkCheck, color: "text-amber-600", bg: "bg-amber-50", label: "Active" },
        { title: "Late Returns", value: stats?.lateTransactions || 0, icon: AlertCircle, color: "text-rose-600", bg: "bg-rose-50", label: "Alerts" },
    ];

    return (
        <div className="space-y-8 p-1 pb-12 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="flex items-center gap-2 mb-1 text-emerald-600 font-black text-[10px] uppercase tracking-widest">
                        <Sparkles size={14} /> Admin Insights
                    </div>
                    <h1 className="text-4xl font-medium text-slate-900 tracking-tight">
                        Library <span className="text-emerald-600 font-serif italic">Snapshot</span>
                    </h1>
                </motion.div>
                <div className="bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <Calendar className="text-slate-400 w-4 h-4" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{new Date().toDateString()}</span>
                </div>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statItems.map((item, idx) => (
                    <StatCard key={idx} {...item} delay={idx * 0.1} />
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {/* Pass the borrowingTrend array directly */}
                    <BorrowingTrendChart data={stats?.borrowingTrend} />
                </div>
                <div className="lg:col-span-1">
                    <InventoryPieChart data={stats?.categoryDistribution} />
                </div>
            </div>

           
        </div>
    );
};

export default AdminDashboard;