import React, { Component } from "react";
import Adapter from "../Adapter";
import TVShowList from "./TVShowList";
import Nav from "./Nav";
import SelectedShowContainer from "./SelectedShowContainer";
import { Grid } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";

class App extends Component {
  state = {
    pageNum: 0,
    shows: [],
    searchTerm: "",
    selectedShow: "",
    episodes: [],
    filterByRating: ""
  };

  async componentDidMount() {
    let shows = await Adapter.getShows(this.state.pageNum);
    console.log(shows);
    this.setState({ shows: shows });
    // window.addEventListener("scroll", this.onScroll, false);
  }

  loadMore = () => {
    Adapter.getShows(this.state.pageNum + 1).then(shows => {
      this.setState({
        shows: this.state.shows.concat(shows),
        pageNum: this.state.pageNum + 1
      });
    });
  };

  // onScroll = () => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop ===
  //     document.documentElement.offsetHeight
  //   ) {
  //     this.loadMore();
  //   }
  // };

  // componentDidUpdate = () => {
  //   window.scrollTo(0, 0);
  // };

  checkState = () => {
    console.log(this.state);
  };

  handleSearch = e => {
    this.setState({ searchTerm: e.target.value.toLowerCase() });
  };

  handleFilter = e => {
    e.target.value === "No Filter"
      ? this.setState({ filterByRating: "" })
      : this.setState({ filterByRating: e.target.value });
  };

  selectShow = show => {
    let episodes = Adapter.getShowEpisodes(show.id).then(episodes =>
      this.setState({
        selectedShow: show,
        episodes: episodes
      })
    );
  };

  displayShows = () => {
    if (this.state.filterByRating) {
      return this.state.shows.filter(s => {
        return s.rating.average >= this.state.filterByRating;
      });
    } else {
      return this.state.shows;
    }
  };

  render() {
    return (
      <div onClick={this.checkState}>
        <Nav
          handleFilter={this.handleFilter}
          handleSearch={this.handleSearch}
          searchTerm={this.state.searchTerm}
        />
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMore}
          hasMore={true || false}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
        >
          {
            <Grid celled>
              <Grid.Column width={5}>
                {!!this.state.selectedShow ? (
                  <SelectedShowContainer
                    selectedShow={this.state.selectedShow}
                    episodes={this.state.episodes}
                  />
                ) : (
                  <div />
                )}
              </Grid.Column>
              <Grid.Column width={11}>
                <TVShowList
                  shows={this.displayShows()}
                  selectShow={this.selectShow}
                  searchTerm={this.state.searchTerm}
                />
              </Grid.Column>
            </Grid>
          }
        </InfiniteScroll>
      </div>
    );
  }
}

export default App;
