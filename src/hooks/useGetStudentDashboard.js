import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setStudentDashboardData, setStudentLoading } from '@/redux/slices/studentSlice';

const useGetStudentStats = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                dispatch(setStudentLoading(true));
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/student/dashboard`, 
                    { withCredentials: true }
                );
                
                if (res.data.success) {
                    dispatch(setStudentDashboardData({
                        stats: res.data.stats,
                        chartData: res.data.chartData
                    }));
                }
            } catch (error) {
                console.error("Dashboard Stats Fetch Error:", error);
            } finally {
                dispatch(setStudentLoading(false));
            }
        };

        fetchStats();
    }, [dispatch]);
};

export default useGetStudentStats;