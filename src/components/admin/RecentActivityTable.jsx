import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Clock } from 'lucide-react';

const RecentActivityTable = ({ transactions }) => {
    return (
        <Card className="border-none shadow-xl shadow-slate-100/50 rounded-[2.5rem] bg-white overflow-hidden">
            <CardHeader className="px-8 pt-8 flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-black text-slate-800 flex items-center gap-3">
                    <div className="w-1.5 h-7 bg-blue-600 rounded-full"></div>
                    Recent Activity
                </CardTitle>
                <button className="text-xs font-black text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-full flex items-center gap-1 transition-all cursor-pointer">
                    View All History <ChevronRight className="w-4 h-4" />
                </button>
            </CardHeader>
            <CardContent className="px-8 pb-8">
                <Table>
                    <TableHeader className="bg-slate-50/50 rounded-xl">
                        <TableRow className="border-none hover:bg-transparent">
                            <TableHead className="font-black text-slate-400 uppercase text-[10px] tracking-widest">Student</TableHead>
                            <TableHead className="font-black text-slate-400 uppercase text-[10px] tracking-widest">Book Title</TableHead>
                            <TableHead className="font-black text-slate-400 uppercase text-[10px] tracking-widest">Action</TableHead>
                            <TableHead className="font-black text-slate-400 uppercase text-[10px] tracking-widest">Date & Time</TableHead>
                            <TableHead className="font-black text-slate-400 uppercase text-[10px] tracking-widest text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions?.map((transaction, i) => (
                            <TableRow key={i} className="border-b border-slate-50 hover:bg-blue-50/30 transition-colors group cursor-default">
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
                                            {transaction.studentName?.charAt(0)}
                                        </div>
                                        <span className="font-bold text-slate-700">{transaction.studentName}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium text-slate-600">{transaction.bookTitle}</TableCell>
                                <TableCell>
                                    <Badge className={transaction.type === 'Issue' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none'}>
                                        {transaction.type}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-slate-500 font-medium">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-3 h-3" />
                                        {transaction.date}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <span className="text-slate-900 font-black">Completed</span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default RecentActivityTable;