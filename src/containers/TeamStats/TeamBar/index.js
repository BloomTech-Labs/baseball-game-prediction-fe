import React from 'react';
import TeamLogo from './TeamLogo';
import TeamName from './TeamName';
import TeamStats from './TeamStats'
import './TeamBarStyle.scss';

const TeamBar = () => (
    <div className='teamBar'>
      <TeamName />
      <TeamLogo />
      <TeamStats />
    </div>
)

export default TeamBar;