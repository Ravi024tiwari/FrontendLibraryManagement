import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'sonner';
import { 
    Search, RotateCcw, Clock, IndianRupee, 
    CalendarCheck, User, Book as BookIcon, Loader2, Filter
} from 'lucide-react';
import { updateTransactionStatus, setHistory, setLoading } from '../../redux/slices/transectionSlice.js';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useGetTransactions from '@/hooks/useGetAllTransection.js';

const ManageTransactions = () => {
    const dispatch = useDispatch();
    useGetTransactions();// here its get all the trasection btw them
    const { history, loading } = useSelector(state => state.transaction);
    const [searchTerm, setSearchTerm] = useState("");

    // --- REAL-TIME FINE CALCULATION LOGIC FOR UI ---
    const calculateLiveFine = (dueDate, status, dbFine) => {
        if (status === 'returned') return dbFine; // Agar return ho chuki hai toh DB wala fine dikhao
        const today = new Date();
        const due = new Date(dueDate);
        if (today > due) {
            const diffDays = Math.ceil(Math.abs(today - due) / (1000 * 60 * 60 * 24));
            return diffDays * 10;
        }
        return 0;
    };

    const handleReturn = async (id) => {//here its update the return transection data 
        try {
            // Hum ek confirm box dikha sakte hain ya seedha counter pay ka logic
            const finePaid = window.confirm("Has the student paid the fine at the counter (if any)?");
            
            const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/transaction/return/${id}`, 
                { finePaidAtCounter: finePaid }, 
                { withCredentials: true }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(updateTransactionStatus({
                    transactionId: id,
                    status: 'returned',
                    lateFine: res.data.fine,
                    fineStatus: finePaid ? 'Paid' : 'Unpaid',
                    returnDate: new Date().toISOString()
                }));
            }
        } catch (error) {
            toast.error("Return process failed");
        }
    };

    return (
        <div className="space-y-6 p-2 md:p-6 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-medium text-slate-800 tracking-tight">
                        Circulation <span className="text-emerald-600 font-serif italic">Log</span>
                    </h1>
                    <p className="text-slate-400 text-sm font-medium">Tracking all book issues and returns.</p>
                </div>
                
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input 
                        type="text" 
                        placeholder="Search student or book..."
                        className="w-full pl-10 h-11 rounded-xl border border-slate-100 bg-slate-50/50 text-sm focus:outline-none focus:border-emerald-500/30 transition-all"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <Table className="min-w-225 md:min-w-full">
                        <TableHeader className="bg-slate-50/50">
                            <TableRow className="h-14 border-slate-50">
                                <TableHead className="px-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Student & Book</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">Dates</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">Fine Status</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">Current Status</TableHead>
                                <TableHead className="text-right px-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <AnimatePresence>
                                {history.map((tr) => {
                                    const liveFine = calculateLiveFine(tr.dueDate, tr.status, tr.lateFine);
                                    return (
                                        <motion.tr 
                                            key={tr._id}
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="border-slate-50 hover:bg-emerald-50/20 transition-colors group"
                                        >
                                            {/* Student & Book Info */}
                                            <TableCell className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                                                        <User size={14} className="text-emerald-500" /> {tr.userId.name}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-slate-400 font-medium text-xs">
                                                        <BookIcon size={14} /> {tr.bookId.name}
                                                    </div>
                                                </div>
                                            </TableCell>

                                            {/* Dates */}
                                            <TableCell className="text-center">
                                                <div className="flex flex-col text-[11px] font-bold">
                                                    <span className="text-slate-400">Issued: {new Date(tr.issueDate).toLocaleDateString()}</span>
                                                    <span className={`${liveFine > 0 && tr.status !== 'returned' ? 'text-red-400' : 'text-emerald-500'}`}>
                                                        Due: {new Date(tr.dueDate).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </TableCell>

                                            {/* Fine Display */}
                                            <TableCell className="text-center">
                                                <div className="flex flex-col items-center gap-1">
                                                    <div className={`flex items-center gap-1 font-black text-sm ${liveFine > 0 ? 'text-amber-600' : 'text-slate-300'}`}>
                                                        <IndianRupee size={12} /> {liveFine}
                                                    </div>
                                                    <Badge variant="outline" className={`text-[9px] border-none px-2 py-0 ${tr.fineStatus === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                                                        {tr.fineStatus}
                                                    </Badge>
                                                </div>
                                            </TableCell>

                                            {/* Status Badge */}
                                            <TableCell className="text-center">
                                                <Badge className={`rounded-full px-3 py-1 text-[10px] font-black border-none shadow-none ${
                                                    tr.status === 'returned' 
                                                    ? 'bg-emerald-100 text-emerald-600' 
                                                    : 'bg-blue-50 text-blue-600'
                                                }`}>
                                                    {tr.status.toUpperCase()}
                                                </Badge>
                                            </TableCell>

                                            {/* Action Button */}
                                            <TableCell className="text-right px-8">
                                                {tr.status === 'issued' ? (
                                                    <Button 
                                                        size="sm"
                                                        onClick={() => handleReturn(tr._id)}
                                                        className="bg-slate-900 hover:bg-emerald-600 text-white rounded-xl h-9 px-4 font-bold text-xs transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                                                    >
                                                        <RotateCcw size={14} /> Return
                                                    </Button>
                                                ) : (
                                                    <div className="text-emerald-500 font-black text-[10px] flex items-center justify-end gap-1">
                                                        <CalendarCheck size={14} /> SETTLED
                                                    </div>
                                                )}
                                            </TableCell>
                                        </motion.tr>
                                    );
                                })}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default ManageTransactions;