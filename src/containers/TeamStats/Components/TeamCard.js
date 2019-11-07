import React from 'react';
const hexColor = num => '#' + num.toString()


const Team = props => (
  
  <div className='card'>
    <div className='cardFlip'>

      <div className='cardFront'>
        <img className='logo' src={props.team.Logo} alt='logo' height='70' width='70'/>
        <div className='teamTitle'>
          <p>{props.team.City} {props.team.Name}</p>
          <p>Established {props.team.established}</p>
        </div>        
      </div>

      <div classname='cardBack'>
        <div className='info'>
          <p>Ballpark: {props.team.ballPark}</p>
          <p>Pennants: {props.team.pennants}</p>
          <p>World Series Titles: {props.team.worldSeries}</p>
          <p className='record'>All Time Record: {props.team.allTime}</p>
          <p>Win Percantage: {props.team.winPercent}</p>
        </div>
        <div>
          <button className='sButton'>Stats</button>
        </div>
      </div>

    </div>    
  </div>
)