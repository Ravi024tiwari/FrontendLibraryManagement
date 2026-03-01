import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { updateBookInStore } from '@/redux/slices/bookSlice';
import { 
    Dialog, DialogContent, DialogHeader, DialogTitle, 
    DialogDescription, DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Loader2, SendHorizontal } from 'lucide-react';

const AllotmentModal = ({ open, setOpen, book }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const allotmentHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/issue/book`, { //pass the data by using body {email ,bookId}
                email,
                bookId: book._id
            }, { withCredentials: true });

            if (res.data.success) {
                toast.success(`Book issued to student successfully!`);
                
                // Redux mein available quantity update karein
                dispatch(updateBookInStore({
                    ...book,
                    availableQuantity: book.availableQuantity - 1
                }));
                
                setOpen(false);
                setEmail("");
            }
        } catch (error) {
            console.error(error);
            // Error handling: User not found / Limit exceeded
            toast.error(error.response?.data?.message || "Allotment failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-112.5 rounded-[2.5rem] p-8 border-none shadow-2xl">
                <DialogHeader>
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4 mx-auto">
                        <SendHorizontal size={28} />
                    </div>
                    <DialogTitle className="text-2xl font-black text-slate-900 text-center tracking-tight">
                        Confirm Allotment
                    </DialogTitle>
                    <DialogDescription className="text-center font-bold text-slate-500">
                        Enter the registered email of the student to issue <span className="text-blue-600">"{book?.name}"</span>.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={allotmentHandler} className="space-y-6 pt-4">
                    <div className="relative group">
                        <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <Input 
                            type="email"
                            placeholder="student@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-12 h-14 rounded-2xl border-slate-200 focus:ring-4 focus:ring-blue-50 font-bold"
                            required
                        />
                    </div>

                    <DialogFooter>
                        <Button 
                            type="submit" 
                            disabled={loading || !email}
                            className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-black text-lg transition-all cursor-pointer shadow-lg shadow-slate-100"
                        >
                            {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                            Process Issuance
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AllotmentModal;