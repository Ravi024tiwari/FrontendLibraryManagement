import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2, Trash2 } from 'lucide-react';

const DeleteBookDialog = ({ open, setOpen, onConfirm, loading }) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="rounded-[2.5rem] p-8 border-none shadow-2xl">
        <AlertDialogHeader>
          <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-4 mx-auto">
            <Trash2 size={28} />
          </div>
          <AlertDialogTitle className="text-2xl font-black text-slate-900 text-center tracking-tight">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center font-bold text-slate-500 text-base">
            This action cannot be undone. This will permanently remove the book from the library catalog.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex sm:justify-center gap-3 pt-6">
          <AlertDialogCancel className="rounded-xl font-bold px-6 h-12 border-slate-200 cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 rounded-xl px-8 h-12 font-black shadow-lg shadow-red-100 cursor-pointer"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Yes, Delete Book"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBookDialog;