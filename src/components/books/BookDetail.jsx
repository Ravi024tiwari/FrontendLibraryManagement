import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronLeft, User, Info, PencilLine,
    ArrowRight, CheckCircle2, AlertCircle, Loader2, BookCopy
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Components
import AllotmentModal from './AllotmentModel';
import AddBookModal from './AddBookModel.jsx'; // Reuse your existing modal

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { allBooks } = useSelector(state => state.book);
    const { user } = useSelector(state => state.auth);
    
    const [book, setBook] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [isAllotModalOpen, setIsAllotModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        const foundBook = allBooks.find(b => b._id === id);
        if (foundBook) {
            setBook(foundBook);
            setMainImage(foundBook.images?.[0] || "");
        }
    }, [id, allBooks]);

    

    if (!book) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20">
            {/* --- TOP NAVIGATION --- */}
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-500 font-bold hover:text-blue-600 transition-all cursor-pointer group"
            >
                <div className="bg-white p-2 rounded-xl shadow-sm group-hover:bg-blue-50 transition-all">
                    <ChevronLeft size={18} />
                </div>
                Back to Inventory
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
                
                {/* --- LEFT: IMAGE GALLERY (Decreased Size - 4 Columns) --- */}
                <div className="lg:col-span-4 space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative aspect-[4/5] max-h-[450px] rounded-[2rem] bg-slate-50 border-2 border-slate-50 shadow-xl overflow-hidden mx-auto"
                    >
                        <AnimatePresence mode="wait">
                            <motion.img 
                                key={mainImage}
                                src={mainImage} 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full object-cover"
                            />
                        </AnimatePresence>
                        
                        <div className="absolute top-4 left-4">
                            <Badge className="bg-white/90 backdrop-blur-md text-blue-600 border-none px-3 py-1 rounded-xl font-bold text-xs shadow-sm">
                                {book.category}
                            </Badge>
                        </div>
                    </motion.div>

                    {/* Thumbnails Row */}
                    <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar justify-center">
                        {book.images?.map((img, idx) => (
                            <button 
                                key={idx}
                                onClick={() => setMainImage(img)}
                                className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${mainImage === img ? 'border-blue-600 scale-105 shadow-md' : 'border-transparent opacity-60'}`}
                            >
                                <img src={img} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- RIGHT: BOOK INFO & ACTIONS (8 COLUMNS) --- */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="space-y-2">
                        <Badge variant="outline" className="border-blue-100 text-blue-600 bg-blue-50/50 rounded-lg px-3 py-1 font-bold">
                            Book ID: {book._id.slice(-6).toUpperCase()}
                        </Badge>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">
                            {book.name}
                        </h1>
                        <p className="text-lg font-bold text-slate-400 flex items-center gap-2">
                            <User size={20} className="text-blue-400" /> {book.author}
                        </p>
                    </div>

                    {/* Stock Status Cards - More Compact */}
                    <div className="flex gap-4">
                        <div className="bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 space-y-0.5">
                            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Available</p>
                            <h2 className="text-2xl font-black text-blue-600">{book.availableQuantity} <span className="text-sm text-slate-300">/ {book.totalQuantity}</span></h2>
                        </div>
                        <div className="bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 space-y-0.5">
                            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Shelf Status</p>
                            <div className="flex items-center gap-1.5 font-black text-sm">
                                {book.availableQuantity > 0 ? (
                                    <><CheckCircle2 size={16} className="text-emerald-500" /> <span className="text-emerald-600">IN STOCK</span></>
                                ) : (
                                    <><AlertCircle size={16} className="text-red-500" /> <span className="text-red-600">OUT OF STOCK</span></>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="flex items-center gap-2 text-slate-900 font-black text-md">
                            <Info size={18} className="text-blue-600" />
                            Summary
                        </h4>
                        <p className="text-slate-500 font-medium leading-relaxed text-md max-w-2xl">
                            {book.description || "Detailed overview is currently unavailable for this title."}
                        </p>
                    </div>

                    <hr className="border-slate-100" />

                    {/* ACTION BUTTONS GRID */}
                    {user?.role === 'admin' && (
                        <div className="flex flex-wrap gap-4 pt-2">
                            <Button 
                                onClick={() => setIsAllotModalOpen(true)}
                                disabled={book.availableQuantity === 0}
                                className="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black shadow-lg shadow-blue-100 transition-all cursor-pointer group"
                            >
                                Allot Book <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>

                            <Button 
                                onClick={() => setIsEditModalOpen(true)}
                                variant="outline"
                                className="h-14 px-8 rounded-2xl border-2 border-slate-200 hover:border-amber-500 hover:bg-amber-50 text-slate-600 hover:text-amber-600 font-black transition-all cursor-pointer"
                            >
                                <PencilLine className="mr-2 w-5 h-5" /> Edit Metadata
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* --- MODALS --- */}
            <AllotmentModal 
                open={isAllotModalOpen} 
                setOpen={setIsAllotModalOpen}
                book={book}
            />

            <AddBookModal 
                open={isEditModalOpen}
                setOpen={setIsEditModalOpen}
                selectedBook={book} // Prefills data
                setSelectedBook={setBook} // Updates UI after edit
            />
        </div>
    );
};

export default BookDetails;