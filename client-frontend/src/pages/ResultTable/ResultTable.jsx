import React, { useEffect, useState } from 'react';
import secureApi from '../../api/secureApi';

const ResultTable = () => {
    const [rank, setRank] = useState([]);

    useEffect(() => {
        async function fetchRanking() {
            try {
                const response = await secureApi.get('/results/rank/results');
                setRank(response.result);
            } catch (error) {
                console.error('Error fetching ranking:', error);
            }
        }

        fetchRanking();
    }, []);

    return (
        <div className="min-h-screen px-5 lg:px-24 mt-36 ">
            <div id="print-content">
                <table className="min-w-full leading-normal bg-white rounded-lg overflow-hidden shadow-md">
                    <thead>
                        <tr className="bg-red-500 text-white">
                            <th className="px-5 py-3 border-b border-gray-300 text-left text-xs font-semibold uppercase">
                                P
                            </th>
                            <th className="px-5 py-3 border-b border-gray-300 text-left text-xs font-semibold uppercase">
                                Team
                            </th>
                            <th className="px-5 py-3 border-b border-gray-300 text-left text-xs font-semibold uppercase">
                                W
                            </th>
                            <th className="px-5 py-3 border-b border-gray-300 text-left text-xs font-semibold uppercase">
                                D
                            </th>
                            <th className="px-5 py-3 border-b border-gray-300 text-left text-xs font-semibold uppercase">
                                L
                            </th>
                            <th className="px-5 py-3 border-b border-gray-300 text-left text-xs font-semibold uppercase">
                                Goals
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rank.map((t, index) => (
                            <tr key={index + 1} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                <td className="px-5 py-3 border-b border-gray-300 text-sm">{index + 1}</td>
                                <td className="px-5 py-3 border-b border-gray-300 text-sm">{(t?.team_name)?.toUpperCase()}</td>
                                <td className="px-5 py-3 border-b border-gray-300 text-sm">{t?.total_wins}</td>
                                <td className="px-5 py-3 border-b border-gray-300 text-sm">{t?.draws}</td>
                                <td className="px-5 py-3 border-b border-gray-300 text-sm">{t?.total_losses}</td>
                                <td className="px-5 py-3 border-b border-gray-300 text-sm">{t?.total_goals_scored ? t?.total_goals_scored : 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResultTable;
