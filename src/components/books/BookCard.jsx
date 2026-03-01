import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Edit3, Trash2, Eye, ChevronLeft, ChevronRight, 
    ArrowRight, Lock
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const BookCard = ({ book, onEdit, onDelete, onDetails }) => {
    const { user } = useSelector((state) => state.auth); // Access global user state
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    
    const images = book?.images || [];
    const isAdmin = user?.role === 'admin';
    const isOutOfStock = book.availableQuantity <= 0;

    // Navigation for multi-image
    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImgIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -10 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-100/40 transition-all p-5 group flex flex-col h-full"
        >
            {/* --- IMAGE SECTION --- */}
            <div className="relative aspect-[3/4] rounded-[2rem] bg-slate-50 mb-5 overflow-hidden group/img">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentImgIndex}
                        src={images[currentImgIndex]}
                        alt={book.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`w-full h-full object-cover ${isOutOfStock && !isAdmin ? 'grayscale opacity-60' : ''}`}
                    />
                </AnimatePresence>

                {/* Badges Overlay */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
                    <Badge className="bg-white/90 backdrop-blur-md text-blue-600 border-none font-bold px-3 py-1 rounded-xl shadow-sm">
                        {book.category}
                    </Badge>
                    
                    <Badge className={`border-none font-bold px-3 py-1 rounded-xl shadow-sm ${
                        isOutOfStock ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'
                    }`}>
                        {isOutOfStock ? 'Out of Stock' : `${book.availableQuantity} Left`}
                    </Badge>
                </div>

                {/* Arrows Overlay */}
                {images.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover/img:opacity-100 transition-opacity">
                        <button onClick={prevImage} className="p-2 bg-white/30 backdrop-blur-md rounded-full text-white hover:bg-white/60 transition-all cursor-pointer">
                            <ChevronLeft size={18} />
                        </button>
                        <button onClick={nextImage} className="p-2 bg-white/30 backdrop-blur-md rounded-full text-white hover:bg-white/60 transition-all cursor-pointer">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}
            </div>

            {/* --- BOOK INFO --- */}
            <div className="flex-1 space-y-2 mb-6">
                <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors uppercase tracking-tight truncate">
                    {book.name}
                </h3>
                <p className="text-xs font-bold text-slate-400 flex items-center gap-2 italic">
                    <span className="w-4 h-px bg-slate-200" /> {book.author}
                </p>
                <p className="text-[11px] font-medium text-slate-500 line-clamp-2 leading-relaxed pt-1">
                    {book.description}
                </p>
            </div>

            {/* --- DYNAMIC ACTION BUTTONS --- */}
            <div className={`grid ${isAdmin ? 'grid-cols-3' : 'grid-cols-1'} gap-3`}>
                
                {/* 1. View Details (Common for both but styled differently) */}
                <Button 
                    variant="secondary" 
                    onClick={() => onDetails(book)}
                    className={`${
                        isAdmin 
                        ? 'h-12 rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white' 
                        : 'h-14 rounded-2xl bg-slate-900 text-white hover:bg-emerald-600 shadow-lg shadow-slate-200'
                    } border-none transition-all cursor-pointer group/btn font-black uppercase text-xs tracking-widest`}
                >
                    {isAdmin ? <Eye size={20} /> : (
                        <span className="flex items-center gap-2">
                            View Details <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                    )}
                </Button>

                {/* 2. Admin Only Buttons */}
                {isAdmin && (
                    <>
                        <Button 
                            variant="secondary" 
                            onClick={() => onEdit(book)}
                            className="h-12 rounded-2xl bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white border-none transition-all cursor-pointer"
                        >
                            <Edit3 size={20} />
                        </Button>
                        <Button 
                            variant="secondary" 
                            onClick={() => onDelete(book._id)}
                            className="h-12 rounded-2xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border-none transition-all cursor-pointer"
                        >
                            <Trash2 size={20} />
                        </Button>
                    </>
                )}
            </div>

            {/* Out of Stock Overlay for Students only */}
            {!isAdmin && isOutOfStock && (
                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-black text-rose-500 uppercase tracking-tighter">
                    <Lock size={12} /> Currently Unavailable for Issue
                </div>
            )}
        </motion.div>
    );
};

export default BookCard;