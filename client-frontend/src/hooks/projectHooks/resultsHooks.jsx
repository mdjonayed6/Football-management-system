import React from 'react';
import secureApi from '../../api/secureApi';
import { useQuery } from '@tanstack/react-query';

const resultsHooks = (currentPage, limit) => {
    const { refetch, data, isLoading, error } = useQuery({
        queryKey: ['results', currentPage, limit],
        queryFn: async () => {
            const response = await secureApi.get(`/results?currentPage=${currentPage}&limit=${limit}`);
            return response;
        },
    });

    const resultsInfo = data?.results || [];
    const total = data?.total || 0;

    return { resultsInfo, isLoading, error, total, refetch };
};

export default resultsHooks;