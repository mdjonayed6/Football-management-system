import React, { useEffect, useState } from 'react';
import secureApi from '../../../api/secureApi';
import moment from 'moment';

const Section4 = () => {
    const [next, setNext] = useState([])
    const [rank, setRank] = useState([])

    useEffect(() => {
        async function nextMatch() {
            const result = await secureApi.get('/matches/next/matches')
            // console.log(result.result)

            const match = result.result
            setNext(match)
        }

        async function ranking() {
            const result = await secureApi.get('/results/rank/results')
            setRank(result.result)
            // console.log(result.result)
        }

        nextMatch()
        ranking()
    }, [])


    return (
        <div>
            <div className="px-5 md:px-24 site-section">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="">
                            <div className="widget-next-match">
                                <div className="widget-title">
                                    <h3>Next Match</h3>
                                </div>
                                {
                                    next.length == 0 && <p className='text-center py-5'>No match found..</p>
                                }
                                <div className="widget-body mb-3">
                                    <div className="widget-vs">
                                        <div className="flex items-center  justify-around w-100">
                                            <div className="team-1 text-center">
                                                <img src={next[0]?.home_team_logo} alt="Image" />
                                                <h3>{next[0]?.home_team_name}</h3>
                                            </div>
                                            <div>
                                                <span className="vs"><span>VS</span></span>
                                            </div>
                                            <div className="team-2 text-center">
                                                <img src={next[0]?.away_team_logo} alt="Image" />
                                                <h3>{next[0]?.away_team_name}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center widget-vs-contents mb-4">
                                    <h4>IUBAT Cup League</h4>
                                    <p className="mb-5">
                                        <span className="block">{moment(next[0]?.match_date).format('LL')}</span>
                                        <span className="block">{next[0]?.match_time} GMT+0</span>
                                        <strong className="text-primary">{next[0]?.venue}</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="">

                            <div className="widget-next-match">
                                <table className="table custom-table">
                                    <thead>
                                        <tr>
                                            <th>P</th>
                                            <th>Team</th>
                                            <th>W</th>
                                            <th>D</th>
                                            <th>L</th>
                                            <th>Goals</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            rank.map((t, index) => (
                                                <tr key={index + 1}>
                                                    <td>{index + 1}</td>
                                                    <td><strong className="text-white">{(t?.team_name)?.toUpperCase()}</strong></td>
                                                    <td>{t.total_wins}</td>
                                                    <td>{t?.draws}</td>
                                                    <td>{t?.total_losses}</td>
                                                    <td>{t?.total_goals_scored ? t?.total_goals_scored : 'N/A'}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Section4;