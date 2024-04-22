import React, { useEffect, useState } from 'react';
import Section1 from './DashboardHome/Section1/Section1';
import useData from '../../hooks/globalHooks/useData';
import Section2 from './DashboardHome/Section2/Section2';
import MyTeam from './Players/MyTeam';
import Section3 from './DashboardHome/Section3/Section3';
import Section4 from './DashboardHome/Section4/Section4';

const Dashboard = () => {
    const [user, setUser] = useState({});
    const email = localStorage.getItem('email');

    // Only fetch data if email is present in localStorage
    const { responseData: userInfo, refetch, isLoading, error } = useData(email ? `/users/single/user?email=${email}` : null);

    useEffect(() => {
        if (!isLoading && !error) {
            // console.log(userInfo.user)
            setUser(userInfo?.user);
        }
    }, [isLoading, error]);

    return (
        <div>
            {
                user?.role_id == '2' ?
                    <>
                        <Section1 />
                    </>
                    :
                    <>
                        {
                            // Coach
                            user?.role_id == '5' ?
                                <>
                                    <Section2 />
                                </>
                                :
                                <>
                                    {
                                        user?.role_id == '3' ?
                                            <>
                                                <Section3 />
                                            </>
                                            :
                                            <>
                                                <MyTeam />
                                                <Section4 />
                                            </>
                                    }
                                </>
                        }
                    </>
            }
        </div>
    );
};

export default Dashboard;