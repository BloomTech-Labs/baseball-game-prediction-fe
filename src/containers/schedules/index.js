import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { axiosWithAuthMSF } from '../../utils/axiosWithAuthMSF';
import SimpleList from './SimpleList';

//CSS
import '../../App.css';

export default function SchedulesPage() {
    const [teams, setTeams] = useState([]);

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
        .then(teaminfo => {
            setTeams(teaminfo.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    // Divisional filters

    const nlWTeams = () => {return teams.filter(team => {
    return team.league === "NL" && team.division === "West";})};

    const nlETeams = () => {return teams.filter(team => {
    return team.league === "NL" && team.division === "East";})};

    const nlCTeams = () => {return teams.filter(team => {
    return team.league === "NL" && team.division === "Central";})};

    const alWTeams = () => {return teams.filter(team => {
    return team.league === "AL" && team.division === "West";})};

    const alETeams = () => {return teams.filter(team => {
    return team.league === "AL" && team.division === "East";})};

    const alCTeams = () => {return teams.filter(team => {
    return team.league === "AL" && team.division === "Central";})};

    if (teams.length > 1){
    return (
        <div className="schedule-list-container">
            <SimpleList division={nlWTeams()}/>
            <SimpleList division={nlETeams()}/>
            <SimpleList division={nlCTeams()}/>
            <SimpleList division={alWTeams()}/>
            <SimpleList division={alETeams()}/>
            <SimpleList division={alCTeams()}/>
        </div>
    );} else {
        return (
            <div/>
        )
    }
}