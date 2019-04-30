class Adapter {
  static getShows(pageNum) {
    return fetch(`http://api.tvmaze.com/shows?page=${pageNum}`).then(res =>
      res.json()
    );
  }

  static getShowEpisodes(showID) {
    return fetch(`http://api.tvmaze.com/shows/${showID}/episodes`).then(res =>
      res.json()
    );
  }
}

export default Adapter;
