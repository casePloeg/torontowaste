import React, { Component, Fragment } from "react";
import Star from "./Star";

class TrashItem extends Component {
  handleClick() {
    console.log("yeet");
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
    const test = "<p>hello</p>";
    return (
      <div className="trashItem">
        <div onClick={() => this.handleClick()}>
          <Star fav={this.props.fav} />
        </div>

        <h3>{this.props.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: this.props.body }} />
      </div>
    );
  }
}

export default TrashItem;
