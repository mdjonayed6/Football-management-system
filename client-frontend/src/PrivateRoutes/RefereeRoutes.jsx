import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import secureApi from '../api/secureApi';
import Spinner from '../components/ui/Spinner';

const RefereeRoutes = ({ children }) => {
    const [userRole, setUserRole] = useState(null); // Set initial state to null or an empty object
    const email = localStorage.getItem('email');

    useEffect(() => {
        async function fetchUserRole() {
            try {
                const response = await secureApi.get(`/users/single/user?email=${email}`);
                setUserRole(response.user);
            } catch (error) {
                // Handle error if API request fails
                console.error('Error fetching user role:', error);
            }
        }

        if (email) {
            fetchUserRole();
        } else {
            // If email is not available, set user role to null
            setUserRole(null);
        }
    }, [email]);

    // Render based on user role
    if (!userRole) {
        // Render loading state or redirect to login if user role is being fetched
        return <Spinner />; // Replace LoadingComponent with your loading indicator
    } else if (userRole.role_name === 'referee') {
        // Render children if user is an admin
        return children;
    } else {
        // Redirect to login if user is not an admin
        return <Navigate to="/login" />;
    }
};

export default RefereeRoutes;
