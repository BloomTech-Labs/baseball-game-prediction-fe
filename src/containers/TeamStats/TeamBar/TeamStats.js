import React from 'react';

class TeamStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: 'New York Mets',
      pennants: 4,
      world_series: 2,
      record: '1230 - 950'
    }
  }
  render() {
    return (
      <div>
        <p>All Time Record: {this.state.record}</p>
        <p>Pennants: {this.state.pennants}</p>
        <p>World Series Titles: {this.state.world_series}</p>
      </div>
    )
  }
}

export default TeamStats;