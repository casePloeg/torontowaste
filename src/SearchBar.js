import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
  }
  search(e) {
    if (e.key === "Enter") {
      this.submitSearch();
    } else if (e.target.value === "") {
      this.clearSearch();
    } else {
      e.persist();
      //console.log(e.target.value);
      // update the value of the text input in the state
      //this.setState;
      this.setState(() => {
        return { input: e.target.value };
      });
    }
  }

  submitSearch() {
    // return the value of the input box to the app component (make the api call)
    console.log(this.state.input);
    this.props.handleSearch(this.state.input);
  }

  clearSearch() {
    console.log("search has been cleared");
    this.props.clearSearch();
  }

  render() {
    return (
      <div className="searchBar">
        <input type="text" onKeyUp={event => this.search(event)} />
        <button type="submit" onClick={() => this.submitSearch()}>
          <i className="fas fa-search fa-2x" />
        </button>
      </div>
    );
  }
}

export default SearchBar;
