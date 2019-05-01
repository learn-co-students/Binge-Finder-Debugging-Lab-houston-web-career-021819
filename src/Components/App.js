import React, { Component } from 'react';
import Adapter from '../Adapter';
import TVShowList from './TVShowList';
import Nav from './Nav';
import SelectedShowContainer from './SelectedShowContainer';
import { Grid } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller'

// function createObserver() {
//   var observer;

//   var options = {
//     root: null,
//     rootMargin: "0px",
//     threshold: 1.0
//   };

//   observer = new IntersectionObserver(handleIntersect, options);
//   observer.observe(boxElement);
// }

class App extends Component {
  state = {
    shows: [],
    searchTerm: "",
    selectedShow: "",
    episodes: [],
    filterByRating: "",
  }

  componentDidMount = () => {
    console.log('in here?')
//     Adapter.getShows().then(shows => {this.setState({
//       ...this.state,
//       shows: this.state.shows.concat(shows)
//     })
//  })
  }

  componentDidUpdate = () => {
    //window.scrollTo(0, 0)
  }

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value.toLowerCase() })
  }

  handleFilter = (e) => {
    e.target.value === "No Filter" ? this.setState({ filterByRating:"" }) : this.setState({ filterByRating: e.target.value})
  }

  selectShow = (props) => {
    Adapter.getShowEpisodes(props.show)
    .then((episodes) => {
      this.setState({
      selectedShow: props.show,
      episodes
    })
  })
  }

  displayShows = () => {
    if (this.state.filterByRating){
      return this.state.shows.filter((s)=> s.rating.average >= this.state.filterByRating)
    } else {
      return this.state.shows
    }
  }

  render (){
    return (
      <div>
        <Nav handleFilter={this.handleFilter} handleSearch={this.handleSearch} searchTerm={this.state.searchTerm}/>
        <Grid celled>
          <Grid.Column width={5}>
            {!!this.state.selectedShow ? <SelectedShowContainer selectedShow={this.state.selectedShow} allEpisodes={this.state.episodes}/> : <div/>}
          </Grid.Column>
          <Grid.Column width={11}>
          <InfiniteScroll
              pageStart={0}
              loadMore={() => Adapter.getShows().then(shows => {this.setState({
      ...this.state,
      shows: this.state.shows.concat(shows)
    })
 })}
              hasMore={true || false}
              loader={<div className="loader" key={0}>Loading ...</div>}
          >
            <TVShowList shows={this.displayShows()} selectShow={this.selectShow} searchTerm={this.state.searchTerm}/>
          </InfiniteScroll>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
