import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, UserMinus, Mail, Calendar, Loader2, 
    ChevronLeft, ChevronRight, GraduationCap, Info
} from 'lucide-react';
import useGetAllStudents from '@/hooks/useGetAllStudents';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from 'sonner';

const ManageStudents = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    
    // Custom hook to fetch data
    useGetAllStudents(page, search);
    const { students, pagination, loading } = useSelector(state => state.admin);

    const handleDeleteStudent = (id, lateFine) => {
        if (lateFine > 0) {
            toast.error("Process Halted: Student has outstanding dues.");
            return;
        }
        toast.info("Preparing to remove student record...");
    };

    return (
        <div className="space-y-5 md:space-y-6 p-2 md:p-4 pb-12 max-w-[1400px] mx-auto">
            
            {/* --- ELEGANT HEADER (Compact Spacing) --- */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8 border-b border-slate-100 pb-5 md:pb-6">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex items-center gap-2 mb-1 md:mb-2">
                        <div className="p-1.5 bg-emerald-50 rounded-lg">
                            <GraduationCap className="text-emerald-600 w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-600/70">Registry</span>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-medium text-slate-800 tracking-tight">
                        Student <span className="text-emerald-600 font-serif italic">Directory</span>
                    </h1>
                    <p className="text-xs md:text-sm text-slate-400 font-medium mt-1">
                        Monitoring <span className="text-amber-500 font-bold">{pagination.totalStudents}</span> verified members.
                    </p>
                </motion.div>

                {/* Search Bar - Full width on mobile */}
                <div className="relative group w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                    <Input 
                        placeholder="Search by name or email..." 
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        className="pl-11 h-11 md:h-12 w-full rounded-xl md:rounded-2xl border-slate-100 bg-slate-50/50 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500/40 transition-all placeholder:text-slate-300 text-sm font-medium"
                    />
                </div>
            </div>

            {/* --- RESPONSIVE TABLE CONTAINER --- */}
            <div className="bg-white rounded-2xl md:rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <Table className="min-w-[800px] md:min-w-full">
                        <TableHeader className="bg-slate-50/30">
                            <TableRow className="border-slate-50 h-14 hover:bg-transparent">
                                <TableHead className="w-16 px-6 text-slate-400 font-bold text-[9px] uppercase tracking-widest text-center">ID</TableHead>
                                <TableHead className="text-slate-400 font-bold text-[9px] uppercase tracking-widest">Member Profile</TableHead>
                                <TableHead className="text-slate-400 font-bold text-[9px] uppercase tracking-widest text-center">Status</TableHead>
                                <TableHead className="text-slate-400 font-bold text-[9px] uppercase tracking-widest">Enrolled Date</TableHead>
                                <TableHead className="text-right px-8 text-slate-400 font-bold text-[9px] uppercase tracking-widest">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <AnimatePresence mode="wait">
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-64 text-center">
                                            <div className="flex flex-col items-center justify-center gap-3">
                                                <Loader2 className="w-7 h-7 text-emerald-500 animate-spin" />
                                                <p className="text-slate-400 font-medium text-xs tracking-wide uppercase">Syncing Registry...</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : students?.length > 0 ? (
                                    students.map((student, idx) => (
                                        <TableRow key={student._id} className="border-slate-50 group hover:bg-emerald-50/20 transition-all duration-300">
                                            <TableCell className="px-6 font-medium text-slate-300 text-center text-[11px]">
                                                #{(page - 1) * 10 + idx + 1}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3 md:gap-4">
                                                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center text-amber-600 font-bold text-xs border border-amber-200/50 shadow-sm">
                                                        {student.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-700 text-xs md:text-sm">{student.name}</p>
                                                        <p className="text-[10px] md:text-xs font-medium text-slate-400 lowercase">{student.email}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge className={`rounded-lg px-2.5 py-1 font-bold text-[9px] border shadow-none transition-colors ${
                                                    student.activeBooksCount > 0 
                                                    ? 'bg-amber-50 text-amber-600 border-amber-100' 
                                                    : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                }`}>
                                                    {student.activeBooksCount > 0 ? `${student.activeBooksCount} BOOKS HELD` : 'CLEAN RECORD'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2 text-slate-400 font-medium text-[11px]">
                                                    <Calendar size={13} className="opacity-40" />
                                                    {new Date(student.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right px-8">
                                                <Button 
                                                    variant="ghost" 
                                                    onClick={() => handleDeleteStudent(student._id, student.lateFine || 0)}
                                                    className={`h-9 w-9 md:h-10 md:w-10 rounded-xl transition-all cursor-pointer ${
                                                        (student.lateFine || 0) > 0 
                                                        ? 'opacity-20 cursor-not-allowed grayscale' 
                                                        : 'hover:bg-red-50 text-slate-300 hover:text-red-500'
                                                    }`}
                                                >
                                                    <UserMinus size={16} md:size={18} />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-48 text-center">
                                            <div className="flex flex-col items-center gap-2 opacity-30">
                                                <Info size={32} className="text-slate-300" />
                                                <p className="text-slate-400 font-medium text-xs tracking-tight">No matching members found</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* --- SOFT PAGINATION (Improved for Mobile) --- */}
            <div className="flex flex-row items-center justify-between px-2 md:px-4 pt-2">
                <div className="text-[9px] md:text-[10px] font-bold text-slate-300 uppercase tracking-[0.15em]">
                    Page <span className="text-slate-500">{page}</span> / {pagination.totalPages}
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                    <button 
                        disabled={page === 1 || loading}
                        onClick={() => setPage(p => p - 1)}
                        className="p-1.5 md:p-2 rounded-lg md:rounded-xl border border-slate-100 bg-white text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm cursor-pointer"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button 
                        disabled={page === pagination.totalPages || loading}
                        onClick={() => setPage(p => p + 1)}
                        className="p-1.5 md:p-2 rounded-lg md:rounded-xl border border-slate-100 bg-white text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm cursor-pointer"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManageStudents;