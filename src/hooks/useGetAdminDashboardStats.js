import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setAdminStats, setAdminLoading } from '@/redux/slices/adminSlice.js'; // Ensure this action exists

const useGetDashboardStats = () => {
    const dispatch = useDispatch();

    const fetchStats = async () => {
        try {
            dispatch(setAdminLoading(true)); 

            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/dashboard`, {
                withCredentials: true,
            });

            if (res.data.success) {
                console.log("API Data fetched successfully:", res.data.stats);
                dispatch(setAdminStats(res.data.stats)); 
            }
        } catch (error) {
            console.error("Hook Error:", error);
            toast.error("Failed to fetch dashboard statistics");
        } finally {
            // 3. Loading khatam
            dispatch(setAdminLoading(false));
        }
    };

    useEffect(() => {
        fetchStats();
    }, [dispatch]); // Dependency array mein dispatch zaroori hai
};

export default useGetDashboardStats;