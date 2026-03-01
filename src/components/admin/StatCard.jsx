import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const StatCard = ({ title, value, icon: Icon, color, bg, label, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, type: "spring", stiffness: 100 }}
        >
            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(37,99,235,0.1)] transition-all duration-500 rounded-[2rem] group cursor-default">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-4 rounded-2xl ${bg} ${color} group-hover:rotate-6 transition-transform`}>
                            <Icon className="w-7 h-7" />
                        </div>
                        <Badge variant="outline" className="border-slate-100 text-slate-400 font-bold uppercase text-[9px] tracking-widest">
                            {label}
                        </Badge>
                    </div>
                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-1">
                        {value || 0}
                    </h3>
                    <p className="text-sm font-bold text-slate-500">{title}</p>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default StatCard;