import React, { Component } from "react";
import { withTrashItems } from "./WithTrashItems";

class Favourites extends Component {
  render() {
    return (
      <div className="favourites">
        <h2>Favourites</h2>
        {this.props.trashItems}
      </div>
    );
  }
}

export default withTrashItems(Favourites);
