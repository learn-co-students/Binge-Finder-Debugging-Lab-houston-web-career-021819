import React from 'react';

const Episode = (props) => {
  let { myEpisode } = props
   console.log('you reached me')
  return (
    <div>
      Episode {props.eachEpisode.number} - {props.eachEpisode.name}
    </div>
  )
}

export default Episode;
