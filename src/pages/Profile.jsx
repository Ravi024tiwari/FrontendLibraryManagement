import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, ShieldCheck, Edit3, ArrowLeft, UserCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const infoItems = [
        { label: "Full Identity", value: user?.name, icon: User },
        { label: "Verified Email", value: user?.email, icon: Mail },
        { label: "Contact Number", value: user?.mobileNo || "Not Provided", icon: Phone },
        { label: "Account Role", value: user?.role?.toUpperCase(), icon: ShieldCheck },
    ];

    return (
        <div className="max-w-3xl mx-auto p-2 md:pt-10">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden"
            >
                {/* Visual Header */}
                <div className={`h-40 w-full bg-linear-to-br ${user?.role === 'admin' ? 'from-blue-600 to-indigo-600' : 'from-emerald-600 to-teal-600'} relative`}>
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                </div>

                <div className="px-6 md:px-12 pb-12">
                    {/* Avatar & Header Info */}
                    <div className="relative -mt-20 flex flex-col items-center md:items-start md:flex-row md:gap-8 mb-12">
                        <div className="w-40 h-40 rounded-[3rem] bg-white p-2 shadow-2xl shadow-slate-300">
                            <div className="w-full h-full rounded-[2.5rem] bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-100">
                                {user?.image ? (
                                    <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <UserCircle size={80} className="text-slate-200" />
                                )}
                            </div>
                        </div>
                        
                        <div className="mt-6 md:mt-24 space-y-2 text-center md:text-left">
                            <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-none">{user?.name}</h1>
                            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] flex items-center justify-center md:justify-start gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Verified {user?.role}
                            </p>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {infoItems.map((item, idx) => (
                            <div key={idx} className="p-6 rounded-[2rem] bg-slate-50/50 border border-slate-100/50 group hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-300">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <item.icon size={14} className="text-slate-300" /> {item.label}
                                </p>
                                <p className="text-sm font-black text-slate-700">{item.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Action Button */}
                    <div className="mt-12 flex justify-center md:justify-end">
                        <Button 
                            onClick={() => navigate('/profile/edit')}
                            className="h-14 px-10 rounded-2xl bg-slate-900 hover:bg-emerald-600 text-white font-black flex items-center gap-3 transition-all cursor-pointer shadow-lg shadow-slate-200"
                        >
                            <Edit3 size={18} /> Modify Profile
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;