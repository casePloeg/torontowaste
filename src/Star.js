import React, { Component } from "react";

class Star extends Component {
  render() {
    return (
      <div className={this.props.fav ? "star-f" : "star"}>
        <i className="fas fa-star" />
      </div>
    );
  }
}

export default Star;
