import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'sonner';

import useGetAllBooks from '@/hooks/useGetAllBooks';
import { removeBookFromStore } from '@/redux/slices/bookSlice';

import { Plus, Search, Loader2, BookCopy } from 'lucide-react';

import { Input } from "@/components/ui/input";
import BookCard from '@/components/books/BookCard';
import AddBookModal from '@/components/books/AddBookModel.jsx';
import DeleteBookDialog from '@/components/books/DeleteConfirmationBook';
import { useNavigate } from 'react-router-dom';

const ManageBooks = () => {
    useGetAllBooks(); 
    const dispatch = useDispatch();
    const navigate =useNavigate();//here ew do the navigation

    // 2. Redux State
    const { allBooks, loading } = useSelector(state => state.book);//here we get all books
    
    // 3. Local States for UI Control
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    
    // States for selected data
    const [selectedBook, setSelectedBook] = useState(null); // For Editing
    const [selectedBookId, setSelectedBookId] = useState(null); // For Deleting
    const [deleteLoading, setDeleteLoading] = useState(false);

    // 4. Search Logic
    const filteredBooks = allBooks?.filter(book => 
        book.name.toLowerCase().includes(search.toLowerCase()) || 
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.category.toLowerCase().includes(search.toLowerCase())
    );

    // 5. Handlers
    const handleEdit = (book) => {
        setSelectedBook(book); // Book ka poora data set karein
        setIsModalOpen(true);   // Modal kholein (Edit mode automatically trigger ho jayega)
    };

    const handleDeleteClick = (id) => {
        setSelectedBookId(id);
        setIsDeleteOpen(true); // Confirmation dialog kholein
    };

    const handleDeleteConfirm = async () => {
        try {
            setDeleteLoading(true);
            const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/book/delete/${selectedBookId}`, {
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(removeBookFromStore(selectedBookId)); // Store se turant remove karein
                toast.success("Book removed from catalog");
                setIsDeleteOpen(false);
                setSelectedBookId(null);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to delete book");
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleViewDetails = (book) => {
        navigate(`/admin/book/${book._id}`);
    };

    return (
        <div className="space-y-8 p-1 pb-10">
            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
                        <BookCopy className="text-blue-600 w-10 h-10" />
                        Manage Inventory
                    </h1>
                    <p className="text-slate-500 font-bold mt-1 ml-1">
                        Displaying <span className="text-blue-600">{filteredBooks?.length || 0}</span> results out of {allBooks?.length} books.
                    </p>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-4 items-center w-full lg:w-auto">
                    {/* Search Bar */}
                    <div className="relative w-full sm:w-80 group">
                        <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <Input 
                            placeholder="Find by title, author, category..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-12 h-12 rounded-2xl border-slate-200 focus-visible:ring-4 focus-visible:ring-blue-50 focus-visible:border-blue-500 shadow-sm font-medium"
                        />
                    </div>
                    
                    {/* Add Book Button */}
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            setSelectedBook(null); // Ensure Add mode
                            setIsModalOpen(true);
                        }}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all cursor-pointer"
                    >
                        <Plus size={22} strokeWidth={3} />
                        <span>Add New Book</span>
                    </motion.button>
                </div>
            </div>

            {/* --- BOOKS DISPLAY GRID --- */}
            {loading ? (
                <div className="flex flex-col h-80 items-center justify-center gap-4">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin stroke-[3px]" />
                    <p className="text-blue-600 font-black text-xs uppercase tracking-widest animate-pulse">Syncing Catalog...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    <AnimatePresence mode='popLayout'>
                        {filteredBooks?.map((book) => (
                            <BookCard 
                                key={book._id} 
                                book={book} 
                                onDelete={handleDeleteClick}
                                onEdit={handleEdit}
                                onDetails={(b) => handleViewDetails(b)}//here we will render on this page when we click on that btn 
                            />
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* --- EMPTY STATE --- */}
            {!loading && filteredBooks?.length === 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200"
                >
                    <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <Search className="text-slate-300 w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">No books found</h3>
                    <p className="text-slate-400 font-bold mt-1">Try refining your search or add a new title to the system.</p>
                </motion.div>
            )}

            {/* --- MODALS & DIALOGS --- */}
            
            {/* 1. Add/Edit Book Modal */}
            <AddBookModal 
                open={isModalOpen} 
                setOpen={setIsModalOpen} 
                selectedBook={selectedBook}
                setSelectedBook={setSelectedBook}
            />

            {/* 2. Delete Confirmation Dialog */}
            <DeleteBookDialog 
                open={isDeleteOpen}
                setOpen={setIsDeleteOpen}
                onConfirm={handleDeleteConfirm}
                loading={deleteLoading}
            />
        </div>
    );
};

export default ManageBooks;