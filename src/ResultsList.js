import React, { Component } from "react";
import TrashItem from "./TrashItem";

class ResultsList extends Component {
  render() {
    // create displayable trash item components out of results given throug props
    console.log(this.props.resultItems);
    // an item is a favourite if the object consisting of it's item and body appears in the favourites list

    // titles are unique so they are given as the key. Ids are not used because they seem to be missing from some items in the database
    const resultItems = this.props.resultItems.map(item => (
      <TrashItem
        key={item.title}
        body={item.body}
        title={item.title}
        fav={
          this.props.favourites.findIndex(
            favItem => favItem.title === item.title
          ) > -1
            ? true
            : false
        }
        handleNewFavourite={this.props.handleNewFavourite}
        handleRemoveFavourite={this.props.handleRemoveFavourite}
      />
    ));
    return <div className="resultsList">{resultItems}</div>;
  }
}

export default ResultsList;
