import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import SearchBar from "./SearchBar";
import ResultsList from "./ResultsList";
import Favourites from "./Favourites";
import Footer from "./Footer";

class App extends Component {
  constructor() {
    super();
    this.state = {
      resultItems: [],
      favourites: []
    };

    //this.method = this.method.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.handleNewFavourite = this.handleNewFavourite.bind(this);
    this.handleRemoveFavourite = this.handleRemoveFavourite.bind(this);
  }

  componentDidMount() {}

  // this method handles the api call, will update the results list
  handleSearch(keyword) {
    // create a regex using the keyword given the by user, spaces are required so that words contained in other words aren't matched. ie, rat => crate
    const re = new RegExp("\\s" + keyword + "\\s");
    let results = [];
    // make an fetch api call on the toronto waste database
    fetch(
      "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000"
    )
      .then(function(response) {
        return response.json();
      })
      .then(
        function(myJson) {
          myJson.forEach(trashItem => {
            // if the current trash item contains the keyword given by the user, add this item to the results items that will be displayed to the user

            if (
              trashItem.keywords.match(re) ||
              trashItem.title.match(re) ||
              trashItem.body.match(re)
            ) {
              // convert special characters to html tags so that rendering works properly
              trashItem.body = trashItem.body.replace(/&lt;/g, "<");
              trashItem.body = trashItem.body.replace(/&gt;/g, ">");
              trashItem.body = trashItem.body.replace(/&amp;/g, "&");
              trashItem.body = trashItem.body.replace(/&quot;/g, "");

              results.push(trashItem);
            }
          });
          this.setState(prevState => (prevState["resultItems"] = results));
        }.bind(this)
      );
  }

  clearSearch() {
    // clear the result items
    this.setState(prevState => (prevState["resultItems"] = []));
  }

  // this method handles the user requesting to add a favourite item
  handleNewFavourite(item) {
    // append the given item which includes the title and body text to the favourites state
    this.setState(prevState => prevState["favourites"].push(item));
  }

  // this method handles the user requesting to remove a favourited item
  handleRemoveFavourite(item) {
    //remove the given id from the favourites state
    this.setState(prevState => {
      const index = prevState["favourites"].findIndex(
        favItem => favItem.title === item.title
      );
      if (index > -1) {
        return prevState["favourites"].splice(index, 1);
      } else {
        return prevState;
      }
    });
  }

  render() {
    return (
      <div>
        <div className="App">
          <Header />
          <SearchBar
            handleSearch={this.handleSearch}
            clearSearch={this.clearSearch}
          />
          <ResultsList
            handleNewFavourite={this.handleNewFavourite}
            handleRemoveFavourite={this.handleRemoveFavourite}
            resultItems={this.state.resultItems}
            favourites={this.state.favourites}
          />
          {// if there is atleast 1 favourited item generate the favourites component
          this.state.favourites.length > 0 && (
            <Favourites
              handleNewFavourite={this.handleNewFavourite}
              handleRemoveFavourite={this.handleRemoveFavourite}
              favourites={this.state.favourites}
            />
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
