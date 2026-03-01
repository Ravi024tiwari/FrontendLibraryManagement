import React from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { BookCheck, Calendar, IndianRupee, Clock, Info, AlertCircle } from 'lucide-react';
import useGetCurrentIssued from '../hooks/useGetCurrentlyIssuedBooks.js';
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MyCurrentIssueBooks = () => {
    useGetCurrentIssued(); // Hook call
    const { currentIssuedBooks, loading } = useSelector((state) => state.student);

    // Live Fine Calculator
    const calculateFine = (dueDate) => {
        const today = new Date();
        const due = new Date(dueDate);
        if (today > due) {
            const diffDays = Math.ceil(Math.abs(today - due) / (1000 * 60 * 60 * 24));
            return diffDays * 10;
        }
        return 0;
    };

    return (
        <div className="space-y-6 p-1 pb-10 max-w-350 mx-auto">
            
            {/* --- HEADER --- */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-2 mb-2">
                    <BookCheck className="text-emerald-500 w-5 h-5" />
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Active Possession</span>
                </div>
                <h1 className="text-4xl font-medium text-slate-800 tracking-tight">
                    My Issued <span className="text-emerald-600 font-serif italic">Books</span>
                </h1>
                <p className="text-slate-400 font-medium text-sm mt-1">Currently holding {currentIssuedBooks.length} books from the library.</p>
            </motion.div>

            {/* --- TABLE SECTION --- */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/50">
                <div className="overflow-x-auto custom-scrollbar">
                    <Table className="min-w-200 md:min-w-full">
                        <TableHeader className="bg-slate-50/50">
                            <TableRow className="h-16 border-slate-50 hover:bg-transparent">
                                <TableHead className="px-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Book Details</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Issue Date</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Due Date</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Current Fine</TableHead>
                                <TableHead className="text-right px-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <AnimatePresence mode="wait">
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-64 text-center">
                                            <div className="flex flex-col items-center justify-center gap-3">
                                                <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                                                <p className="text-slate-400 font-bold text-xs uppercase tracking-tighter">Updating Shelf...</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : currentIssuedBooks.length > 0 ? (
                                    currentIssuedBooks.map((item, idx) => {
                                        const fine = calculateFine(item.dueDate);
                                        const isOverdue = fine > 0;

                                        return (
                                            <TableRow key={item._id} className="border-slate-50 group hover:bg-emerald-50/20 transition-all duration-300">
                                                <TableCell className="px-8 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-16 rounded-xl overflow-hidden bg-slate-100 shadow-sm group-hover:scale-105 transition-transform duration-300">
                                                            <img src={item.bookId.images[0]} alt="" className="w-full h-full object-cover" />
                                                        </div>
                                                        <div>
                                                            <p className="font-black text-slate-800 text-sm leading-tight uppercase">{item.bookId.name}</p>
                                                            <p className="text-[11px] font-bold text-slate-400 italic">by {item.bookId.author}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <div className="flex flex-col items-center gap-1">
                                                        <Calendar size={14} className="text-slate-300" />
                                                        <span className="text-xs font-bold text-slate-500">{new Date(item.issueDate).toLocaleDateString()}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <div className="flex flex-col items-center gap-1">
                                                        <Clock size={14} className={isOverdue ? "text-rose-400 animate-pulse" : "text-slate-300"} />
                                                        <span className={`text-xs font-black ${isOverdue ? "text-rose-500" : "text-slate-600"}`}>
                                                            {new Date(item.dueDate).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-black text-xs ${fine > 0 ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-slate-50 text-slate-300'}`}>
                                                        <IndianRupee size={12} /> {fine}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right px-8">
                                                    <Badge className={`rounded-lg px-3 py-1 font-black text-[10px] border-none shadow-none ${isOverdue ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                                        {isOverdue ? 'OVERDUE' : 'ON TIME'}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-60 text-center">
                                            <div className="flex flex-col items-center gap-2 opacity-30">
                                                <Info size={48} className="text-slate-300" />
                                                <p className="text-slate-500 font-black uppercase tracking-widest text-sm">No Active Issues Found</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* --- BOTTOM TIPS --- */}
            <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-3xl flex items-start gap-3">
                <AlertCircle className="text-amber-500 w-5 h-5 mt-0.5 shrink-0" />
                <p className="text-[11px] font-bold text-amber-700 leading-relaxed uppercase tracking-wide">
                    Please return books before the due date to avoid a penalty of <span className="underline decoration-2">₹10 per day</span>. 
                    If you have a high overdue balance, your account might be temporarily suspended from issuing new books.
                </p>
            </div>
        </div>
    );
};

export default MyCurrentIssueBooks;