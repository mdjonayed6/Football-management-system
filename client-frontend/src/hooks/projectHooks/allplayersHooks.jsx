import React from 'react';
import secureApi from '../../api/secureApi';
import { useQuery } from '@tanstack/react-query';

const allplayersHooks = (currentPage, limit) => {
    const { refetch, data, isLoading, error } = useQuery({
        queryKey: ['users', currentPage, limit],
        queryFn: async () => {
            const response = await secureApi.get(`/users/get/all-players?currentPage=${currentPage}&limit=${limit}`);
            return response;
        },
    });

    const allPlayers = data?.users || [];
    const total = data?.total || 0;

    return { allPlayers, isLoading, error, total, refetch };
};

export default allplayersHooks;