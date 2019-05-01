let i = 0

class Adapter {
  static getShows (){
    return fetch(`http://api.tvmaze.com/shows?page=${i}`)
      .then(res => {
        i++
        return res.json()
      })
  }

  static getShowEpisodes (show){
    return fetch(`http://api.tvmaze.com/shows/${show.id}/episodes`)
    .then(res => res.json())
  }
}

export default Adapter
