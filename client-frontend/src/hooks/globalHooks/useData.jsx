import React from 'react';
import secureApi from '../../api/secureApi';
import { useQuery } from '@tanstack/react-query';

const useData = (url) => {
    // Check if URL is provided
    if (!url || url.trim() === '') {
        return {
            responseData: null,
            refetch: () => {},
            isLoading: false,
            error: { message: 'URL is missing' }
        };
    }

    const { refetch, data: responseData = [], isLoading, error } = useQuery({
        queryKey: ['responseData'],
        queryFn: async () => {
            try {
                const response = await secureApi.get(url);
                return response; // Assuming response.data contains the actual data
            } catch (error) {
                throw new Error('Failed to fetch data');
            }
        },
    });

    return { responseData, refetch, isLoading, error };
};

export default useData;
