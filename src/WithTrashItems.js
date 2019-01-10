import React, { Component } from "react";
import TrashItem from "./TrashItem";

export function withTrashItems(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      const trashItems = this.props.displayItems.map(item => (
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
      return <WrappedComponent trashItems={trashItems} {...this.props} />;
    }
  };
}
