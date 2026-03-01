import React from 'react';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer 
} from 'recharts';

const BorrowingTrendChart = ({ data }) => {
    return (
        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm h-[400px] w-full group hover:shadow-xl hover:shadow-emerald-50 transition-all duration-500">
            <div className="mb-6 flex justify-between items-start">
                <div>
                    <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest">Borrowing Trends</h3>
                    <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-tighter mt-1">Monthly Analytics</p>
                </div>
            </div>
            
            <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        
                        <XAxis 
                            dataKey="month" // YAHAN UPDATE HAI: Ye backend ke 'month' field ko dikhayega
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} 
                            dy={10}
                        />
                        
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} 
                        />
                        
                        <Tooltip 
                            cursor={{ stroke: '#10b981', strokeWidth: 2 }}
                            contentStyle={{ 
                                borderRadius: '16px', 
                                border: 'none', 
                                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                                padding: '12px' 
                            }}
                            itemStyle={{ fontWeight: '800', fontSize: '12px', color: '#065f46' }}
                            labelStyle={{ fontWeight: '900', color: '#94a3b8', marginBottom: '4px', fontSize: '10px', textTransform: 'uppercase' }}
                        />
                        
                        <Area 
                            type="monotone" 
                            dataKey="count" // YAHAN UPDATE HAI: Ye backend ke 'count' field ko plot karega
                            stroke="#10b981" 
                            strokeWidth={4} 
                            fillOpacity={1} 
                            fill="url(#colorTrend)" 
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BorrowingTrendChart;