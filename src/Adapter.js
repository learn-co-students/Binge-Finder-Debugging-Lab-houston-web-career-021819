class Adapter {
  static getShows (pageNumber){
    return fetch(`http://api.tvmaze.com/shows?page=${pageNumber}`)
    .then(res => res.json())
  }

  static getShowEpisodes (showID){
    return fetch(`http://api.tvmaze.com/shows/${showID}/episodes`)
    .then(res => res.json())
  }
}

export default Adapter
