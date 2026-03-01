import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { addBookToStore, updateBookInStore, setBookLoading } from '@/redux/slices/bookSlice';
import { 
    Dialog, DialogContent, DialogHeader, DialogTitle, 
    DialogDescription, DialogFooter 
} from "@/components/ui/dialog";
import { 
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, BookPlus, PencilLine, Upload, X, ImageIcon } from 'lucide-react';

const AddBookModal = ({ open, setOpen, selectedBook, setSelectedBook }) => {
    const categories = ['Fiction', 'Placement', 'Programming', 'History', 'Biography', 'Mathematics', 'Business', 'Other'];

    const [input, setInput] = useState({
        name: "",
        author: "",
        category: "Other",
        totalQuantity: 1,
        availableQuantity: 1,
        description: "",
    });

    const [files, setFiles] = useState([]); // Selected files array
    const [previews, setPreviews] = useState([]); // Preview URLs

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.book);

    // 1. Logic to pre-fill data when editing

    useEffect(() => {
        if (selectedBook) {
            setInput({
                name: selectedBook.name || "",
                author: selectedBook.author || "",
                category: selectedBook.category || "Other",
                totalQuantity: selectedBook.totalQuantity || 1,
                availableQuantity: selectedBook.availableQuantity || 1,
                description: selectedBook.description || "",
            });
            setPreviews(selectedBook.files || []); 
        } else {
            setInput({ name: "", author: "", category: "Other", totalQuantity: 1, availableQuantity: 1, description: "" });
            setFiles([]);
            setPreviews([]);
        }
    }, [selectedBook, open]);

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value,
            ...(name === "totalQuantity" && !selectedBook ? { availableQuantity: value } : {})
        }));
    };

    // 2. Local File Selection Handler
    const fileChangeHandler = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(prev => [...prev, ...selectedFiles]);

        // Create previews for the UI
        const filePreviews = selectedFiles.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...filePreviews]);
    };

    const removePreview = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    // 3. Submit Handler using FormData
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("author", input.author);
        formData.append("category", input.category);
        formData.append("totalQuantity", input.totalQuantity);
        formData.append("availableQuantity", input.availableQuantity);
        formData.append("description", input.description);

        // Append multiple files
        files.forEach(file => {
            formData.append("files", file);
        });

        try {
            dispatch(setBookLoading(true));
            let res;
            
            if (selectedBook) {
                res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/book/update/${selectedBook._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(updateBookInStore(res.data.book));
                    toast.success("Book updated successfully!");
                }
            } else {
                res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/book/add`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(addBookToStore(res.data.book));
                    toast.success("Book added to collection!");
                }
            }

            if (res.data.success) {
                setOpen(false);
                setSelectedBook(null);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setBookLoading(false));
        }
    };

    return (
        <Dialog open={open} onOpenChange={(val) => { setOpen(val); if(!val) setSelectedBook(null); }}>
            <DialogContent className="sm:max-w-162.5 rounded-[2.5rem] p-8 border-none shadow-2xl max-h-[95vh] overflow-y-auto custom-scrollbar">
                <DialogHeader>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${selectedBook ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>
                        {selectedBook ? <PencilLine size={24} /> : <BookPlus size={24} />}
                    </div>
                    <DialogTitle className="text-3xl font-black text-slate-900 tracking-tight">
                        {selectedBook ? "Edit Book" : "Add New Listing"}
                    </DialogTitle>
                    <DialogDescription className="font-bold text-slate-500">
                        Upload cover files and book details for the library inventory.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submitHandler} className="space-y-6 py-4">
                    {/* --- IMAGE UPLOAD SECTION --- */}
                    <div className="space-y-3">
                        <Label className="font-black text-slate-700 ml-1">Book Covers (Local Upload)</Label>
                        <div className="grid grid-cols-4 gap-4">
                            {/* Previews */}
                            {previews.map((src, index) => (
                                <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-slate-100 group">
                                    <img src={src} alt="preview" className="w-full h-full object-cover" />
                                    <button 
                                        type="button"
                                        onClick={() => removePreview(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                            
                            {/* Upload Button */}
                            <label className="flex flex-col items-center justify-center aspect-square rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer group">
                                <Upload className="text-slate-400 group-hover:text-blue-600 mb-1" size={24} />
                                <span className="text-[10px] font-black text-slate-400 group-hover:text-blue-600 uppercase tracking-tighter">Browse</span>
                                <input type="file" multiple accept="image/*" className="hidden" onChange={fileChangeHandler} />
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div className="col-span-2 space-y-1.5">
                            <Label className="font-bold text-slate-700 ml-1">Book Name</Label>
                            <Input name="name" value={input.name} onChange={changeEventHandler} className="rounded-xl h-12" required />
                        </div>

                        <div className="space-y-1.5">
                            <Label className="font-bold text-slate-700 ml-1">Author</Label>
                            <Input name="author" value={input.author} onChange={changeEventHandler} className="rounded-xl h-12" required />
                        </div>

                        <div className="space-y-1.5">
                            <Label className="font-bold text-slate-700 ml-1">Category</Label>
                            <Select onValueChange={(val) => setInput({...input, category: val})} value={input.category}>
                                <SelectTrigger className="rounded-xl h-12"><SelectValue /></SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5">
                            <Label className="font-bold text-slate-700 ml-1">Stock Quantity</Label>
                            <Input type="number" name="totalQuantity" value={input.totalQuantity} onChange={changeEventHandler} className="rounded-xl h-12" required />
                        </div>

                        <div className="space-y-1.5">
                            <Label className="font-bold text-slate-700 ml-1">In Shelf (Available)</Label>
                            <Input type="number" name="availableQuantity" value={input.availableQuantity} onChange={changeEventHandler} className="rounded-xl h-12" required />
                        </div>

                        <div className="col-span-2 space-y-1.5">
                            <Label className="font-bold text-slate-700 ml-1">Short Description</Label>
                            <Textarea name="description" value={input.description} onChange={changeEventHandler} className="rounded-2xl min-h-[100px] resize-none" />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={loading} className={`w-full h-14 text-lg font-black rounded-2xl shadow-lg cursor-pointer ${selectedBook ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-100' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'}`}>
                            {loading ? <Loader2 className="animate-spin mr-2" /> : <BookPlus className="mr-2" />}
                            {selectedBook ? "Save Changes" : "Create Book Entry"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddBookModal;