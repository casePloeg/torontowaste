import React, { Component } from "react";
import { withTrashItems } from "./WithTrashItems";

class ResultsList extends Component {
  render() {
    // create displayable trash item components out of results given through props
    // an item is a favourite if the object consisting of it's item and body appears in the favourites list
    // titles are unique so they are given as the key. Ids are not used because they seem to be missing from some items in the database
    return <div className="resultsList">{this.props.trashItems}</div>;
  }
}

export default withTrashItems(ResultsList);
