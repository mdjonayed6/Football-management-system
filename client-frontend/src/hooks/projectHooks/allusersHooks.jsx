import React from 'react';
import secureApi from '../../api/secureApi';
import { useQuery } from '@tanstack/react-query';

const allusersHooks = (currentPage, limit) => {
    const { refetch, data, isLoading, error } = useQuery({
        queryKey: ['users', currentPage, limit],
        queryFn: async () => {
            const response = await secureApi.get(`/users?currentPage=${currentPage}&limit=${limit}`);
            return response;
        },
    });

    const usersInfo = data?.users || [];
    const total = data?.total || 0;

    return { usersInfo, isLoading, error, total, refetch };
};

export default allusersHooks;