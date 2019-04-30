import React from 'react';

const TVShow = ({show, selectShow}) => {
  return (
    <div>
      <br/>
      <img src={show.image.medium} id={show.id} onClick={selectShow} alt=""/>
    </div>
  );
}

export default TVShow;
