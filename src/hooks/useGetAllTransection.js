import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setHistory, setLoading,setPagination } from '../redux/slices/transectionSlice.js';
import { toast } from 'sonner';

const useGetTransactions = (page = 1, search = "") => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                dispatch(setLoading(true));
                
                // API Call with query params for pagination and search
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/transaction/history?page=${page}&search=${search}`, 
                    { withCredentials: true }
                );

                if (res.data.success) {
                    dispatch(setHistory(res.data.history));
                    // Agar aapne slice mein pagination state rakhi hai toh usey bhi update karein
                    dispatch(setPagination({
                    totalPages: res.data.totalPages,
                    totalTransactions: res.data.totalTransactions }));
                }
            } catch (error) {
                console.error("Fetch Transactions Error:", error);
                toast.error(error.response?.data?.message || "Failed to load transaction history");
            } finally {
                dispatch(setLoading(false));
            }
        };

        // Debounce Logic: User ke rukne ke 500ms baad hi call jayegi
        const handler = setTimeout(() => {
            fetchTransactions();
        }, 500);

        return () => clearTimeout(handler);
    }, [page, search, dispatch]); // Jab bhi page ya search badlega, hook fire hoga
};

export default useGetTransactions;