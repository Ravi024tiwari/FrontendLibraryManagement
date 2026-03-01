import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Phone, Mail, Save, X, Loader2, ImagePlus, Camera } from 'lucide-react';
import { updateUser } from '../redux/slices/authSlice.js';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import axios from 'axios';

const EditProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const fileInputRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null); // RAW FILE STATE (For Backend)
    const [formData, setFormData] = useState({
        name: user?.name || "",
        mobileNo: user?.mobileNo || "",
        image: user?.image || "" // PREVIEW STATE (For UI)
    });

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile); // 1. Raw file yahan save karein

            // Preview dikhane ke liye logic
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result }); // 2. UI preview ke liye base64
                toast.success("Image selected!");
            };
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const data = new FormData();
            data.append("name", formData.name);
            data.append("mobileNo", formData.mobileNo);
            
            if (file) {
                data.append("file", file); // appending the file
            }

            const res = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/profile/update`, 
                data, 
                { 
                    withCredentials: true,
                    // Browser ko batayein ki ye multipart data hai
                    headers: { 'Content-Type': 'multipart/form-data' } 
                }
            );

            if (res.data.success) {
                dispatch(updateUser(res.data.user));
                toast.success("Identity updated successfully!");
                navigate('/profile');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 md:pt-10">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                {/* Header Section */}
                <div className="flex items-center gap-4 mb-8">
                    <button 
                        onClick={() => navigate('/profile')} 
                        className="p-3 bg-white rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer text-slate-400"
                    >
                        <X size={20} />
                    </button>
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Modify Identity</h2>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Update your profile credentials</p>
                    </div>
                </div>

                <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-8">
                        
                        {/* --- AVATAR PICKER --- */}
                        <div className="flex justify-center">
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleImageChange} 
                                accept="image/*" 
                                className="hidden" 
                            />
                            
                            <div 
                                onClick={handleImageClick}
                                className="relative group cursor-pointer"
                            >
                                <div className="w-28 h-28 rounded-[2.5rem] bg-slate-50 flex items-center justify-center border-2 border-dashed border-slate-200 overflow-hidden transition-all group-hover:border-emerald-400 group-hover:bg-emerald-50/50 shadow-inner">
                                    {formData.image ? (
                                        <img src={formData.image} className="w-full h-full object-cover" alt="Profile Preview" />
                                    ) : (
                                        <div className="text-center space-y-1">
                                            <ImagePlus className="text-slate-300 mx-auto" size={24} />
                                            <p className="text-[8px] font-black text-slate-400 uppercase">Upload Photo</p>
                                        </div>
                                    )}
                                    
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                        <Camera className="text-white" size={20} />
                                    </div>
                                </div>
                                
                                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-xl shadow-lg border-2 border-white group-hover:scale-110 transition-transform">
                                    <ImagePlus size={14} />
                                </div>
                            </div>
                        </div>

                        {/* --- TEXT INPUTS --- */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Display Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                                    <Input 
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="pl-12 h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-emerald-500/20 font-bold text-slate-700"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                                    <Input 
                                        value={formData.mobileNo}
                                        onChange={(e) => setFormData({...formData, mobileNo: e.target.value})}
                                        className="pl-12 h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-emerald-500/20 font-bold text-slate-700"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 opacity-60">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email (Immutable)</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                                    <Input value={user?.email} disabled className="pl-12 h-14 rounded-2xl bg-slate-100 border-none font-bold cursor-not-allowed" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- BUTTONS --- */}
                    <div className="flex gap-4">
                        <Button 
                            type="button"
                            variant="outline"
                            onClick={() => navigate('/profile')}
                            className="flex-1 h-14 rounded-2xl border-slate-100 font-black text-slate-400 hover:bg-white cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit"
                            disabled={loading}
                            className="flex-2 h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black shadow-lg shadow-emerald-100 cursor-pointer transition-all active:scale-95"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <><Save className="mr-2" size={18} /> Sync Profile</>}
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default EditProfile;