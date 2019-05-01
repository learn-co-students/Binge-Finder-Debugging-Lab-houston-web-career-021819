import React, { Component } from 'react';
import Adapter from '../Adapter';
import TVShowList from './TVShowList';
import Nav from './Nav';
import SelectedShowContainer from './SelectedShowContainer';
import { Grid, Container } from 'semantic-ui-react';



class App extends Component {
  state = {
    shows: [],
    searchTerm: "",
    selectedShow: "",
    episodes: [],
    filterByRating:[]
  }

  componentDidMount = () => {
    Adapter.getShows().then(shows => this.setState({shows}))
  }

  componentDidUpdate = () => {
    window.scrollTo(0, 0)
  }

  handleSearch = (e) => {
    let value = e.target.value
    this.setState({ searchTerm: value })
  }

  handleFilter = (e) => {
  
    this.setState({
      filterByRating: this.state.shows.filter(show => show.rating.average >= e.target.value)
    })
     
  }

  selectShow = (show) => {
    Adapter.getShowEpisodes(show.id)
    .then((episodes) => this.setState({
      selectedShow: show,
      episodes
    }))
  }

  displayShows = () => {
      if(this.state.searchTerm !== ""){
        return this.state.shows.filter(show => show.name.toLowerCase() == this.state.searchTerm.toLowerCase())
      }else{
        return this.state.shows
    }
  }

  render (){
    console.log(this.state.filterByRating.length)
    return (
      <div>
        <Nav handleFilter={this.handleFilter} handleSearch={this.handleSearch} searchTerm={this.state.searchTerm}/>
        <Grid celled>
          <Grid.Column width={5}>
            {!!this.state.selectedShow ? <SelectedShowContainer selectedShow={this.state.selectedShow} allEpisodes={this.state.episodes}/> : <div/>}
          </Grid.Column>
          <Grid.Column width={11}>
            {this.state.filterByRating.length > 0 ?
              <TVShowList shows={this.state.filterByRating} selectShow={this.selectShow} /*searchTerm={this.state.searchTerm}*//>
              :
              <TVShowList shows={this.displayShows()} selectShow={this.selectShow} /*searchTerm={this.state.searchTerm}*//>}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
/* 
 App
   -SelectedShowContainer
     .Episode
   -TVShowList
     .TVShow 
   -Nav 
     .Search
     .Filter
   -Adapter
*/   