import React, { Component, Fragment } from "react";
import Star from "./Star";

class TrashItem extends Component {
  handleClick() {
    if (this.props.fav) {
      this.props.handleRemoveFavourite({
        title: this.props.title,
        body: this.props.body
      });
    } else {
      this.props.handleNewFavourite({
        title: this.props.title,
        body: this.props.body
      });
    }
  }

  render() {
    return (
      <div className="trashItem">
        <div className="star" onClick={() => this.handleClick()}>
          <Star fav={this.props.fav} />
        </div>

        <h3 className="title">{this.props.title}</h3>
        <div
          className="body"
          dangerouslySetInnerHTML={{ __html: this.props.body }}
        />
      </div>
    );
  }
}

export default TrashItem;
