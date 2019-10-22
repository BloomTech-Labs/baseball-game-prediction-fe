import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosWithAuthMSF } from '../../utils/axiosWithAuthMSF';

export default function SchedulesPage() {
    const [teams, setTeams] = useState([])
    const [schedule, setSchedule] = useState([])

    useEffect(() => {
        // axiosWithAuthMSF()
        // .get(`https://api.mysportsfeeds.com/v2.1/pull/mlb/2019-regular/games.json`)
        // .then(games => {
        //     console.log(games);
        // })
        // .catch(err => {
        //     console.log(err);
        // })
        axios.get('https://bgp-be-staging.herokuapp.com/api/teams')
        .then(teams => {
            setTeams(teams.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <div>
            {teams ? teams.map(team => {
                return (
                    <div>
                        <h1>{team.team_name}</h1>
                        <h2>{team.league}{" "}{team.division}</h2>
                    </div>
                )
            }) : () => {return null}}
        </div>
    );
}