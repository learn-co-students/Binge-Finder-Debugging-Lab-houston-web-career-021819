import React from 'react';

const Episode = ({episode}) => {


  return (
    <div>
      Episode {episode.number} - {episode.name}
    </div>
  )
}

export default Episode;
