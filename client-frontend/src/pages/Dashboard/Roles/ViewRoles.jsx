import React from 'react';
import rolesHooks from '../../../hooks/projectHooks/rolesHooks';
import Spinner from '../../../components/ui/Spinner';

const ViewRoles = () => {
    const { rolesInfo, isLoading, error, refetch } = rolesHooks()
    // console.log(rolesInfo)
    return (
        <div className='p-5'>
            <h1 className="text-2xl text-center mt-5 font-bold mb-4">Roles List</h1>
            {isLoading && <Spinner />}
            {error && <p>Error: {error.message}</p>}

            {rolesInfo && (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role Name</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {rolesInfo?.map(roles => (
                            <tr key={roles.role_id}>
                                <td className="px-6 py-4 whitespace-nowrap">{roles.role_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{roles.role_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </div>
    );
};

export default ViewRoles;