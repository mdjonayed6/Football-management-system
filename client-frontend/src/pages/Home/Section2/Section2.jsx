import React from 'react';
import resultsHooks from '../../../hooks/projectHooks/resultsHooks';

const Section2 = () => {
    const { resultsInfo, isLoading, error, total, refetch } = resultsHooks(1, 5)
    const res = resultsInfo[0]
    return (
        <div>
            <div className="px-5 md:px-56">
                <div className="">

                    <div className="flex justify-around team-vs">
                        <span className="score">{res?.home_team_score}-{res?.away_team_score}</span>
                        <div className="team-1 w-50">
                            <div className="team-details w-100 text-center">
                                <img src={res?.home_team_logo} alt="Image" className="img-fluid" />
                                <h3>{(res?.home_team_name)?.toUpperCase()}</h3>
                                <ul className="list-unstyled">
                                    {/* <li>Anja Landry (7)</li>
                                    <li>Eadie Salinas (12)</li>
                                    <li>Ashton Allen (10)</li>
                                    <li>Baxter Metcalfe (5)</li> */}
                                </ul>
                            </div>
                        </div>
                        <div className="team-2 w-50">
                            <div className="team-details w-100 text-center">
                                <img src={res?.away_team_logo} alt="Image" className="img-fluid" />
                                <h3>{(res?.away_team_name)?.toUpperCase()}</h3>
                                <ul className="list-unstyled">
                                    {/* <li>Macauly Green (3)</li>
                                    <li>Arham Stark (8)</li>
                                    <li>Stephan Murillo (9)</li>
                                    <li>Ned Ritter (5)</li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Section2;