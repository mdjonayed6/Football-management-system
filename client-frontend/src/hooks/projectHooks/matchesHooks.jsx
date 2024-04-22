import React from 'react';
import secureApi from '../../api/secureApi';
import { useQuery } from '@tanstack/react-query';

const matchesHooks = (currentPage, limit) => {
    const { refetch, data, isLoading, error } = useQuery({
        queryKey: ['matches', currentPage, limit],
        queryFn: async () => {
            const response = await secureApi.get(`/matches?currentPage=${currentPage}&limit=${limit}`);
            return response;
        },
    });

    const matchesInfo = data?.matches || [];
    const total = data?.total || 0;

    return { matchesInfo, isLoading, error, total, refetch };
};

export default matchesHooks;