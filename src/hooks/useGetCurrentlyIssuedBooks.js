import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCurrentIssuedBooks, setStudentLoading } from '@/redux/slices/studentSlice';

const useGetCurrentIssued = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCurrentBooks = async () => {
            try {
                dispatch(setStudentLoading(true));
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/book/current-issue`, 
                    { withCredentials: true }
                );
                if (res.data.success) {
                    dispatch(setCurrentIssuedBooks(res.data.currentIssuedBook));
                }
            } catch (error) {
                console.error("Error fetching current books:", error);
            } finally {
                dispatch(setStudentLoading(false));
            }
        };

        fetchCurrentBooks();
    }, [dispatch]);
};

export default useGetCurrentIssued;