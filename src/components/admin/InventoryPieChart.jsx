import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'];

const InventoryPieChart = ({ data }) => {
    return (
        <Card className="border-none shadow-xl shadow-slate-100/50 rounded-[2.5rem] bg-white flex flex-col">
            <CardHeader className="px-8 pt-8 text-center">
                <CardTitle className="text-xl font-black text-slate-800 tracking-tight">Inventory Mix</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center pb-8">
                <div className="h-[220px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                innerRadius={70}
                                outerRadius={90}
                                paddingAngle={8}
                                dataKey="value"
                                stroke="none"
                            >
                                {data?.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                
                <div className="w-full mt-6 space-y-3 px-4">
                    {data?.slice(0, 4).map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/50 border border-slate-100/50">
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                                <span className="text-sm font-bold text-slate-600">{item.name}</span>
                            </div>
                            <span className="text-xs font-black text-blue-600">{item.value} qty</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default InventoryPieChart;