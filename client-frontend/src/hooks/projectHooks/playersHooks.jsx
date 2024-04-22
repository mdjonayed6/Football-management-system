import React from 'react';
import secureApi from '../../api/secureApi';
import { useQuery } from '@tanstack/react-query';

const playersHooks = (currentPage, limit) => {
    const { refetch, data, isLoading, error } = useQuery({
        queryKey: ['players', currentPage, limit],
        queryFn: async () => {
            const response = await secureApi.get(`/players?currentPage=${currentPage}&limit=${limit}`);
            return response;
        },
    });

    const playersInfo = data?.players || [];
    const total = data?.total || 0;

    return { playersInfo, isLoading, error, total, refetch };
};

export default playersHooks;