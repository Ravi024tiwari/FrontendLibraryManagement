import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Library, LayoutGrid, SlidersHorizontal, Sparkles } from 'lucide-react';
import BookCard from '../books/BookCard.jsx';
import { Input } from "@/components/ui/input";
import useGetAllBooks from '@/hooks/useGetAllBooks.js';//here we call its for the student to fetch all the books

const ExploreBooks = () => {
    useGetAllBooks();//it set all the books 
    
    const navigate = useNavigate();
    const { allBooks } = useSelector(state => state.book);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // 1. Dynamic Categories nikalna (unique values)
    const categories = useMemo(() => {
        const cats = allBooks?.map(book => book.category) || [];
        return ["All", ...new Set(cats)];
    }, [allBooks]);

    // 2. Filter Logic: Search + Category
    const filteredBooks = allBooks?.filter(book => {
        const matchesSearch = book.name.toLowerCase().includes(search.toLowerCase()) || 
                              book.author.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-8 p-1 pb-20">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="text-emerald-500 w-4 h-4" />
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Digital Library</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-medium text-slate-800 tracking-tight">
                            Explore <span className="text-emerald-600 font-serif italic">Books</span>
                        </h1>
                    </motion.div>

                    {/* Search Bar with Glow */}
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                        <Input 
                            placeholder="Find your next read..." 
                            className="pl-11 h-14 rounded-2xl border-slate-100 bg-white shadow-sm focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500/40 transition-all font-medium"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* --- CATEGORY PILLS --- */}
                <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                    <div className="p-2 bg-slate-100 rounded-xl text-slate-400">
                        <SlidersHorizontal size={18} />
                    </div>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer ${
                                selectedCategory === cat 
                                ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                                : 'bg-white text-slate-400 border border-slate-100 hover:border-emerald-200 hover:text-emerald-600'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- BOOK GRID --- */}
            <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8"
            >
                <AnimatePresence mode='popLayout'>
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book) => (
                            <motion.div 
                                layout
                                key={book._id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <BookCard 
                                    book={book} 
                                    onDetails={(b) => navigate(`/student/book/${b._id}`)} 
                                />
                            </motion.div>
                        ))
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            className="col-span-full h-80 flex flex-col items-center justify-center text-center"
                        >
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                <Library size={40} className="text-slate-200" />
                            </div>
                            <h3 className="text-slate-400 font-black uppercase tracking-widest text-sm">No matches found</h3>
                            <p className="text-slate-300 text-xs font-medium mt-1">Try adjusting your search or category filter.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default ExploreBooks;