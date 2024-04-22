import React from 'react';
import secureApi from '../../api/secureApi';
import { useQuery } from '@tanstack/react-query';

const searchCoachPlayerHooks = (searchTerm, currentPage, limit) => {
    const { refetch, data, isLoading, error } = useQuery({
        queryKey: ['users', searchTerm, currentPage, limit],
        queryFn: async () => {
            const response = await secureApi.get(`users/search/player?currentPage=${currentPage}&limit=${limit}&searchterm=${searchTerm}`);
            return response;
        },
    });

    const searchPlayerInfo = data?.users || [];
    const total = data?.total || 0;

    return { searchPlayerInfo, isLoading, error, total, refetch };
};

export default searchCoachPlayerHooks;