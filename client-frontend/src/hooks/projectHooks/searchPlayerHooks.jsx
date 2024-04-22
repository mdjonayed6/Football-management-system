import React from 'react';
import secureApi from '../../api/secureApi';
import { useQuery } from '@tanstack/react-query';

const searchPlayerHooks = (search, currentPage, limit) => {
    const { refetch, data, isLoading, error } = useQuery({
        queryKey: ['users', search, currentPage, limit],
        queryFn: async () => {
            const response = await secureApi.get(`/players/search/player?currentPage=${currentPage}&limit=${limit}&search=${search}`);
            return response;
        },
    });

    const searchPlayerInfo = data?.players || [];
    const total = data?.total || 0;

    return { searchPlayerInfo, isLoading, error, total, refetch };
};

export default searchPlayerHooks;