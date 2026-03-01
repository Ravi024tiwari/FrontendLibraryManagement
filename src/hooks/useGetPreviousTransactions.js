import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setPreviousIssuedBooks, setStudentLoading } from '@/redux/slices/studentSlice';

const useGetPreviousTransactions = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                dispatch(setStudentLoading(true));
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/book/previous/transaction-history`, 
                    { withCredentials: true }
                );
                if (res.data.success) {
                    dispatch(setPreviousIssuedBooks(res.data.transactionHistory));//here we dispatch this data
                }
            } catch (error) {
                console.error("History Fetch Error:", error);
            } finally {
                dispatch(setStudentLoading(false));
            }
        };

        fetchHistory();
    }, [dispatch]);
};

export default useGetPreviousTransactions;