import React from 'react';
import secureApi from '../../api/secureApi';
import { useQuery } from '@tanstack/react-query';

const teamsHooks = (currentPage, limit) => {
    const { refetch, data, isLoading, error } = useQuery({
        queryKey: ['teams', currentPage, limit],
        queryFn: async () => {
            const response = await secureApi.get(`/teams?currentPage=${currentPage}&limit=${limit}`);
            return response;
        },
    });

    const teamsInfo = data?.teams || [];
    const total = data?.total || 0;

    return { teamsInfo, isLoading, error, total, refetch };
};

export default teamsHooks;