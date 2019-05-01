import React from 'react';

const tvShow = (props) => {
  return (
    <div>
      <br/>
      <img src={props.show.image ? props.show.image.medium : ""} onClick={() => props.selectShow(props)} alt=""/>
    </div>
  );
}

export default tvShow;
