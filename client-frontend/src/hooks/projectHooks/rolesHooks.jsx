import secureApi from '../../api/secureApi';
import { useQuery } from '@tanstack/react-query';

const rolesHooks = () => {
    const { refetch, data, isLoading, error } = useQuery({
        queryKey: ['roles'],
        queryFn: async () => {
            const response = await secureApi.get(`/roles`);
            return response;
        },
    });

    const rolesInfo = data?.result || [];

    return { rolesInfo, isLoading, error, refetch };
};

export default rolesHooks;