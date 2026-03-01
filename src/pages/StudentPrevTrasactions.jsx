import React from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { History, CalendarDays, CheckCircle2, IndianRupee, BookOpen, Search } from 'lucide-react';
import useGetPreviousTransactions from '../hooks/useGetPreviousTransactions.js';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const StudentPreviousTrasactionHistory = () => {
    useGetPreviousTransactions(); // Hook call
    const { previousIssuedBooks, loading } = useSelector((state) => state.student);

    return (
        <div className="space-y-6 p-1 pb-10 max-w-350 mx-auto">
            
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="flex items-center gap-2 mb-1">
                        <History className="text-blue-500 w-4 h-4" />
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Reading Archives</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-medium text-slate-800 tracking-tight">
                        Past <span className="text-emerald-600 font-serif italic">Logbook</span>
                    </h1>
                </motion.div>

                {/* Counter Badge */}
                <div className="bg-white border border-slate-100 px-4 py-2 rounded-2xl shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Returned</p>
                    <p className="text-xl font-black text-slate-800 leading-none mt-1">{previousIssuedBooks.length}</p>
                </div>
            </div>

            {/* --- COMPACT TABLE --- */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <Table className="min-w-175 md:min-w-full">
                        <TableHeader className="bg-slate-50/50">
                            <TableRow className="h-14 border-slate-50">
                                <TableHead className="px-4 md:px-8 text-[9px] font-black uppercase tracking-widest text-slate-400">Book Details</TableHead>
                                <TableHead className="text-[9px] font-black uppercase tracking-widest text-slate-400 text-center">Duration</TableHead>
                                <TableHead className="text-[9px] font-black uppercase tracking-widest text-slate-400 text-center">Fine Paid</TableHead>
                                <TableHead className="text-right px-4 md:px-8 text-[9px] font-black uppercase tracking-widest text-slate-400">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <AnimatePresence mode="wait">
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-60 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                                                <span className="text-[10px] font-black text-slate-400 uppercase">Fetching Logs...</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : previousIssuedBooks.length > 0 ? (
                                    previousIssuedBooks.map((log) => (
                                        <TableRow key={log._id} className="group border-slate-50 hover:bg-slate-50/50 transition-all duration-300">
                                            {/* Book Info */}
                                            <TableCell className="px-4 md:px-8 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-14 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200/50">
                                                        <img src={log.bookId.images[0]} alt="" className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all" />
                                                    </div>
                                                    <div className="overflow-hidden">
                                                        <p className="font-black text-slate-800 text-xs md:text-sm truncate uppercase tracking-tight">{log.bookId.name}</p>
                                                        <p className="text-[10px] font-bold text-slate-400 italic truncate">by {log.bookId.author}</p>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            {/* Duration (Issue to Return) */}
                                            <TableCell className="text-center">
                                                <div className="flex flex-col items-center gap-1">
                                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                                                        <span className="text-blue-500">In:</span> {new Date(log.issueDate).toLocaleDateString()}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                                                        <span className="text-emerald-500">Out:</span> {new Date(log.returnDate).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </TableCell>

                                            {/* Fine Details */}
                                            <TableCell className="text-center">
                                                <div className="flex flex-col items-center">
                                                    <div className={`flex items-center gap-0.5 font-black text-xs ${log.lateFine > 0 ? 'text-amber-600' : 'text-slate-300'}`}>
                                                        <IndianRupee size={10} /> {log.lateFine}
                                                    </div>
                                                    <span className="text-[9px] font-bold uppercase text-slate-300 tracking-tighter">
                                                        {log.fineStatus}
                                                    </span>
                                                </div>
                                            </TableCell>

                                            {/* Final Status */}
                                            <TableCell className="text-right px-4 md:px-8">
                                                <div className="flex flex-col items-end gap-1">
                                                    <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 rounded-lg px-2 py-0.5 text-[9px] font-black shadow-none">
                                                        SETTLED
                                                    </Badge>
                                                    <div className="flex items-center gap-1 text-[9px] font-bold text-slate-300">
                                                        <CheckCircle2 size={10} /> Verified
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-48 text-center opacity-30">
                                            <BookOpen className="mx-auto mb-2" size={32} />
                                            <p className="text-[10px] font-black uppercase">No completed transactions found.</p>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* --- ARCHIVE NOTE --- */}
            <div className="flex items-center gap-2 justify-center py-4 border-t border-slate-50">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">End of Archive Record</p>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            </div>
        </div>
    );
};

export default StudentPreviousTrasactionHistory;