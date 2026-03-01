import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setStudents, setPagination, setAdminLoading } from '@/redux/slices/adminSlice';

const useGetAllStudents = (page, search) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                dispatch(setAdminLoading(true));
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/admin/all-students?page=${page}&search=${search}`, 
                    { withCredentials: true }
                );
                if (res.data.success) {
                    dispatch(setStudents(res.data.students));
                    dispatch(setPagination(res.data.pagination));//here its set the data for pagination as well for the student
                }
            } catch (error) {
                console.error("Error fetching students:", error);
            } finally {
                dispatch(setAdminLoading(false));
            }
        };

        const debounceTimer = setTimeout(() => {
            fetchStudents();
        }, 500); // Search debounce to save API calls

        return () => clearTimeout(debounceTimer);
    }, [page, search, dispatch]);
};

export default useGetAllStudents;