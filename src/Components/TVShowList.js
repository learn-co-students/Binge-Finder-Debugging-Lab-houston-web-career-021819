import React, { Component } from 'react';
import TVShow from './TVShow'
import {Grid} from 'semantic-ui-react';

class TVShowList extends Component {

  mapAllShows = () => {
    return this.props.shows
    .filter((s) => s.name.toLowerCase().includes(this.props.searchTerm))
    .map(show => (<TVShow show={show} key={show.id} selectShow={this.props.selectShow}/> ))
  }

  render() {
    return (
      <div className="TVShowList">
        <Grid>
          {this.mapAllShows()}
        </Grid>
      </div>
    )
  }

}

export default TVShowList;
