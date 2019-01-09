import React, { Component } from "react";

class Star extends Component {
  render() {
    // if the item this star is attached to is favourited, the star receives the favourite class
    let favClass = "";
    if (this.props.fav) {
      favClass = "f";
    }
    return (
      <div className={"star " + favClass}>
        <i className="fas fa-star" />
      </div>
    );
  }
}

export default Star;
