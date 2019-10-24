import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosWithAuthMSF } from '../../utils/axiosWithAuthMSF';
import GameCard from './GameCard';

export default function TeamScheduleView(props) {
    const [games, setGames] = useState([]);
    const [displayedGames, setDisplayedGames] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    useEffect(() => {
        fetchCurrentTeam();
    }, [])

    const fetchCurrentTeam = async () => {
        let res = await axios.get(`https://bgp-be-staging.herokuapp.com/api/teams/${props.match.params.team_id}`);
        axiosWithAuthMSF()
        .get(`https://api.mysportsfeeds.com/v2.1/pull/mlb/2019-regular/games.json/?team=${res.data[0].abbreviation.toLowerCase()}`)
        .then(res => {
            setGames(res.data.games);
        })
        .catch(err => {
            console.log(err);
        });
    }

    if(games.length > 1){
        return (
            <div>
            {displayedGames.map(id => {
            return (
                <GameCard 
                away_team={games[id].schedule.awayTeam.abbreviation}
                home_team={games[id].schedule.homeTeam.abbreviation}
                away_score={games[id].score.awayScoreTotal}
                home_score={games[id].score.homeScoreTotal}
                date={games[id].schedule.startTime} 
                key={id}/>
            )})}
            </div>
        )
    }

    return (
        <div/>
    )
}