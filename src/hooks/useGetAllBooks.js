import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAllBooks, setBookLoading } from '@/redux/slices/bookSlice';
import { toast } from 'sonner';

const useGetAllBooks = () => {
    const dispatch = useDispatch();

    const fetchBooks = async () => {
        try {
            dispatch(setBookLoading(true));
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/all/books`, {
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setAllBooks(res.data.books));
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch books");
        } finally {
            dispatch(setBookLoading(false));
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

   
};

export default useGetAllBooks;