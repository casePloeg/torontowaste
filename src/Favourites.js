import React, { Component } from "react";
import TrashItem from "./TrashItem";

class Favourites extends Component {
  render() {
    const favItems = this.props.favourites.map(item => (
      <TrashItem
        key={item.title}
        body={item.body}
        title={item.title}
        fav={true}
        handleNewFavourite={this.props.handleNewFavourite}
        handleRemoveFavourite={this.props.handleRemoveFavourite}
      />
    ));
    return (
      <div className="favourites">
        <h2>Favourites</h2>
        {favItems}
      </div>
    );
  }
}

export default Favourites;
