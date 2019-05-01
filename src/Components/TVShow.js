import React from 'react';

class TVShow extends React.Component {
  //console.log(props)
  render(){
      return (
        <div>
          <br/>
          <img src={this.props.show.image.medium} onClick={()=> this.props.selectShow (this.props.show)} alt=""/>
        </div>
      );  
  } 
}

export default TVShow;
